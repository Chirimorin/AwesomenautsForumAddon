console.log("Test script loaded");
//Load the normal script (no need to check for legacy, legacy can't load test script)
//console.log("Loading live script...");
//var script = document.createElement("script");
//script.type = "text/javascript";
//script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLatest.js?v=" + currentVersion;
//document.body.appendChild(script);

//Test functionality starts here

//Function definitions
function showAllTopics()
{
    $('.topictitle').parent().parent().finish().show("slow");
}

function showAllForums()
{
    $('.forumlink').parent().parent().each(function(){
        if ($(this).is('tr')) //needed if a picture is included in the forum, like the forum homepage
        {
            $(this).finish().show("slow");
        }
        else
        {
            $(this).parent().finish().show("slow");
        }
    });
}

function hideHiddenTopics(animate)
{
    var hiddenTopics = GetUSStorage('hiddenTopics');
    $('.topictitle').each(function(){
        var topic = this.href.split("&t=")[1];
        if (hiddenTopics[topic] == true) //should the element be Hidden?
        {
            row = this.parentNode.parentNode;
            
            if (animate)
            {
                $(row).finish().hide("slow", function(){
                    $(this).css('opacity', 0.5);
                    $(this).find('.hidebutton').html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
                });
            }
            else
            {
                $(row).css({
                    'display': 'none',
                    'opacity': 0.5
                });
                $(row).find('.hidebutton').html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
            }
        }
    });
}

function hideHiddenForums(animate)
{
    var hiddenForums = GetUSStorage('hiddenForums');
    $('.forumlink').each(function(){
        var forum = this.href.split("?f=")[1];
        if (hiddenForums[forum] == true) //should the element be Hidden?
        {
            row = this.parentNode.parentNode;
            
            if (!($(row).is('tr')))
            {
                row = $(row).parent();
            }
            
            if (animate)
            {
                $(row).finish().hide("slow", function(){
                    $(this).css('opacity', 0.5);
                    $(this).find('.hidebutton').html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
                });
            }
            else
            {
                $(row).css({
                    'display': 'none',
                    'opacity': 0.5
                });
                $(row).find('.hidebutton').html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
            }
            
        }
    });
}

function hideTopic(element)
{
    var hiddenTopics = GetUSStorage('hiddenTopics');
    var topic = element.parentNode.getElementsByClassName('topictitle')[0].href.split("&t=")[1];
    if (hiddenTopics[topic] == true) //Is the element hidden?
    {
        delete hiddenTopics[topic];
        $(element).parent().finish().animate({opacity: 1}, 500);
        $(element).html("<a href=\"#\" onclick=\"return false;\">Hide</a>");
    }
    else
    {
        hiddenTopics[topic] = true;
        $(element).parent().finish().hide("slow", function(){
            $(this).css('opacity', 0.5);
            $(element).html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
        });
    }
    SetUSStorage('hiddenTopics',hiddenTopics);
}

function hideForum(element)
{
    var hiddenForums = GetUSStorage('hiddenForums');
    var forum = element.parentNode.getElementsByClassName('forumlink')[0].href.split("?f=")[1];
    if (hiddenForums[forum] == true) //Is the element hidden?
    {
        delete hiddenForums[forum];
        $(element).parent().finish().animate({opacity: 1}, 500);
        $(element).html("<a href=\"#\" onclick=\"return false;\">Hide</a>");
    }
    else
    {
        hiddenForums[forum] = true;
        $(element).parent().finish().hide("slow", function(){
            $(this).css('opacity', 0.5);
            $(element).html("<a href=\"#\" onclick=\"return false;\">Unhide</a>");
        });
    }
    SetUSStorage('hiddenForums',hiddenForums);
}

function embedYoutube(divID, ytVideoID, element)
{
    if ($("#yt-"+divID).length !== 0)
    {
        $("#yt-"+divID).slideUp("slow", function(){
            $(this).remove();
        });
    }
    else
    {
        var embedCode = '<div id="yt-'+divID+'" class="ytembbed" style="display:none;"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+ytVideoID+'"frameborder="0" allowFullScreen></iframe></div>'
        
        $(element).after(embedCode);
        
        $("#yt-"+divID).slideDown("slow");
    }
}

//Variables
var UserName;

//Functionality starts here
$(document).ready(function(){ //run after page fully loaded
console.log("Document ready; running script");
if (scriptLoaded)
{
    console.log("Script already ran! Not running again.");
    return;
}
scriptLoaded = true;

if (GetUSStorage('shoutbox'))
{
    $("#wrapcentre").prepend('<iframe src="http://AwesomenautsShoutBox.freeshoutbox.net/" height="'+GetUSStorage('shoutboxHeight')+'" width="930" frameborder="0"></iframe>');
    
    if (window.location.hash.substr(1) == "unread") //If unread, scroll back down to the anchor
    {
        if ($("[name=unread]").is("a"))
        {
            $(window).scrollTop($("[name=unread]").offset().top);
        }
    }
    console.log("Shoutbox loaded");
}

if (GetUSStorage('hideForums') || GetUSStorage('hideTopics'))
{
    //Fix table layout to fit the extra elements
    $('.row3').attr('colspan', 7);
    $('.cat').attr('colspan', 7);
    $('.cat-bottom').attr('colspan', 7);

    //Add "hide" button to topics
    if (GetUSStorage('hideTopics'))
    {
        $(".cat").find($("td[align=\"right\"]")).before("<td align=\"right\" class=\"hideAllTopicsButton\" style=\"opacity: 0;\"><a href=\"#\" onclick=\"hideHiddenTopics(true); $(this).parent().finish().animate({opacity: 0}, 500);; return false;\">Re-hide hidden topics</a></td>\
            <td align=\"right\"><a href=\"#\" onclick=\"showAllTopics(); $('.hideAllTopicsButton').finish().animate({opacity: 1}, 500); return false;\">Show hidden topics</a></td>");
        
        $('.topictitle:first').parent().parent().parent().find($("th:contains('Last post')")).after("<th>&nbsp;Hide&nbsp;</th>");
        
        $('.topictitle').parent().parent().append("<td class=\"row2 hidebutton\" align=\"center\" nowrap=\"nowrap\" onclick=\"hideTopic(this);\"><a href=\"#\" onclick=\"return false;\">Hide</a></td>");
        hideHiddenTopics(false);
        console.log("Hide topics loaded");
    }
    
    //Add "hide" button to forums
    if (GetUSStorage('hideForums'))
    {
        $('.tablebg').find($("th:contains('Forum')")).parent().parent().prepend("<tr>\
                <td class=\"cat\" colspan=\"7\">\
                    <table width=\"100%\" cellspacing=\"0\">\
                        <tbody><tr class=\"nav\">\
                            <td valign=\"middle\">&nbsp;</td>\
                            <td align=\"right\" class=\"hideAllForumsButton\" style=\"opacity: 0;\"><a href=\"#\" onclick=\"hideHiddenForums(true); $('.hideAllForumsButton').finish().animate({opacity: 0}, 500);; return false;\">Re-hide hidden forums</a></td>\
                            <td align=\"right\"><a href=\"#\" onclick=\"showAllForums(); $('.hideAllForumsButton').finish().animate({opacity: 1}, 500); return false;\">Show hidden forums</a></td>\
                        </tr></tbody>\
                    </table>\
                </td>\
            </tr>");
        
        $('.tablebg').find($("th:contains('Forum')")).parent().find($("th:contains('Last post')")).after("<th>&nbsp;Hide&nbsp;</th>");
        
        $('.forumlink').parent().parent().each(function(){
            if ($(this).is('tr')) //needed if a picture is included in the forum, like the forum homepage
            {
                $(this).append("<td class=\"row2 hidebutton\" align=\"center\" nowrap=\"nowrap\" onclick=\"hideForum(this);\"><a href=\"#\" onclick=\"return false;\">Hide</a></td>");
            }
            else
            {
                $(this).parent().append("<td class=\"row2 hidebutton\" align=\"center\" nowrap=\"nowrap\" onclick=\"hideForum(this);\"><a href=\"#\" onclick=\"return false;\">Hide</a></td>");
            }
        });
        hideHiddenForums(false);
        console.log("Hide forums loaded");
    }
}

//Menu edit + find username
$('.forum-buttons').each(function(){
    //Find the username of the person who is logged in.
    if (($(this).html().indexOf("Logout [ ")) >= 0)
    {
        UserName = $(this).html().substring($(this).html().indexOf("Logout [ ") + 9, $(this).html().indexOf(" ]"));
    }
    else //"Logout" not found, nobody logged in.
    {
        UserName = "";
    }
    
    console.log("Username '" + UserName + "' found");
    
    if (GetUSStorage('settingsLink'))
    {
        var html = $(this).html();
        $(this).html(html.insert((html.indexOf('>Forum</a>')+91),"<a href=\"./ucp.php?i=main&mode=front\">Userscript Settings</a><br />"));
        $(this).css("background-size", "1px 40px");
        console.log("Settings link loaded");
    }
    else //white line in menu fix
    {
        $(this).css("background-size", "1px 30px");
    }
});

//new tab fix
var allClickables = $('.row1.clickable');
for (i=0; i<allClickables.length; i++)
{
    var onclick = $(allClickables[i]).attr("onclick");
    $(allClickables[i]).attr("onclick", "if (event.button == 0 && event.ctrlKey == false) " + onclick);
}
console.log("Onclick fix loaded");

//Marking users posts
if (window.location.href.indexOf("posting.php") == -1){
    var PostAuthors = $('.postauthor');
    var PostBodys = $('.row-post-body');
    for (i=0; i<PostAuthors.length; i++){
        if (PostAuthors[i].innerHTML == UserName){
            PostBodys[((i+1)*2)-2].style.background = '#eee';
        }
    }
}

//Fix oversized images and mark them
$('.postbody').each(function(){
    $(this).css({
        "max-width": "764px",
        "word-wrap": "break-word"
    });
    
    $(this).find('img').each(function(){
        var parent = $(this).parent();
        while (!($(parent).is("div")))
        {
            parent = $(parent).parent();
        }
        
        var maxWidth = $(parent).width()-6
        var ownWidth = $(this).width();
        var ownHeight = $(this).height();
        
        if (ownWidth > $(parent).width())
        {
            $(this).css("max-width", maxWidth + "px");
            $(this).wrap('<div class="image scaler"></div>');
            $(this).after('<div class="scaletutorial"><small>&nbsp; Original size: '+ownWidth+'x'+ownHeight+'. Click to see full size</small></div>');
            $(this).parent('div').css({"border": "1px solid #1c666f",
                                       "background": "#fff",
                                       "width": $(this).width() + "px",
            });
            
            $(this).click(function(){
                if ($(this).css("max-width") == maxWidth + "px")
                {
                    $(this).css({
                        "max-width": "",
                        "border-style": "",
                        "border-color": ""
                    });
                    $(this).parent('div').css({"width": $(this).width() + "px"});
                    $(this).nextAll().remove();
                    $(this).after("<div class='scaletutorial'><small>&nbsp; Original size: "+ownWidth+"x"+ownHeight+". Click to return to scaled.</small></div>");
                }
                else
                {
                    $(this).css("max-width", maxWidth + "px");
                    $(this).parent('div').css({"width": $(this).width() + "px"});
                    $(this).nextAll().remove();
                    $(this).after("<div class='scaletutorial'><small>&nbsp; Original size: "+ownWidth+"x"+ownHeight+". Click to see full size</small></div>");
                }
            });
        }
    });
});
console.log("Oversized images shrunk");

if (GetUSStorage('extraSmilies')) //Do we want to load the extra smilies?
{
    console.log("Loading extra smilies...");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/ListSmilies.js"
    document.body.appendChild(script);
}

i = 0;
$('a.postlink').each(function(){
    if (GetUSStorage('strawpollEmbed')) //Auto embedding Strawpoll links
    {
        if (this.href.search('strawpoll.me/') != -1) //did we find a strawpoll link?
        {
            pollCode = this.href.substring(this.href.indexOf("strawpoll.me/")+13,this.href.length);
            if (pollCode.length > 0) //Did we find a poll or just a link?
            {
                $(this).parent().append("<br /><br /><iframe src=\"http://strawpoll.me/embed_1/" + pollCode + "\" style=\"width: 600px; height: 390px; border: 0;\">Loading poll...</iframe>");
            }
        }
    }
    
    if (GetUSStorage('youtubeEmbed')) //Youtube link embedding
    {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = this.href.match(regExp);
        if (match&&match[2].length==11){
            var ytVideoID = match[2]; 
            
            var expandButton = "<a href=\"#\" onclick=\"embedYoutube("+i+", '"+ytVideoID+"', this); return false;\" style='color: white; background: red;'>[&#9654;]</a>";
            
            $(this).after(" "+expandButton+" ");
            i++;
        }
    }
});

console.log("Strawpoll and youtube embeds loaded");

if (GetUSStorage('extraBBCode'))
{
    if (typeof help_line != 'undefined') //figure out if bbcode help texts are loaded (aka, are we posting?)
    {
        help_line['trans'] = 'Makes text transparent';
        var table = document.getElementsByName('addbbcode22')[0].parentNode;
        table.innerHTML += "<input type=\"button\" class=\"btnbbcode\" name=\"addbbcodetrans\" value=\"transparent\" onclick=\"bbfontstyle('[color=transparent]','[/color]')\" onmouseover=\"helpline('trans')\" onmouseout=\"helpline('tip')\" />";
    }
    console.log("Extra BB code loaded");
}

if (GetUSStorage('magnifyText'))
{
    $("span").filter(function() {
        return (parseInt($(this).css('fontSize')) < 10);
    }).each(function(){
        $(this).data('original-size', $(this).css('font-size'));
        
        $(this).hover(function(){
            $(this).css('font-size', "100%");
        },
        function()
        {
            $(this).css('font-size', $(this).data('original-size'));
        });
    });
    console.log("Magnify text loaded");
}

//Options menu
if (window.location.href.indexOf("ucp.php") != -1)
{
    table = $('.tablebg:contains(Welcome)');
    table.find('.cat-bottom').parent('tr').before("\
        <tr>\
            <th colspan=\"3\">Forum Userscript Settings</th>\
        </tr>\
        <tr>\
            <td class=\"row1\" colspan=\"3\" align=\"center\">\
                <table width=\"100%\" cellpadding=\"4\" cellspacing=\"1\">\
                    <tr>\
                        <td class=\"row1\" colspan=\"3\" align=\"center\">\
                            <p class=\"genmed\">\
                                Here you can change the settings for Chirimorin's forum userscript. All settings are applied automatically.<br />\
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
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Settings link:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"settingsLinkCheck\" onchange=\"SetUSStorage('settingsLink',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Adds the settings link to the top of the page. Use the User Control Panel link instead if this is disabled.</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Extra smilies:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"extraSmiliesCheck\" onchange=\"SetUSStorage('extraSmilies',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Allows you to use more smilies in your post. These will be seen by everyone.</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Auto embed Strawpoll.me polls:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"strawpollEmbedCheck\" onchange=\"SetUSStorage('strawpollEmbed',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Automatically embeds strawpoll.me polls in the post where they are linked.</span>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Youtube embed button:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"youtubeEmbedCheck\" onchange=\"SetUSStorage('youtubeEmbed',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Adds a button to youtube links so you can easily embed them in the post.</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Magnify text:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"magnifyTextCheck\" onchange=\"SetUSStorage('magnifyText',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Magnifies tiny text when you mouse over it.</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Hide Forums:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"hideForumsCheck\" onchange=\"SetUSStorage('hideForums',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Allows you to hide forums.<br />\
                            <a href=\"#\" onclick=\"SetUSStorage('hiddenForums', new Array()); return false;\">reset hidden forums</a></span>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Hide Topics:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"hideTopicsCheck\" onchange=\"SetUSStorage('hideTopics',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Allows you to hide topics.<br />\
                            <a href=\"#\" onclick=\"SetUSStorage('hiddenTopics', new Array()); return false;\">reset hidden topics</a></span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Extra BB code buttons:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"extraBBCodeCheck\" onchange=\"SetUSStorage('extraBBCode',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Extra buttons for BBCode in posts.</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Shoutbox:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"shoutboxCheck\" onchange=\"SetUSStorage('shoutbox',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Adds a shoutbox to the top of the page.</span>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Shoutbox height:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"number\" id=\"shoutboxHeightBox\" onchange=\"SetUSStorage('shoutboxHeight',this.value)\" /></b><br />\
                            <span class=\"genmed\">The height of the shoutbox, in pixels. Default: 200</span>\
                        </td>\
                    </tr>\
                    <tr><td>&nbsp;</td></tr>\
                    <tr>\
                        <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                            <b class=\"genmed\">Use test script:</b>\
                        </td>\
                        <td width=\"100%\">\
                            <b class=\"gen\"><input type=\"checkbox\" id=\"testScriptCheck\" onchange=\"SetUSStorage('testScript',this.checked)\" /></b><br />\
                            <span class=\"genmed\">Loads the test version of this script, see the main topic for more info.</span>\
                        </td>\
                    </tr>\
                </table>\
            </td>\
        </tr>\
    ");
    
    //Load all the saved values into the menu
    
    $('#imageMarkingCheck').attr('checked', GetUSStorage('imageMarking'));
    $('#imageMarkingColorBox').attr('value', GetUSStorage('imageMarkingColor'));
    $('#settingsLinkCheck').attr('checked', GetUSStorage('settingsLink'));
    $('#extraSmiliesCheck').attr('checked', GetUSStorage('extraSmilies'));
    $('#strawpollEmbedCheck').attr('checked', GetUSStorage('strawpollEmbed'));
    $('#youtubeEmbedCheck').attr('checked', GetUSStorage('youtubeEmbed'));
    $('#magnifyTextCheck').attr('checked', GetUSStorage('magnifyText'));
    $('#hideForumsCheck').attr('checked', GetUSStorage('hideForums'));
    $('#hideTopicsCheck').attr('checked', GetUSStorage('hideTopics'));
    $('#postMarkingModeSelect').attr('value', GetUSStorage('postMarkingMode'));
    $('#postMarkingColorBox').attr('value', GetUSStorage('postMarkingColor'));
    $('#postMarkingTextBox').attr('value', GetUSStorage('postMarkingText'));
    $('#extraBBCodeCheck').attr('checked', GetUSStorage('extraBBCode'));
    $('#shoutboxCheck').attr('checked', GetUSStorage('shoutbox'));
    $('#shoutboxHeightBox').attr('value', GetUSStorage('shoutboxHeight'));
    $('#testScriptCheck').attr('checked', GetUSStorage('testScript'));
    console.log("Options menu loaded");
}

}); //document ready

