<script>
    //******************************************************************************//
    //  This file is created by ziyi yan 2021.04.15                                 //
    //******************************************************************************//
</script>

<template>
  <div>
    <table
    width="100%"
    height="100%"
    style="border-collapse: collapse; margin: 0; padding: 0"
  >
    <tr>
      <td class="top-left-corner"></td>
      <td class="tip">Tip</td>
      <td class="top-right-corner">
        <button @click="hide_headerbtn" class="dialog__headerbtn">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><div class="dialog"></div></td>
      <td></td>
    </tr>
    <tr>
      <td class="lower-left-corner"></td>
      <td>
        <button class="el-button" @click="cancel_Dialog">Cancel</button>
        <button class="el-button primary" @click="determine_Dialog">
          Confirm
        </button>
      </td>
      <td class="lower-right-corner"></td>
    </tr>
  </table>
  </div>
</template>

<script>
 import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
 const __className__ = 'baseView_popoverDialog';

 export default {
     name: __className__,
     className: __className__,
     extends: commonView_Component,

  data(){return {}},

  components: { commonView_Component },
  methods: {
    hide_headerbtn() {
        this.set_Hide();
      },
    cancel_Dialog(){
        this.set_Hide()
      },
     determine_Dialog(){
        this.emit_event('Confirm','Confirm');
      }
  },
  created: function () {},

  mounted: function () {},

  beforeDesotry: function () {}
 }

</script>
<style scoped>
    table {
      position: absolute;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: white;
    }
    
    .top-left-corner,
    .top-right-corner,
    .lower-left-corner,
    .lower-right-corner {
      width: 10%;
      height: 10%;
    }
    .tip {
      font-size: 16px;
      text-align: left;
    }
    .el-button {
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      float: right;
      margin-left: 10px;
    }
    .primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .dialog__headerbtn {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
    }
    </style>
