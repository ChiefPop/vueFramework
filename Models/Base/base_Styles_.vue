<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.22                                //
//  the container of Styles                                                     //
//******************************************************************************//
</script>

<template></template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

import base_Style from '@/Projects/Frameworks/Models/Base/base_Style_';

export default{
  name: 'base_Styles',
  extends:common_Object, 

  components:{base_Style},
  
  data(){
    return{
      themeNumber:0
     ,totalNumber:0 
     ,defaultTheme:null
     ,standardTheme:null
     ,Themes:[]
    }
  },

  methods:{
    trigger_needUpdate(){
      this.$emit('need_Update');      
    },

    get_Theme(paramName){
      if (!this.Themes) return;
      if (!this.Themes[paramName]) return;

      return this.Themes[paramName];
    },

    default_loadStyles(paramData){
      this.themeNumber=0;
      this.totalNumber=0;
      this.defaultTheme=null;
      this.Themes=[];

      if (!paramData) return; 
      if (!paramData.Themes) return;

      var tempThemes=this.copy_jsonObject(paramData.Themes);
      this.totalNumber=tempThemes.length;

      for (var tempKey in tempThemes){
        if (tempThemes[tempKey].Theme!='Standard'){
          this.Themes.push(tempThemes[tempKey]);
          this.themeNumber++;
          if (!this.defaultTheme) this.defaultTheme=tempThemes[tempKey]; 
        }
        else this.standardTheme=tempThemes[tempKey]; 
      };

      this.initOK=true;
      this.trigger_needUpdate(); 
    },

    try_loadStyles(paramData){
      if (!paramData) return;
      if (!paramData.responseJSON) return;

      if ((this.do_loadStyles)&&(typeof this.do_loadStyles=='function')){
        this.do_loadStyles(paramData.responseJSON);
      }
      else this.default_loadStyles(paramData.responseJSON);
    },

    do_loadData(paramData){
      this.Inited=true;
      this.initOK=false;
      this.defaultTheme=null;
      this.standardTheme=null;
      if (!paramData) return;

      if ((this.do_loadStyles)&&(typeof this.do_loadStyles=='function')){
        this.do_loadStyles(paramData);
      }
      else this.default_loadStyles(paramData);
      this.trigger_needUpdate(); 
    }
  },

  created:function(){
    this.server_jsonFunction(0,{Function:'get_Styles'},this.try_loadStyles);  
   }, 

  mounted:function(){
  }
}
</script>