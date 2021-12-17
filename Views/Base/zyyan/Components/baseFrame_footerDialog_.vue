<template>
    <div>
    </div>
    </template>
    
    <script>
    const __className__ = "baseFrame_footerDialog";
    import commonView_Frame from "@/Projects/Frameworks/Views/Common/commonView_Frame_";
    import baseView_cancelIcon from '@/Projects/Frameworks/Views/Base/zyyan/Components/footerDialog/baseView_cancelIcon_';
    export default {
      extends: commonView_Frame,
      name: __className__,
      className: __className__,
    
      data() {
        return {};
      },
    
      components: {},
    
      methods: {
        auto_reSize(paramOptions){
          this.Width = "%W%";
          this.Height = '%H%';
          this.Top ='0';
          this.Left='0';
        },
      },
    
      created() {
          this.new_Component(baseView_cancelIcon)
      },
    
      mounted() {
     
      },
    };
    </script>
    
    <style scoped>
  
    </style>