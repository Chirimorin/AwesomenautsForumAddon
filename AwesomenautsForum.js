console.log("Awesomenauts forum userscript started!");

var jquery = document.createElement("script");
jquery.type = "text/javascript";
jquery.src = "http://code.jquery.com/jquery-latest.min.js";
document.head.appendChild(jquery);

var checker = 0;
 
function jqueryLoaded() {
    clearInterval(checker);
    console.log("jQuery found; loading script");
    $("#wrapcentre").prepend('<div class="bc-div bc-tbl"><a href="http://www.awesomenauts.com/forum/viewtopic.php?p=364799#p364799"><p class="bc-header"><strong>Old main script detected! Please update the main script. For more info, click here</strong></p></a></div>');
}

function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
        return;
    } 
    if(checker == 0) {
        console.log("Waiting for jQuery to load...");
        checker = window.setInterval(checkJquery, 100);
    }
}	

checkJquery();
