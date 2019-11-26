import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

export interface IUsersState {
  usersList: string[]
  user: {}
  total: number
}

@Module({ namespaced: true, name: 'users', stateFactory: true })
export default class UsersModule extends VuexModule implements IUsersState {

  public usersList = []
  public user = {}
  public total = 0

  @Mutation
  SET_USERS_LIST(users:[]) {
    this.usersList = users
  }

  @Mutation
  SET_USER(user:[]) {
    this.user = user
  }

  @Mutation
  SET_PAGINATION_TOTAL(total:number) {
    this.total = total
  }

  @Action
  async getUsers(payload: { page: number; limit: number }) {
    const usersList = await $axios.get(`https://jsonplaceholder.typicode.com/users?_page=${payload.page}&_limit=${payload.limit}`)

    this.SET_USERS_LIST(usersList.data)
    this.SET_PAGINATION_TOTAL(usersList.headers['x-total-count'])
  }

  @Action
  async getUser(userId: number) {
    const user = await $axios.get(`https://jsonplaceholder.typicode.com/users?_page=${userId}&_limit=1`)

    this.SET_USER(user.data[0])
  }

}

