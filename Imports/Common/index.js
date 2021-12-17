import common_Project from '@/Projects/Frameworks/Models/Common/common_Project_';
import common_jsonQuery from '@/Projects/Frameworks/Models/Common/common_jsonQuery_';

const components =[common_jsonQuery];
let install=function(Vue){
  if (typeof window !=='undefined' && window.Vue){
    install(window.Vue);
    return;
  }

  components.map(
    component=>{Vue.component(component.name,component);}
  );

  Vue.prototype.$jsonQuery=Vue.prototype.$jsonQuery || new Vue(common_jsonQuery);  
  Vue.prototype.$Project  =Vue.prototype.$Project   || new Vue(common_Project  );  

}

export default{install}
