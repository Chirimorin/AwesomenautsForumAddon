// ==UserScript==
// @name          Awesomenauts forum addon
// @description   Allows for the usage of middle click and ctrl+click without problems. 
// @version       1.0
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// ==/UserScript==

var tableElements = document.getElementsByTagName('td');
for (var i = tableElements.length - 1; i >= 0; i--) {
  tableElements[i].removeAttribute ("onclick");
}
