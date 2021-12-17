<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.05                                //
//  baseView language-selector                                                  //
//******************************************************************************//
</script>

<template lang="pug">
include baseView_languageSelector_
</template>

<script>
import commonView_dropList from '@/Projects/Frameworks/Views/Common/commonView_dropList_';

export default {
  name:'baseView_languageSelector',
  extends:commonView_dropList,

  data(){
    return {
      Languages:[{tempID:'en-us',itemText:'En',itemValue:'en-us'}]
     ,isMultiple:false 
     ,currentLanguage:'en-us'
     ,on_languageSelect:null
    }
  },
   
  components:{commonView_dropList},

  methods:{
    do_reloadStyles_children(paramObj,paramColor){
      if (!paramObj) return;
      if (paramObj.children){
        for (var i=0;i<paramObj.children.length;i++){
          this.do_reloadStyles_children(paramObj.children[i],paramColor);
        }
      }
      if (!paramObj.style) return;
      if (!paramObj.className) return;
      if (paramObj.className.indexOf('el-input__inner')>=0){
        paramObj.style.borderColor=paramColor;
        paramObj.style.backgroundColor=paramColor;
      }   
    },

    do_reloadStyles(){
      if (!this.$el) return;
      this.do_reloadStyles_children(this.$el,"rgba(255,255,255,0.2)");
      if (!this.$el.style) return;
      if (!this.$el.style.borderColor) return;
      this.$el.style.borderColor ="rgba(255,255,255,0.2)";
    },

    do_reloadLanguages(){
      if (this.Inited) return;  
      if (!this.$Languages) return; 
      if (!this.$Languages.language_Updated)return; 

      this.Inited=true;
      if (!this.$Languages.language_Languages) return;
      if ( this.$Languages.language_Languages.length<1) return;

      this.Languages=[];
      let tempID='';
      let tempValue='';
      let tempText='';
      for (var i=0;i<this.$Languages.language_Languages.length;i++){
        this.Languages.push({
          itemID   :this.$Languages.language_Languages[i].Language
         ,itemValue:this.$Languages.language_Languages[i].Value
         ,itemText :this.$Languages.language_Languages[i].Text
        });
      }
      this.Items=this.Languages;    
      this.currentItem=this.currentLanguage; 
    },
    
    do_droplistSelect(){
      this.currentLanguage=this.currentItem;
      if ((this.do_languageSelect)&&(typeof this.do_languageSelect=='function')){this.do_languageSelect(currentLanguage)};
      if ((this.on_languageSelect)&&(typeof this.on_languageSelect=='function')){this.on_languageSelect(currentLanguage);};

      if(!this.$Languages) return;
      this.$Languages.language_nextLanguage   =this.currentLanguage;
      localStorage.setItem("languageID",this.currentLanguage);
      if (this.$Languages.language_Packages[this.currentLanguage]){

        this.$Languages.language_currentLanguage=this.currentLanguage;
        this.$Languages.trigger_needUpdate();
      }
    }
  },

  created:function(){
    this.Items=this.Languages;
    if (this.$Languages){
      if (this.$Languages.language_nextLanguage){
        this.currentLanguage=this.$Languages.language_nextLanguage;
      }
    }
    this.currentItem=this.currentLanguage;
  },

  mounted:function(){

  },

  beforeDesotry:function(){}
}

</script>

