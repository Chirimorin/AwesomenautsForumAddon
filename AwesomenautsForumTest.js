console.log("Test script loaded");
//Load the normal script (no need to check for legacy, legacy can't load test script)
console.log("Loading live script...");
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLatest.js?v=" + currentVersion;
document.body.appendChild(script);

//var settings = [];
//
//settings.push({setting: 'sortAvatars', type: 'checkbox', title: 'Sort avatars', description: 'Sorts the avatars in the avatar select panel.', group: 1});
//settings.push({setting: 'quickReport', type: 'checkbox', title: 'Quick report', description: 'Loads the report form in the post instead of a new page.', group: 2});
//settings.push({setting: 'postBreadcrumb', type: 'checkbox', title: 'Posting breadcrumb', description: 'Inserts the right breadcrumb trail when posting.', group: 2});
////settings.push({setting: '', type: '', title: '', description: '', group: });
//
//function optionsLoaded() { 
//    var group = 1;
//    $.each(settings, function(index, value)
//    {
//        if (value.group != group)
//        {
//            $("#UserscriptSettings").append("<tr><td>&nbsp;</td></tr>");
//            group = value.group;
//        }
//        
//        $("#UserscriptSettings").append("<tr>\
//                                            <td align=\"right\" valign=\"top\" nowrap=\"nowrap\">\
//                                                <b class=\"genmed\">"+value.title+"</b>\
//                                            </td>\
//                                            <td width=\"100%\">\
//                                                <b class=\"gen\"><input type=\""+value.type+"\" id=\""+value.setting + value.type+"\" /></b><br />\
//                                                <span class=\"genmed\">"+value.description+"</span>\
//                                            </td>\
//                                        </tr>");
//        if (value.type == "checkbox")
//        {
//            $('#'+value.setting + value.type).change(function () { settingSaved(this); SetUSStorage(value.setting, value.checked) });
//            $('#'+value.setting + value.type).attr('checked', GetUSStorage(value.setting));
//        }
//    });
//}

//Test functionality starts here


if ($('select[name=category]').val() == "Awesomenauts")
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
if (page == "posting.php") {
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

$('img[title="Edit post"]').each(function() { this.src = "data:image/gif;base64,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" });
$('img[title="Delete post"]').each(function() { this.src = "data:image/gif;base64,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" });
