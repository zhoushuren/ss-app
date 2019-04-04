<template>
  <v-app id="inspire">
    <div class="buy">
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="n in time"
          :key="n"
          :label="`${n.name}`"
          :value="n.value"
        ></v-radio>
        <p></p>
        <v-bottom-sheet v-model="sheet">
          <template v-slot:activator>
            <v-btn color="success" dark>
              下单
            </v-btn>
          </template>
          <v-list>
            <v-subheader>购买</v-subheader>
            <v-list-tile
              v-for="tile in tiles"
              :key="tile.title"
              @click="sheet = false"
            >
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img
                    :src="
                      `https://cdn.vuetifyjs.com/images/bottom-sheets/${
                        tile.img
                      }`
                    "
                    :alt="tile.title"
                  />
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-bottom-sheet>
      </v-radio-group>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      time: [
        {
          name: '一个月(¥19.9)',
          value: 30
        },
        {
          name: '三个月(¥19.9)',
          value: 90
        },
        {
          name: '六个月(¥19.9)',
          value: 180
        },
        {
          name: '一年(¥19.9)',
          value: 360
        }
      ],
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    }
  }
}
</script>

<style scoped>
.buy {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
