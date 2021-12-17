<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.12                                //
//  the user Info                                                               //
//******************************************************************************//
</script>

<template></template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

export default{
  name: 'base_userInfo',
  extends:common_Object, 

  components:{},
  
  data(){ 
    return{
      signAuto            : false
     ,signConfig          :{}          //userName,signType,clientID
     ,signConfig_needSave : false
     ,signed_In           : false
     ,sign_requirePassword: false

     ,sessionID:''

     ,pass_preFix:''
     ,pass_surFix:''

     ,user_Updated  :false
     ,user_Name     :''
     ,user_passWord      :''
     ,user_fixedPassword :''

     ,user_nickName :''
     ,user_Roles      :{}
     ,user_Permissions:{}
     ,user_Groups     :{}
     ,user_Token    :''
     ,user_Info     :{}

     ,clientID     :''

     ,server_Name      :''
     ,server_Company   :''
     ,server_Project   :''
     ,server_Connection:''

     ,handle_signIn:0
    }
  },

  methods:{
    rebuild_signInfo(paramName,paramPass,paramAuto,paramSave,paramNew){
      if (paramAuto) {this.signAuto=true;} else {this.signAuto=false;};
      if (paramName) {this.signConfig.userName=paramName;} else {this.signConfig_userName=''   ;};
      this.user_passWord=paramPass;
      this.user_Name    =this.signConfig.userName;
      if (paramNew){
        this.signConfig.passWord='';
        this.signConfig.sessionID='';
        this.user_fixedPassword="";
        this.sessionID="";
      }
      if (paramSave) this.signConfig_needSave=true;
    },

    default_loadUserInfo(paramData){
      if (paramData.signed_In           ) {this.signed_In           =paramData.signed_In           ;} else {this.signed_In           =false;};
      if (paramData.sign_requirePassword) {this.sign_requirePassword=paramData.sign_requirePassword;} else {this.sign_requirePassword=false;};
      if (paramData.sessionID           ) {this.sessionID           =paramData.sessionID           ;} else {this.sessionID           =''   ;};

      if (paramData.userInfo) {
        this.user_nickName=paramData.userInfo.nickName;
        this.user_Info=this.copy_jsonObject(paramData.userInfo);
      };
      if (!this.signed_In) {
        if (this.sign_requirePassword) {
          if (this.user_Info.preFix==null || this.user_Info.preFix==undefined || this.user_Info.preFix=='') return;
          if (this.user_Info.sufFix==null || this.user_Info.sufFix==undefined || this.user_Info.sufFix=='') return;

          this.pass_preFix=this.user_Info.preFix;
          this.pass_sufFix=this.user_Info.sufFix;

          this.signConfig.userName=this.user_Name;
          this.signConfig.sessionID=this.sessionID;
          this.user_fixedPassword=this.get_upcaseHash(this.get_upcaseHash(this.user_passWord+this.pass_preFix)+this.pass_sufFix);
          this.signConfig.passWord=this.user_fixedPassword;
          this.default_signIn(); 
          return;
        }
        this.show_Notify_error(this.get_Text('{{errorMessage_user_sign_in}}','Auto sign in failed'));
        return;
      } 
      else {
        if (window.hardCore){
          this.show_Notify_success(this.get_Text('Success: '+'User signed in.'));
        }
        this.save_initData();
      }

      if (paramData.userPermissions) {this.user_Permissions=this.copy_jsonObject(paramData.userPermissions);} else {this.user_Permissions={}};
      if (paramData.userRoles      ) {this.user_Roles      =this.copy_jsonObject(paramData.userRoles      );} else {this.user_Roles      ={}};
      if (paramData.userGroups     ) {this.user_Groups     =this.copy_jsonObject(paramData.userGroups     );} else {this.user_Groups     ={}};

      this.userInfo_Updated=true;
    },

    try_loadUserInfo(paramData){
      if (!paramData) return;  
      if (!paramData.responseJSON) return;

      if (!paramData.responseJSON.userInfo) {
        this.show_Notify_error(this.get_Text('{{errorMessage_user_sign_in}}','Auto sign in failed'));
        var self=this;
        if (this.handle_signIn) clearTimeout(this.handle_signIn);
        this.handle_signIn=this.set_Timeout(this.default_signIn,60000);
        return;
      };

      if ((this.do_loadUserInfo)&&(typeof this.do_loadUserInfo=='function')){
        this.do_loadUserInfo();
      }
      else this.default_loadUserInfo(paramData.responseJSON);
      this.trigger_needUpdate(); 
    },

    do_signIn(paramInfo){
      if (!this.signConfig) return;

      if (this.handle_signIn){
        clearTimeout(this.handle_signIn);
        this.handle_signIn=0;
      };

      if (paramInfo){
        this.rebuild_signInfo(paramInfo.userName,paramInfo.userPass,paramInfo.autoSign,paramInfo.needSave,paramInfo.newSign);
        this.save_initData();
      }

      if (!this.signConfig.signType){   //such as facebook wechat , default=default script login
        if (paramInfo) {this.default_signIn();}
        else {
          if (this.signAuto){
            this.default_signIn(); 
          }
        }
      };  
    },

    default_signIn(){    //default script login
      this.serverApi_jsonUser(0,{Function:'sign_In',signConfig:this.signConfig},this.try_loadUserInfo); 
    },

    save_initData(){
      localStorage.setItem('signAuto',this.signAuto);
      this.save_signConfig();
    },

    load_initData(){
      this.signAuto=localStorage.getItem('signAuto');
      this.load_signConfig();
    },

    save_signConfig(){
      if (!this.signConfig_needSave) return;

      if (this.signConfig) this.save_jsonObject('signConfig',this.signConfig);
    },

    load_signConfig(){
      try {this.signConfig=this.load_jsonObject('signConfig');} 
      catch(ex){this.signConfig={};this.signConfig_needSave=true;};

      if (!this.signConfig         ) {this.signConfig         ={}; this.signConfig_needSave=true;};
      if (!this.signConfig.signType) {this.signConfig.signType=''; this.signConfig_needSave=true;};

      if (!this.signConfig.clientID) {this.signConfig.clientID=this.objGID; this.signConfig_needSave=true;};
      this.clientID=this.signConfig.clientID;

      if (this.signConfig.userName ) this.user_Name=this.signConfig.userName;

      if (this.signConfig.userToken) {

      }this.user_Token=this.objGID; 
    },

    trigger_needUpdate(){
      this.$emit('need_Update');      
    },    
  },

  created:function(){
    this.userInfo_Updated=false;
    this.load_initData();

    this.do_signIn();
  },

  mounted:function(){
  }
}
</script>