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
      <td></td>
      <td class="top-right-corner"></td>
    </tr>
    <tr>
      <td></td>
      <td><div class="dialog"></div></td>
      <td></td>
    </tr>
    <tr>
      <td class="lower-left-corner"></td>
      <td></td>
      <td class="lower-right-corner"></td>
    </tr>
  </table>
  </div>
</template>

<script>
 import Vue from 'Vue';
 import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
 const __className__ = 'baseView_whitebullectDialog';

 export default {
     name: __className__,
     className: __className__,
     extends: commonView_Component,

  data(){return {}},

  components: { commonView_Component },
  methods: {
  
  },
  created: function () {},

  mounted: function () {},

  beforeDesotry: function () {}
 }

</script>
<style scoped>
    table {
      position: absolute;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    
    .top-left-corner,
    .top-right-corner,
    .lower-left-corner,
    .lower-right-corner {
      width:2%;
      height:5%;
    }
    .el-icon-circle-close{
       font-size: 26px;
    }
    </style>