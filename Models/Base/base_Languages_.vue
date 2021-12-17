<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.22                                //
//  the container of Languages                                                  //
//******************************************************************************//
</script>

<template></template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

import base_Language from '@/Projects/Frameworks/Models/Base/base_Language_';
import { templateElement } from 'babel-types';
 
export default{
  name: 'base_Languages',
  extends:common_Object, 

  components:{base_Language},
  
  data(){
    return{
      language_currentLanguage: ''
     ,language_currentIndex   : -1       
     ,language_nextLanguage   : ''
     ,language_Updated        : false      
     ,language_Count          : 0       
     ,language_Languages      :[]
     ,language_Packages       :{length:0}
     ,language_defaultPackage : ''
    }
  },

  methods:{
    reBuild_Text_enum(paramObj,paramLanguage){
      if (!paramObj) return paramObj;
      switch (this.get_Type(paramObj)) {
      case 'object':
      case 'array':{
        for (var tempObj in paramObj){
          switch (this.get_Type(paramObj[tempObj])){
            case 'string':{
              this.query_Text(paramObj[tempObj],paramLanguage);
              paramObj[tempObj]=this.query_Text(paramObj[tempObj],paramLanguage);
              break;
            }
            case 'object':
            case 'array':{
              this.reBuild_Text_enum(paramObj[tempObj],paramLanguage);   
              break;
            }
            default:;
          };
        } 
        break;
      }
      default:;
      }
      return paramObj;
    },
    
    reBuild_Text(paramObj,paramLanguage){
     if (typeof paramObj=='string'){return this.query_Text(paramObj,paramLanguage);}
     else {return this.reBuild_Text_enum(paramObj,paramLanguage)};
    },

    query_Text(paramText,paramDefault,paramLanguage){
      if (!paramText) return '';
      let tempText=paramText;
      if (!this.language_Packages){
        if (paramDefault){return paramDefault}
        else {return tempText;};
      } 

      let tempLanguage='';
      if (!paramLanguage) {tempLanguage=this.language_currentLanguage;}
      else {tempLanguage=paramLanguage};

      let tempMatchs=tempText.match(/(?={{).+?(?=}})/g);
      if ((!tempMatchs)||(tempMatchs.length<1)){
        if (paramDefault){return paramDefault;}
        else {return tempText;};
      }; 
      if (this.language_Packages.length<1){
        if (paramDefault){return paramDefault}
        else {return tempText;};
      };
      let tempPackage   =this.language_Packages[tempLanguage];
      let defaultPackage=this.language_Packages[this.language_defaultPackage];
      let tempMatch='';

      for (var i=0;i<tempMatchs.length;i++){
        if (tempMatchs[i].length>1) {tempMatch=tempMatchs[i].substring(2);}
        else continue;

        if (tempPackage[tempMatch]) {tempText=tempText.replace('{{'+tempMatch+'}}',tempPackage[tempMatch]);}
        else {
          if((defaultPackage)&&(tempPackage!=defaultPackage)){
            if (defaultPackage[tempMatch]) {tempText=tempText.replace('{{'+tempMatch+'}}',defaultPackage[tempMatch])};
          }
        }
      }
      if (tempText!=paramText){
        return tempText;
      }
      else{
        if (paramDefault){return paramDefault;}
        else {return tempText;};
      };
    },

    query_objectText(paramObj,paramLanguage){
      let tempText='{{unknown}}';
      
      if (paramObj.objText) {tempText=paramObj.objText}
      else {if (paramObj.objID) tempText='{{'+paramObj.objID+'}}';};

      return this.query_Text(tempText,paramLanguage);
    },

    trigger_needUpdate(){
      this.$emit('need_Update');
    },

    try_load_languagePackage(paramData){

      if (!paramData) return; 
      if((this.do_load_languagePackage)&&(typeof this.do_load_languagePackage=='function')){this.do_load_languagePackage(paramData);}
      else{
        if (!paramData.responseJSON) return;
        if (!paramData.responseJSON.ID) return;
        if (!paramData.responseJSON.Data) return; 

        if (!this.language_Packages[paramData.responseJSON.ID]){
          this.language_Packages[paramData.responseJSON.ID]=paramData.responseJSON.Data;
        }
        else {
           this.language_Packages[paramData.responseJSON.ID]=Object.assign(this.language_Packages[paramData.responseJSON.ID],paramData.responseJSON.Data);
        }; 
        this.language_Packages.length++;
        if (this.language_Packages.length==1) {this.language_defaultPackage=paramData.responseJSON.ID};

        if (paramData.responseJSON.ID===this.language_nextLanguage){
          this.language_currentLanguage=this.language_nextLanguage;
          this.trigger_needUpdate();
        }
      }
    },

    default_loadLanguages(paramData){
      this.language_currentLanguage='';
      this.language_currentIndex='-1';
      let tempLans=paramData.Languages;

      if (!tempLans) return;  
      this.language_Languages=tempLans;

      this.language_Updated=true; 
      this.language_Count=this.language_Languages.length;
      if (this.language_Count<1) return;
      this.language_currentIndex=paramData.currentIndex;
      if ((!this.language_currentIndex)||(this.language_currentIndex<0)||(this.language_currentIndex>=this.language_Count))  this.language_currentIndex=0;
      this.language_currentLanguage=this.language_Languages[0].Language;

      this.language_Packages={length:0};
      if (!this.$jsonQuery) return;
      for(var i=0;i<this.language_Languages.length;i++){
        if (!this.language_Languages[i]) continue;
        if (!this.language_Languages[i].packageUrl) continue;

        this.server_jsonFunction(0,{Function:'get_languagePackage',packageUrl:this.language_Languages[i].packageUrl,Language:this.language_Languages[i].Language},this.try_load_languagePackage);
      }
    },

    try_loadLanguages(paramData){
      if (!paramData) return;
      if (!paramData.responseJSON) return;

      if ((this.do_loadLanguages)&&(typeof this.do_loadLanguages=='function')){
        this.do_loadLanguages(paramData.responseJSON);
      }
      else this.default_loadLanguages(paramData.responseJSON);
    },

    load_initData(){
      this.language_nextLanguage=localStorage.getItem("languageID" );
    }
  },

  created:function(){
    this.language_Updated=false;
    this.load_initData();
    if (!this.language_nextLanguage) this.language_nextLanguage='en-us';
    this.server_jsonFunction(0,{Function:'get_Languages'},this.try_loadLanguages);
  },

  mounted:function(){
  }
}
</script>