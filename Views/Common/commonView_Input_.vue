<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.03.27                                //
//  common Input                                                                //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Input_
</template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

const __className__='commonView_Input';

export default {
  name:__className__,
  className:__className__,
  extends:commonView_Component,

  data(){
    return {
      placeHolder:''
     ,inputText:''
     ,Disabled:false 
     ,Clearabled:false
     ,Passworded:false
    }
  },
   
  components:{commonView_Component},
  methods:{
  },

  created:function(){
  },

  mounted:function(){
  },

  beforeDesotry:function(){
  }
}

</script>