<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.26                                //
//  common_Project: Project info such as page,frames,component Classes          //
//******************************************************************************//
</script>

<template></template>

<script>

export default {
  name:'common_Project',
  components:{},
  data(){
    return{
      componentClasses:[]
     ,componentClass  :{}
     ,frameClasses:[]
     ,frameClass  :{}
     ,pageClasses:[]
     ,pageClass  :{}
    };
  },

  methods:{
    get_pageClass(paramName){
      if (this.pageClass[paramName]) return this.pageClass[paramName]
      else return null;
    },

    register_Frame(paramFrame){
      if (!paramFrame) return;

      this.frameClasses.push({
        Name     :paramFrame.name
      });
      this.frameClasse[paramFrame.name]=paramFrame;
    },


    register_pageFinish(paramRouter){
      if (!paramRouter) return;
      if (!paramRouter.options) return; 
      if (!paramRouter.options.routes) return;

      paramRouter.addRoutes(paramRouter.options.routes);
    },
    
    register_Page(paramRouter,paramPage){
      if (!paramPage) return;
      if (!paramRouter) return;
      if (!paramRouter.options) return; 
      if (!paramRouter.options.routes) return;

      paramRouter.options.routes.push({path:paramPage.path,name:paramPage.name,component:paramPage});
      this.pageClasses.push({
        Path     :paramPage.path
       ,Name     :paramPage.name
       ,pageClass:paramPage
      });
      this.pageClass[paramPage.name]=paramPage;
    },
  },

  created:function(){
  },

  mounted:function(){
  },
}

</script>

