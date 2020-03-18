<template>
  <div class="container">
    <div class="side-bar">
      <side-directory :directories="rootDirs" :onClickDir="updateCurrentDir"></side-directory>
    </div>
    <div class="buttons">
      <span>Upload</span>
      <span @click="newFolder">New Folder</span>
    </div>
    <div class="main">
      {{currentDir.file_name}}
    </div>
    <modal name="new-folder">
      <div><h3>Add new Folder</h3></div>
      <div>
        <label for="new-folder">Folder name:</label>
        <input type="text" name="new-folder" v-model="newFolderName"/>
      </div>
      <div>
        <span>Cancel</span>
        <span @click="onCreateNewFolder">Ok</span>
      </div>
    </modal>
  </div>
</template>

<style>
  .side-bar {
    background-color: aqua;
    grid-area: side;
  }
  .buttons {
    background-color:darkkhaki;
    grid-area: buttons;
  }
  .buttons > span {
    margin: 10px;
  }
  .main {
    background-color: cornflowerblue;
    grid-area: main;
  }
  .container {
    display: grid;
    grid-template-areas:
      'side buttons buttons buttons buttons'
      'side main main main main';
    grid-gap: 10px;
    background-color: #2196F3;
    padding: 10px;
  }
</style>

<script>
  import SideDirectory from './SideDirectory.vue'
  import { getSubDirectory, createNewFolder } from '../services/media_library.js'
  
  export default {
    name: 'App',
    data() {
      return {
        rootDirs: [],
        currentDir: {
          file_name: 'root',
          is_directory: true,
          full_path: '',
          id: 0
        },
        newFolderName: ''
      }
    },
    async created() {
      const subDirectory = await getSubDirectory(0)
      this.rootDirs = subDirectory.data
    },
    methods: {
      updateCurrentDir(dir) {
        this.currentDir = dir
      },
      newFolder() {
        this.$modal.show('new-folder')
      },
      async onCreateNewFolder() {
        const { id, full_path } = this.currentDir
        const folder = {
          file_name: this.newFolderName,
          is_directory: true,
          parent_id: id,
          full_path: `${full_path}/${this.newFolderName}`
        }
        await createNewFolder(folder)
        this.$modal.hide('new-folder')
      }
    },
    components: {
      SideDirectory
    }
  }
</script>