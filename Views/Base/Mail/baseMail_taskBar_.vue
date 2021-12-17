<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.12.03                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div class="mail-taskBar-line">
    <el-button size="mini" @click="sendEmail" class="el-icon-folder-opened"></el-button>
  </div>
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  data() {
    return {
      
    }
  },

  methods: {
    sendEmail() {
      console.log('send mail');
    }
  },

  created() {

  },

  mounted() {

  }
}
</script>

<style scoped>
.mail-taskBar-line {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px;
  flex-wrap: nowrap;
}
</style>