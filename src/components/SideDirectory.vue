<template>
  <ul>
    <li v-for="(item) in directories" :key="item.id">
      <span v-on:click="onClick(item)">{{item.file_name}}</span>
      <sub-directory 
        v-if="subDirectory.length > 0 && subDirectory[item.id] && subDirectory[item.id].length > 0" 
        :directories="subDirectory[item.id]"
        :onClickDir="onClickDir"
      />
    </li>
  </ul>
</template>
<script>
  import { getSubDirectory } from '../services/media_library.js'
  import Vue from 'vue'

  export default {
    name: 'sub-directory',
    props: {
      directories: {
        type: Array
      },
      onClickDir: {
        type: Function
      }
    },
    data() {
      return { subDirectory: [[]] }
    },
    methods: {
      async onClick(item) {
        this.onClickDir(item)
        const subDirectory = await getSubDirectory(item.id)
        Vue.set(this.subDirectory, item.id, subDirectory.data)
      }
    },
  }
</script>