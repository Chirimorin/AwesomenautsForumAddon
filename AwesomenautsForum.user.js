// ==UserScript==
// @name          Awesomenauts forum addon
// @description   Allows for the usage of middle click and ctrl+click without problems. Also fixes images that are too big. 
// @version       1.6
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// ==/UserScript==

var tableElements = document.getElementsByTagName('td');
for (var i = 0; i < tableElements.length; i++) 
{
  tableElements[i].removeAttribute ("onclick");
}


var postBodys = document.getElementsByClassName('postbody');
for (i=0; i<postBodys.length ; i++) 
{
    var imgs = postBodys[i].getElementsByTagName('img');
    for (j=0; j<imgs.length; j++) 
    {
        imgs[j].style.maxWidth = '700px';
        //imgs[j].title = 'Click for the original size';
		imgs[j].addEventListener('click', function(event) 
            {
				if (event.currentTarget.style.maxWidth == 'none') 
                {
					event.currentTarget.style.maxWidth = '700px';
					//event.currentTarget.title = 'Click for the original size';
				} 
                else 
                {
					event.currentTarget.style.maxWidth = 'none';
					//event.currentTarget.title = 'Click for the reduced size';
				}
			}, false);
    }
}