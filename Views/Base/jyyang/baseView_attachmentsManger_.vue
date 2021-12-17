<template lang="pug">
  include baseView_attachmentsManger_
</template>

<script>
const __className__ = 'baseView_attachmentsManger';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {
      loading: false,
      
      // table data
      tableData: [

      ],

      // table head(required) 
      tableColumns: [
        
      ],

      operatingWidth: null,

      colnumHash: { },

      addActionData: { },

      multipleSelection: [],

      tableHeight: '100%',

      tableStyle: {
        width: '300px'
      },

      showOrder: true,

      // show tableBorder
      showTableBoder: true,      

      // show checkbox column
      showCheckbox: false,

      // show options column
      showOperating: true,

      showButton: {
        editBtn: true,
        deleteBtn: true,
        btnList: false,
        replaceBtn: false  
      },

      btnText: {
        deleteText: 'Remove',
        replaceText: 'Replace',
        editBtn: 'Edit'
      },

      btnIcon: {
        edit: '',
        replace: '',
        delete: 'el-icon-delete'
      },

      params: {
        getAttachments: {
          IDs: []
        }
      },

      dialogVisible: false,

      processFlow: {
        generator: null,
        number: 0
      },


      replaceID: null

    }
  },

  methods: {
    handleEdit(index, row) {
      console.log(row);
      if (!row.url) {
        console.error('row.url is ' + row.url);
        return;
      }

      window.open(row.url + '?rate=128');
    },

    handleDelete(index, row) {
      this.$confirm('This operation will permanently delete this file?', 'Prompt', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if (this.loading) {
          return;
        }
        else {
          this.loading = true;
        }

        if (!row.id) {
          console.error('id is' + row.id);
          this.loading = false;
          return;
        }
        let IDs = [
          {
            attachmentID: row.id
          }
        ];
        
        this.server_jsonFunction(
          0,
          {
            Function: 'delete_Attachments',
            IDs: IDs
          },
          this.handleDeleteCallback
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },

    handleReplace(index, row) {
      this.replaceID = row.id;
      let file = document.getElementById('replaceFile');
      let event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      file.dispatchEvent(event);      
    },

    handleIconDelete() {
      this.$confirm('This operation will permanently delete this file?', 'Prompt', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if (this.loading) {
          return;
        }
        else {
          this.loading = true;
        }

        if (!this.multipleSelection.length) {
          this.loading = false;
          return;
        }

        let IDs = [];
        for (let i = 0; i < this.multipleSelection.length; ++i) {
          IDs.push({ attachmentID: this.multipleSelection[i].id });
        }

        this.server_jsonFunction(
          0,
          {
            Function: 'delete_Attachments',
            IDs: IDs
          },
          this.handleDeleteCallback
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },

    handleIconAdd() {
      let file = document.getElementById('file');
      let event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      file.dispatchEvent(event);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    replaceFile() {
      let file = event.target.files[0];
      let fileType = this.getTypeOfFile(file.name);

      if (fileType != 'pic') {
        this.$alert('Only upload pictures!');
        return;
      }
      if (!this.replaceID) {
        return;
      }
      
      let Attachments = [
        {
          attachmentID: this.replaceID,
          attachmentName: file.name,
          attachmentSize: file.size,
          attachmentType: fileType,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          picMap: {
            fileName: this.getNowDateFormat() + encodeURI(file.name),
            filePosition: 0
          }
        }
      ]

      let base64 = this.getBase64(file);
      base64.then((data) => {
        Attachments[0].attachmentData = data;
        this.loading = true;
        return this.submitAttachments(Attachments);
      }).then((result) => {
        this.$message({
          type: 'success',
          message: 'Replaced successfully!'
        });
        this.loading = false;
        this.initTableByAttachments();
      })
    },

    addAttachments() {
      let file = event.target.files[0];
      let fileType = this.getTypeOfFile(file.name);
      let fileMap;
      
      if (fileType === 'pic') {
        fileMap = 'picMap';
      }
      else if (fileType === 'file') {
        fileMap = 'docMap';
      }
      else if (fileType === 'video') {
        fileMap = 'videoMap';
      }
  

      let Attachments = [
        {
          attachmentID: this.get_randomID(),
          attachmentName: file.name,
          attachmentSize: file.size,
          attachmentType: fileType,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          picMap: {

          }
        }
      ]

      if (this.addActionData.caseAssign) {
        Attachments[0].caseAssign = this.addActionData.caseAssign;
      }
      if (this.addActionData.linkAssign) {
        Attachments[0].linkAssign = this.addActionData.linkAssign;
      }
      if (this.addActionData.userAssign) {
        Attachments[0].linkAssign = this.addActionData.userAssign;
      }

      if (file.size < 10 * 1024 * 1024) {
        Attachments[0][fileMap] = {
          fileName: this.getNowDateFormat() + encodeURI(file.name),
          filePosition: 0
        };

        let base64 = this.getBase64(file);
        base64.then((data) => {
          Attachments[0].attachmentData = data;

          this.loading = true;
          let submitPromise = this.submitAttachments(Attachments);
          submitPromise.then((result) => {
            this.loading = false;
            this.initTableByAttachments();
          })
        })
      }
      else {
        this.processFlow.generator = this.submitBigFile(file, Attachments, fileMap);
        this.processFlow.generator.next();
      }
    },

    *submitBigFile(file, Attachments, fileMap) {
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

      this.loading = true;
      for (let i = 0; i < chunks.length; ++i) {
        if (i != 0 && i % 5 === 0) {
          yield;
        }
        let base64 = this.getBase64(chunks[i]);
        base64.then((data) => {
          Attachments[0].attachmentData = data;
          Attachments[0][fileMap] = {
            fileName: this.getNowDateFormat() + encodeURI(file.name),
            filePosition: i * 2 * 1024 * 1024
          }
          return this.submitAttachments(Attachments);
        })
        .then((result) => {
          this.processFlow.number++;
          if (this.processFlow.number % 5 === 0) {
            this.processFlow.generator.next();
          }
          if (i === chunks.length - 1) {
            this.processFlow.generator = null;
            this.processFlow.number = 0;
            this.loading = false;
            this.initTableByAttachments();
          }
        })
      }
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

    getBase64(file) {
      return new Promise((reslove, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { reslove(reader.result); }
        reader.onerror = () => { reject('Failed to convert base64!'); }
      })
    },

    initTableByAttachments() {
      if (!this.tableColumns.length) {
        console.error('tableColums undefined');
        return;
      }

      if (!this.colnumHash) {
        console.error('colnumHash is null');
        return;
      }

      if (!this.IDs || !Array.isArray(this.IDs)) {
        console.error('IDs is null')
        return;
      }

      let errorMessage = '';
      for (let i = 0; i < this.tableColumns.length; ++i) {
        if (!this.colnumHash[this.tableColumns[i].prop]) {
          errorMessage += this.tableColumns[i].prop + 'undefined\n';
        }
      }
      if (errorMessage) {
        console.error(errorMessage);
        return;
      }

      this.loading = true;
      this.server_jsonFunction(
        0,
        {
          Function: 'get_Attachments',
          IDs: this.IDs
        },
        this.initTableByAttachmentsCallback
      )
    },
    initTableByAttachmentsCallback(result) {
      if (result.responseJSON.Result) {
        let tableData = [];
        let Attachments = result.responseJSON.Attachments;
        
        for (let i = 0; i < Attachments.length; ++i) {
          let rowData = {};
          for (let j = 0; j < this.tableColumns.length; ++j) {
            let propHash = this.tableColumns[j].prop;
            rowData[propHash] = Attachments[i][this.colnumHash[propHash]];
          }
          rowData.order = i + 1;
          tableData.push(rowData);
        }
        this.tableData = tableData;
        this.loading = false;
      }
      else {
        this.$message({
          type: 'error',
          message: 'The network or database connection is wrong, please check the network connection'
        })
      }
    },

    handleDeleteCallback(result) {
      if (result.responseJSON.Result) {
        this.loading = false;
        this.$message({
          type: 'success',
          message: 'successfully deleted!'
        });
        this.initTableByAttachments();
      }
    },

    base64ToBlob(urlData, type) {
      let arr = urlData.split(',');
      let array = arr[0].match(/:(.*?);/);
      let mime = (array && array.length > 1 ? array[1] : type) || type;
      let bytes = window.atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mime
      });
    },

    uploadAttachments(base64, file) {
      let size = file.size;
      let type = this.getTypeOfFile(file.name);
      let Attachments = [
        {
          attachmentID: this.get_randomID(),
          attachmentName: file.name,
          attachmentSize: size,
          attachmentType: type,
          caseAssign: '',   // todo
        }
      ]

      if (size < 10 * 1024 * 1024) {
        Attachments[0].attachmentData = base64;
      }
      else {
        this.uploadBigFile(base64, Attachments);
      }

    },

    *uploadBigFile(base64, Attachments) {
      let piece = 2 * 1024 * 1024;  // 2M
      let start = 0;
      let end = start + piece;
      let chunks = [];

      while (start < f.file.size) {
        let blob = f.file.slice(start, end);
        chunks.push(blob);

        start = end;
        end = end + piece;
      }

      for (let i = 0; i < chunks.length; ++i) {
        
      }
    },

    getTypeOfFile(fileName) {
      let type = null;
      if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)){
        type = 'pic';
      }
      else if (/\.(xlsx|xls|doc|docx|pdf)$/.test(fileName)) {
        type = 'file'
      }
      else if (/\.(mp4|mov)$/.test(fileName)) {
        type = 'video'
      }

      return type;
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
  },

  created() {
    if (!this.operatingWidth) {
      let width = 0;
      if (this.showButton.deleteBtn) {
        width += 100;
      }
      if (this.showButton.replaceBtn) {
        width += 100;
      }
      if (this.showButton.editBtn) {
        width += 100;
      }
      this.operatingWidth = width;
    }
  },

  mounted() {
    
  }
}
</script>