<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.08                                //
//  common Texts such as static text                                            //
//******************************************************************************//
</script>

<template></template>

<script>
import Vue from 'Vue';
import $ from 'jquery';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

const __className__='commonView_Text';

export default {
  name:__className__,
  className:__className__,
  extends:commonView_Component,

  data(){
    return {
      is_singleLine:true
     ,auto_Language:true 
     ,Texts:[]
     ,IDs:[]
    }
  },
   
  components:{commonView_Component},
  methods:{
    get_textWidth(paramContext) {
      if (!this.$el) return 0;
      if (!paramContext) return 0;
      if (!this.$displayInfo) return 0;
      if (!this.$displayInfo.font_defaultFont) return 0;

      if (this.is_singleLine){
        var tempWidth=0;
        for (var i=0;i<this.$el.children.length;i++){
          if (!this.$el.children[i]) continue;
          if (!this.Texts[i]) continue;
          paramContext.font=(this.$el.children[i].style.fontSize||this.$el.style.fontSize)+' '+this.$displayInfo.font_defaultFont;
          tempWidth=tempWidth+paramContext.measureText(this.Texts[i].Text).width;
        }
        return parseInt(tempWidth)+1;
      }
    },

    do_calSize_dockRight(paramRect){
      return;  //rairairai

      if (!paramRect) return;
      if (!this.$el) return;

      this.Left  =$(this.$el).position().left;
      this.Top   =$(this.$el).position().top ;
      this.Width =$(this.$el).width() ;
      this.Height=$(this.$el).height();

      if (!this.$displayInfo) return;
      if (!this.$displayInfo.display_supportCanvas) return;

      var tempContext=document.createElement("canvas").getContext("2d");
      this.Width=this.get_textWidth(tempContext);

      this.Left=paramRect.parentLeft+paramRect.parentWidth-this.Width;
      if (this.xOffset) this.Left=this.Left-this.xOffset;

      this.Top =paramRect.parentTop+paramRect.parentHeight-this.Height;
      if (this.yOffset) this.Top=this.Top-this.yOffset;
    },

    do_reloadLanguages(){
      if (!this.auto_Language) return;
      this.Texts=[];
      for (var i in this.IDs){
        this.Texts.push({Spans:[],Align:this.IDs[i].Align});
        for (var j in this.IDs[i].Spans){
          this.Texts[i].Spans.push({Text:this.get_Text(this.IDs[i].Spans[j].Text),Style:{'font-size':this.IDs[i].Spans[j].Size+'px'},Link:this.IDs[i].Spans[j].Link});
        }
      }
    },

    set_item_Text(paramIndex,paramText){
      if (!this.$el) return;
      if ((paramIndex<0)||(paramIndex>=this.$el.children.length)) return;

      this.$el.children[paramIndex].innerText=paramText;
    },

    set_Text(paramText){
      this.set_item_Text(0,paramText);
    },

    set_item_backColor(paramIndex,paramColor){
      if (!this.$el) return;
      if ((paramIndex<0)||(paramIndex>=this.$el.children.length)) return;

      this.$el.children[paramIndex].style.backgroundColor=paramColor;
    },

    set_backColor(paramColor){
      if (!this.$el) return;

      this.$el.style.backgroundColor=paramColor;
    },

    set_item_fontColor(paramIndex,paramColor){
      if (!this.$el) return;
      if ((paramIndex<0)||(paramIndex>=this.$el.children.length)) return;

      this.$el.children[paramIndex].style.color=paramColor;
    },

    set_fontColor(paramColor){
      if (!this.$el) return;

      this.$el.style.color=paramColor;
    },

    set_item_fontSize(paramIndex,paramSize){
      if (!this.$el) return;
      if ((paramIndex<0)||(paramIndex>=this.$el.children.length)) return;
      if (!this.$el.children[paramIndex]) return;

      this.$el.children[paramIndex].style.fontSize=paramSize+'px';
    },

    set_fontSize(paramSize){
      if (!this.$el) return;

      this.$el.style.fontSize=paramSize+'px';
    },

    set_singleLine(){
      this.is_singleLine=true;
    },

    set_multiLines(){
      this.is_singleLine=false;
    },

    Clear(){
      this.Texts=[];
      this.IDs=[];
    },

    add_Text(paramPara,paramSpan,paramText,paramAlign,paramSize,paramLink){
      if (paramPara==null) return;
      if (paramSpan==null) return;
      if (paramPara<0) return;
      if (paramSpan<0) return;
      if (!this.IDs) {this.IDs=[];}
      if (!this.Texts) {this.Texts=[];}
      var tempAlign='Left';
      if (paramAlign) tempAlign=paramAlign;
      var tempSize=14;
      if (window.fontSize_default) tempSize=window.fontSize_default;
      if (paramSize) tempSize=paramSize;
 
      if (this.IDs.length<=paramPara.length) this.IDs.length=paramPara;
      if (!this.IDs[paramPara]) this.IDs[paramPara]={Spans:[],Align:tempAlign};
      if (this.IDs[paramPara].Spans.length<=paramSpan) this.IDs[paramPara].Spans.length=paramSpan+1;

      var tempText='';
      if (paramText) tempText=paramText;
      this.IDs[paramPara].Spans[paramSpan]={Text:tempText,Size:tempSize,Link:paramLink};
    }

  },

  created:function(){
  },

  mounted:function(){
  },

  beforeDesotry:function(){
  }
}

</script>