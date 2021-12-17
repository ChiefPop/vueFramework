<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.11.24                                //
//  common Collapse                                                             //
//******************************************************************************//
</script>

<template lang="pug">
include commonView_Collapse_
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
import { memberExpression } from 'babel-types';

export default {
  name:'commonView_Collapse',
  extends:commonView_Component,
  data() {
    return {
      activeNames: ['1']
     ,onChange:null
    };
  },
  components:{commonView_Component},
  methods: {
    handleChange(paramVal) {
      if (this.onChange) this.onChange(paramVal);
    }
  },    

};

</script>
