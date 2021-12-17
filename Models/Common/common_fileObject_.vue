<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.04.14                                //
//  common file object used by upload file                                      //
//******************************************************************************//
</script>

<template>
</template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

const __className__='common_Object';

export default {
  name:__className__,
  className:__className__,
  extends:common_Object,
  components:{common_Object},

  data(){
    return {
      orderIndex:undefined
     ,fileLoader:null
    }
  },
   
  methods:{
    upload_localFile_loadend(paramEvent){
      if (!paramEvent) return;
      var tempNode=paramEvent.srcElement||paramEvent.target;
      if (!tempNode) return;

      if (!this.fileLoader) return;
      if (!this.fileLoader.upload_localFile_callBack) return;

      try {this.fileLoader.upload_localFile_callBack(this.orderIndex,tempNode)}
      catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
    },
  },

  created:function(){
  },

  mounted:function(){
  },

  beforeDesotry:function(){
  }
}

</script>