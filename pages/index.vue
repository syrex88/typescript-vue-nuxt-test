/* eslint-disable standard/object-curly-even-spacing */
<template>
  <section class="call-control" v-show="usersList.length > 0">
    <el-row :gutter="20" type="flex" justify="space-between">
      <div>
        <el-table :data="usersList" @cell-click="openUser" style="width: 100%">
          <el-table-column width="200px" label="Имя" prop="name"></el-table-column>
          <el-table-column width="200px" label="Email" prop="email"></el-table-column>
          <el-table-column width="200px" label="Телефон" prop="phone"></el-table-column>
        </el-table>
      </div>
    </el-row>
    <div class="pagination-block">
      <span class="pagination-control" @click="changePage(1)">Первая</span>
      <span class="pagination-control" @click="changePage(currentPage - 1)">Предыдущая</span>
      <el-pagination class="pagination-control"
        layout="pager"
        :current-page.sync="currentPage"
        :page-count="Math.ceil(total / limit)"
        @current-change="changePage">
      </el-pagination>
      <span class="pagination-control" @click="changePage(currentPage + 1)">Следующая</span>
      <span class="pagination-control" @click="changePage(Math.ceil(total / limit))">Последняя</span>
    </div>

  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { User, Users } from '~/types'
import { users as usersStore } from '~/store'

@Component({
  components: {
  }
})

export default class extends Vue {
  @State(state => state.users.usersList) usersList:any
  @State(state => state.users.total) total:any

  currentPage: number = 1
  limit: number = 5

  async created() {
    if (this.$route.query.page) {
      this.changePage(+this.$route.query.page, false)
    } else {
      this.getUsers(1, this.limit)
    }
  }

  async getUsers(page: number, limit: number) {
    await usersStore.getUsers({page, limit })
  }

  async openUser(row: any) {
    this.$router.push('/user/' + row.id)
  }

  async changePage(page: number, changeRoute: boolean = true) {
    // Не меняем страницу если: данные не подгружены и мы находимся на первой или последней странице
    if (this.total && this.limit && ((page > Math.ceil(this.total / this.limit) || page < 1) ||
       (+this.$route.query.page === this.currentPage && +this.$route.query.page === page))) {
      return false
    }

    if (changeRoute) this.$router.push('/?page=' + page)

    await this.getUsers(page, this.limit)
    this.currentPage = page
  }
}
</script>

<style>
  .pagination-block {
    margin-top: 40px;
  }

  .pagination-control {
    float: left;
    margin-right: 20px;
  }
</style>
