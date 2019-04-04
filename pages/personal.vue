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
        用户ID：123
      </v-flex>
      <v-flex>
        <UserInfo />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
export default {
  components: {
    // Login,
    UserInfo
  }
}
</script>

<style scoped></style>
