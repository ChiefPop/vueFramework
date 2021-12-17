<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.30                                //
//  As root-view-component to other all view-components for inherited use       //
//******************************************************************************//
</script>

<template></template>

<script>
import Vue from 'vue';

import commonView_Object from '@/Projects/Frameworks/Views/Common/commonView_Object_';

export default {
  name:'commonView_Component',
  extends:commonView_Object,

  data(){
    return {
      subComponents:[],

      get_Lair: null
    }
  },
   
  components:{commonView_Object},

  methods:{
    new_subComponent(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempComponent  = new tempConstructor();

      this.subComponents.push(tempComponent);
      this.$children.push(tempComponent);

      return tempComponent; 
    },    
    
    new_Component(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempComponent  = new tempConstructor();

      this.subComponents.push(tempComponent);
      this.$children.push(tempComponent);

      return tempComponent; 
    },
  },

  created:function(){
  },

  mounted:function(){
    for (var i=0;i<this.subComponents.length;i++){
      var tempDiv=document.createElement('div');
      this.$el.appendChild(tempDiv);
      if (this.subComponents[i]) this.subComponents[i].$mount(tempDiv);
    }
  },

  beforeDesotry:function(){
  }
}

</script>