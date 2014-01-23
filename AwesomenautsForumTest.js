//TEST SCRIPT ONLY, DO NOT COPY

//Replace the banner at the top of the page with the test version banner
var imgs = document.getElementsByTagName ('img');
for (i=0; i<imgs.length ; i++) 
{
    if(imgs[i].src == "http://www.awesomenauts.com/forum/styles/awesome/imageset/sitelogo.jpg")
    {
        imgs[i].src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/Resources/ReplaceBannerTest.png";
    }
}

//Get all the links on the page for editing
var links = document.links;

//Add the ForumScriptTest to all forum links
for (var i=0; i < links.length; i++)
{ 
    var thisLink = links[i]
    if (thisLink.href.search('awesomenauts.com/forum') != -1) //make sure the link is to a forum page
    {
        if (thisLink.href.search('#') == -1)
        {
            if (thisLink.href.search('\\?') == -1 ) 
            {
                thisLink.href += '?ForumScriptTest=1';
            }
            else
            {
                thisLink.href += '&ForumScriptTest=1';
            }
        }
        else
        {
            var originalLinkSplit = thisLink.href.split("#");
            if (thisLink.href.search('\\?') == -1 ) 
            {
                thisLink.href = originalLinkSplit[0] + '?ForumScriptTest=1#' + originalLinkSplit[1];
            }
            else
            {
                thisLink.href = originalLinkSplit[0] + '&ForumScriptTest=1#' + originalLinkSplit[1];
            }
        }
    }
}


//NORMAL SCRIPT STARTS HERE

//Insert string function for use further in the script.
String.prototype.insert = function (index, string) 
{
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

//Find the username of the person who is logged in.
//Will return bullshit if nobody is logged in, but this is just used for searching so no harm is done.
var ForumButtons = document.getElementsByClassName('forum-buttons');
for (i=0; i<ForumButtons.length; i++)
{
    var UserName = ForumButtons[i].innerHTML.substring(ForumButtons[i].innerHTML.indexOf("Logout [ ") + 9, ForumButtons[i].innerHTML.indexOf(" ]"));
}

//Find posts by the logged in user and mark the post.
var PostAuthors = document.getElementsByClassName('postauthor');
var PostBodys = document.getElementsByClassName('row-post-body');
for (i=0; i<PostAuthors.length; i++)
{
    if (PostAuthors[i].innerHTML.indexOf(UserName) != -1 && window.location.href.indexOf("posting.php") == -1)
    {
        //PostBodys[((i+1)*2)-2].innerHTML = PostBodys[((i+1)*2)-2].innerHTML.insert((PostBodys[((i+1)*2)-2].innerHTML.indexOf('User avatar')+12)," style='border:3px solid #0000FF'");
		PostBodys[((i+1)*2)-2].style.background="#0000ff";
		var PostDetails = PostBodys[((i+1)*2)-2].getElementsByClassName('postdetails');
		PostDetails[0].style.color="#ffffff";
    }
}

//Thanks to Nodja for the code to keep onclick behavior. 
//gets all td elements with class="row1 clickable"
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
    postBodys[i].style.maxWidth = '764px';
    postBodys[i].style.wordWrap = 'break-word';
    
    var imgs = postBodys[i].getElementsByTagName('img');
    for (j=0; j<imgs.length; j++) 
    {
        imgs[j].style.maxWidth = '764px';
		imgs[j].addEventListener('click', function(event) 
            {
				if (event.currentTarget.style.maxWidth == 'none') 
                {
					event.currentTarget.style.maxWidth = '764px';
				} 
                else 
                {
					event.currentTarget.style.maxWidth = 'none';
				}
			}, false);
    }
}

//Append the smilies code
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/ListSmilies.js"
document.body.appendChild(script);


