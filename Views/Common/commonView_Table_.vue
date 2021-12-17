<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.04.03                                //
//  common Table                                                                //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Table_
</template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

const __className__='commonView_Table';

export default {
  name:'commonView_Table',
  extends:commonView_Component,
  data() {
    return {
      Columns:[]
     ,Datas:[] 
     ,need_reLoad:false

     ,tableColumns:[{columnIndex:'unknown',columnLabel:'unKnown',columnWidth:'100'}]
     ,tableDatas :[]
     ,tableStyle :'width: 100%'
     ,tableHeight:'100%'

     ,event_on_cellClick:null
     ,event_on_cellEnter:null
     ,event_on_cellLeave:null
    };
  },

  methods: {
    
    action_on_cellEnter(paramRow,paramColumn,paramEvent,paramCell){
      if (!this.event_on_cellEnter) return;
      
      try {
        this.event_on_cellEnter(paramRow,paramColumn,paramEvent,paramCell)
      }
      catch(ex) {
        this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});
      }
    },

    action_on_cellLeave(paramRow,paramColumn,paramEvent,paramCell){
      if (!this.event_on_cellLeave) return;
      
      try {
        this.event_on_cellLeave(paramRow,paramColumn,paramEvent,paramCell)
      }
      catch(ex) {
        this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});
      }
    },

    action_on_cellClick(paramRow,paramColumn,paramEvent,paramCell){
      if (!this.event_on_cellClick) return;

      try {
        this.event_on_cellClick(paramRow,paramColumn,paramEvent,paramCell)
      }
      catch(ex) {
        this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});
      }
    },

    set_on_cellClick(paramFunction){       //row, column, cell, event
      this.event_on_cellClick=paramFunction;
    },
    
    after_viewDispatch(paramInfo){
      this.tableHeight=paramInfo.Height;
    },

    set_tableHeader(paramHeader){
      this.Columns=this.copy_jsonObject(paramHeader);  //paramHeader can be null
      if (this.Columns.length<=0) this.Columns.push({columnIndex:'unknown',columnLabel:'unKnown',columnWidth:'100'});
      this.need_reLoad=true;
    },

    clear_Datas(){
      this.Datas=[];
      this.tableDatas=[];
      this.need_reLoad=true;
    },

    add_tableData(paramData,paramKeep){    //paramRecord must be array like: [{},{}] or single object     paramRecord=null means blank record
      switch (this.get_Type(paramData)) {
      case 'object':
        var tempData={};
        for (var tempKey in paramData) {
          if (paramData[tempKey]){
            paramData[tempKey];
            tempData[tempKey]=paramData[tempKey];
          }
        };
        this.Datas.push(tempData);
        if (!paramKeep) this.rePaint();
        break;
      case 'array':
        for (var i=0;i<paramData.length;i++){
          this.add_tableData(paramData[i],true);
        } 
        if (!paramKeep) this.rePaint();
        break;
      default:;
      }
      this.need_reLoad=true;
    },

    add_tableColumn(paramIndex,paramLabel,paramWidth,paramFixed,paramKeep){
      if (!paramIndex) return;
      if (!paramLabel) return;
      if (!paramWidth) return;

      var tempFixed=false;
      if (paramFixed) tempFixed=true;

      this.need_reLoad=true;
      if (!this.inited){
        this.Columns=[];
        this.inited=true;
      };

      this.Columns.push({columnIndex:paramIndex,columnLabel:paramLabel,columnWidth:paramWidth,isFixed:tempFixed});

      if (!this.$el) return;

      if (!paramKeep) this.rePaint();
    },

    reCal_Size(paramWidth,paramOptions){
      if (paramWidth==undefined) return undefined;

      var tempValue=this.auto_calReplace(paramWidth,paramOptions);

      try {return new Function('return '+tempValue+';')();}
      catch(ex) {return 0};
    },

    rePaint(paramOptions){
      if (!this.$el) return;

      if (this.need_reLoad){
        if(!this.Columns) this.tableColumns=[]
        else this.tableColumns=this.copy_jsonObject(this.Columns);
      };

      if (paramOptions){
        for (var i=0;i<this.tableColumns.length;i++){
          this.tableColumns[i].columnWidth=this.reCal_Size (this.Columns[i].columnWidth,paramOptions);
        }
      };

      if (this.need_reLoad){
        if(!this.Datas) this.tableDatas=[]
        else this.tableDatas=this.Datas;
      };

      this.need_reLoad=false;
    },

    after_viewDispatch(paramOptions){
      this.rePaint(paramOptions);
    },
  },    

  created:function(){
  },

  mounted:function(){
    this.rePaint();
  },

  beforeDesotry:function(){
  }
}

</script>