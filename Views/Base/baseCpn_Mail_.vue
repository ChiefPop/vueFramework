<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.19                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div :style="mailStyle">

  </div>
</template>

<script>
const __className__ = 'baseCpn_Mail'

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

import baseMail_editor from '@/Projects/Frameworks/Views/Base/Mail/baseMail_editor_';
import baseMail_mailInfoSection from '@/Projects/Frameworks/Views/Base/Mail/baseMail_mailInfoSection_';
import baseMail_taskBar from '@/Projects/Frameworks/Views/Base/Mail/baseMail_taskBar_';

import mail_smtp from '@/Projects/Frameworks/Models/Mail/mail_smtp_';


export default {
  extends: commonView_Component,

  name: __className__,

  className: __className__,

  components: { baseMail_editor, baseMail_mailInfoSection },

  mixins: [ mail_smtp ],

  data() {
    return {
      editor: null,
      cpn_mailInfo: null,
      cpn_taskBar: null,

      mailStyle: {
        
      }
    }
  },

  methods: {
    auto_reSize() {
      
    },

    setMailReceivers(paramReceivers) {
      this.cpn_mailInfo.receivers = paramReceivers;
    },

    setSendBtnClickEvent(paramSendBtnClickHandler) {
      if (typeof paramSendBtnClickHandler != 'function') return;

      this.cpn_taskBar.sendEmail = paramSendBtnClickHandler;
    },

    getEmailContent() {
      return this.editor.value;
    }
  },

  created() {
    this.cpn_mailInfo = this.new_Component(baseMail_mailInfoSection);
    this.cpn_taskBar = this.new_Component(baseMail_taskBar);
    this.editor = this.new_Component(baseMail_editor);
  },

  mounted() {
    
  }
}
</script>

<style>
.baseCpn_Mail {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 16px;
  overflow: auto;
}
</style>