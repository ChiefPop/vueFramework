<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.20                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <div class="line">
      <el-button @click.native="loginBtn" style="width: 100%">Sign in</el-button>
    </div>
  </div>
</template>

<script>
const __className__ = 'baseCpn_loginBtn';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  className: __className__,

  data() {
    return {
      
    }
  },

  methods: {
    loginBtn() {
      
    }
  },

  created() {
    
  },

  mounted() {
    // this.set_bgColor('red');
  }
}
</script>

<style scoped>
.line {
  /* background: burlywood; */
  /* height: 30px; */
  width: 90%;
  margin: 40px 5% 0px 5%;
}
</style>