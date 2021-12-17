<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.12                                //
//  common nav Menu                                                             //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_navMenu_
</template>

<script>
const __className__='commonView_navMenu';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name:__className__,
  className:__className__,
  extends:commonView_Component,

  data(){
    return {
      activeIndex:''
     ,mode:"horizontal"
     ,defaultHeight_hor:60
     ,menuItems:[]
     ,menuTexts:[]
     ,menuIDs:[]
     ,verPadding:'0px 10px 0px 10px'
     ,horPadding:'0px'
    }  
  },
  methods: {
    do_reloadLanguages(){
      this.translate_Texts(); 
      if (!this.$el) return;
      for (var i=0;i<this.$el.children.length;i++){
        if (i<this.menuItems.length){
          if (this.$el.children[i].children.length<=0){
            var tempSpan=document.createElement('span');
            tempSpan.textContent=this.get_menuText(i); 
            tempSpan.style.height        ='100%';
            tempSpan.style.width         ='100%';
            tempSpan.style.display       ='flex';
            tempSpan.style.alignItems    ='center';
            tempSpan.style.justifyContent='space-around';
            tempSpan.style.flexDirection ='column';
            this.$el.children[i].appendChild(tempSpan);
          }
          else {this.$el.children[i].children[0].textContent=this.get_menuText(i);};
        };
      };
      if ((this.after_reloadLanguages)&&(typeof this.after_reloadLanguages=='function')) this.after_reloadLanguages();
    },

    translate_Texts(){
      for (var tempKey in this.menuItems){
        this.menuItems[tempKey].Text=this.menuItems[tempKey].ID;
      };
    },

    Clear(){
      this.menuItems=[];
    },

    build_Page_navMenu(){
      if (!this.$Project) return;
      if (!this.$Project.pageClasses) return; 

      for (var i=0; i<this.$Project.pageClasses.length;i++) {
        // 2021-3-1 fixed by jyyang
        // var tempID   =this.get_Text(this.make_Label(this.$Project.pageClasses[i].Name));
        var tempID   =this.make_Label(this.$Project.pageClasses[i].Name);
        var tempIndex=this.$Project.pageClasses[i].Name;
        var tempPath =this.$Project.pageClasses[i].Path;
        var tempFPath=tempPath;
        if (tempFPath==='/') tempFPath='/home';

        this.menuItems.push({ID:tempID,Index:tempIndex,Path:tempPath,fullPath:tempFPath});
      };
    },

    add_menuItem(paramItem){
      if (!paramItem) return;
      if (!paramItem.name) return;
      if (!paramItem.path) return;

      var tempID   =this.get_Text(this.make_Label(paramItem.name));
      var tempIndex=paramItem.name;
      var tempPath =paramItem.path;
      var tempFPath=tempPath;
      if (tempFPath==='/') tempFPath='/home';  

      this.menuItems.push({ID:tempID,Index:tempIndex,Path:tempPath,fullPath:tempFPath});
    },

    set_menuText(paramIndex,paramText){
      if (!this.menuTexts) return;
      if (!this.menuIDs) return;
      if ((paramIndex==null)||(paramIndex<0)) return;
      while (this.menuTexts.length<=paramIndex){this.menuTexts.push('');};
      while (this.menuIDs.length  <=paramIndex){this.menuIDs.push('')  ;};
      this.menuIDs[paramIndex]=paramText;
      this.menuTexts[paramIndex]=this.get_Text(this.menuIDs[paramIndex]);
    },

    get_menuText(paramIndex){
      if ((paramIndex==null)||(paramIndex<0)||(paramIndex>=this.menuItems.length)) return '';
      if (!this.menuItems[paramIndex].ID) return '';


      return this.get_Text(this.menuItems[paramIndex].ID);
    },

    set_menu_lineHeight(paramHeight){
      if (!paramHeight) return;
      if (!this.$el) return;
      if (!this.$el.children) return;
      for (var i=0; i<this.$el.children.length; i++){
        this.$el.children[i].style.lineHeight=paramHeight+'px';
      }  
    },

    set_menuWrap(){
      if (!this.$el) return;
      if (!this.$el.children) return;
      for (var i=0; i<this.$el.children.length; i++){
        this.$el.children[i].style.wordBreak    ='break-all' ;
        this.$el.children[i].style.wordWrap     ='break-word';
        this.$el.children[i].style.whiteSpace   ='normal'    ;
      };
    },

    set_menuPadding(paramPadding){
      if (!this.$el) return;
      if (!this.$el.children) return;
      for (var i=0; i<this.$el.children.length; i++){
        if (!paramPadding){this.$el.children[i].style.padding='0px';}
        else {this.$el.children[i].style.padding=paramPadding;};  
      };
    },

    set_menuWidth(paramWidth){
      if (!paramWidth) return;
      if (this.get_Type(paramWidth)!='array') return;
      if (paramWidth.length<1) return;
      if (!this.$el) return;
      if (!this.$el.children) return;
      for (var i=0; i<this.$el.children.length; i++){
        if (i>=paramWidth.length) {
          this.$el.children[i].style.width=paramWidth[0]+'px';  
          continue;
        };
        this.$el.children[i].style.width=paramWidth[i]+'px';
      };
    },

    set_activeIndex(paramIndex){
      this.activeIndex=paramIndex; 
    },

    set_horMode(){
      this.mode="horizontal";
      this.set_menuPadding(this.horPadding);
    },

    set_verMode(){ 
      this.mode='vertical'; 
      this.set_menuPadding(this.verPadding);
    },

    default_menuSelect(paramKey,paramPath){
      this.set_activeIndex(paramKey);

      for (var tempKey in this.menuItems){
        if (this.menuItems[tempKey].Index===paramKey){
          this.$router.push({name:this.menuItems[tempKey].Index,params:{pageIndex:this.menuItems[tempKey].Index}});
        }
      }
    },

    try_menuSelect(paramKey,paramPath){
      if ((this.do_menuSelect)&&(typeof this.do_menuSelect=='function')){
        this.do_menuSelect(paramKey,paramPath); 
      }
      else {this.default_menuSelect(paramKey,paramPath);};
    },

  },

  created:function(){
    this.set_horMode();
  },

  mounted:function(){
    if (this.$route.name) this.set_activeIndex(this.$route.name);
  }
}
</script>
