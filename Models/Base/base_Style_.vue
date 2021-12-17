<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.09                                //
//  base Style                                                                  //
//******************************************************************************//
</script>

<template></template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_'

export default{
  name:'base_Style',
  components:{common_Object},
  extends:common_Object, 
  
  data(){
    return{
      style_Text:''
     ,style_Texts:[] 
     ,style_ID   :''
//front color
     ,style_Color        :''
     ,style_Color_hide   :''
     ,style_Color_hover  :''
     ,style_Color_focus  :''
     ,style_Color_disable:''
//background color
     ,style_bgColor        :''
     ,style_bgColor_hide   :''
     ,style_bgColor_hover  :''
     ,style_bgColor_focus  :''
     ,style_bgColor_disable:''
//font color
     ,style_ftColor        :''
     ,style_ftColor_hide   :''
     ,style_ftColor_hover  :''
     ,style_ftColor_focus  :''
     ,style_ftColor_disable:''
//border color
     ,style_bdColor        :''
     ,style_bdColor_hide   :''
     ,style_bdColor_hover  :''
     ,style_bdColor_focus  :''
     ,style_bdColor_disable:''
    }
  },

  created:function(){
     
  },

  methods:{ 
    
  } 
  
}
</script>