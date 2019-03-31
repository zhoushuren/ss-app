<template>
  <div>这是测试的通知页面 你的uuid是： {{ uuid }}</div>
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
