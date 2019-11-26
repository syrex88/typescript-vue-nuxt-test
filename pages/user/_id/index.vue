/* eslint-disable standard/object-curly-even-spacing */
<template>
  <section class="call-control">
    <span v-show="!loading">
      {{user.name}}
      <el-button class="button-back" type="primary" @click="$router.go(-1)">Назад</el-button>
      <el-table :data="todos" style="width: 100%">
        <el-table-column prop="completed" width="40px">
          <template slot-scope="scope">
            <span v-show="scope.row.completed">V</span>
          </template>
        </el-table-column>
        <el-table-column prop="title"></el-table-column>
      </el-table>
    </span>
    <span v-show="loading">Загрузка...</span>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { todos as todosStore, users  as usersStore } from '~/store'

@Component({
  components: {
  }
})

export default class extends Vue {
  loading: boolean = true
  @State(state => state.todos.todosList) todos:any
  @State(state => state.users.user) user:any

  async created() {
    await usersStore.getUser(+this.$route.params.id)
    await todosStore.getTodos(+this.$route.params.id)
    this.loading = false
  }
}
</script>

<style>
  .button-back {
    display: block;
    margin-top: 20px;
  }
</style>

