<script>
//******************************************************************************//
//  This file is created by jyyang    2020.12.16                                //
//  the user Info                                                               //
//******************************************************************************//
</script>

<template>
  
</template>

<script>
const __LOCAL_HOOKS_NAME__ = '__localhooks__';
const __LOCAL_USER_INFO__ = '__localUserInfo__';
const __TEST_MODEL_LOG__ = 'api in test-mode';

import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

export default {
  name: 'base_userInfo',

  extends: common_Object,

  data() {
    return {
      userInfo_: {
        userName: '',
        userPassword: '',
        userToken: '',
        userPhoneNUmber: '',

        extendInfo: null,
      },

      hooks_: {
        signAuto: false,
        passwordSaved: false,
        testMode: false
      },

      localUserInfo_: {
        userName: '',
        userPassword: ''
      }
    }
  },

  methods: {
    _login(paramFunc, paramCallback) {
      if (!paramFunc && typeof paramCallback != 'function') return;

      this.do_server_json_function()
      .then(result => {
        paramCallback(result);
      })
    },

    _commitUserInfo(paramFunc, paramCallback) {
      if (!paramFunc && typeof paramCallback != 'function') return;

      this.do_server_json_function()
      .then(result => {
        paramCallback(result);
      })
    },

    _changeTestModeState(paramHook) {
      this.hooks_.testMode = paramHook;
    },

    do_server_json_function(paramFunc) {
      return new Promise((reslove, reject) => {
        if (this.hooks_.testMode) {
          setTimeout(() => {
            reslove(__TEST_MODEL_LOG__);
          }, 1000);
        } else {
          this.server_jsonFunction(
            0,
            paramFunc,
            result => { reslove(result); }
          )
        }
      })
    },

    initHooks() {
      const hooks = JSON.parse(localStorage.getItem(__LOCAL_HOOKS_NAME__));

      if (hooks && typeof hooks === 'object') {
        this.hooks_ = hooks;
      }
    },

    initLocalUserInfo() {
      const userInfo = JSON.parse(localStorage.getItem(__LOCAL_USER_INFO__));

      if (userInfo && typeof userInfo === 'object') {
        this.localUserInfo_ = userInfo;
      }
    },

    saveHooks() {
      localStorage.setItem(__LOCAL_HOOKS_NAME__, JSON.stringify(this.hooks_));
    },

    saveLocalUsers() {
      localStorage.setItem(__LOCAL_USER_INFO__, JSON.stringify(this.localUserInfo_));
    },

    updateHook(paramHook) {
      if (typeof paramHook != 'object') return;

      Object.keys(paramHook).forEach(key => {
        this.hooks_[key] = paramHook[key];
      })

      this.saveHooks();
    },

    updatelocalUserInfo(paramLocalUserInfo) {
      if (typeof paramLocalUserInfo != 'object') return;

      Object.keys(paramLocalUserInfo).forEach(key => {
        this.localUserInfo_[key] = paramLocalUserInfo[key];
      });

      this.saveLocalUsers();
    },

    resetHooks() {
      const hooks = this.hooks_;

      Object.keys(hooks).forEach(key => {
        if (typeof key === 'boolean') { 
          hooks[key] = false;
        } else {
          delete hooks[key];
        }
      })

      localStorage.setItem(__LOCAL_HOOKS_NAME__, JSON.stringify(hooks));
    },

    resetLocalUserInfo() {
      const userInfo = this.localUserInfo_;

      Object.keys(userInfo).forEach(key => {
        userInfo[key] = '';
      })

      localStorage.setItem(__LOCAL_USER_INFO__, JSON.stringify(userInfo));
    }
  },

  created() {
    this.initHooks();
    this.initLocalUserInfo();
  },

  mounted() {

  }
}
</script>

