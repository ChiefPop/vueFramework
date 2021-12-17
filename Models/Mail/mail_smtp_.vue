<script>
//******************************************************************************//
//  This file is created by jyyang 2020.11.25                                //
//******************************************************************************//
</script>

<template>
  
</template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

export default {
  extends: common_Object,

  data() {
    return {
      smtpCommandParam: {
        host: 'test',
        
        port: null,

        auth: {
          user: null,
          pass: null,
        },

        mailFrom: null,
        
        rcptTo: null,

        data: {
          from: null,
          to: null,
          subject: null,
          content: null
        },

        attachments: []
      }
    }
  },

  methods: {
    smtp_updateData(paramObj) {
      Object.keys(paramObj).forEach(key => {
        if (this.smtpCommandParam.hasOwnProperty(key)) {
          this.smtpCommandParam[key] = paramObj[key];
        }
      })
    },

    sendCommand(paramCommand) {
      console.log(paramCommand);
    },

    smtpCommand_ehlo() {
      this.sendCommand(`ehlo ${this.smtpCommandParam.host}`);
    },

    smtpCommand_auth_login() {
      this.sendCommand(`auth login`);
      this.sendCommand(btoa(this.smtpCommandParam.auth.user));
      this.sendCommand(btoa(this.smtpCommandParam.auth.pass));
    },

    smtpCommand_mail_from() {
      this.sendCommand(`mail from:<${this.smtpCommandParam.mailFrom}>`);
    },

    smtpCommand_rcpt_to() {
      if (Array.isArray(this.smtpCommandParam.rcptTo)) {
        this.smtpCommandParam.rcptTo.forEach(item => {
          this.sendCommand(`rcpt to:<${item}>`);
        })
      } else {
        console.error('param rcptTo is not Array')
      }
    },

    smtpCommand_data() {
      const data = this.smtpCommandParam.data;

      this.sendCommand('data');
      this.sendCommand(`from: <${data.from}>\nto: <${data.to}>\nsubject: ${data.subject}\n\n${data.content}\n.`)
    },

    verifyParam(...paramList) {
      let tempResult = false;

      paramList.forEach(item => {
        if (item instanceof Object) {
          if (!item) {
            console.error();
            tempResult = true;
          }
        } else {
          Object.keys(item).forEach(key => {
            if (!item[key]) {
              console.error(`param ${key} is ${item[key]}`);
              tempResult = true;
            }
          })
        }
      })

      return tempResult;
    },

    smtpAddAttachments(paramAttachments) {
      if (Array.isArray(paramAttachments)) {
        paramAttachments.forEach(item => {
          this.smtpCommandParam.attachments.push(item);
        })
      };
    },

    smtpClearAttachment() {
      this.smtpCommandParam.attachments = [];
    },

    smtpSendMail() {
      const smtpData = this.smtpCommandParam;

      if (this.verifyParam(smtpData)) {
        return;
      }

      console.log('here');
    }
  },

  created() {

  },

  mounted() {

  }
}
</script>