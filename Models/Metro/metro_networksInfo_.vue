<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.09.25                                //
//  for global Networks information:  $networksInfo                              //
//  Before use:                                                                 //
//  (Now you have no needs to modify the App.vue)                               //
//  Please just follow 1 step (add 2 Lines code in main.js: import and use):    //
//  Add Line 1:"import metro_networksInfo from '@/Projects/Frameworks/Imports/metro_networksInfo';"//
//      Line 2:"Vue.use(metro_networksInfo);"    to main.js                     //
//  Now you can using this.$networksInfo everwhere.                             //
//******************************************************************************//
</script>

<template></template>

<script>
import $ from 'jquery';
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

export default {
  name: 'metro_networksInfo',
  extends:common_Object,

  data(){
    return {
      Networks:{}
    }
  },
   
  components:{},

  methods:{
    get_Station_by_Name(paramName){
      if (!this.initOK) return;
      if (!this.Networks) return;
      if (!this.Networks.Stations) return;

      for (var tempKey in this.Networks.Stations){
        if (this.Networks.Stations[tempKey].stationName===paramName){
          return this.Networks.Stations[tempKey];
        }
      }
    },

    get_Station_by_ID(paramID){
      if (!this.initOK) return;
      if (!this.Networks) return;
      if (!this.Networks.Stations) return;

      if (this.Networks.Stations[paramID]) return this.Networks.Stations[paramID];
    },

    do_loadData(paramData){
      if (!paramData) return;
      if (!paramData.Networks) return;
      this.Inited=true;
      this.Networks=this.copy_jsonObject(paramData.Networks);
      this.initOK=true;
    }
  },
  
  created:function(){  
     this.server_jsonFunction(0,{Function:'get_Networks'}); 
  },

  mounted:function(){
   },

  beforeDesotry:function(){
  }
}

</script>