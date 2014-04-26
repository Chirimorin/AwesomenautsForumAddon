//Load the normal script (no need to check for legacy, legacy can't load test script)
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumLatest.js?v=" + currentVersion;
document.body.appendChild(script);

//Test functionality starts here

//$(document).ready(function(){
//    if (GetStorage('shoutbox'))
//    {
//        $("#wrapcentre").prepend('<iframe src="http://AwesomenautsShoutBox.freeshoutbox.net/" height="200" width="930" frameborder="0"></iframe>');
//        
//        if (window.location.hash.substr(1) == "unread") //If unread, scroll back down to the anchor
//        {
//            if ($("[name=unread]").is("a"))
//            {
//                $(window).scrollTop($("[name=unread]").offset().top);
//            }
//        }
//    }
//});