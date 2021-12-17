<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.12.09                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
  </div>
</template>

<script>
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  data() {
    return {
      data: [
        {
          label: 'test',
          children: [
            {
              label: 'test2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    },

    setTree(paramData) {
      if (this.verifyTreeData(paramData)) {
        return;
      }

      this.data = paramData;
    },

    verifyTreeData(paramData) {
      if (!paramData || !Array.isArray(paramData)) return true;

      let tempVerifyResult = false;

      paramData.forEach(item => {
        if (!item.label) {
          return true;
        }
      })

      return tempVerifyResult;
    }
  },

  created() {

  },

  mounted() {

  }
}
</script>