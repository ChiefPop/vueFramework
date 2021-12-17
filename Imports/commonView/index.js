import commonDef_displayInfo from '@/Projects/Frameworks/Views/Common/commonDef_displayInfo_';

const components =[commonDef_displayInfo];
let install=function(Vue){
  if (typeof window !=='undefined' && window.Vue){
    install(window.Vue);
    return;
  }

  components.map(
    component=>{Vue.component(component.name,component);}
  );

  Vue.prototype.$displayInfo=Vue.prototype.$displayInfo || new Vue(commonDef_displayInfo);  
}

export default{install}


