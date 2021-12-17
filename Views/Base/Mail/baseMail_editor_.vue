<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.19                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div class="line">
    <span class="content-text">Content:</span>
    <editor
      :style="editorStyle"
      class="email-editor"
      v-model="value"
      apiKey="3uconkfmqnhmrbevw0cn0bw7spc9b4fd3peztsaskctihig7"
      :init="editorConfig"
    >
    </editor>
  </div>
</template>

<script>
const __className__ = 'baseMail_editor';

import Editor from "@tinymce/tinymce-vue";

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  className: __className__,

  extends: commonView_Component,

  components: { editor: Editor },

  data() {
    return {
      value: "",

      editorConfig: {
        width: '100%',
        menubar: false,
        elementpath: false,
        branding: false,
        mobile: {
          toolbar_mode: 'floating',
          height: '500px'
        },
        plugins: [
          "advlist autolink lists link image charmap",
          "searchreplace visualblocks code fullscreen",
          "print preview anchor insertdatetime media",
          "paste code help wordcount table",
        ],
        toolbar:
          "undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | image link",
        images_upload_handler: this.editorUploadPics,
      },

      editorStyle: {
        height: '300px'
      }
    }
  },

  methods: {
    auto_reSize() {
      const tempClientWidth = this.$el.clientWidth;

      if (tempClientWidth <= 650) {
        this.editorStyle.height = '600px';
      } else {
        this.editorStyle.height = '600px';
      }
    },

    editorUploadPics(blobInfo, succFun, failFun) {
      console.log(blobInfo.blob());
      
      succFun('http://szstt.tpddns.cn:8004/pics/logo.bcec282.png');
    },
  },

  created() {

  },

  mounted() {
    
  },

  beforeDestroy() {

  }
}
</script>

<style scoped>
.line {
  display: flex;
  flex-wrap: nowrap;
}

.content-text {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  min-width: 80px;
}

@media (max-width: 650px) {
  .line {
    display: block;
    text-align: left;
    margin: 0 5px;
  }

  .content-text {
    text-align: left;
  }
}
</style>