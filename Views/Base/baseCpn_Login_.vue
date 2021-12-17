<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.20                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div :style="mailStyle">

  </div>
</template>

<script>
const __className__ = 'baseCpn_Login';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

import baseLogin_inputSection from '@/Projects/Frameworks/Views/Base/Login/baseLogin_inputSection_';
import baseLogin_loginBtn from '@/Projects/Frameworks/Views/Base/Login/baseLogin_loginBtn_';
import base_userInfo from '@/Projects/Frameworks/Models/addressBook/base_userInfo_';

export default {
  extends: commonView_Component,

  className: __className__,

  mixins: [ base_userInfo ],

  data() {
    return {
      mailStyle: {
        background: '',
        margin: '',
        padding: '',
        height: '100%'
      },

      cpn_inputSection: null,

      cpn_loginBtn: null,


      loginCallback: null
    }
  },

  methods: {
    getInputSectionInfo() {
      return {
        account: this.cpn_inputSection.account,
        password: this.cpn_inputSection.password,
      }
    },

    setInputSectionInfo(paramData) {
      if (!paramData) return;

      this.cpn_inputSection.account = paramData.account;
      this.cpn_inputSection.password = paramData.password;
    },

    setLoginBtnClick(paramFunc) {
      if (typeof paramFunc != 'function') return;

      this.cpn_loginBtn.loginBtn = paramFunc;
    },

    login() {
      let inputInfo = this.getInputSectionInfo();
      const signAuto = this.cpn_inputSection.signAuto;
      const passwordSaved = this.cpn_inputSection.passwordSaved;
      
      this.updateHook({
        signAuto: signAuto,
        passwordSaved: passwordSaved
      });

      if (!passwordSaved) {
        this.resetLocalUserInfo();
      }

      if (passwordSaved) {
        this.updatelocalUserInfo({
          userName: inputInfo.account,
          userPassword: inputInfo.password          
        })
      }

      let tempFunc = {
        Function: 'login',
        name: inputInfo.account,
        password: inputInfo.password
      }
      
      this.hooks_.testMode = true;
      this._login(tempFunc ,(result) => {
        if (typeof this.loginCallback === 'function') {
          this.loginCallback(result);
        }
      });
    },

    do_login(paramCallback) {
      let tempLoginParam = this.getInputSectionInfo();

      if (!tempLoginParam.account || !tempLoginParam.password) return;

      this.do_server_jsonFunction({
        Function: 'login',
        account: tempLoginParam.account,
        password: tempLoginParam.password
      })
      .then(result => {
        paramCallback(result);
      })
    },

    do_server_jsonFunction(paramFunc) {
      return new Promise((resolve, reject) => {
        this.server_jsonFunction(
          0,
          paramFunc,
          result => { resolve(result); }
        )
      })
    },
    
    initView() {
      if (this.hooks_.signAuto) {
        this.cpn_inputSection.signAuto = true;
      }
      if (this.hooks_.passwordSaved) {
        this.cpn_inputSection.passwordSaved = true;
      }

      this.cpn_inputSection.account = this.localUserInfo_.userName;
      this.cpn_inputSection.password = this.localUserInfo_.userPassword;
    }
  },

  created() {
    this.cpn_inputSection = this.new_Component(baseLogin_inputSection);
    this.cpn_loginBtn = this.new_Component(baseLogin_loginBtn);
    this.cpn_loginBtn.loginBtn = this.login;
  },

  mounted() {
    this.initView();

    if(this.hooks_.signAuto) {
      this.login();
    }
  }
}
</script>