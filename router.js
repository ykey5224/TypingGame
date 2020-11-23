const gameViewHTML = require('./resource/views/game.html');
const resultViewHTML = require('./resource/views/result.html');
const routes = {
  '/': gameViewHTML,
  '/result':resultViewHTML
}
//initial router
const initialRoutes =  ( el) => {
  renderHTML(el, routes['/'])
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
}

// history router
const  historyRouterPush = (pathName, el,data) => {
  history.pushState({data}, pathName, location.origin + pathName)
  location.href=pathName;
  //innerHTML에 코드를 뿌리면 webpack으로 번들링한 코드가 없는 문제로 해당 path 로 이동
  //renderHTML(el, routes[pathName])
}

// render
const renderHTML =(el, route) => {
  el.innerHTML = route
}

export {initialRoutes,historyRouterPush };
