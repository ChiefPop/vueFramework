<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.31                                //
//  common ajax query, communication with Servers                               //
//******************************************************************************//
</script>

<template></template>

<script>
import $ from 'jquery';

export default {
  name:'common_jsonQuery',
  components:{},
  data(){return{};},

  methods:{
    query_remoteJson_get(paramUrl,paramFunction,paramData,paramTimeout){
      if (!paramUrl) return;
      if (!$) return;

      let tempData   =''  ;
      let tempTimeout=5000;
      if (!window.Timeout==undefined) {tempTimeout=window.Timeout};
      if (!paramTimeout  ==undefined) {tempTimeout=paramTimeout};
      if (paramData   ) {tempData   =paramData   }; 
      $.ajax({ 
        type    :"GET",
        url     : paramUrl,
        data    : tempData,
        dataType:"json",
        cache   : false,
        timeout : tempTimeout, 
        complete: paramFunction
      });      
    },

    query_remoteJson_post(paramUrl,paramFunction,paramData,paramTimeout){
      if (!paramUrl) return;
      if (!$) return;

      let tempData   =''  ;
      let tempTimeout=5000;
      if ((window.Timeout!=null)&&(window.Timeout!=undefined)) {tempTimeout=window.Timeout};
      if ((paramTimeout  !=null)&&(paramTimeout  !=undefined)) {tempTimeout=paramTimeout  };
      if (paramData   ) {tempData   =paramData   }; 
      
      $.ajax({ 
        type    :"POST",
        url     : paramUrl,
        data    : JSON.stringify(tempData),
        dataType:"json",
        contentType: "application/json", 
        cache   : false,
        timeout : tempTimeout, 
        complete: paramFunction
      });      
    },  

    query_remoteJson(paramUrl,paramFunction,paramData,paramTimeout){
      if (!paramData){this.query_remoteJson_get (paramUrl,paramFunction,     null,paramTimeout);}
      else           {this.query_remoteJson_post(paramUrl,paramFunction,paramData,paramTimeout);};
    }
  },

created:function(){},

}

</script>

