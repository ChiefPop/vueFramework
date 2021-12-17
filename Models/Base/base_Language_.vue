<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.22                                //
//  base Language                                                               //
//******************************************************************************//
</script>

<template></template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_'

export default{
  name:'base_Language',
  components:{common_Object},
  extends:common_Object, 
  
  data(){
    return{
      language_Name :'',
      language_ID   :'',
      language_Text :'',
      language_Value:''
    }
  },

  created:function(){
     
  },

  methods:{ 
    
  } 
  
}
</script>