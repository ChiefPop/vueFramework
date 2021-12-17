<template lang="pug">
  include baseView_header_
</template>

<script>
const __className__ = 'baseView_header'
const __numberToDay__ = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {
      activeIndex: '',
      backgroundColor: '#2b82d6',
      textColor: 'white',
      activeTextColor: 'white',

      headerConstruction: [
        
      ]
    }
  },

  methods: {
    constructionOfDate(paramOfDispaly, prefix, sufix) {
      if (!paramOfDispaly) {
        console.error('paramOfDisplay is' + paramOfDispaly);
        return;
      }
      
      let date = new Date();
      let resultString = '';

      if (prefix) {
        resultString += prefix
      }
      if (paramOfDispaly.year) {
        resultString += date.getFullYear() + '/';
      }
      if (paramOfDispaly.month) {
        resultString += (date.getMonth() + 1) + '/';
      }
      if (paramOfDispaly.date) {
        resultString += date.getDate() + '/';
      }
      if (paramOfDispaly.day) {
        resultString += __numberToDay__[date.getDay()]; 
      }
      if (sufix) {
        resultString += sufix;
      }

      return resultString;
    },

    clickHandlerOfNULL() {
      
    },

    clickMenu(index) {
      
    }
   
  },

  beforeCreate() {
    
  },

  created() {
    for (let i = 0; i < this.headerConstruction.length; ++i) {
      if (!this.headerConstruction[i].clickHandler) {
        this.headerConstruction[i].clickHandler = this.clickHandlerOfNULL;
      }
    }

  },

  mounted() {

  },

  beforeDestroy() {

  }
}
</script>

<style>
  html {
    font-size: 16px;
  }

  .headerText {
    border: none;
  }
</style>
