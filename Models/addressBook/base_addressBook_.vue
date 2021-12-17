<script>
//******************************************************************************//
//  This file is created by jyyang    2020.12.04                                //
//  the user Info                                                               //
//******************************************************************************//
</script>

<template>
  
</template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

import base_userInfo from '@/Projects/Frameworks/Models/Base/base_userInfo_';

export default {
  extends: common_Object,

  data() {
    return {
      addressBook_user_info: {
        user_name: '',

        user_pass: '',

        user_roles: {},

        user_groups: {}
      },
    }
  },

  methods: {
    verifyParam(...paramArr) {
      let tempResult = false;

      paramArr.forEach(item => {
        if (item instanceof Object) {
          Object.keys(item).forEach(key => {
            if (!item[key]) {
              tempResult = false;
            }
          })
        } else {
          if (!tempResult) {
            tempResult = false;
          }
        }
      });

      return tempResult;
    },

    setUserInfo(paramUserInfo) {
      if (!paramUserInfo) return;

      if (paramUserInfo.user_name) {
        this.addressBook_user_info.user_name = paramUserInfo.user_name;
      }
      if (paramUserInfo.user_pass) {
        this.addressBook_user_info.user_pass = paramUserInfo.user_pass;
      }
      if (paramUserInfo.user_roles) {
        this.addressBook_user_info.user_name = paramUserInfo.user_roles;
      }
      if (paramUserInfo.user_groups) {
        this.addressBook_user_info.user_groups = paramUserInfo.user_groups;
      }
    },

    _signIn(signInCallback) {
      if (!this.addressBook_user_info) return;

      if ((!this.addressBook_user_info.user_name) || (!this.addressBook_user_info.user_pass)) return;

      this.do_signIn()
      .then(result => {
        // api fromat (need fix)
        if (result.Results) {
          this.addressBook_user_info.user_roles = result.user_roles;
          this.addressBook_user_info.user_groups = result.user_groups;
        }

        signInCallback(result);
      })
    },

    _updatGrup(paramGroup) {
      if (!group) return;

      this.update_group_info(paramGroup)
      .then(result => {
        // need fix
      })
    },

    _updateUserInfo(paramUserInfo) {
      if (!paramUserInfo) return;
      
      this.updateaddressBook_user_info(paramUserInfo)
      .then(result => {
        // need fix
      });
    },

    _updateUserGroups(paramUserGroups) {
      if (!paramUserGroups) return;

      this.update_user_groups(paramUserGroups)
      .then(result => {

      })
    },

    do_signIn(paramUserName, paramUserPass) {
      let tempObj = {
        Function: 'sign_in',
        userName: paramUserName,
        userPass: paramUserPass
      }

      return this.do_server_jsonFunction(tempObj);
    },

    update_group_info(user_groups) {
      let tempObj = {
        Function: 'update_group_info',
        user_groups: user_groups
      }

      return this.do_server_jsonFunction(tempObj);
    },

    updateaddressBook_user_info(user_info) {
      return new Promise((resolve, reject) => {
        // need fix
        this.server_jsonFunction(
          0,
          {
            Function: 'updateaddressBook_user_info',

          },
          result => { resolve(result); }
        )
      })
    },

    update_user_groups(user_groups) {
      return new Promise((resolve, reject) => {
        // need fix
        this.server_jsonFunction(
          0,
          {
            Function: 'update_user_groups'
          },
          result => { resolve(result); }
        )
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
  },

  created() {

  },

  mounted() {
    
  }
}
</script>