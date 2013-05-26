// ==UserScript==
// @name          Awesomenauts forum addon
// @description   Allows for the usage of middle click and ctrl+click without problems. Also fixes images that are too big. 
// @version       1.7
// @author        Chirimorin
// @run-at        document-end
// @match         http://www.awesomenauts.com/forum*
// @match         https://www.awesomenauts.com/forum*
// ==/UserScript==

//var tableElements = document.getElementsByTagName('td');
//for (var i = 0; i < tableElements.length; i++) 
//{
  //Thanks to Nodja for the code to keep onclick behavior. 
  //tableElements[i].setAttribute("onclick","if (event.button == 0 && event.ctrlKey == false) " + elem.getAttribute("onclick"));
//}


//Thanks to Nodja for the code to keep onclick behavior. 
// gets all td elements with class="row1 clickable"
var allClickables = document.evaluate
                                    (
                                      '//td[@class="row1 clickable"]',
                                      document, 
                                      null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                      null
                                    );

//replaces the onclick to check for left button and ctrl key
for (var i=0; i<allClickables.snapshotLength; i++) 
{
  var elem = allClickables.snapshotItem(i);
  elem.setAttribute("onclick","if (event.button == 0 && event.ctrlKey == false) " + elem.getAttribute("onclick"));
}


var postBodys = document.getElementsByClassName('postbody');
for (i=0; i<postBodys.length ; i++) 
{
    var imgs = postBodys[i].getElementsByTagName('img');
    for (j=0; j<imgs.length; j++) 
    {
        imgs[j].style.maxWidth = '700px';
		imgs[j].addEventListener('click', function(event) 
            {
				if (event.currentTarget.style.maxWidth == 'none') 
                {
					event.currentTarget.style.maxWidth = '700px';
				} 
                else 
                {
					event.currentTarget.style.maxWidth = 'none';
				}
			}, false);
    }
}
