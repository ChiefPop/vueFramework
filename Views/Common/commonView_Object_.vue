<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.30                                //
//  As root-view-component to other all view-components for inherited use       //
//******************************************************************************//
</script>

<template></template>

<script>

const __className__='commonView_Object';

const __alignLeft__  ='alLeft'  ;
const __alignTop__   ='alTop'   ;
const __alignRight__ ='alRight' ;
const __alignBottom__='alBottom';
const __alignClient__='alClient';

const __dockLeft__      ='doLeft'      ;
const __dockTop__       ='doTop'       ;
const __dockRight__     ='doRight'     ;
const __dockBottom__    ='doBottom'    ;
const __dockCenter__    ='doCenter'    ;
const __dockCenter_hor__='doCenter_hor';
const __dockCenter_ver__='doCenter_ver';

import Vue from 'vue';
import $ from 'jquery';

import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

// add by jyyang 2020.11.24
import common_jsEvents from '@/Projects/Frameworks/Models/Common/common_jsEvents_.js';
// end add by jyyang 2020.11.24

export default {
  name     :__className__,
  className:__className__,
  extends:common_Object,

  data(){
    return {
      is_viewObject:true

     ,Left   : undefined
     ,Top    : undefined
     ,Width  : undefined
     ,Height : undefined
     ,Capcity: undefined
     ,positionState:undefined  //relative, absolute, static, fixed, sticky

//front color
     ,Color          :''
     ,Color_hide     :''
     ,Color_hover    :''
     ,Color_focus    :''
     ,Color_disable  :''
//background color
     ,bgColor        :''
     ,bgColor_hide   :''
     ,bgColor_hover  :''
     ,bgColor_focus  :''
     ,bgColor_disable:''
//font color
     ,ftColor        :''
     ,ftColor_hide   :''
     ,ftColor_hover  :''
     ,ftColor_focus  :''
     ,ftColor_disable:''
//border color'
     ,bdColor        :''
     ,bdColor_hide   :''
     ,bdColor_hover  :''
     ,bdColor_focus  :''
     ,bdColor_disable:''
//face color
     ,fcColor        :''
     ,fcColor_hide   :''
     ,fcColor_hover  :''
     ,fcColor_focus  :''
     ,fcColor_disable:''

     ,randomData :false
     ,randomColor:false

     ,alignMode:''
     ,displayNow :true
     ,displaySave:undefined

     ,event_onClick:null
     ,event_on_mouseOver :null
     ,event_on_mouseEnter:null
     ,event_on_mouseLeave:null

     // add by jyyang 2020.12.23
    ,cssRule: null
     // end add by jiayu 2020.12.23
    }
  },
   
  components:{common_Object},

  methods:{


    set_Show(paramMode){
      this.displayNow=true;

      if (paramMode) this.displaySave=paramMode;

      if (!this.$el) return;
      this.$el.style.display=this.displaySave;
    },

    set_Hide(paramMode){
      this.displayNow=false;
      
      if (!paramMode) this.displaySave=null
      else this.displaySave=paramMode;

      if (!this.$el) return;

      this.displaySave=this.$el.style.display;
      this.$el.style.display='none';
    },

    set_onClick(paramClick){
      if (!paramClick) return;
      this.event_onClick=paramClick;
    },

    set_on_mouseOver (paramOver){
      if (!paramOver) return;
      this.event_on_mouseOver=paramOver;
    },

    set_on_mouseEnter(paramEnter){
      if (!paramEnter) return;
      this.event_on_mouseEnter=paramEnter;
    },

    set_on_mouseLeave(paramLeave){
      if (!paramLeave) return;
      this.event_on_mouseLeave=paramLeave;
    },

    get_randomColor(){
      var tempColor='#';
      var tempNum='';
      for (var i=0;i<3;i++){
        tempNum=parseInt(Math.random()*256).toString(16);
        if (tempNum.length<2) tempNum='0'+tempNum;
        tempColor=tempColor+tempNum;
      }
      return tempColor;
    },

    get_randomColor_rgb(){
      return 'rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
    },

    get_randomColor_rgba(){
      return 'rgba('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+Math.random()+')';
    },

    set_bgColor(paramColor){
      this.bgColor=paramColor;

      // modify by jyyang 2020.11.20
      this.add_cssRule(`background: ${paramColor.toString()}`);
      // end modify by jyyang 2020.11.20
    },

    set_bgColor_rgba(paramR,paramG,paramB,paramA){
      this.bgColor='rgba('+paramR+','+paramG+','+paramB+','+paramA+')';
    },

    set_ftColor(paramColor){
      this.ftColor=paramColor;
    },

    set_ftColor_focus(paramColor){
      this.ftColor_focus=paramColor;
    },

    set_domID(paramID){
      if (!paramID) return;
      if (!this.$el) return; 
      this.$el.id=paramID;
    },

    has_domClass(paramClass){
      if (!this.$el) return false;
      if (!paramClass) return false;
      if (paramClass.replace(/\s/g,'').length == 0) return false;
      if (!this.$el.className) return false; 
      return new RegExp(' ' +paramClass+ ' ').test(' ' +this.$el.className+ ' ');
    },

    add_domClass(paramClass){
      if (!paramClass) return;
      if (!this.$el) return;
      if (this.has_domClass(paramClass)) return;
      if (!this.$el.className) {this.$el.className=                       paramClass;}
      else                     {this.$el.className=this.$el.className+' '+paramClass;};
    },

    auto_Build_domClass(paramClass){
      if (!this.$el) return;
      if (paramClass) {this.add_domClass(paramClass);}
      else {if (this.$options.className) this.add_domClass(this.$options.className);};
    },

    auto_Build_domID(){
      if (!this.$el) return;
      if (this.$el.id) return;
      if (this.$options.id) {this.$el.id=this.$options.id;}
      else {this.$el.id=this.objID;};
    },

    try_reloadStyles(){
      if ((this.do_reloadStyles)&&(typeof this.do_reloadStyles=='function')){this.do_reloadStyles()};
    },

    try_reloadLanguages(){ 
      if ((this.do_reloadLanguages)&&(typeof this.do_reloadLanguages=='function')){this.do_reloadLanguages()};
      if ((this.is_Page)&&(this.$options.pageTitle)) document.title=this.get_Text(this.$options.pageTitle,'Welcome');
    },

    try_reloadUserInfo(){
      if ((this.do_reloadUserInfo)&&(typeof this.do_reloadUserInfo=='function')){this.do_reloadUserInfo()};
    },

    default_autoSize(paramRect){
      return; //rairairai
      if (!paramRect) return;
      if (!this.$el) return;

      this.Left  =$(this.$el).position().left;
      this.Top   =$(this.$el).position().top ;
      this.Width =$(this.$el).width() ;
      this.Height=$(this.$el).height();

      switch (this.alignMode){
        case __alignLeft__:
        case __alignTop__:
        case __alignRight__:
        case __alignBottom__:
        case __alignClient__:
        case __dockLeft__:
        case __dockTop__:
        case __dockRight__ :{
          if ((this.do_calSize_dockRight)&&(typeof this.do_calSize_dockRight=='function')){this.do_calSize_dockRight(paramRect);}
          break;
        }
        case __dockBottom__:
        case __dockCenter__:  
        case __dockCenter_hor__:
        case __dockCenter_ver__:{
          break;
        }
        default:;
      };

      if ((this.Left!=this.$el.scrollLeft)||(this.Top!=this.$el.scrollTop)||(this.Width!=this.$el.scrollWidth)||(this.Height=this.$el.scrollHeight)){
        var that=this;
        this.$displayInfo.set_domPosition(that,this.Left,this.Top,this.Width,this.Height);
      }
    },

    try_autoSize(){
      if (!this.$el) return;
      var tempLeft  =0;
      var tempTop   =0;
      var tempWidth =document.body.scrollWidth ;
      var tempHeight=document.body.scrollHeight;

      if (this.$el.parentElement){
        tempLeft  =$(this.$el.parentElement).position().left;
        tempTop   =$(this.$el.parentElement).position().top ; 
        tempWidth =$(this.$el.parentElement).width ();
        tempHeight=$(this.$el.parentElement).height();
      }

      if ((this.do_autoSize)&&(typeof this.do_autoSize=='function')){
        this.do_autoSize({parentLeft:tempLeft,parentTop:tempTop,parentWidth:tempWidth,parentHeight:tempHeight});
      }
      else{
        this.default_autoSize({parentLeft:tempLeft,parentTop:tempTop,parentWidth:tempWidth,parentHeight:tempHeight});
      }
    },

    set_Align_left  (){this.alignMode=__alignLeft__  ;},
    set_Align_top   (){this.alignMode=__alignTop__   ;},
    set_Align_right (){this.alignMode=__alignRight__ ;},
    set_Align_bottom(){this.alignMode=__alignBottom__;},
    set_Align_Client(){this.alignMode=__alignClient__;},
    set_Dock_left      (){this.alignMode=__dockLeft__      ;},
    set_Dock_top       (){this.alignMode=__dockTop__       ;},
    set_Dock_right     (){this.alignMode=__dockRight__     ;},
    set_Dock_bottom    (){this.alignMode=__dockBottom__    ;},
    set_Dock_center    (){this.alignMode=__dockCenter__    ;},
    set_Dock_center_hor(){this.alignMode=__dockCenter_hor__;},
    set_Dock_center_ver(){this.alignMode=__dockCenter_ver__;},
    set_xOffset(paramOffset){this.xOffset=paramOffset;},
    set_yOffset(paramOffset){this.yOffset=paramOffset;},

    try_reSize(){
      if ((this.do_reSize)&&(typeof this.do_reSize=='function')){this.do_reSize();}; 
      if (this.is_Page){
        switch (this.$displayInfo.displayDevice){
          case 'Tablet':{
            this.dispatch_viewFunction('auto_reSize_tablet','auto_reSize');
            break;
          }
          case 'Phone' :{
            this.dispatch_viewFunction('auto_reSize_phone' ,'auto_reSize');
            break;
          }
          case 'tvWall':{
            this.dispatch_viewFunction('auto_reSize_tvwall','auto_reSize');
            break;
          }
          default:{
            this.dispatch_viewFunction('auto_reSize_desktop','auto_reSize');
          }
        }
      };
    },

    auto_calReplace(paramValue,paramOptions){
      var tempValue=paramValue;

      if (!paramOptions) return tempValue;

      tempValue=tempValue.replace(/\%L\%/g,paramOptions.container_clientLeft.toString(  10));
      tempValue=tempValue.replace(/\%T\%/g,paramOptions.container_clientTop.toString(   10));
      tempValue=tempValue.replace(/\%W\%/g,paramOptions.container_clientWidth.toString( 10));
      tempValue=tempValue.replace(/\%H\%/g,paramOptions.container_clientHeight.toString(10));

      tempValue=tempValue.replace(/\%l\%/g,paramOptions.self_clientLeft.toString(  10));
      tempValue=tempValue.replace(/\%t\%/g,paramOptions.self_clientTop.toString(   10));
      tempValue=tempValue.replace(/\%w\%/g,paramOptions.self_clientWidth.toString( 10));
      tempValue=tempValue.replace(/\%h\%/g,paramOptions.self_clientHeight.toString(10));

      tempValue=tempValue.replace(/\%DW\%/g,paramOptions.displayWidth.toString( 10));
      tempValue=tempValue.replace(/\%DH\%/g,paramOptions.displayHeight.toString(10));
      return tempValue;
    },

    auto_calLeft(paramOptions){
      if (this.Left==null) return undefined;
      if (this.Left==undefined) return undefined;
      var tempValue=this.auto_calReplace(this.Left,paramOptions);

      try {return new Function('return '+tempValue+';')();}
      catch(ex) {return 0};
    },

    auto_calTop(paramOptions){
     if (this.Top==null) return undefined;
     if (this.Top==undefined) return undefined;
      var tempValue=this.auto_calReplace(this.Top,paramOptions);

      try {return new Function('return '+tempValue+';')();}
      catch(ex) {return 0};
    },

    auto_calWidth(paramOptions){
      if (this.Width==null) return undefined;
      if (this.Width==undefined) return undefined;
      var tempValue=this.auto_calReplace(this.Width,paramOptions);

      try {return new Function('return '+tempValue+';')();}
      catch(ex) {return 0};
    },

    auto_calHeight(paramOptions){
      if (this.Height==null) return undefined;
      if (this.Height==undefined) return undefined;
      var tempValue=this.auto_calReplace(this.Height,paramOptions);

      try {return new Function('return '+tempValue+';')();}
      catch(ex) {return 0};
    },

    auto_calSize(paramObj,paramOptions){
      if (!paramObj) return null;
      if (!this.$displayInfo) return null;
      var tempOptions={};
      tempOptions.Container    =this;
      tempOptions.displayDevice=this.$displayInfo.displayDevice;
      tempOptions.displayWidth =this.$displayInfo.displayWidth ;
      tempOptions.displayHeight=this.$displayInfo.displayHeight;
      tempOptions.Landscape    =this.$displayInfo.display_isLandscape;
      if (this.Capcity!=undefined) tempOptions.Capcity=this.Capcity;

      if (paramOptions){
        tempOptions.container_clientLeft  =paramOptions.container_clientLeft  ;
        tempOptions.container_clientTop   =paramOptions.container_clientTop   ;
        tempOptions.container_clientWidth =paramOptions.container_clientWidth ;
        tempOptions.container_clientHeight=paramOptions.container_clientHeight;
      }
      else{
        tempOptions.container_clientLeft  =0;
        tempOptions.container_clientTop   =0;
        tempOptions.container_clientWidth =tempOptions.displayWidth ;
        tempOptions.container_clientHeight=tempOptions.displayHeight;
      };

      if (paramObj.$el){
        tempOptions.self_clientLeft  =paramObj.$el.clientLeft  ;
        tempOptions.self_clientTop   =paramObj.$el.clientTop   ;
        tempOptions.self_clientWidth =paramObj.$el.clientWidth ;
        tempOptions.self_clientHeight=paramObj.$el.clientHeight;
      }
      else{
        tempOptions.self_clientLeft  =0;
        tempOptions.self_clientTop   =0;
        tempOptions.self_clientWidth =0;
        tempOptions.self_clientHeight=0;
      }

      tempOptions.Left  =paramObj.auto_calLeft  (tempOptions);
      tempOptions.Top   =paramObj.auto_calTop   (tempOptions);
      tempOptions.Width =paramObj.auto_calWidth (tempOptions);
      tempOptions.Height=paramObj.auto_calHeight(tempOptions);

      return tempOptions;
    },

    dispatch_viewFunction(paramFunction,paramFunction_default,paramOptions){
      if (!this.$displayInfo) return;
      if (!this.$el) return;

      var tempOptions=this.auto_calSize(this,paramOptions);

      if (paramOptions){
        var that=this;
        this.$displayInfo.set_domPosition(that,tempOptions.Left,tempOptions.Top,tempOptions.Width,tempOptions.Height,tempOptions.Capcity);
        if ((this.after_viewDispatch)&&(typeof this.after_viewDispatch=='function')) this.after_viewDispatch(tempOptions);
      };

      tempOptions.container_clientLeft  =tempOptions.Left  ;
      tempOptions.container_clientTop   =tempOptions.Top   ;
      tempOptions.container_clientWidth =tempOptions.Width ;
      tempOptions.container_clientHeight=tempOptions.Height;

      for (var i=0;i<this.$children.length;i++){
        if (!this.$children[i].is_viewObject) continue;

        if ((paramFunction)&&(this.$children[i][paramFunction])&&(typeof this.$children[i][paramFunction] == 'function')){
          this.$children[i][paramFunction](tempOptions); 
        }
        else{
          if ((paramFunction_default)&&(this.$children[i][paramFunction_default])&&(typeof this.$children[i][paramFunction_default] == 'function')){
            this.$children[i][paramFunction_default](tempOptions); 
          }  
        };

        if ((this.$children[i].dispatch_viewFunction)&&(typeof this.$children[i].dispatch_viewFunction == 'function')){
          this.$children[i].dispatch_viewFunction(paramFunction,paramFunction_default,tempOptions);
        };
      }
    },


    // convert Blob to Base64
    blobToBase64(file) {
      return new Promise((reslove, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { reslove(reader.result); }
        reader.onerror = () => { reject('Fail to convert base64!'); }
      })
    },

    // convert Base64 to Blob
    base64ToBlob(urlData, type) {
      let arr = urlData.split(',');
      let array = arr[0].match(/:(.*?);/);
      let mime = (array && array.length > 1 ? array[1] : type) || type;
      let bytes = window.atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mime
      });
    },

    // add by jyyang 2020.11.20
    set_view_size(paramWidth, paramHeight) {
      if (this.$el) {
        this.$el.style.width = paramWidth.toString();
        this.$el.style.height = paramHeight.toString();
      }
    },

    add_cssRule(paramCssRuler) {
      if (this.$el) {
        let tempBgClassName = 'dynamic-' + (new Date()).getTime().toString() + Number.parseInt(Math.random() * 100);
        let tempStyleSheets = document.styleSheets;
        if (tempStyleSheets.length) {
          // tempStyleSheets[0].insertRule(`.${tempBgClassName} {${paramCssRuler}}`);
          let tempNeedCreateStyle = true;
          for (let i = 0; i < tempStyleSheets.length; ++i) {
            if (!tempStyleSheets[i].href) {

              tempStyleSheets[i].insertRule(`.${tempBgClassName} {${paramCssRuler}}`, 0);

              tempNeedCreateStyle = false;
              break;
            }
          }

          if (tempNeedCreateStyle) {
            let tempStyleElem = document.createElement('style');
            let tempTextNode = document.createTextNode(`.${tempBgClassName} {${paramCssRuler}}`);
            tempStyleElem.appendChild(tempTextNode);
            document.head.appendChild(tempStyleElem);
          }

          this.$el.classList.add(tempBgClassName);
        }
        
        return tempBgClassName;
      }
    },
    // end add by jyyang 2020.11.20

    // add by jyyang 2020.11.24
    emit_event(paramType, param) {
      common_jsEvents.$emit(paramType, param);
    },

    on_event(paramType, paramFunc, paramLocation) {
      common_jsEvents.$on(paramType, paramFunc, paramLocation);
    },

    off_event(paramType) {
      common_jsEvents.$off(paramType);
    },
    // end add by jyyang 2020.11.24

    // add by jyyang 2020.12.23
    push_cssRule(paramCssRule) {
      this.cssRule = paramCssRule;
    }
    // end add by jyyang 2020.12.23
  },

  created:function(){
    if(this.$displayInfo) this.$displayInfo.$on('need_reSize',this.try_reSize         );
    if(this.$Languages  ) this.$Languages.$on  ('need_Update',this.try_reloadLanguages);     
    if(this.$Styles     ) this.$Styles.$on     ('need_Update',this.try_reloadStyles   );
    if(this.$userInfo   ) this.$userInfo.$on   ('need_Update',this.try_reloadUserInfo );
  },

  mounted:function(){
    this.auto_Build_domClass();
    this.auto_Build_domID()   ;
    this.try_reloadStyles();
    this.try_reloadLanguages();
    this.try_reSize();

    if (this.$el){
      if (!this.displayNow) this.$el.style.display='none';
      else if (this.displaySave) this.$el.style.display=this.displaySave;
      
      if (this.event_onClick){
        this.$el.onclick=this.event_onClick;
        this.$el.style.cursor='pointer';
      }
      if (this.event_on_mouseOver ) this.$el.onmouseover =this.event_on_mouseOver ;
      if (this.event_on_mouseEnter) this.$el.onmouseenter=this.event_on_mouseEnter;
      if (this.event_on_mouseLeave) this.$el.onmouseleave=this.event_on_mouseLeave;

      // add by jyyang 2020.12.23
      if (this.cssRule) this.add_cssRule(this.cssRule);
      // end add by jyyang 2020.12.23
    }
   },

  beforeDestroy: function(){
    // fixed in 2021-3-1 by jyyang
  // beforeDesotry:function(){
    if(this.$userInfo   ) this.$userInfo.$off   ('need_Update',this.try_reloadUserInfo );      
    if(this.$Styles     ) this.$Styles.$off     ('need_Update',this.try_reloadStyles   );      
    if(this.$Languages  ) this.$Languages.$off  ('need_Update',this.try_reloadLanguages);     
    if(this.$displayInfo) this.$displayInfo.$off('need_reSize',this.try_reSize         );
  }
}

</script>