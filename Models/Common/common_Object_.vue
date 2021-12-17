<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.07.22                                //
//  commonEu2_Droplist: inherited from el-select, element-ui 2.0, Vue           //
//******************************************************************************//
</script>

<template></template>

<script>
import MD5 from 'js-md5';
import Base64 from 'js-base64';
import zLib from 'zlib';

import Vue from 'vue';

export default {
  name:'common_Object',
  components:{},
  data(){return{
    objGID :''
   ,objCLS :''
   ,objID  :''
   ,objName:''
   ,objText:''
   
   ,Inited:false
   ,initOK:false
   ,data_updatePeriod:0
  
   ,dataSource_Updated : false
   ,dataSource_Type    :'Json'
   ,dataSource_Url     : ''
   ,dataSource_timeOut : undefined
   ,dataSource_Params  : null
   ,dataSource_callBack: null
   ,dataSource_jsonData: null
   ,external_callBack  : null
 
   ,notify_Timeout   :null
   ,notify_Datas     :[]
   ,message_tickCount:0
   ,needFree_Timeout:null
  };},

  methods:{
    get_arraySum(paramArray){
      var tempSum=0;
      if (!paramArray) return tempSum;

      for (var i=0;i<paramArray.length;i++){
        if (this.get_Type(paramArray[i])=='number') tempSum=tempSum+paramArray[i];
      };
      return tempSum;
    },
  
    get_randomID(){
      var tempID='';
      for (var i=0;i<8;i++){
        tempID=tempID+this.get_random4hexChars();
      }
      return tempID;
    },

    model_Fill_86400(paramDatas,paramTime,paramResult,paramZone,paramKeep){
      if (!paramResult) return;
      if (this.get_Type(paramResult)!='array') return;
      paramResult.length=86400;    //no matter what the input is, output array will be initialized to 86400 or Specified length

      if (!paramDatas) return;  //check  double input must be array
      if (!paramTime ) return;
      if (this.get_Type(paramDatas)!='array') return;
      if (this.get_Type(paramTime )!='array') return;
      var arrayLen=Math.min(paramDatas.length,paramTime.length);  //The input both array, and the subscript use the smallest to prevent overflow
      if (arrayLen<=0) return;
      if (arrayLen>86400) arrayLen=86400;
      
      var tempTime=0;  //the current time in the subscript 86400
      var lastPos=0;
      var i=0;
      var j=0;
      var tempZone=0;
      if (paramZone) tempZone=paramZone*7200; 
      for (i=0;i<arrayLen;i++){
        if (paramZone){tempTime=parseInt(Date.parse(paramTime[i])/1000+tempZone)%86400;}
        else {tempTime=parseInt(Date.parse(paramTime[i])/1000)%86400;}; //calculate the actual subscript of the current time in 86400
        for (j=lastPos;j<=tempTime;j++){
          paramResult[j]=paramDatas[i];
        }
        lastPos=tempTime+1; 
      }
      if (paramKeep) {for (i=lastPos;i<86400;i++) paramResult[i]=0;};
    },

    pump_jsonObject(paramName){
      if (!paramName) return null;
      return JSON.parse(sessionStorage.getItem(paramName));
    },

    dump_jsonObject(paramName,paramObject){
      if (!paramName) return;
      if (!paramObject) {sessionStorage.setItem(paramName,JSON.stringify(null))}
      else {sessionStorage.setItem(paramName,JSON.stringify(paramObject))};
    },

    load_jsonObject(paramName){
      if (!paramName) return null;
      return JSON.parse(localStorage.getItem(paramName));
    },

    save_jsonObject(paramName,paramObject){
      if (!paramName) return;
      if (!paramObject) {localStorage.setItem(paramName,JSON.stringify(null))}
      else {localStorage.setItem(paramName,JSON.stringify(paramObject))};
    },

    copy_jsonObject(paramObj){
      if (!paramObj) return null;
      return JSON.parse(JSON.stringify(paramObj));
    },

    combine_Url(paramHost,tempUrl){
      if (!paramHost) return tempUrl;
      if (!tempUrl) return paramHost;
      
      return paramHost+tempUrl;
    },

    notify_Tick(){
      clearTimeout(this.notify_Timeout);
      this.notify_Timeout=null;

      if (!this.notify_Datas) return;
      if (this.notify_Datas.length==0) return;

      var tempNotify=this.notify_Datas.shift();
      if (tempNotify){
        if (tempNotify.duration==null) tempNotify.duration=1000;
        if (tempNotify.time    !=null) tempNotify.duration=tempNotify.time;
        if (!tempNotify.position){
          if (this.$displayInfo){
            if (this.$displayInfo.notify_Position) tempNotify.position=this.$displayInfo.notify_Position;
          }
        }

        if ((tempNotify.type)&&(tempNotify.type=='error')) {
          this.$notify.error(tempNotify);
        }
        else if ((tempNotify.type)&&(tempNotify.type=='info')) {
          this.$notify.info(tempNotify);
        }
        else { this.$notify(tempNotify);};
      }
      if (this.notify_Datas.length > 0) {
        setTimeout(this.notify_Tick,200);
      }
    },

    show_Notify_success(paramText,paramNotify){
      if (!this.$notify) return;     
      if (!paramText) return;

      if (!paramNotify) var paramNotify={};

      paramNotify.type='success';
      paramNotify.message=paramText;
      this.show_Notify(paramNotify);
    },

    show_Notify_info(paramText,paramNotify){
      if (!this.$notify) return;     
      if (!paramText) return;

      if (!paramNotify) var paramNotify={};

      paramNotify.type='info';
      paramNotify.message=paramText;
      this.show_Notify(paramNotify);
    },

    show_Notify_error(paramText,paramNotify){
      if (!this.$notify) return;     
      if (!paramText) return;

      if (!paramNotify) var paramNotify={};

      paramNotify.type='error';
      paramNotify.message=paramText;
      this.show_Notify(paramNotify);
    },

    show_Notify(paramNotify){
      if (!this.$notify) return;     
      if (!paramNotify) return;

      this.notify_Datas.push(paramNotify);
      if (!this.notify_Timeout){
        this.notify_Timeout=setTimeout(this.notify_Tick,200);
      }
    },

    show_Message(paramMessage){
      if (!this.$message) return;
       
      this.$message(paramMessage);
    },

    get_Type(paramObj){
      let tempRes=typeof paramObj;
      if (paramObj instanceof Array) tempRes='array';
      return tempRes;
    },
    
    dispatch_Function(paramFunction,paramOptions){
      for (var i=0;i<this.$children.length;i++){
        if ((this.$children[i][paramFunction])&&(typeof this.$children[i][paramFunction] == 'function')){
          this.$children[i][paramFunction](paramOptions);
        };
        if ((this.$children[i].dispatch_Function)&&(typeof this.$children[i].dispatch_Function == 'function')){
          this.$children[i].dispatch_Function(paramFunction,paramOptions);
        };
      }
    },

    get_upcaseHash(paramData){
      if (!paramData) {return ''}; 
      return MD5(paramData).toUpperCase(); 
    },

    get_Hash(paramData){
      if (!paramData) {return ''}; 
      return MD5(paramData); 
    },

    get_Base64(paramData){
      let tempBase64=Base64.Base64;
      return tempBase64.encode(paramData);
    },

    get_unBase64(paramData){
      let tempBase64=Base64.Base64;
      return tempBase64.decode(paramData);
    },

    get_Gunzip(paramData,paramOptions){
      return zLib.gzipSync(paramData,paramOptions);
    },

    get_unGunzip(paramData,paramOptions){
      return zLib.unzipSync(paramData,paramOptions);
    },

    get_Deflate(paramData,paramOptions){
      return zLib.deflateSync(paramData,paramOptions); 
    },

    get_Inflate(paramData,paramOptions){
      return zLib.inflateSync(paramData,paramOptions); 
    },

    try_loadData(paramData){
      if (!paramData) return;
      if ((this.do_loadData)&&(typeof this.do_loadData=='function')) {this.do_loadData(paramData)};
    },

    build_postParams(paramData){ 
      if (!paramData) return null;

      if (window.connectionID) paramData.connectionID=window.connectionID;

      return paramData;
    },

    serverApi_jsonLanguage(paramPeriod,paramObj,paramCallBack){
      if (!window.languageApi) return;

      this.build_postParams(paramObj);

      if (paramCallBack) this.query_Data(window.languageApi,paramPeriod,paramObj,paramCallBack)
      else this.query_Data(window.languageApi,paramPeriod,paramObj);
    },

    serverApi_jsonStyle(paramPeriod,paramObj,paramCallBack){
      if (!window.styleApi) return;

      this.build_postParams(paramObj);

      if (paramCallBack) this.query_Data(window.styleApi,paramPeriod,paramObj,paramCallBack)
      else this.query_Data(window.styleApi,paramPeriod,paramObj);
    },

    serverApi_jsonUser(paramPeriod,paramObj,paramCallBack){
      if (!window.userApi) return;

      this.build_postParams(paramObj);

      if (paramCallBack) this.query_Data(window.userApi,paramPeriod,paramObj,paramCallBack)
      else this.query_Data(window.userApi,paramPeriod,paramObj);
    },

    serverApi_jsonFunction(paramPeriod,paramObj,paramCallBack){
      if (!window.functionApi) return;

      this.build_postParams(paramObj);

      if (paramCallBack) this.query_Data(window.functionApi,paramPeriod,paramObj,paramCallBack)
      else this.query_Data(window.functionApi,paramPeriod,paramObj);
    },


    server_jsonFunction(paramPeriod,paramObj,paramCallBack){
      if (!window.functionApi) return;

      this.build_postParams(paramObj);

      if (paramCallBack) this.query_Data(window.functionApi,paramPeriod,paramObj,paramCallBack)
      else this.query_Data(window.functionApi,paramPeriod,paramObj);
    },

    query_Data(paramUrl,paramPeriod,paramParams,paramCallBack){      
      if (!paramUrl) return;

      this.dataSource_Url=paramUrl;
      this.dataSource_callBack=this.try_loadData;
      this.dataSource_Params=paramParams;

      if (paramPeriod<=0) this.update_Data(0,paramCallBack)
      else this.update_Data(paramPeriod,paramCallBack);     
    },

    update_Data_callback(paramData){
      if ((paramData)&&(paramData.responseJSON)){
        this.dataSource_Updated=true;
        if (this.dataSource_callBack) this.dataSource_callBack(paramData.responseJSON);
      }  

      if ((this.dataSource_afterUpdate)&&(typeof this.dataSource_afterUpdate=='function')){
       this.dataSource_afterUpdate();
      }
    },

    update_Count(){
      if (this.data_updatePeriod) {this.set_Timeout(this.update_Count,this.data_updatePeriod);};
      try {this.update_Data();}
      catch(ex){}
    },

    update_Data(paramPeriod,paramCallBack){
      if (paramCallBack) {this.external_callBack=paramCallBack};
      if ((paramPeriod)&&(paramPeriod>0)) {
        this.data_updatePeriod=paramPeriod;
        this.set_Timeout(this.update_Count,this.data_updatePeriod);
      }
      
      if ((this.dataSource_beforeUpdate)&&(typeof this.dataSource_beforeUpdate=='function')){
       this.dataSource_beforeUpdate();
      } 
      this.dataSource_Updated=false; 
      if (!this.dataSource_Url) return;
      if ((!this.dataSource_Type)||(this.dataSource_Type=='Json')){
        if (this.external_callBack){
          this.query_jsonData(this.dataSource_Url   ,this.external_callBack
                             ,this.dataSource_Params,this.dataSource_timeOut );
        }
        else{
          this.query_jsonData(this.dataSource_Url   ,this.update_Data_callback
                             ,this.dataSource_Params,this.dataSource_timeOut );
        };                   
      }
    },

    query_jsonData(paramUrl,paramFunction,paramData,paramTimeout){
      if (!paramUrl) {return};
      if (!this.$jsonQuery){return};
      if (!this.$jsonQuery.query_remoteJson_get){return};

      if (!paramData){this.$jsonQuery.query_remoteJson_get (paramUrl,paramFunction,     null,paramTimeout);}
      else           {this.$jsonQuery.query_remoteJson_post(paramUrl,paramFunction,paramData,paramTimeout);};
    },

    get_Text(paramText,paramDefault){
      if (!this.$Languages) {
        if (paramDefault) {return paramDefault}
        else {return paramText;};
      };

      return this.$Languages.query_Text(paramText,paramDefault);
    },

    get_random4hexChars(){
      return (Math.random()*65536|0).toString(16);
    },

    make_Label(paramText){
      if (!paramText) return;

      return '{{'+paramText+'}}';
    },

    set_Timeout(paramFunction,paramTime){
      if (!paramFunction) return;
      if (!paramTime) return;
      if (paramTime<=0) return;

      if (this.needFree_Timeout) clearTimeout(this.needFree_Timeout);

      this.needFree_Timeout=setTimeout(paramFunction,paramTime);
      return this.needFree_Timeout;
    },

    jsonDebug_callBack(paramData){
      console.log('Ajax return data:');
      console.log(paramData);
      console.log('responseJSON:');
      if (paramData) console.log(paramData.responseJSON);
    }
  },

  created:function(){
    var tempID='';
    
    this.$options.className=this.$options.name;

    tempID=this.get_random4hexChars()+this.get_random4hexChars();  
    this.objGID=tempID;             this.objCLS=tempID;
    tempID=this.get_random4hexChars();    
    this.objGID=this.objGID+tempID; this.objCLS=this.objCLS+'-'+tempID;
    tempID=this.get_random4hexChars();    
    this.objGID=this.objGID+tempID; this.objCLS=this.objCLS+'-'+tempID;
    tempID=this.get_random4hexChars();    
    this.objGID=this.objGID+tempID; this.objCLS=this.objCLS+'-'+tempID;
    tempID=this.get_random4hexChars()+this.get_random4hexChars()+this.get_random4hexChars();  
    this.objGID=this.objGID+tempID; this.objCLS=this.objCLS+'-'+tempID;
  
    this.objID  =this.objGID;
    this.objName=this.$options.name;
    this.objText=this.$options.Text;

    this.dataSource_Updated=false;
    if (this.$options.dataSource_callCreated){this.update_Data();}; 
  },

  mounted:function(){
    if (this.$options.dataSource_callMounted){this.update_Data();};
  },

  beforeDestroy:function(){
   if (this.needFree_Timeout) clearTimeout(this.needFree_Timeout);
   if (this.notify_Timeout) clearTimeout(this.notify_Timeout);
  }


}

</script>

