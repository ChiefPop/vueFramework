<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2020.04.07                                //
//  baseView Table                                                              //
//******************************************************************************//
</script>
<template>
  <div />  <!-- this 'div' only used to prevent from using this component directly-->
</template>

<script>

import commonView_Component  from '@/Projects/Frameworks/Views/Common/commonView_Component_' ;
import commonView_Table      from '@/Projects/Frameworks/Views/Common/commonView_Table_'     ;
import commonView_Pagination from '@/Projects/Frameworks/Views/Common/commonView_Pagination_';

const __className__='baseView_Table';

export default {
  name     :__className__,
  className:__className__,  
  extends  :commonView_Component,
  components:{commonView_Component,commonView_Table,commonView_Pagination},

  data(){
    return {
      Table     :null
     ,Pagination:null
     
     ,tableInstance:null
     ,pageInstance :null
    }
  },

  methods:{},

  created:function(){
    this.tableInstance=this.new_Component(commonView_Table     );
    this.pageInstance =this.new_Component(commonView_Pagination);

    this.tableInstance.tableHeight=500;
  },

  mounted:function(){

  },

  beforeDesotry:function(){}
}

</script>