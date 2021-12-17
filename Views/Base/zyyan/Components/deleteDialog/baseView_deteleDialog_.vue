<script>
//******************************************************************************//
//  This file is created by ziyi yan 2021.04.15                                 //
//******************************************************************************//
</script>

<template>
  <div>
    <table
      width="100%"
      height="100%"
      style="border-collapse: collapse; margin: 0; padding: 0"
    >
      <tr>
        <td class="first_tr">
          <i
            class="el-dialog__close el-icon el-icon-close"
            @click="cancelContent"
          ></i>
        </td>
      </tr>
      <tr>
        <td class="second_tr">remove this content?</td>
      </tr>
      <tr>
        <td class="last_tr">
          <el-button @click="cancelContent">cancel</el-button>
          <el-button @click="determineContent" type="primary"
            >determine</el-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
const __className__ = "baseView_deteleDialog";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {};
  },

  components: { commonView_Component },
  methods: {
    determineContent() {
      this.emit_event("deleteContent");
    },
    cancelContent() {
      this.set_Hide();
    },
  },
  created: function () {},

  mounted: function () {},

  beforeDesotry: function () {},
};
</script>
<style>
table {
  position: absolute;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: white;
  font-size: 16px;
}
</style>