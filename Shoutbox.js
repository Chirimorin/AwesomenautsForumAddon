console.log("Shoutbox script loaded");

var checker = 0;
function jqueryLoaded() {
    clearInterval(checker);
    console.log("Shoutbox jQuery found; running script...");
    
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