!function(){var fontSize=parseFloat(getComputedStyle(document.getElementsByTagName('html')[0], null)['font-size']);function a(){document.documentElement.style.fontSize=document.documentElement.clientWidth/750*10/fontSize*1000+"%"}var b=null;window.addEventListener("resize",function(){clearTimeout(b);b=setTimeout(a,300)},!1);a()}(window);