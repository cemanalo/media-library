<template>
  <div class="container">
    <div class="side-bar">
      <side-directory :directories="rootDirs" :onClickDir="updateCurrentDir"></side-directory>
    </div>
    <div class="buttons">
      <span>
        <label>
          File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <button v-on:click="submitFile()">Submit</button>
      </span>
      <span @click="newFolder">New Folder</span>
    </div>
    <div class="main">
      {{currentDir.file_name}}
      <div>
        <img
          v-for="item in files"
          :src="'http://localhost:3000/api/file_uploads/media/download/' + item.file_name"
          class="thumbnail"
          :key="item.file_name"
        />
      </div>
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
  .thumbnail {
    max-height: 350px;
    max-width: 250px;
    margin: 10px;
  }
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
  import { getSubDirectory, createNewFolder, fileUpload } from '../services/media_library.js'
  
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
        newFolderName: '',
        file: '',
        files: []
      }
    },
    async created() {
      const subDirectory = await getSubDirectory(0)
      const files = await getSubDirectory(0, false)
      this.rootDirs = subDirectory.data
      this.files = files.data
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
      },
      async submitFile(){
        const { id, full_path } = this.currentDir
        let formData = new FormData();
        formData.append('file', this.file);

        const file = await fileUpload(formData)
        console.log(file)
        const { name } = file.data.result.files.file[0]
        const folder = {
          file_name: name,
          is_directory: false,
          parent_id: id,
          full_path: `${full_path}/${name}`
        }

        await createNewFolder(folder)
        console.log('done uploading')
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    },
    components: {
      SideDirectory
    }
  }
</script>