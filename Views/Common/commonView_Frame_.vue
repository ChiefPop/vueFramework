<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.30                                //
//  As root-view-component to other all view-components for inherited use       //
//******************************************************************************//
</script>

<template></template>

<script>
import Vue from 'vue';

import commonView_Object from '@/Projects/Frameworks/Views/Common/commonView_Object_';

export default {
  name:'commonView_Frame',
  extends:commonView_Object,

  data(){
    return {
      Left   :'%L%'
     ,Top    :'%T%'
     ,Width  :'%W%'
     ,Height :'%H%'

     ,bg_textureUrl:''
     ,bg_picUrl:''
     ,bg_Color:''

     ,Components:[]
     ,subFrames:[]
   }
  },
   
  components:{commonView_Object},

  methods:{
    new_subFrame(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempFrame  = new tempConstructor();

      this.subFrames.push(tempFrame);
      this.$children.push(tempFrame);

      return tempFrame; 
    },

    new_Component(paramModel){
      if (!paramModel) return null;

      var tempConstructor= Vue.extend(paramModel);
      var tempComponent  = new tempConstructor();

      this.Components.push(tempComponent);
      this.$children.push(tempComponent);

      return tempComponent; 
    },

    set_backgroundColor(paramColor){
      if (!paramColor) return;
      this.bg_Color=paramColor;
      if (!this.$el) return;
      this.$el.style.backgroundColor=this.bg_Color;
    },
    set_backgroundTexture(paramUrl){
      if (!paramUrl) return;
      var tempUrl=paramUrl.trim();
      if (!tempUrl) return;

      if (tempUrl.indexOf('url(')!=0){
        tempUrl='url('+tempUrl+')';
      }
      this.bg_textureUrl=tempUrl;

      if (!this.$el) return;
      this.$el.style.backgroundImage=this.bg_textureUrl;
      this.$el.style.backgroundRepeat='repeat';
    },

    set_backgroundPic(paramUrl){
      if (!paramUrl) return;
      var tempUrl=paramUrl.trim();
      if (!tempUrl) return;

      if (tempUrl.indexOf('url(')!=0){
        tempUrl='url('+tempUrl+')';
      }
      this.bg_picUrl=tempUrl;

      if (!this.$el) return;
      this.$el.style.backgroundImage =this.bg_picUrl;
      this.$el.style.backgroundRepeat='no-repeat';
      this.$el.style.backgroundSize  ='100% 100%';
    }
  },

  created:function(){
    this.positionState='absolute';
  },

  mounted:function(){
    if (this.bg_Color     ) this.set_backgroundColor  (this.bg_Color     );
    if (this.bg_textureUrl) this.set_backgroundTexture(this.bg_textureUrl);
    if (this.bg_picUrl    ) this.set_backgroundPic    (this.bg_picUrl    );

    for (var i=0;i<this.subFrames.length;i++){
      var tempDiv=document.createElement('div');
      this.$el.appendChild(tempDiv);
      if (this.subFrames[i]) this.subFrames[i].$mount(tempDiv);
    };

    for (var i=0;i<this.Components.length;i++){
      if (!this.Components[i]) continue;

      if (!this.Components[i].get_Lair) {
        var tempDiv=document.createElement('div');
        this.$el.appendChild(tempDiv);
      } 
      else {
        var tempDiv=this.Components[i].get_Lair();
        if (!tempDiv) {
          tempDiv=document.createElement('div');
          this.$el.appendChild(tempDiv);
        } 
      }
      if (this.Components[i]) this.Components[i].$mount(tempDiv);
    };    
  },

  beforeDesotry:function(){
  }
}

</script>