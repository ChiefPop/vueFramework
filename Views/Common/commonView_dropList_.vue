<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.06                                //
//  common dropList                                                             //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_dropList_
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name:'commonView_dropList',
  extends:commonView_Component,

  data(){
    return {
      currentItem :'no data'
     ,currentItems:[]           //used for multiple mode 
     ,placeHolder:''
     ,isMultiple:false
     ,Items:[]
     ,functionList:[]
     ,droplistSize:'mini'
    }
  },
   
  components:{commonView_Component},
 
  methods:{
    try_droplistSelect(paramData){
      if ((this.do_droplistSelect)&&(typeof this.do_droplistSelect=='function')) this.do_droplistSelect(paramData);
    },

    add_Function(paramFunc,paramIndex){
      if(!this.functionList) return;
      this.functionList.push({functionName:paramFunc,functionIndex:paramIndex});
    },

    setSize_mini(){
      
      this.add_domClass('el-select--mini');
      if (!this.$el) return;
      if (!this.$el.children[0]) return;
      if (!this.$el.children[0].className) {this.$el.children[0].className='el-input--mini';}
      else {if (this.$el.children[0].className.indexOf('el-input--mini')<0) this.$el.children[0].className=this.$el.children[0].className+' '+'el-input--mini';};
    },

    setSize_small(){
      this.add_domClass("el-select--small");
    },

    setSize_medium(){
      this.add_domClass("el-select--medium");
    },

    try_droplistBlur() {
      
    }
  },

  created:function(){
  },

  mounted:function(){
  },

  beforeDesotry:function(){}
}

</script>
