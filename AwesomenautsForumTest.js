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