// ==UserScript==
// @name          Awesomenauts forum addon -TEST VERSION-
// @description   See http://www.awesomenauts.com/forum/viewtopic.php?f=6&t=14730 for more info.
// @version       2.0
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// ==/UserScript==

if(window.top == window) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumTestVersion.js"
  document.body.appendChild(script);
} 
