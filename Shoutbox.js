console.log("Shoutbox script loaded");

var checker = 0;
function jqueryLoaded() {
    clearInterval(checker);
    console.log("Shoutbox jQuery found; running script...");
    
    $(document).ready(function(){
        //Remove pesky ads
        $("div[id^=div-gpt-ad]").each(function() { $(this).remove(); });
        
        //Hide MOTD bar (used for loading this script)
        $("#ShoutboxScript").parent().parent().parent().parent().parent().hide();
    });
}

function checkJquery() {
    if (window.jQuery) {
            jqueryLoaded();
    } 
        if(checker == 0) {
            console.log("Waiting for shoutbox jQuery to load...");
            checker = window.setInterval(checkJquery, 100);
        }
}	

checkJquery();