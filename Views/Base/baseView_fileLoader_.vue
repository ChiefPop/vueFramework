<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.04.13                                //
//  baseView file loader                                                        //
//******************************************************************************//
</script>
<template>
  <div />  <!-- this 'div' only used to prevent from using this component directly-->
</template>

<script>

import Vue from 'vue';

import common_fileObject     from '@/Projects/Frameworks/Models/Common/common_fileObject_'    ;

import commonView_Component  from '@/Projects/Frameworks/Views/Common/commonView_Component_' ;
import commonView_Button     from '@/Projects/Frameworks/Views/Common/commonView_Button_'    ;

const __className__='baseView_fileLoader';

export default {
  name     :__className__,
  className:__className__,  
  extends  :commonView_Component,
  components:{common_fileObject,commonView_Component,commonView_Button},

  data(){
    return {
      Table     :null
     ,Pagination:null
     
     ,inputDom:null  
     ,buttonInstance:null    //the open-file button

     ,Multipled:true

     ,attachmentBuffers:[]
     ,loadCount:0

     ,callBack_success:null
     ,callBack_fail   :null
    }
  },


  methods:{
    slice_File(paramBlob,paramStart,paramEnd) {
      console.log(paramBlob);
           if (paramBlob.slice      ){return paramBlob.slice      (paramStart, paramEnd);}
      else if (paramBlob.webkitSlice){return paramBlob.webkitSlice(paramStart, paramEnd);}
      else if (paramBlob.mozSlice   ){return paramBlob.mozSlice   (paramStart, paramEnd);}
      else                            return paramBlob;
    },

    action_onClick(){
      if (!this.inputDom) return;

      this.inputDom.click();
      this.upload_localFile(this.inputDom.files);
    },

    set_Multiple(paramMultiple){
      if (!paramMultiple) this.Multipled=false 
      else this.Multipled=true;

      if (!this.$el) return;
      if (!this.inputDom) return;

      if (this.Multipled) this.inputDom.setAttribute('multiple','multiple')
      else this.inputDom.removeAttribute('multiple');
    },

    judge_upload(){
      if (!this.loadCount) return;
      if (!this.attachmentBuffers) return;
      if (!this.attachmentBuffers.length) return;

      if (this.loadCount<this.attachmentBuffers.length) return;

      var uploadAttachments=[];
      for (var i=0;i<this.attachmentBuffers.length;i++){
        if (this.attachmentBuffers[i].loadSuccess) uploadAttachments.push(this.attachmentBuffers[i]);
      };

      this.server_jsonFunction(
        0
        ,{ Function:'submit_Attachments'
          ,Attachments:uploadAttachments
        }
        ,this.callBack_success
      );
    },

    inc_upload(paramFail){
      if (this.loadCount==undefined) return;
      
      this.loadCount++;

      if (!paramFail) return;

      this.judge_upload();
    },

    upload_localFile_callBack(paramIndex,paramNode){
      this.inc_upload();
      if (paramIndex==undefined) return;
      if (paramIndex<0) return;
      if (paramIndex>=this.attachmentBuffers.length) return;
      if (!this.attachmentBuffers[paramIndex]) return;
      this.attachmentBuffers[paramIndex].loadSuccess=true;
      if (paramNode){
        if (paramNode.result) this.attachmentBuffers[paramIndex].attachmentData=paramNode.result;
      };
      this.judge_upload();
    },

    upload_localFile(paramFiles){
      this.attachmentBuffers=[];
      this.loadCount=0;

      if (!paramFiles){
        if (this.callBack_fail) {
          try {this.callBack_fail(paramFiles)}  
          catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
        }
        return;
      }; 
      if (!this.get_Type(paramFiles)=='array'){
        if (this.callBack_fail) {
          try {this.callBack_fail(paramFiles)}  
          catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
        }
        return;
      } 
      if (paramFiles.length<1){
        if (this.callBack_fail) {
          try {this.callBack_fail(paramFiles)}  
          catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
        }
        return;
      } 
     
      for (var i=0;i<paramFiles.length;i++){
        var tempObjFunc= Vue.extend(common_fileObject);
        var tempObj  = new tempObjFunc();
        tempObj.fileLoader=this;
        tempObj.orderIndex=i;

        this.attachmentBuffers.push({'attachmentID':tempObj.objID,'attachmentName':paramFiles[i].name,'attachmentSize':paramFiles[i].size,'attachmentType':paramFiles[i].type
                                    ,'lastModified':paramFiles[i].lastModified,'lastModifiedDate':paramFiles[i].lastModifiedDate
                                    ,'attachmentIndex':i,'loadSuccess':false,'attachmentData':null
                                    });
        var tempReader=new FileReader();
        tempReader.onloadend=tempObj.upload_localFile_loadend;
        try {tempReader.readAsDataURL(this.slice_File(paramFiles[i],1,10));}
        catch(ex){this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});this.inc_upload(true);}
      }
    },

  },

  created:function(){
    this.buttonInstance=this.new_Component(commonView_Button);
    this.buttonInstance.set_onClick(this.action_onClick);
    this.buttonInstance.buttonText=this.get_Text('{{upload}}','upload');
  },

  mounted:function(){
    if (!this.inputDom) this.inputDom=document.createElement("INPUT");
    if (this.inputDom){
      this.inputDom.setAttribute("type","file");
      if (this.Multipled) this.inputDom.setAttribute('multiple','multiple');
      this.inputDom.style.display='none';
      this.$el.appendChild(this.inputDom);   
    }
  },

  beforeDesotry:function(){}
}

</script>