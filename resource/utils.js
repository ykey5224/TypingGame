export const renderElement =(el, value) => {
  if( el.tagName =="INPUT"){
     el.value = value;
   }else{
    el.innerHTML = value;
   }
} 

