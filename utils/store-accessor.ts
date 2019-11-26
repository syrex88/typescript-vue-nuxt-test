import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import usersModule from '~/store/users'
import todosModule from '~/store/todos'

let users: usersModule
let todos: todosModule

function initialiseStores(store: Store<any>): void {
  users = getModule(usersModule, store)
  todos = getModule(todosModule, store)
}

export {
  initialiseStores,
  users,
  todos,
}
