<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.11.06                                //
//  common Dialog                                                               //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Dialog_
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
import { memberExpression } from 'babel-types';

export default {
  name:'commonView_Dialog',
  extends:commonView_Component,
  data() {
    return {
      dialogVisible : false
     ,dialogWidth   :'80%'
     ,dialogHeight  :'1000px'
     ,dialogTop     :'0'
     ,dialogTitle   :''
     ,dialogTitle_ID:''
     ,confirmClose  : false
     ,confirmText   :''
     ,confirmText_ID:'{{confirm_close}}'
     ,fullScreen    : false 
     ,parentFrame   : null
     ,closeOn_modalClick:false
    };
  },
  components:{commonView_Component},
  methods: {
    show_Dialog(paramShow,paramWidth,paramTitle,paramTop,paramFullScreen,paramParent){
      if (!paramShow) {this.dialogVisible=true;}
      else {this.dialogVisible=paramShow;};
      
      if (paramWidth) {this.dialogWidth=paramWidth;}
      else {
        if (this.$displayInfo.display_isLandscape) this.dialogWidth='80%'
        else this.dialogWidth='100%';
      };

      this.dialogTitle_ID='';
      if (paramTitle) this.dialogTitle_ID=paramTitle;
      this.dialogTitle=this.get_Text(this.dialogTitle_ID);

      if (paramTop) {this.dialogTop=paramTop;} else {this.dialogTop='0';};

      if (paramFullScreen) {this.fullScreen=true;} else {this.fullScreen=false;};

      if (paramParent) {
        this.parentFrame=paramParent;
        if (this.dialogVisible) this.parentFrame.style.display='block'
        else this.parentFrame.style.display='none';
      } else {this.parentFrame=null;};
    },

    handleClose(done) {
        if (this.confirmClose){
        this.$confirm(this.get_Text(this.confirmText_ID,'Close this dialog?'))
          .then(_ => {
            done();
          })
          .catch(_ => {});
      } else done();

      if (this.parentFrame) this.parentFrame.style.display='none';
    }
  }

};

</script>
