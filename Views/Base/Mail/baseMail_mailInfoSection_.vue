<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.20                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <div class="line">
      <span class="text">Recipient:</span>
      <el-input v-model="receivers" placeholder="" size="mini" class="inputTo" clearable></el-input>
      <el-button size="mini" @click="clickHandlerOfShowDialog" class="el-icon-plus"></el-button>
    </div>

    <div class="line">
      <span class="text">Subject:</span><el-input v-model="subject" placeholder="Add a subject" size="mini" class="input" clearable></el-input>
    </div>

    <div class="line">
      <span class="text">Attachments:</span>

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-remove="handleRemove"
        :http-request="uploadAttachment"
        multiple
        :file-list="fileList">
        <el-button size="mini">upload</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  data() {
    return {
      receivers: '',

      subject: '',

      fileList: []
    }
  },

  methods: {
    clickHandlerOfShowDialog() {
      this.emit_event('openAddressBook');
    },

    uploadAttachment(f) {
      const fileName = f.file.name;
      console.log(fileName);
      this.fileList.push(f.file);
    },

    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
  },

  created() {

  },

  mounted() {

  },
}
</script>

<style scoped>
.to {
  background: aqua;
}

.subject {
  background: aquamarine;
}

.line {
  display: flex;
  margin: 20px 0px;
  flex-wrap: nowrap;
}

.text {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  min-width: 90px;
}

@media (max-width: 650px) {
  .line {
    /* display: block; */
    text-align: left;
    margin: 20px 5px;
  }

  .text {
    text-align: left;
  }
}
</style>