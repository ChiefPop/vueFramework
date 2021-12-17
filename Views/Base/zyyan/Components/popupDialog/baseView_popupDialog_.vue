<script>
    //******************************************************************************//
    //  This file is created by ziyi yan 2021.04.15                                 //
    //******************************************************************************//
</script>

<template>
    <div class="modal">
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
 import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
 const __className__ = 'baseView_popupDialog';

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
      width: 5%;
      height: 5%;
    }
    .modal {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      background: #000;
    }
    </style>

