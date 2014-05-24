console.log("Test script loaded");
//Load the normal script (no need to check for legacy, legacy can't load test script)
console.log("Loading live script...");
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLatest.js?v=" + currentVersion;
document.body.appendChild(script);

var settings = [];


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

//settings.push({setting: '', type: '', title: '', description: '', group: });

function optionsLoaded() { 
    $("#UserscriptSettings").html("<tr>\
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
                    <tr><td>&nbsp;</td></tr>");
    
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
}

//Test functionality starts here

// To be placed in main script when live
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Get page filename 
var page = window.location.pathname.split("/").pop();



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

// Finds and saves the breadcrumb from the given data
function saveBreadcrumb(data) {
    var breadcrumbs = GetUSStorage('breadcrumbs');
    var breadcrumb = $('.bc-header:not(#hideShoutboxMessage)', data).html();
    breadcrumbs[getUrlVars()['f']] = breadcrumb;
    SetUSStorage('breadcrumbs', breadcrumbs);
}

// Inserts the correct breadcrumb into the current page (only use when posting replies or edit!)
function insertBreadcrumb() {
    $('.bc-header:not(#hideShoutboxMessage)').html(GetUSStorage('breadcrumbs')[getUrlVars()['f']] + '&nbsp;»&nbsp;<a href="#" class="nav-current">Post a reply</a>');
}

if (!($.isArray(GetUSStorage('breadcrumbs'))))
{
    SetUSStorage('breadcrumbs', []);
}

// Save breadcrumb when viewing a forum
if (page == "viewforum.php") {
    saveBreadcrumb(document.body);
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

if (GetUSStorage('recolorButtons'))
{
    $('img[title="Edit post"]').each(function() { this.src = "data:image/gif;base64,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" });
    $('img[title="Delete post"]').each(function() { this.src = "data:image/gif;base64,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" });
}
