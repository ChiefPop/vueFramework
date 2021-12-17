<template lang="pug">
</template>

<script>

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  data() {
    return {
      videoList: [],

      dialogVisible: false,

      videoMangVisible: false,

      uploadStatus: null,

      uploadPercentage: 0,

      videoSizeLimit: null,

      uploadVideoParam: {
        
      },


      processFlow: {
        generator: null,
        number: 0
      }
    }
  },
  
  methods: {
    handlePreview(file, fileList) {
      if (file.url) {
        window.open(file.url + '?rate=128');
      }
    },

    handleRemove(file, fileList) {
      let IDs = [{
        attachmentID: file.attachmentID
      }];

      this.deleteAttachments(IDs)
      .then((result) => {

      })
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`Confrim to remove ${ file.name }?`);
    },

    uploadVidos(f) {
      if (f.file.size === 0) {
        alert(`${f.file.name}is an empty file and cannot be uploaded!`);
        return;
      }

      if (this.videoSizeLimit && f.file.size > this.videoSizeLimit) {
        alert(`This file is too large can't upload!`);
        return;
      }
      
      let file = f.file;
      let fileName = f.file.name;

      let Attachments = [{
        attachmentID: this.get_randomID(),
        attachmentName: fileName,
        attachmentSize: f.file.size,
        attachmentType: 'video',
        videoMap: {
          fileName: this.getNowDateFormat() + encodeURI(file.name),
          filePosition: 0
        }
      }]

      if (this.uploadVideoParam) {
        for (let i in this.uploadVideoParam) {
          Attachments[0][i] = this.uploadVideoParam[i];
        }
      }

      this.processFlow.generator = this.submitBigFile(file, Attachments);
      this.processFlow.generator.next();
    },

    *submitBigFile(file, Attachments) {
      let piece = 2 * 1024 * 1024; // 2M
      let start = 0;
      let end = start + piece;
      let chunks = [];

      while (start < file.size) {
        let blob = file.slice(start, end);
        chunks.push(blob);

        start = end;
        end = end + piece;
      }

      this.dialogVisible = true;

      for (let i = 0; i < chunks.length; ++i) {
        if (i != 0 && i % 5 === 0) {
          yield;
        }
        this.blobToBase64(chunks[i])
        .then((data) => {
          Attachments[0].attachmentData = data;
          Attachments[0].videoMap = {
            fileName: this.getNowDateFormat() + encodeURI(file.name),
            filePosition: i * 2 * 1024 * 1024
          }
          return this.submitAttachments(Attachments);
        })
        .then((result) => {
          this.processFlow.number++;
          this.uploadPercentage = Number.parseInt((this.processFlow.number / chunks.length) * 100);
          if (this.processFlow.number % 5 === 0) {
            this.processFlow.generator.next();
          }
          if (i === chunks.length - 1) {
            this.processFlow.generator = null;
            this.processFlow.number = 0;
            
            this.uploadStatus = 'success';
            this.uploadPercentage = 100;
            this.dialogVisible = false;

            this.videoList.push({
              name: Attachments[0].attachmentName,
              url: '/videos/' + Attachments[0].videoMap.fileName,
              attachmentID: Attachments[0].attachmentID
            });

            setTimeout(() => {
              this.uploadStatus = null;
              this.uploadPercentage = 0
            }, 1000);
          }
        })
        
      }
    },
    
    handleDialogClose(done) {
      this.$confirm("Cancel upload?")
      .then(_ => {
        this.processFlow.generator = null;
        this.processFlow.number = 0;
        done();
      })
      .catch(_ => {});
    },

    getVideoList(IDs) {
      this.getAttachments(IDs)
      .then((result) => {
        let Attachments = result.Attachments;
        let videoList = [];

        for (let i = 0; i < Attachments.length; ++i) {
          videoList.push({
            name: Attachments[i].attachmentName,
            url: Attachments[i].attachmentURL,
            attachmentID: Attachments[i].attachmentID
          })
        }

        this.videoList = videoList;
      }, (result) => {

      })
    },

    getAttachments(IDs) {
      return new Promise((resolve, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'get_Attachments',
            IDs: IDs
          },
          (result) => { if (result.responseJSON.Result) { resolve(result); } else { reject(result); } }
        )
      })
    },

    getNowDateFormat() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();


      let result = year.toString() + '/' + ((month < 10) ? ('0' + month.toString()) : month.toString()) + '/' + 
      ((day < 10) ? ('0' + day.toString()) : day.toString()) + '/';


      return result;
    },

    submitAttachments(Attachments) {
      return new Promise((reslove, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'submit_Attachments',
            Attachments: Attachments
          },
          (result) => { if (result.responseJSON.Result) { reslove(result); } else { reject(result); } }
        )
      })
    },

    deleteAttachments(IDs) {
      return new Promise((resolve, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'delete_Attachments',
            IDs: IDs
          },
          (result) => { if (result.responseJSON.Result) { resolve(result); } else { reject(result); } }
        )
      })
    }
  },

  created() {

  },

  mounted() {
    this.getVideoList([
      {
        caseID: 'cecf3abf958030134bccd34272d294b'
      }
    ])
  }
}
</script>