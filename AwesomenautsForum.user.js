// ==UserScript==
// @name          Awesomenauts forum addon
// @description   See http://www.awesomenauts.com/forum/viewtopic.php?f=6&t=14730 for more info.
// @version       3.0
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// @include       http://www.awesomenauts.com/forum*
// @include       https://www.awesomenauts.com/forum*
// ==/UserScript==

if(window.top == window) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForum.js";
  document.body.appendChild(script);
} 
