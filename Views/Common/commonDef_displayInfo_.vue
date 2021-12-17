<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.27                                //
//  for global display information:  $displayInfo                               //
//  Before use:                                                                 //
//  (Now you have no needs to modify the App.vue)                               //
//  Please just follow 1 step (add 2 Lines code in main.js: import and use):    //
//  Add Line 1:"import commonView from '@/Projects/Frameworks/Imports/commonView';"      //
//      Line 2:"Vue.use(commonView);"    to main.js                             //
//  Now you can using this.$displayInfo everwhere.                              //
//******************************************************************************//
</script>

<template></template>

<script>
import $ from 'jquery';
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

export default {
  name: 'commonDef_displayInfo',
  extends:common_Object,

  data(){
    return {
      dom_Root:null

     ,notify_Position: 'top-right'

     ,touch_startPoints:[]

     ,font_baseFamily :[]       //fonts that mentioned, but not confirmed ready for using.
     ,font_Family     :[]       //fonts supported are all in this array
     ,font_defaultFont:''       //use this font for measure text width

     ,display_isLandscape:false         //width >=height
     ,display_isPortrait :false         //width < height

     ,display_isUnknown:true            //default=unknown device
     ,display_isDesktop:false           //this device is PC (desktop=pc)
     ,display_isPC     :false           //this device is PC (desktop=pc)
     ,display_isPhone  :false           //this device is phone
     ,display_isTablet :false           //this device is tablet
     ,display_isWatch  :false           //this device is watch
     ,display_isTvWall :false           //this device is tv-wall

     ,display_supportCanvas:false       //judge support Canvas or not

     ,displayCount       :1             //number of displays
     ,displayCurrent     :0             //index of current desplay from [displays]
     ,displayWidth       :0             //screen width
     ,displayHeight      :0             //screen height
     ,display_aspectRatio:4/3           //width / height
     ,displayScale       :1             //zoom of browser
     ,displayDevice      :'Desktop'     //client device
     ,displayLanguage    :'en-us'       //client language
     ,displayCode        :'utf-8'       //code page such as utf8, unicode...
     ,displaySupports  :[{            //devices we supported in this system
        displayDevice  :'Desktop'
       ,displayLanguage:'en-us'   
       ,displayCode    :'utf-8'}
      ]
    }
  },
   
  components:{},

  methods:{
    on_scroll(paramEvent){
      
    },

    on_touchMove(paramEvent){
    },
    on_touchEnd(paramEvent){
    },
    on_touchCancel(paramEvent){
    },
    on_touchStart(paramEvent){

      var tempEvent=paramEvent||window.event;

      if (!tempEvent) return;
      if (!tempEvent.touches) return;
      if (!paramEvent.touches.length) return;


  //  	this.touch_startPoints = paramEvent.touches[0];
    },

    on_documentReady(){
      this.font_baseFamily=[];
      this.font_Family=[];
      var tempApp=document.getElementById('app');
      if (!tempApp) return;
      this.dom_Root=tempApp;
      try {
        var tempContext=document.createElement('canvas').getContext('2d');
        this.display_supportCanvas=true; 
      }
      catch(ex) {
        this.display_supportCanvas=false; 
      } 

      this.font_baseFamily=$(this.dom_Root).css("font-family").split(',');
      for (var tempKey in this.font_baseFamily){
        this.font_baseFamily[tempKey]=this.font_baseFamily[tempKey].replace(/[\"\']/g,'');
        if (this.display_supportCanvas){
          tempContext.font=this.font_baseFamily[tempKey];
          if (tempContext.font.match(RegExp(this.font_baseFamily[tempKey],'gi'))){
            this.font_Family.push(this.font_baseFamily[tempKey]);
            if (!this.font_defaultFont) {
              this.font_defaultFont=this.font_baseFamily[tempKey];
            }
          };  
        }
      };
    },

    on_Init(){
      this.Inited=false;
      this.on_Resize();
      this.Inited=true;
    },

    on_Resize(){
      this.displayWidth =document.documentElement.clientWidth ;
      this.displayHeight=document.documentElement.clientHeight;

      if (this.displayHeight!=0) {this.display_aspectRatio=this.displayWidth / this.displayHeight;};
      this.displayScale =window.devicePixelRatio;

      if (this.displayHeight>this.displayWidth){this.display_isLandscape=false;this.display_isPortrait=true ;}
        else                                   {this.display_isLandscape=true ;this.display_isPortrait=false;} 
      
      this.displayDevice='unKnown';
      this.display_isUnknown=true ;
      this.display_isDesktop=false;
      this.display_isPC     =false;
      this.display_isPhone  =false;
      this.display_isTablet =false;
      this.display_isWatch  =false;
      this.display_isTvWall =false;
      if ((this.displayWidth >=256) && (this.displayHeight>=256))
      {
        this.displayDevice='Desktop';
             if ( /(?:Phone)/.test(navigator.userAgent)){this.displayDevice='Phone' ;this.display_isUnknown=false;}
        else if (    /(?:PC)/.test(navigator.userAgent)){this.displayDevice='Desktop';this.display_isUnknown=false;}
        else if (/(?:Tablet)/.test(navigator.userAgent)){this.displayDevice='Tablet';this.display_isUnknown=false;}
        else if (  /(?:iPad)/.test(navigator.userAgent)){this.displayDevice='Tablet';this.display_isUnknown=false;}
        else if (/(?:Mobile)/.test(navigator.userAgent)){this.displayDevice='Phone' ;this.display_isUnknown=false;}
        else if (((this.displayWidth+1)>(this.displayHeight /9 *16))
                &&(this.displayWidth>=1920))            {this.displayDevice='tvWall';this.display_isUnknown=false;}
        ;

             if (this.displayDevice=='Desktop'){this.display_isDesktop=true;this.display_isPC     =true ;this.display_isUnknown=false;}
        else if (this.displayDevice=='Phone'  ){this.display_isPhone  =true;this.display_isUnknown=false;}
        else if (this.displayDevice=='Tablet' ){this.display_isTablet =true;this.display_isUnknown=false;}
        else if (this.displayDevice=='tvWall' ){this.display_isTvWall =true;this.display_isDesktop=true ;this.display_isPC=true;this.display_isUnknown=false;}
        ;   
      }
      if (this.Inited) this.$emit('need_reSize');      
    },

    set_domPosition(paramDom,paramLeft,paramTop,paramWidth,paramHeight,paramOpacity,param_positionState){
      if (!paramDom) return;
      
      if (!paramDom.$el) return
      else var tempDom=paramDom.$el;
      if (!tempDom.style) return;
      if (param_positionState) paramDom.positionState=param_positionState;
      if (paramDom.positionState!=undefined) tempDom.style.position=paramDom.positionState;

      if (paramLeft  !=undefined) tempDom.style.left=paramLeft.toString(10)+'px';
      if (paramTop   !=undefined) tempDom.style.top =paramTop.toString( 10)+'px';
      if (paramWidth !=undefined) {
        if (paramWidth >=0) tempDom.style.width =paramWidth.toString( 10)+'px';
      }
      if (paramHeight!=undefined) {
        if (paramHeight>=0) tempDom.style.height=paramHeight.toString(10)+'px';
      }
      if (paramOpacity!=undefined)tempDom.style.opacity=paramOpacity;  
    },

    set_elementPosition(paramID,paramLeft,paramTop,paramWidth,paramHeight,paramOpacity,param_positionState){
      let tempElement=document.getElementById(paramID);
      if (!tempElement) return;
      if (!tempElement.style) return;

      if (param_positionState) this.positionState=param_positionState;
      if (this.positionState ) tempElement.style.position=this.positionState;

      tempElement.style.left=paramLeft.toString(10)+'px';
      tempElement.style.top =paramTop.toString( 10)+'px';
      if (paramWidth >=0) tempElement.style.width =paramWidth.toString( 10)+'px';
      if (paramHeight>=0) tempElement.style.height=paramHeight.toString(10)+'px';
      tempElement.style.opacity=paramOpacity;  
    },
  },
  
  created:function(){  
    $(document).ready=this.on_documentReady();
    this.on_Init();
    window.onresize=this.on_Resize;
    window.addEventListener('scroll',this.on_touchStart);
    document.addEventListener('touchstart' ,this.on_touchStart );
    document.addEventListener('touchmove'  ,this.on_touchMove  );
    document.addEventListener('touchend'   ,this.on_touchEnd   );
    document.addEventListener('touchcancel',this.on_touchCancel);
  },

  mounted:function(){
 
   },

  beforeDesotry:function(){
    window.onresize=null;
    document.removeEventListener("touchstart",this.on_touchStart);
    document.removeEventListener("scroll"    ,this.on_touchStart);
  }
}

</script>