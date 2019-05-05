<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset />

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>business</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              用量:
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>100G</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              时长:
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>不限时</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    name: {
      require: true,
      default: '',
      type: String
    },
    email: {
      require: true,
      default: '',
      type: String
    }
  }
}
</script>

<style scoped></style>
