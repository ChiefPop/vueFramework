<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.04.07                                //
//  common Pagination                                                           //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Pagination_
</template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name:'commonView_Pagination',
  extends:commonView_Component,
  data() {
    return {
      pageLayout:'total,prev,pager,next,jumper'
     ,currentPage: 0
     ,pageSize   :10
     ,totalSize  : 0

     ,event_on_nextClick    :null
     ,event_on_prevClick    :null
     ,event_on_currentChange:null
     ,event_on_sizeChange   :null
    };
  },

  methods: {
    set_on_nextClick    (paramFunction){this.event_on_nextClick    =paramFunction;},
    set_on_prevClick    (paramFunction){this.event_on_prevClick    =paramFunction;},
    set_on_currentChange(paramFunction){this.event_on_currentChange=paramFunction;},
    set_on_sizeChange   (paramFunction){this.event_on_sizeChange   =paramFunction;},

    action_on_nextClick(paramSize){
      if (!this.event_on_nextClick) return;

      try {this.event_on_nextClick(paramSize);}
      catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
    },

    action_on_prevClick(paramPage){
      if (!this.event_on_prevClick) return;

      try {this.event_on_prevClick(paramPage);}
      catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
    },

    action_on_currentChange(paramPage){
      if (!this.event_on_currentChange) return;

      try {this.event_on_currentChange(paramPage);}
      catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
    },

    action_on_sizeChange(paramPage){
      if (!this.event_on_sizeChange) return;

      try {this.event_on_sizeChange(paramPage);}
      catch(ex) {this.show_Notify_error(ex.message,{title:this.get_Text('{{error}}','Error')});}
    },

  },    

  created:function(){},
  mounted:function(){},
  beforeDesotry:function(){}
}

</script>