<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.01.12                                //
//  common Slider                                                               //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Slider_
</template>

<script>
import $ from 'jquery';
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name:'commonView_Slider',
  extends:commonView_Component,
  data() {
    return {
      slideWidth :"0px"
     ,slideHeight:"0px"
     ,slideType:"" 
    };
  },

  methods: {
    after_viewDispatch(paramInfo){
      if (!paramInfo) return;
      if (!paramInfo.Width) return;
      if (!paramInfo.Height) return;

      this.set_pxSize(paramInfo.Width,paramInfo.Height);
    },

    set_pxSize(paramWidth,paramHeight){
      if (!paramWidth ) {this.slideWidth ='0px'} else {this.slideWidth =paramWidth +'px';$(this.$el).width (paramWidth );};
      if (!paramHeight) {this.slideHeight='0px'} else {this.slideHeight=paramHeight+'px';$(this.$el).height(paramHeight);};
    }
  },    

};

</script>
