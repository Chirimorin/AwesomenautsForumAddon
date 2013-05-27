//Making clear the test version is active
var BottomLogo = document.getElementById('bottom_logo');
BottomLogo.innerHTML += '<h2>Awesomenauts forum addon TEST MODE</h2>';

//Changing the links so test mode is kept even when changing pages. 
//var links = document.evaluate
//                            (
//                                '//a[contains(@href)]', 
//                                document.body, 
//                                null, 
//                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
//                                null
//                            ); 

//var links = document.getElementsByTagName('a');

var links = document.links;

//for (var i=0; i < links.snapshotLength; i++) 
for (var i=0; i < links.length; i++)
{ 
    //var thisLink = links.snapshotItem(i); 
    var thisLink = links[i]
    alert('link found: ' + thisLink.href);
    if (thisLink.href.search('forum') != -1) //make sure the link is to a forum page
    {
        alert('forum found');
        if ( thisLink.href.search('?') == -1 ) 
        {
            alert('? not found');
            thisLink.href += '?ForumScriptTest=1';
        }
        else
        {
            alert('? found');
            thisLink.href += '&ForumScriptTest=1';
        }
    }
} 

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
//End of Nodjas script


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

