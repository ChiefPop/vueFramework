import base_Languages from '@/Projects/Frameworks/Models/Base/base_Languages_';
import base_Styles    from '@/Projects/Frameworks/Models/Base/base_Styles_'   ;
import base_userInfo  from '@/Projects/Frameworks/Models/Base/base_userInfo_'  ;

const components =[base_Languages,base_Styles,base_userInfo];
let install=function(Vue){
  if (typeof window !=='undefined' && window.Vue){
    install(window.Vue);
    return;
  }

  components.map(
    component=>{Vue.component(component.name,component);}
  );

  Vue.prototype.$Languages=Vue.prototype.$Languages || new Vue(base_Languages);  
  Vue.prototype.$Styles   =Vue.prototype.$Styles    || new Vue(base_Styles   );  
  Vue.prototype.$userInfo =Vue.prototype.$userInfo  || new Vue(base_userInfo );  
}

export default{install}
