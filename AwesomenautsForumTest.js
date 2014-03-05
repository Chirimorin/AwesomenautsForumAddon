//Load the normal script (no need to check for legacy, legacy can't load test script)
//var script = document.createElement("script");
//script.type = "text/javascript";
//script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumLatest.js?v=" + currentVersion;
//document.body.appendChild(script);

//Test functionality starts here


//Menu edit + find username
var UserName;
$('.forum-buttons').each(function(){
    //Find the username of the person who is logged in.
    //Will return random stuff if nobody is logged in, but this is just used for searching so no harm is done.
    UserName = $(this).html().substring($(this).html().indexOf("Logout [ ") + 9, $(this).html().indexOf(" ]"));
    
    if (GetStorage('settingsLink'))
    {
        var html = $(this).html();
        $(this).html(html.insert((html.indexOf('>Forum</a>')+91),"<a href=\"./ucp.php?i=main&mode=front\">Userscript Settings</a><br />"));
        $(this).css("background-size", "1px 40px");
	}
	else //white line in menu fix
	{
        $(this).css("background-size", "1px 30px");
	}
});


//Marking users posts
if (GetStorage('postMarkingMode') != 0) //Do we want to mark the users posts? 
{
	var PostAuthors = $('.postauthor');
	var PostBodys = $('.row-post-body');
	for (i=0; i<PostAuthors.length; i++)
	{
		if (PostAuthors[i].innerHTML.indexOf(UserName) != -1 && window.location.href.indexOf("posting.php") == -1)
		{
			if (GetStorage('postMarkingMode') == 1) //Outline avatar. 
			{
				PostBodys[((i+1)*2)-2].innerHTML = PostBodys[((i+1)*2)-2].innerHTML.insert((PostBodys[((i+1)*2)-2].innerHTML.indexOf('User avatar')+12)," style='border:3px solid " + GetStorage('postMarkingColor') + "'");
			}
			if (GetStorage('postMarkingMode') == 2) //Background color.
			{
				PostBodys[((i+1)*2)-2].style.background=GetStorage('postMarkingColor');
				var PostDetails = $(PostBodys[((i+1)*2)-2]).find('.postdetails');
				PostDetails[0].style.color=GetStorage('postMarkingText');
			}
		}
	}
}

//new tab fix
var allClickables = $('.row1.clickable');
for (i=0; i<allClickables.length; i++)
{
    var onclick = $(allClickables[i]).attr("onclick");
    $(allClickables[i]).attr("onclick", "if (event.button == 0 && event.ctrlKey == false) " + onclick);
}


//Fix oversized images and mark them
$('.postbody').each(function(){
    $(this).css("max-width","764px");
    $(this).css("word-wrap","break-word");
    
    $(this).find('img').each(function(){
        var maxWidth = $(this).parent().width()-6
        if ($(this).width() > $(this).parent().width())
        {
            $(this).css("max-width", maxWidth + "px");
            if (GetStorage('imageMarking'))
            {
                $(this).css("border-style","dashed");
                $(this).css("border-color",GetStorage('imageMarkingColor'));
            }
            
            $(this).click(function(){
                if ($(this).css("max-width") == maxWidth + "px")
                {
                    $(this).css("max-width","");
                    $(this).css("border-style","");
                    $(this).css("border-color","");
                }
                else
                {
                    $(this).css("max-width", maxWidth + "px");
                    if (GetStorage('imageMarking'))
                    {
                        $(this).css("border-style","dashed");
                        $(this).css("border-color",GetStorage('imageMarkingColor'));
                    }
                }
            });
        }
    });
});

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

if (GetStorage('extraBBCode'))
{
	if (typeof help_line != 'undefined') //figure out if bbcode help texts are loaded (aka, are we posting?)
	{
		help_line['trans'] = 'Makes text transparent';
		var table = document.getElementsByName('addbbcode22')[0].parentNode;
		table.innerHTML += "<input type=\"button\" class=\"btnbbcode\" name=\"addbbcodetrans\" value=\"transparent\" onclick=\"bbfontstyle('[color=transparent]','[/color]')\" onmouseover=\"helpline('trans')\" onmouseout=\"helpline('tip')\" />";
	}
}

//Options menu
if (window.location.href.indexOf("ucp.php") != -1)
{
    table = $('.tablebg');
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
									<b class=\"genmed\">Image marking:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"imageMarkingCheck\" onchange=\"SetStorage('imageMarking',this.checked)\" /></b><br />\
									<span class=\"genmed\">Puts a dashed line around resized images.</span>\
								</td>\
							</tr>\
                            <tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Image marking color:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"text\" id=\"imageMarkingColorBox\" onchange=\"SetStorage('imageMarkingColor',this.value)\" /></b><br />\
									<span class=\"genmed\">The color of the dashed line around resized images. (in either hex or text, wrong values will result in no marking)</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Settings link:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"settingsLinkCheck\" onchange=\"SetStorage('settingsLink',this.checked)\" /></b><br />\
									<span class=\"genmed\">Adds the settings link to the top of the page. Use the User Control Panel link instead if this is disabled.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Extra smilies:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"extraSmiliesCheck\" onchange=\"SetStorage('extraSmilies',this.checked)\" /></b><br />\
									<span class=\"genmed\">Allows you to use more smilies in your post. These will be seen by everyone.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Auto embed Strawpoll.me polls:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"strawpollEmbedCheck\" onchange=\"SetStorage('strawpollEmbed',this.checked)\" /></b><br />\
									<span class=\"genmed\">Automatically embeds strawpoll.me polls in the post where they are linked.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Post marking type:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><select id=\"postMarkingModeSelect\" onchange=\"SetStorage('postMarkingMode',this.value)\">\
										<option value=\"0\">No marking</option>\
										<option value=\"1\">Avatar outline</option>\
										<option value=\"2\">Avatar panel background</option>\
									</select></b><br />\
									<span class=\"genmed\">Choose the type of marking your own posts.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Post marking color:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"text\" id=\"postMarkingColorBox\" onchange=\"SetStorage('postMarkingColor',this.value)\" /></b><br />\
									<span class=\"genmed\">The color of your post marking. (in either hex or text, wrong values will result in no marking)</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Post text color:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"text\" id=\"postMarkingTextBox\" onchange=\"SetStorage('postMarkingText',this.value)\" /></b><br />\
									<span class=\"genmed\">The text color in your avatar panel when avatar panel background color marking mode is selected.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Extra BB code buttons:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"extraBBCodeCheck\" onchange=\"SetStorage('extraBBCode',this.checked)\" /></b><br />\
									<span class=\"genmed\">Extra buttons for BBCode in posts.</span>\
								</td>\
							</tr>\
							<tr>\
								<td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
									<b class=\"genmed\">Use test script:</b>\
								</td>\
								<td width=\"100%\">\
									<b class=\"gen\"><input type=\"checkbox\" id=\"testScriptCheck\" onchange=\"SetStorage('testScript',this.checked)\" /></b><br />\
									<span class=\"genmed\">Loads the test version of this script, see the main topic for more info.</span>\
								</td>\
							</tr>\
						</table>\
					</td>\
				</tr>\
				");
			
			//Load all the saved values into the menu
            
            document.getElementById('imageMarkingCheck').checked = GetStorage('imageMarking');
			document.getElementById('imageMarkingColorBox').value = GetStorage('imageMarkingColor');
			document.getElementById('settingsLinkCheck').checked = GetStorage('settingsLink');
			document.getElementById('extraSmiliesCheck').checked = GetStorage('extraSmilies');
			document.getElementById('strawpollEmbedCheck').checked = GetStorage('strawpollEmbed');
			document.getElementById('postMarkingModeSelect').value = GetStorage('postMarkingMode');
			document.getElementById('postMarkingColorBox').value = GetStorage('postMarkingColor');
			document.getElementById('postMarkingTextBox').value = GetStorage('postMarkingText');
			document.getElementById('extraBBCodeCheck').checked = GetStorage('extraBBCode');
			document.getElementById('testScriptCheck').checked = GetStorage('testScript');
		}
	}
}

