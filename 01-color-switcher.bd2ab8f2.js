const t={buttonStart:document.querySelector("[data-start]"),buttonStop:document.querySelector("[data-stop]"),intervalID:null};function e(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.buttonStart.addEventListener("click",(function(){e(),t.intervalID=setInterval(e,1e3),t.buttonStart.setAttribute("disabled","disabled");t.buttonStop.hasAttribute("disabled")&&t.buttonStop.removeAttribute("disabled")})),t.buttonStop.addEventListener("click",(function(){clearInterval(t.intervalID),t.buttonStop.setAttribute("disabled","disabled"),t.buttonStart.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.bd2ab8f2.js.map