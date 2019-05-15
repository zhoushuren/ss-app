<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
        <v-avatar size="80" color="grey lighten-4">
          <img
            src="http://m.imeitou.com/uploads/allimg/171123/3-1G123203S6-50.jpg"
            alt="avatar"
          />
        </v-avatar>
      </v-flex>
      <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
        {{ user_info.name || '我是一个游客' }}
      </v-flex>
      <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
        PORT:{{ account.port || '' }}
      </v-flex>
      <!--<v-flex>-->
      <!--<UserInfo-->
      <!--v-if="is_login"-->
      <!--:name="user_info.name"-->
      <!--:email="user_info.email"-->
      <!--/>-->
      <!--<Login v-else :uuid="uuid" />-->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
export default {
  components: {
    Login,
    UserInfo
  },
  async asyncData(ctx) {
    const { uuid } = ctx.query
    const info = await ctx.$axios.$get('/api/get_user_info?uuid=' + uuid)
    if (info.success) {
      return {
        uuid,
        user_info: info.data,
        account: info.account,
        is_login: true
      }
    }
    return {
      uuid,
      is_login: false,
      user_info: {}
    }
  }
}
</script>

<style scoped></style>
