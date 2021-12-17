<script>
//******************************************************************************//
//  This file is created by ziyi yan 2021.04.15                                 //
//******************************************************************************//
</script>

<template>
  <div>
    <i class="el-icon-circle-close" @click="cancelElection"></i>
  </div>
</template>

<script>
import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
const __className__ = "baseView_cancelIcon";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {};
  },
  components: { commonView_Component },
  methods: {
    cancelElection() {
      this.emit_event("election", "election");
    },
  },
  created: function () {},
  mounted: function () {
    this.$el.children[0].style.position = "absolute";
    this.$el.children[0].style.fontSize = window.buttomForm_incoSize + "px";
    this.$el.children[0].style.left =
      document.body.clientWidth - window.buttomForm_incoSize + "px";
  },

  beforeDesotry: function () {},
};
</script>