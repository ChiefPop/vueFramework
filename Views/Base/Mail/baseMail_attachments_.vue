<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2021.01.08                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">Click to upload</el-button>
    </el-upload>
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

  },

  created() {

  },

  mounted() {

  }
}
</script>