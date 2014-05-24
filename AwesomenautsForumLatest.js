console.log("Live script loaded");

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

function settingSaved(element)
{
    MsgSaved=document.createElement('span');
    $(element).after(MsgSaved);
    $(MsgSaved).html(" Saved!")
            .css("color", "#0A0")
            .delay(1500)
            .fadeOut(1000, function() {
                $(this).remove();
            });
}

// Finds and saves the breadcrumb from the given data
function saveBreadcrumb(data) {
    var breadcrumbs = GetUSStorage('breadcrumbs');
    var breadcrumb = $('.bc-header:not(#hideShoutboxMessage)', data).html();
    breadcrumbs[getUrlVars()['f']] = breadcrumb;
    SetUSStorage('breadcrumbs', breadcrumbs);
}

// Inserts the correct breadcrumb into the current page
function insertBreadcrumb() {
    $('.bc-header:not(#hideShoutboxMessage)').html($('.bc-header:not(#hideShoutboxMessage)').html().replace('<a href="./index.php">Board index</a>&nbsp;', GetUSStorage('breadcrumbs')[getUrlVars()['f']]));
}

if (!($.isArray(GetUSStorage('breadcrumbs'))))
{
    SetUSStorage('breadcrumbs', []);
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
    function loadShoutbox(callback)
    {
        $("#shoutbox").html('<iframe id="shoutboxFrame" height="'+GetUSStorage('shoutboxHeight')+'" width="928" frameborder="0"></iframe>');
        $("iframe#shoutboxFrame").attr('src', "http://AwesomenautsShoutBox.freeshoutbox.net/");
        $("iframe#shoutboxFrame").load(callback);
    }
    
    function showShoutbox(){
        loadShoutbox(function() {
            $("#shoutbox").slideDown(1000, function() {
                $("#hideShoutbox").one("click", hideShoutbox);
                $("#hideShoutboxMessage").html("Click here to hide the shoutbox");
                SetUSStorage('hideShoutbox', false);
            });
        });
    };
    
    function hideShoutbox(){
        $("#shoutbox").slideUp(1000, function() {
            $(this).html("");
            $("#hideShoutbox").one("click", showShoutbox);
            $("#hideShoutboxMessage").html("Click here to show the shoutbox");
            SetUSStorage('hideShoutbox', true);
        });
    }
    
    $("#wrapcentre").prepend('<div id="shoutboxContainer"><a href="#" onclick="return false;"><div id="hideShoutbox" class="bc-div bc-tbl" style="padding: 0px; margin: 0px;"><p class="bc-header" id="hideShoutboxMessage"></p></div></a><div id="shoutbox" class="bc-div bc-tbl" style="padding: 0px; margin: 0px;"></div></div>');
    
    if (GetUSStorage('hideShoutbox'))
    {
        $("#hideShoutboxMessage").html("Click here to show the shoutbox");
        $("#shoutbox").hide(); //hide the shoutbox div so the show animation works. 
        $("#hideShoutbox").one("click", showShoutbox);
    }
    else
    {
        $("#hideShoutboxMessage").html("Click here to hide the shoutbox");
        loadShoutbox(function() { });
        $("#hideShoutbox").one("click", hideShoutbox);
    }
    
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
    $('.cat').each(function() {
        if ($(this).attr('align') != "center")
        {
            $(this).attr('colspan', 7);
        }
    });
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

//Better mark topics read
if (GetUSStorage('betterMarkRead'))
{
    var markReadLink = $('a').filter(function(index) { return $(this).text() === "Mark topics read"; });
    var markReadURL = $(markReadLink).prop('href');
    $(markReadLink).attr("href","#");
    $(markReadLink).click(function() {
        $("#wrapcentre").append('<iframe id="markTopicsRead" height="0" width = "0" frameborder="0"></iframe>');
        $("iframe#markTopicsRead").attr('src', markReadURL);
        $("iframe#markTopicsRead").load(function() {
            location.reload(true);
        });
        return false;
    });
}

//Marking users posts
if (GetUSStorage('postMarkingMode') != 0) //Do we want to mark the users posts? 
{
    var PostAuthors = $('.postauthor');
    var PostBodys = $('.row-post-body');
    for (i=0; i<PostAuthors.length; i++)
    {
        if (PostAuthors[i].innerHTML == UserName && window.location.href.indexOf("posting.php") == -1)
        {
            if (GetUSStorage('postMarkingMode') == 1) //Outline avatar. 
            {
                PostBodys[((i+1)*2)-2].innerHTML = PostBodys[((i+1)*2)-2].innerHTML.insert((PostBodys[((i+1)*2)-2].innerHTML.indexOf('User avatar')+12)," style='border:3px solid " + GetUSStorage('postMarkingColor') + "'");
            }
            if (GetUSStorage('postMarkingMode') == 2) //Background color.
            {
                PostBodys[((i+1)*2)-2].style.background=GetUSStorage('postMarkingColor');
                var PostDetails = $(PostBodys[((i+1)*2)-2]).find('.postdetails');
                PostDetails[0].style.color=GetUSStorage('postMarkingTextColor');
            }
        }
    }
    console.log("User posts marked");
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
        if ((this.href.indexOf("youtube") != -1) && (this.href.indexOf("youtube") < 14) || (this.href.indexOf("youtu.be") != -1) && (this.href.indexOf("youtu.be") < 14))
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

if (GetUSStorage('quickReport'))
{
    $('img[title="Report this post"]').each(function() { 
        var anchor = $(this).parent();
        
        $(anchor).click(function(e) {
            var reportClass = 'report' + $(anchor).attr('href').split('&p=')[1];
            
            if ($('.'+reportClass).size() == 0)
            {
                $.ajax({
                    url: $(this).attr('href'), 
                    success: function(data) {
                        //Insert the report form on the page
                        if ($('div:not([class]):not([id]):not([style])', $('#wrapcentre', data)).parent().is('form'))
                        {
                            form = $('<div>').append($('div:not([class]):not([id]):not([style])', $('#wrapcentre', data)).parent()).html();
                        }
                        else
                        {
                            form = $('<div>').append($('div:not([class]):not([id]):not([style])', $('#wrapcentre', data))).html()
                        }
                        $(anchor).parent().parent().after('<tr valign="middle"><td class="gensmall"><div class="'+reportClass+'" style="display:none;">'+form+'</div></td></tr>');
                        
                        $('.'+reportClass).slideDown();
                        
                        $('input[value=Cancel]', $('form[id=report]', $('.'+reportClass))).click( function (e) 
                        { 
                            e.preventDefault();
                            $('.'+reportClass).slideUp({ done: function() {
                                $('.'+reportClass).parent().parent().remove();
                            }});
                        });
                    }
                });
            }
            else
            {
                $('.'+reportClass).slideUp({ done: function() {
                    $('.'+reportClass).parent().parent().remove();
                }});
            }
            e.preventDefault();
        });
        
    });
}

if ($('select[name=category]').val() == "Awesomenauts" && GetUSStorage('sortAvatars'))
{
    var table = $('img[title^=Avatar]').first().parent().parent().parent().parent();
    var row = $(table).parent();
    console.log(row);
    $('img[title^=Avatar]').sort(function(a,b) {
        return (($(a).attr('title') > $(b).attr('title')) ? 1 : -1);
    }).each(function() {
        $(row).append("<div style=\"float: left; border: 1px solid #aaaaaa; height: 130px; width: 102px;\">"+$('<div>').append($(this).clone()).html()+"<br /><input type=\"radio\" name=\"avatar_select\" value=\""+$(this).attr('src').split('/').pop()+"\"></div>");
    });
    $(table).remove();
}

if (GetUSStorage('recolorButtons'))
{
    $('img[title="Edit post"]').each(function() { this.src = "data:image/gif;base64,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" });
    $('img[title="Delete post"]').each(function() { this.src = "data:image/gif;base64,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" });
}

// Find the correct breadcrumb and replace it.
if (page == "posting.php" && GetUSStorage('postBreadcrumb')) {
    if (GetUSStorage('breadcrumbs')[getUrlVars()['f']] == undefined) // Breadcrumb not saved before, load forum view in background and save it.
    {
        $.ajax({
            type: 'get',
            url: 'http://www.awesomenauts.com/forum/viewforum.php?f=' + getUrlVars()['f'], 
            success: function(data) {
                saveBreadcrumb(data);
                insertBreadcrumb();
            } 
        });
    }
    else
    {
        insertBreadcrumb();
    }
}

// Save breadcrumb when viewing a forum
if (page == "viewforum.php") {
    saveBreadcrumb(document.body);
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
                <table id=\"UserscriptSettings\" width=\"100%\" cellpadding=\"4\" cellspacing=\"1\">\
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
                </table>\
            </td>\
        </tr>\
    ");
    
    settings.push({setting: 'settingsLink', type: 'checkbox', title: 'Settings link', description: 'Adds the settings link to the top of the page. Use the User Control Panel link instead if this is disabled.', group: false});
    settings.push({setting: 'extraSmilies', type: 'checkbox', title: 'Extra smilies', description: 'Allows you to use more smilies in your post. These will be seen by everyone.', group: false});
    settings.push({setting: 'strawpollEmbed', type: 'checkbox', title: 'Auto embed Strawpoll.me polls', description: 'Automatically embeds strawpoll.me polls in the post where they are linked.', group: false});
    settings.push({setting: 'youtubeEmbed', type: 'checkbox', title: 'Youtube embed button', description: 'Adds a button to youtube links so you can easily embed them in the post.', group: true});
    settings.push({setting: 'magnifyText', type: 'checkbox', title: 'Magnify text', description: 'Magnifies tiny text when you mouse over it.', group: false});
    settings.push({setting: 'hideForums', type: 'checkbox', title: 'Hide Forums', description: "Allows you to hide forums.<br /><a href=\"#\" onclick=\"SetUSStorage('hiddenForums', new Array()); return false;\">reset hidden forums</a></span>", group: false});
    settings.push({setting: 'hideTopics', type: 'checkbox', title: 'Hide Topics', description: "Allows you to hide topics.<br /><a href=\"#\" onclick=\"SetUSStorage('hiddenTopics', new Array()); return false;\">reset hidden topics</a></span>", group: true});
    settings.push({setting: 'postMarkingMode', type: 'select', options: ['No marking', 'Avatar outline', 'Avatar panel background'],title: 'Post marking type', description: 'Choose the type of marking your own posts.', group: false});
    settings.push({setting: 'postMarkingColor', type: 'text', title: 'Post marking color', description: 'The color of your post marking. (in either hex or text, wrong values will result in no marking)', group: true});
    settings.push({setting: 'postMarkingTextColor', type: 'text', title: 'Post text color', description: 'The text color in your avatar panel when avatar panel background color marking mode is selected.', group: true});
    settings.push({setting: 'extraBBCode', type: 'checkbox', title: 'Extra BB code buttons', description: 'Extra buttons for BBCode in posts.', group: false});
    settings.push({setting: 'shoutbox', type: 'checkbox', title: 'Shoutbox', description: 'Adds a shoutbox to the top of the page,', group: false});
    settings.push({setting: 'shoutboxHeight', type: 'number', title: 'Shoutbox height', description: 'The height of the shoutbox, in pixels. Default: 200', group: true});
    settings.push({setting: 'betterMarkRead', type: 'checkbox', title: 'Better mark topics read', description: 'Instantly reloads the current page when "Mark topics read" is clicked.', group: false});
    settings.push({setting: 'quickReport', type: 'checkbox', title: 'Quick report', description: 'Loads the report form in the post instead of a new page.', group: true});
    settings.push({setting: 'sortAvatars', type: 'checkbox', title: 'Sort avatars', description: 'Sorts the avatars in the avatar select panel.', group: false});
    settings.push({setting: 'postBreadcrumb', type: 'checkbox', title: 'Posting breadcrumb', description: 'Inserts the right breadcrumb trail when posting.', group: false});
    settings.push({setting: 'recolorButtons', type: 'checkbox', title: 'Recolor edit/delete buttons', description: 'Makes the edit button orange and the delete button red.', group: false});
    settings.push({setting: 'testScript', type: 'checkbox', title: 'Use test script', description: 'Loads the test version of this script, see the main topic for more info.', group: false});
    
    $.each(settings, function(index, value)
    {
        if (!value.group)
        {
            $("#UserscriptSettings").append("<tr><td>&nbsp;</td></tr>");
        }
        
        if (value.type == "select")
        {
            appendString = "<tr>\
                                <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                                    <b class=\"genmed\">"+value.title+": </b>\
                                </td>\
                                <td width=\"100%\">\
                                    <b class=\"gen\"><select id=\""+value.setting + value.type+"\">"; 
            
            $.each(value.options, function(i, name)
            {
                appendString += "<option value=\""+i+"\">"+name+"</option>";
            });
            
            
            appendString += "</select></b><br />\
                            <span class=\"genmed\">"+value.description+"</span>\
                        </td>\
                    </tr>";
                    
            $("#UserscriptSettings").append(appendString);
            
            $('#'+value.setting + value.type).change(function() { settingSaved(this); SetUSStorage(value.setting, this.value) });
            $('#'+value.setting + value.type).val(GetUSStorage(value.setting));
        }
        else
        {
            $("#UserscriptSettings").append("<tr>\
                                                <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
                                                    <b class=\"genmed\">"+value.title+": </b>\
                                                </td>\
                                                <td width=\"100%\">\
                                                    <b class=\"gen\"><input type=\""+value.type+"\" id=\""+value.setting + value.type+"\" /></b><br />\
                                                    <span class=\"genmed\">"+value.description+"</span>\
                                                </td>\
                                            </tr>");
            if (value.type == "checkbox")
            {
                $('#'+value.setting + value.type).change(function () { settingSaved(this); SetUSStorage(value.setting, this.checked) });
                $('#'+value.setting + value.type).attr('checked', GetUSStorage(value.setting));
            }
            if (value.type == "text" || value.type == "number")
            {
                $('#'+value.setting + value.type).change(function() { settingSaved(this); SetUSStorage(value.setting, this.value) });
                $('#'+value.setting + value.type).attr('value', GetUSStorage(value.setting));
            }
        }
    });
    
    console.log("Options menu loaded");
}

}); //document ready

