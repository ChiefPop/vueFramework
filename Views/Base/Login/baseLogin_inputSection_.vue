<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.20                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <div class="signIn">
      Sign In
    </div>

    <div class="line" style="margin-top: 10px">
      <el-input v-model="account" placeholder="Please input account" clearable></el-input>
    </div>

    <div class="line">
      <el-input v-model="password" placeholder="Please input password" clearable show-password></el-input>
    </div>

    <div class="line">
      <el-checkbox v-model="passwordSaved" style="float: left" @change="passwordSavedChange">Save password</el-checkbox>
      <el-checkbox v-model="signAuto" style="float: right" @change="autoSignInChange">Auto sign in</el-checkbox>
    </div>
  </div>
</template>

<script>
const __className__ = 'baseCpn_inputSection';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  className: __className__,

  data() {
    return {
      account: '',

      password: '',

      signAuto: false,

      passwordSaved: false
    }
  },

  methods: {
    passwordSavedChange() {
      if (!this.passwordSaved) {
        this.signAuto = false;
      }
    },

    autoSignInChange() {
      if (this.signAuto) {
        this.passwordSaved = true;
      }
    }
  },

  created() {
    
  },

  mounted() {

  }
}
</script>

<style scoped>
.line {
  /* background: burlywood; */
  height: 30px;
  width: 90%;
  margin: 20px 5%;
}

.signIn {
  width: 100%;
  text-align: center;
  margin: 10% 0;
  text-shadow: 0 0 10px;
  font-size: 2em;
  letter-spacing: 1px;
  color: #000;
}
</style>