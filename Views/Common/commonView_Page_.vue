<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.30                                //
//  As root-view-component to other all view-components for inherited use       //
//******************************************************************************//
</script>
<template></template>
<script>
const __className__='commonView_Page';

import Vue from 'vue';

import commonView_Object from '@/Projects/Frameworks/Views/Common/commonView_Object_';

export default {
  name:__className__,
  path:'/',
  extends:commonView_Object,

  data(){
    return {
      is_Page:true

     ,Left  :'%L%'
     ,Top   :'%T%'
     ,Width :'%W%'
     ,Height:'%H%'

     ,subPages:[]
     ,Frames:[]
     ,Components:[]
    }
  },
   
  components:{commonView_Object},

  methods:{
    new_subPage(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempPage  = new tempConstructor();

      this.subPages.push(tempPage);
      this.$children.push(tempPage);

      return tempPage; 
    },

    new_Frame(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempFrame  = new tempConstructor();

      this.Frames.push(tempFrame);
      this.$children.push(tempFrame);

      return tempFrame; 
    },

    new_Component(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempComponent  = new tempConstructor();

      this.Components.push(tempComponent);
      this.$children.push(tempComponent);

      return tempComponent; 
    },
  },

  created:function(){
    if (this.$options.name) this.$options.id=this.$options.name;
  },

  mounted:function(){
    if (this.$options.pageTitle) document.title=this.get_Text(this.$options.pageTitle,'Welcome');

    for (var i=0;i<this.subPages.length;i++){
      var tempDiv=document.createElement('div');
      this.$el.appendChild(tempDiv);
      if (this.subPages[i]) this.subPages[i].$mount(tempDiv);
    };

    for (var i=0;i<this.Frames.length;i++){
      var tempDiv=document.createElement('div');
      this.$el.appendChild(tempDiv);
      if (this.Frames[i]) this.Frames[i].$mount(tempDiv);
    };

    for (var i=0;i<this.Components.length;i++){
      var tempDiv=document.createElement('div');
      this.$el.appendChild(tempDiv);
      if (this.Components[i]) this.Components[i].$mount(tempDiv);
    };    
  },

  beforeDesotry:function(){
  }
}

</script>