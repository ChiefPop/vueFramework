<script>
  //******************************************************************************//
  //  This file is created by Ziyi Yan 2021.07.19                               //
  //  baseCpn Offer                                                                //
  //******************************************************************************//
</script>
<template>
  <div :style="offerStyle">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Executive" required>
        <el-input v-model="form.executiveStaff" placeholder="Please select an executive"></el-input>
        <xsjView_Button size="mini" style="position:absolute">Select Executive</xsjView_Button>
      </el-form-item>
      <el-form-item label="start time">
        <el-date-picker v-model="form.startData" type="date" placeholder="Please select a start time" style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="End time">
        <el-date-picker v-model="form.endData" type="date" placeholder="Please select an end time" style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Title">
        <el-input v-model="form.title" placeholder="Please enter a title"></el-input>
      </el-form-item>
      <el-form-item label="Content">
        <el-input v-model="form.content" placeholder="Please select content"></el-input>
      </el-form-item>
      <el-form-item label="Position">
        <el-input v-model="form.position" placeholder="Please select a location"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  const __className__ = 'baseCpn_Offer';
  import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
  export default {
    extends: commonView_Component,
    className: __className__,
    data() {
      return {
        form: {
          executiveStaff: '',
          title: '',
          content: '',
          position: '',
          startData: '',
          endData: '',
        },
        offerStyle: {
          width: '400px',
          padding: '20px',
        },
      }
    },
    methods: {
      set_Position(paramWidth, paramHeight, paramLeft, paramTop) {
        if (!this.$el) return;
        if (this.$el) {
          this.$el.style.width = paramWidth.toString() + "px";
          this.$el.style.height = paramHeight.toString() + "px";
          this.$el.style.left = paramLeft.toString() + "px";
          this.$el.style.top = paramTop.toString() + "px";
        }
      },
    },
    created() {},

    mounted() {
      // console.log(this.$Instances.offer);
    }
  }
</script>
<style>

</style>