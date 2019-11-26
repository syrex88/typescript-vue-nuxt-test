import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

export interface ITodosState {
  todosList: string[]
}

@Module({ namespaced: true, name: 'todos', stateFactory: true })
export default class TodosModule extends VuexModule implements ITodosState {

  public todosList = []

  @Mutation
  SET_TODOS_LIST(users:[]) {
    this.todosList = users
  }

  @Action
  async getTodos(userId: number) {
    const todosList = await $axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)

    this.SET_TODOS_LIST(todosList.data)
  }

}

