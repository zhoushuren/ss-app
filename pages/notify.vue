<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
        暂无公告
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData(ctx) {
    const { uuid } = ctx.query
    if (uuid) {
      return {
        uuid
      }
    }
    return {
      uuid: ''
    }
  }
}
</script>

<style scoped></style>
