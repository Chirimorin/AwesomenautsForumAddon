//Replace the banner at the top of the page with the test version banner
var imgs = document.getElementsByTagName ('img');
for (i=0; i<imgs.length ; i++) 
{
    if(imgs[i].src == "http://www.awesomenauts.com/forum/styles/awesome/imageset/sitelogo.jpg")
    {
        imgs[i].src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/Resources/ReplaceBannerTest.png";
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

var ForumButtons = document.getElementsByClassName('forum-buttons');
for (i=0; i<ForumButtons.length; i++)
{
    //Find the username of the person who is logged in.
    //Will return bullshit if nobody is logged in, but this is just used for searching so no harm is done.
    var UserName = ForumButtons[i].innerHTML.substring(ForumButtons[i].innerHTML.indexOf("Logout [ ") + 9, ForumButtons[i].innerHTML.indexOf(" ]"));
   
	if (GetStorage('settingsLink')) //Add button for the options menu
	{
		ForumButtons[i].innerHTML = ForumButtons[i].innerHTML.insert((ForumButtons[i].innerHTML.indexOf('>Forum</a>')+91),"<a href=\"./ucp.php?i=main&mode=front\">Userscript Settings</a><br />");
		ForumButtons[i].style.backgroundSize="1px 40px";
	}
	else //white line in menu fix
	{
		ForumButtons[i].style.backgroundSize="1px 30px";
	}
}


if (GetStorage('markingMode') != 0)
{
	//Find posts by the logged in user and mark the post.
	var PostAuthors = document.getElementsByClassName('postauthor');
	var PostBodys = document.getElementsByClassName('row-post-body');
	for (i=0; i<PostAuthors.length; i++)
	{
		if (PostAuthors[i].innerHTML.indexOf(UserName) != -1 && window.location.href.indexOf("posting.php") == -1)
		{
			if (GetStorage('markingMode') == 1) //Outline avatar. 
			{
				PostBodys[((i+1)*2)-2].innerHTML = PostBodys[((i+1)*2)-2].innerHTML.insert((PostBodys[((i+1)*2)-2].innerHTML.indexOf('User avatar')+12)," style='border:3px solid " + GetStorage('markingColor') + "'");
			}
			if (GetStorage('markingMode') == 2) //Background color.
			{
				PostBodys[((i+1)*2)-2].style.background=GetStorage('markingColor');
				var PostDetails = PostBodys[((i+1)*2)-2].getElementsByClassName('postdetails');
				PostDetails[0].style.color=GetStorage('markingText');
			}
		}
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

if (GetStorage('extraSmilies')) //Do we want to load the extra smilies?
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/ListSmilies.js"
	document.body.appendChild(script);
}

if (GetStorage('strawpollEmbed')) //Auto embedding Strawpoll links
{
	var links = document.links;
	for (var i=0; i < links.length; i++)
	{ 
		var thisLink = links[i]
		if (thisLink.href.search('strawpoll.me/') != -1) //did we find a strawpoll link?
		{
			pollCode = thisLink.href.substring(thisLink.href.indexOf("strawpoll.me/")+13,thisLink.href.length);
			if (pollCode.length > 0) //Did we find a poll or just a link?
			{
				thisLink.parentNode.innerHTML += "<br /><br /><iframe src=\"http://strawpoll.me/embed_1/" + pollCode + "\" style=\"width: 600px; height: 390px; border: 0;\">Loading poll...</iframe>";
			}
		}
	}
}

//Options menu
if (window.location.href.indexOf("ucp.php") != -1)
{
    table = document.getElementsByClassName('tablebg');
    for (i=0; i<table.length; i++)
    {
		if (table[i].innerHTML.indexOf('Welcome to the User Control Panel.') != -1) //Check if this is the right panel for injecting code into. 
		{
			table[i].innerHTML = table[i].innerHTML.insert(8,"\
				<tr>\
					<th colspan=\"3\">Forum Userscript Settings</th>\
				</tr>\
				<tr>\
					<td class=\"row1\" colspan=\"3\" align=\"center\">\
						<table width=\"100%\" cellpadding=\"4\" cellspacing=\"1\">\
							<tr>\
								<td class=\"row1\" colspan=\"3\" align=\"center\">\
									<p class=\"genmed\">\
										Here you can change the settings for Chirimorin's forum userscript.<br />\
										All settings are applied automatically.<br />\
										For more info, please visit <a href=\"http://www.awesomenauts.com/forum/viewtopic.php?f=6&t=14730\">this topic</a>\
									</p>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Current version:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\">" + currentVersion +"</b>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Settings link:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"settingsLinkCheck\" onchange=\"SetStorage('settingsLink',this.checked)\"></b><br />\
									<span class=\"genmed\">Adds the settings link to the top of the page. Use the User Control Panel link instead if this is disabled.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Extra smilies:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"extraSmiliesCheck\" onchange=\"SetStorage('extraSmilies',this.checked)\"></b><br />\
									<span class=\"genmed\">Allows you to use more smilies in your post. These will be seen by everyone.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Auto embed Strawpoll.me polls:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"strawpollEmbedCheck\" onchange=\"SetStorage('strawpollEmbed',this.checked)\"></b><br />\
									<span class=\"genmed\">Automatically embeds strawpoll.me polls in the post where they are linked.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Use test script:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"testScriptCheck\" onchange=\"SetStorage('testScript',this.checked)\"></b><br />\
									<span class=\"genmed\">Loads the test version of this script, see the main topic for more info.</span>\
								</td>\
							</tr>\
						</table>\
					</td>\
				</tr>\
				");
			
			//Load all the saved values into the menu
			document.getElementById('settingsLinkCheck').checked = GetStorage('settingsLink');
			document.getElementById('extraSmiliesCheck').checked = GetStorage('extraSmilies');
			document.getElementById('strawpollEmbedCheck').checked = GetStorage('strawpollEmbed');
			document.getElementById('testScriptCheck').checked = GetStorage('testScript');
		}
	}
}


//			SetStorage('markingMode',1); //Post marking mode, 0 = none, 1 = avatar outline, 2 = background
//			SetStorage('markingColor',"#0000FF"); //Post marking color. HEX value.
//			SetStorage('markingText',"#FFFFFF"); //Text color used when markingMode = 2