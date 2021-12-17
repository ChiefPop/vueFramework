<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.03.27                                //
//  common Input                                                                //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Button_
</template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

const __className__='commonView_Button';

export default {
  name:__className__,
  className:__className__,
  extends:commonView_Component,

  data(){
    return {
      buttonType:'default'    //type="primary""success""info""warning""danger"
     ,buttonText:'' 
     ,buttonStyle:undefined  // plain,round,circle 
    }
  },
   
  components:{commonView_Component},
  methods:{
    get_Icon(){
      switch(this.buttonType){
        case 'primary': return 'el-icon-edit';
        break;
        case 'success': return 'el-icon-check';
        break;
        case 'info'   : return 'el-icon-message';
        break;
        case 'warning': return 'el-icon-star-off';
        break;
        case 'danger' : return 'el-icon-delete';
        break;
        default: return 'el-icon-search';
      }
    }
  },

  created:function(){
  },

  mounted:function(){
  },

  beforeDesotry:function(){
  }
}

</script>