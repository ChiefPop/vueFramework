<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.13                                //
//  As charts we use echarts                                                    //
//******************************************************************************//
</script>

<template>
<div></div>
</template>

<script>
const __className__='commonView_Chart';
import $ from 'jquery';
import echarts from 'echarts';
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name:__className__,
  path:'/',
  extends:commonView_Component,

  data(){
    return {
      chartObj:null
     ,chartOptions:{title:{},xAxis:{data:[]},yAxis:{},legend:{data:[]},series:[{type:"bar"}]} 
     ,chartDatas  :null
    }
  },
  components:{commonView_Component},

  methods:{
    push_Data(paramName,paramData,paramNumber){
      if (!paramName) return;
      if (!paramData) return;

      if (!this.chartOptions) return;
      if (!this.chartOptions.xAxis) return;
      if (this.chartOptions.xAxis.length<1) return;
      if (!this.chartOptions.xAxis[0].data) return;

      if (!this.chartDatas[paramName]) return;
      if (!this.chartDatas[paramName].data) this.chartDatas[paramName].data=[];
      for (var i=0;i<paramNumber;i++){
        if (this.chartDatas[paramName].data.length>=this.chartOptions.xAxis[0].data.length)
          this.chartDatas[paramName].data.shift();
        this.chartDatas[paramName].data.push(paramData.shift());
      };

    },
    load_Color_Series(){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!this.chartOptions.series) return; 

      for (var tempKey in this.chartOptions.series){
        if (!this.chartOptions.series[tempKey].itemStyle){
          this.chartOptions.series[tempKey].itemStyle={normal:{color:this.get_randomColor()}};
        }
      }
    },

    set_Color_title(paramColor){
      if (!paramColor) return;
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!this.chartOptions.title) return;

      if (!this.chartOptions.title.textStyle) {this.chartOptions.title.textStyle={color:paramColor};}
      else {this.chartOptions.title.textStyle.color=paramColor};
    },

    set_Color_yAxis(paramLabel,paramLine,paramTick,param_lineWidth,param_tickWidth){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!this.chartOptions.yAxis) return;

      this.chartOptions.yAxis.axisLabel={show: true,textStyle:{color:paramLabel}};

      if (param_lineWidth) {this.chartOptions.yAxis.axisLine ={lineStyle:{color:paramLine,width:3}};}
      else {this.chartOptions.yAxis.axisLine ={lineStyle:{color:paramLine}};};

      if (param_tickWidth) {this.chartOptions.yAxis.axisTick ={lineStyle:{color:paramTick,width:3}};}
      else {this.chartOptions.yAxis.axisTick ={lineStyle:{color:paramTick}};};
    },

    set_Color_xAxis(paramLabel,paramLine,paramTick,param_lineWidth,param_tickWidth){  // x-axis font color  x-axis color  the x-axis scale color  x-axis line width
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!this.chartOptions.xAxis) return;

      this.chartOptions.xAxis.axisLabel={show: true,textStyle:{color:paramLabel}};

      if (param_lineWidth) {this.chartOptions.xAxis.axisLine ={lineStyle:{color:paramLine,width:3}};}
      else {this.chartOptions.xAxis.axisLine ={lineStyle:{color:paramLine}};};

      if (param_tickWidth) {this.chartOptions.xAxis.axisTick ={lineStyle:{color:paramTick,width:3}};}
      else {this.chartOptions.xAxis.axisTick ={lineStyle:{color:paramTick}};};
    },
    
    set_Series(paramSeries){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!paramSeries) {this.chartOptions.series=[];}
      else {
        for (var paramKey in paramSeries){
          if (this.chartOptions.series[paramKey]){
            this.chartOptions.series[paramKey]=paramSeries[paramKey];
          }
          else{
            this.chartOptions.series.push(paramSeries[paramKey]);
          }
        };
      }
    },

    set_yAxis(paramAxis){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;

      this.chartOptions.yAxis=[];
      
      switch (this.get_Type(paramAxis)) {
      case 'object':{
        this.chartOptions.yAxis.push(paramAxis);
        break;
      };
      case 'array':{
        this.chartOptions.yAxis=paramAxis;
        break;
      };
      default:return;
      }
    },

    set_xAxis(paramAxis){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;

      this.chartOptions.xAxis=[];
      
      switch (this.get_Type(paramAxis)) {
      case 'object':{
        this.chartOptions.xAxis.push(paramAxis);
        break;
      };
      case 'array':{
        this.chartOptions.xAxis=paramAxis;
        break;
      };
      default:return;
      }
    },

    set_Legend(paramLegend){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;

      if (!paramLegend) {this.chartOptions.legend=[];}
      else {this.chartOptions.legend=paramLegend;}
    },

    set_toolTip(paramTip){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;

      if (!paramTip) {this.chartOptions.tooltip={};}
      else {this.chartOptions.tooltip=paramTip;}
    },

    set_Title(paramTitle){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;

      if (!this.chartOptions.title) { this.chartOptions.title={text:paramTitle};}
      else {this.chartOptions.title.text=paramTitle;};
    },

    reBuild_randomData(){
      if (!this.chartObj) return;
      if (!this.chartOptions) return;
      if (!this.chartOptions.series ) return;

      let tempSeries=this.chartOptions.series;
      for (var i=0;i<tempSeries.length;i++){
        if (tempSeries[i]){
          let tempData=tempSeries[i].data;
          if (tempData){
            for (var j=0;j<tempData.length;j++){
              tempData[j]=parseInt(Math.random()*100);
            }
          }
        }
      }
    },

    rePaint(){
      if (!this.chartObj) return;
      if (!this.chartOptions) return; 
      
      if (!this.chartOptions.title  ) this.set_Title  ('');
      if (!this.chartOptions.tooltip) this.set_toolTip({});
      if (!this.chartOptions.legend ) this.set_Legend ({});
      if (!this.chartOptions.xAxis  ) this.set_xAxis  ([]);
      if (!this.chartOptions.yAxis  ) this.set_yAxis  ([]);
      if (!this.chartOptions.series ) this.set_Series ([]);

      if (this.randomData) this.reBuild_randomData();

      if (this.randomColor){
        this.set_Color_yAxis(this.get_randomColor_rgb()
                            ,this.get_randomColor_rgb()
                            ,this.get_randomColor_rgb()
                            );
        this.set_Color_xAxis(this.get_randomColor_rgb()
                            ,this.get_randomColor_rgb()
                            ,this.get_randomColor_rgb()
                            );
        this.set_Color_title(this.get_randomColor_rgb());
        this.load_Color_Series();
      }
      this.chartObj.setOption(this.chartOptions);  
    },

    keep_Fit(){
      if(!this.chartObj) return;
      this.chartObj.resize();
    },

    do_Init(){
      if (this.Inited) return;
      if (!this.$el) return;
      this.chartObj = echarts.init(this.$el);
      this.Inited=true;
    },

    reBuild_chartData(tempData){
      if (!this.chartObj) return; 
      if (!this.chartOptions) return; 
      if (!tempData) return;
      if (!tempData.chartData) return;
      let tempTitle='';
      let temp_toolTip={};
      let tempLegend={};
      let temp_xAxis=[];
      let temp_yAxis=[];
      let tempSeries=[];
      let temp_titleModified  =false;
      let temp_tooltipModified=false;
      let temp_xaxisModified  =false;
      let temp_yaxisModified  =false;
      let temp_legendModified =false;
      let temp_seriesModified =false;

      let self=this;
      let tempNode=tempData;
      let tempS=null;

      function reBuild_fromJson(tempNode){
        for (var tempKey in tempNode){
          if (tempNode[tempKey]['<chart>']){
            for (var temp_subKey in tempNode[tempKey]){
              if (temp_subKey!='<chart>'){
                switch(tempNode[tempKey]['<chart>']){
                case 'Title':{
                  if (self.get_Type(tempNode[tempKey][temp_subKey])==='string'){
                    tempTitle=tempNode[tempKey][temp_subKey];
                    temp_titleModified=true;  
                  };
                  break;
                }
                case 'Legend':{
                  tempLegend[temp_subKey]=tempNode[tempKey][temp_subKey];
                  temp_legendModified=true;
                  break;
                }
                case 'xAxis':{
                  temp_xAxis.push(tempNode[tempKey][temp_subKey]);
                  temp_xaxisModified=true;
                  break;
                }
                case 'yAxis':{
                  temp_yAxis.push(tempNode[tempKey][temp_subKey]);
                  temp_yaxisModified=true;
                  break;
                }
                case 'Series':{
                  if (!tempS) {tempS=new Object;};
                  if (tempS[temp_subKey]){
                    tempSeries.push(tempS);
                    tempS=new Object;
                  };
                  tempS[temp_subKey]=tempNode[tempKey][temp_subKey];
                  temp_seriesModified=true;
                  break;
                }
                
                default:;
                };
              }  
            };
          };
          switch (self.get_Type(tempNode[tempKey])){
            case 'object':
            case 'array' :{
              reBuild_fromJson(tempNode[tempKey]);
            }
            default:;
          }
        } 
      }; 
      reBuild_fromJson(tempNode);

      if (tempS) tempSeries.push(tempS);

      if (temp_titleModified  ) this.set_Title  (this.$Languages.reBuild_Text(tempTitle   ));
      if (temp_tooltipModified) this.set_toolTip(this.$Languages.reBuild_Text(temp_toolTip));
      if (temp_legendModified ) this.set_Legend (this.$Languages.reBuild_Text(tempLegend  ));
      if (temp_xaxisModified  ) this.set_xAxis  (this.$Languages.reBuild_Text(temp_xAxis  ));
      if (temp_yaxisModified  ) this.set_yAxis  (this.$Languages.reBuild_Text(temp_yAxis  ));
      if (temp_seriesModified ) this.set_Series (this.$Languages.reBuild_Text(tempSeries  ));
    },

    do_reloadLanguages(){
      let tempData=this.copy_jsonObject(this.chartDatas);
      this.reBuild_chartData(tempData); 
      this.rePaint();
    },

    do_loadData(paramData){
      this.chartDatas  =null;
      if (!paramData) return; 
      if (!this.chartObj) return; 

      this.chartDatas  =this.copy_jsonObject(paramData);
      this.reBuild_chartData(paramData);

      this.rePaint();
    },
  },

  created:function(){
  },

  mounted:function(){
    this.do_Init();
  },

  beforeDesotry:function(){
  }
}

</script>