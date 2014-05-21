console.log("Test script loaded");
//Load the normal script (no need to check for legacy, legacy can't load test script)
console.log("Loading live script...");
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLatest.js?v=" + currentVersion;
document.body.appendChild(script);

function optionsLoaded() { 
    $("#UserscriptSettings").append("");
    
    
}

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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function saveBreadcrumb(data) {
    var breadcrumbs = GetUSStorage('breadcrumbs');
    var breadcrumb = $('.bc-header:not(#hideShoutboxMessage)', data).html();
    breadcrumbs[getUrlVars()['f']] = breadcrumb;
    SetUSStorage('breadcrumbs', breadcrumbs);
}

function insertBreadcrumb() {
    $('.bc-header:not(#hideShoutboxMessage)').html(GetUSStorage('breadcrumbs')[getUrlVars()['f']] + '&nbsp;»&nbsp;<a href="#" class="nav-current">Post a reply</a>');
}

if (!($.isArray(GetUSStorage('breadcrumbs'))))
{
    SetUSStorage('breadcrumbs', []);
}

var page = window.location.pathname.split("/").pop();
if (page == "viewforum.php") {
    saveBreadcrumb(document.body);
}

if (page == "posting.php") {
    if (GetUSStorage('breadcrumbs')[getUrlVars()['f']] == undefined)
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

