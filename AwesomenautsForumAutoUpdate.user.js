// ==UserScript==
// @name          Auto updating Awesomenauts forum addon
// @description   Auto updating version of the Awesomenauts forum addon. 
// @version       2.0
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// ==/UserScript==

if(window.top == window) {
alert('test1');
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForum.js"
  document.body.appendChild(script);
  alert('test2');
} 