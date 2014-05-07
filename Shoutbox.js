console.log("Shoutbox script loaded");

var currentVersion = 1.12;
var focus = true;
var lastRead;
var originalTitle;
streamTime = new Date();
streamTime.setUTCHours(18);
streamTime.setUTCMinutes(00);
var MOTD = true;
function preparedMOTD()
{
    $("#MOTD").html("New messages are now marked!");
    
    //var target_date = streamTime.getTime();
    //var hours, minutes, seconds;
    //var countdown = document.getElementById("countdown");
    //
    //setInterval(function () {
    //    var current_date = new Date().getTime();
    //    var seconds_left = (target_date - current_date) / 1000;
    //    
    //    var timestring = "";
    //    
    //    if (seconds_left > 0)
    //    {
    //        if (seconds_left > 3600)
    //        {
    //            hours = parseInt(seconds_left / 3600);
    //            seconds_left = seconds_left % 3600;
    //            timestring += hours + "h ";
    //        }
    //        
    //        if (seconds_left > 60)
    //        {
    //            minutes = parseInt(seconds_left / 60);
    //            timestring += minutes + "m ";
    //        }
    //        
    //        
    //        seconds = parseInt(seconds_left % 60);
    //        timestring += seconds + "s ";
    //        $("#countdown").html(timestring + "until Sentry livestream at "+streamTime.getHours()+":00! <a href=\"http://www.timeanddate.com/counters/fullscreen.html?mode=a&iso=20140502T20&year=2014&month=5&day=2&hour=20&min=0&sec=0&p0=1310&msg=Ronimo%20Livestream\">[Official countdown]</a>");  
    //    }
    //    else
    //    {
    //        $("#countdown").html("Sentry livestream live right now! <a href=\"http://www.twitch.tv/ronimogames\">Watch it here!</a>");
    //    }
    //    //$("#countdown").html(hours + "h " + minutes + "m " + seconds + "s");  
    // 
    //}, 1000);
}


var Ronimo = new Array();
Ronimo.push("Jasper");

var Adminauts = new Array();
Adminauts.push("Fish");

var Specials = new Array();
Specials.push("Chirimorin");

var smilieslist = new Array();
smilieslist.push({code: ":monkey:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_Monkey.gif", name: "Happy monkey"});
smilieslist.push({code: ":ayla:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_Ayla.gif", name: "happy"});
smilieslist.push({code: ":aylaroll:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_AylaRoll.gif", name: "roll"});
smilieslist.push({code: ":voltarroll:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_VoltarRoll.gif", name: "roll eyes"});
smilieslist.push({code: ":drool:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_DerplDrool.gif", name: "drool"});
smilieslist.push({code: ":thumb:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_FroggyThumb.gif", name: "thumb"});
smilieslist.push({code: ":leoneyes:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_LeonEyes.gif", name: "leonEyes"});
smilieslist.push({code: ":shrug:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_FrogShrug.gif", name: "shrug"});
smilieslist.push({code: ":gnawshock:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_GnawSurprise.gif", name: "shock"});
smilieslist.push({code: ":huh:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_YuriHuh.gif", name: "huh"});
smilieslist.push({code: ":lolstar:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_lolstar.gif", name: "laughing"});
smilieslist.push({code: ":derp:", url: "http://www.awesomenauts.com/forum/images/smilies/SpikeDerp.gif", name: "derp"});
smilieslist.push({code: ":kiss:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_CocoKiss.gif", name: "kiss"});
smilieslist.push({code: ":worship:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_GenjiWorship.gif", name: "worship"});
smilieslist.push({code: ":rae:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_Raelynn.gif", name: "Raelynn"});
smilieslist.push({code: ":blabl:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_Derpl.gif", name: "baffled"});
smilieslist.push({code: ":drone:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_Drone.gif", name: "mind_blown"});
smilieslist.push({code: ":chew:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_ClunkBite.gif", name: "Chew"});
smilieslist.push({code: ":sleep:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_ClunkNose.gif", name: "sleep"});
smilieslist.push({code: ":think:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_SentryThinking.gif", name: "think"});
smilieslist.push({code: ":facepalm:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_SwigginsFacepalm.gif", name: "facepalm"});
smilieslist.push({code: ":tear:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_TedTear.gif", name: "tear"});
smilieslist.push({code: ":clap:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_VinnieClapping.gif", name: "clapping"});
smilieslist.push({code: ":shady:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_VoltarLook.gif", name: "shady"});
smilieslist.push({code: ":party:", url: "http://www.awesomenauts.com/forum/images/smilies/Smiley_PartyPenny.gif", name: "party"});

var customSmilieslist = new Array();
customSmilieslist.push({name: "Duck (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/ducks10.gif", code: ":duck:"});
customSmilieslist.push({name: "Prestige 10 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/presti10.gif", code: ":p10:"});
customSmilieslist.push({name: "League 1 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg1_g11.gif", code: ":l1:"});
customSmilieslist.push({name: "League 2 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg210.gif", code: ":l2:"});
customSmilieslist.push({name: "League 3 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg310.gif", code: ":l3:"});
customSmilieslist.push({name: "League 4 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg410.gif", code: ":l4:"});
customSmilieslist.push({name: "Frog (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/frogst10.gif", code: ":frog:"});
customSmilieslist.push({name: "Froggy G", url: "http://cdn.steamcommunity.com/economy/emoticon/froggy", code: ":froggy:"});
customSmilieslist.push({name: "Lonestar", url: "http://cdn.steamcommunity.com/economy/emoticon/lonestar", code: ":lonestar:"});
customSmilieslist.push({name: "Creepy Leon (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/creep_10.gif", code: ":creepyleon:"});
customSmilieslist.push({name: "Clunk", url: "http://cdn.steamcommunity.com/economy/emoticon/clunk", code: ":clunk:"});
customSmilieslist.push({name: "Clunk (by Muffel)", url: "http://i.imgur.com/Bf5wECc.gif", code: ":clunkangry:"});
customSmilieslist.push({name: "Cluck (by conorbebe)", url: "http://i.imgur.com/BBctJc8.gif", code: ":cluck:"});
customSmilieslist.push({name: "Voltar (by conorbebe)", url: "http://i.imgur.com/KDfPpJQ.gif", code: ":voltar:"});
customSmilieslist.push({name: "Gnaw (by conorbebe)", url: "http://i.imgur.com/gZ89B3d.gif", code: ":gnaw:"});
customSmilieslist.push({name: "Gnaw spit (by conorbebe)", url: "http://i.imgur.com/M50popG.gif", code: ":gnawspit:"});
customSmilieslist.push({name: "Plant1 (by Muffel)", url: "http://i.imgur.com/LjlUxjU.gif", code: ":plant1:"});
customSmilieslist.push({name: "Plant2 (by Muffel)", url: "http://i.imgur.com/4zgWOG5.gif", code: ":plant2:"});
customSmilieslist.push({name: "Coco (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/coco10.gif", code: ":coco:"});
customSmilieslist.push({name: "Yummy Skolldir (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/yum_sk11.gif", code: ":yummy:"});
customSmilieslist.push({name: "Skolldir hmm (by RiceMaster)", url: "http://i.imgur.com/neuQLpL.gif", code: ":hmm:"});
customSmilieslist.push({name: "Rae YJM (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/rae_ma10.gif", code: ":YJM:"});
customSmilieslist.push({name: "Rae Smirk (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/rae_ne10.gif", code: ":smirk:"});
customSmilieslist.push({name: "Derpl (by RiceMaster)", url: "http://i.imgur.com/8lWTMmJ.png", code: ":derpl:"});
customSmilieslist.push({name: "Vinnie (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_d10.gif", code: ":vinnie:"});
customSmilieslist.push({name: "Vinnie Face (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_h10.gif", code: ":vinnieface:"});
customSmilieslist.push({name: "Blow spike (by conorbebe)", url: "http://i.imgur.com/jm1zqZd.gif", code: ":spikeblow:"});
customSmilieslist.push({name: "Genji the Gray (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/wizrd_10.gif", code: ":genjismoke:"});
customSmilieslist.push({name: "Cocoon (by Muffel)", url: "http://i.imgur.com/HdvTy6k.gif", code: ":cocoon:"});
customSmilieslist.push({name: "Headbanging Swiggins (by Muffel)", url: "http://i.imgur.com/Nt1ng34.gif", code: ":headbang:"});
customSmilieslist.push({name: "Red Droid (by Muffel)", url: "http://i.imgur.com/iqKzH2e.gif", code: ":reddroid:"});
customSmilieslist.push({name: "Blue Droid (by Muffel)", url: "http://i.imgur.com/8TJJRjx.gif", code: ":bluedroid:"});
customSmilieslist.push({name: "Creep", url: "http://cdn.steamcommunity.com/economy/emoticon/creep", code: ":creep:"});
customSmilieslist.push({name: "Solar Crab (by RiceMaster)", url: "http://i.imgur.com/P9qsMhz.png", code: ":solarcrab:"});
customSmilieslist.push({name: "Solar", url: "http://cdn.steamcommunity.com/economy/emoticon/solar", code: ":solar:"});
customSmilieslist.push({name: "Awesome", url: "http://cdn.steamcommunity.com/economy/emoticon/awesome", code: ":awesome:"});
customSmilieslist.push({name: "Toast (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/toooas10.gif", code: ":toast:"});

//I see what you're trying to do!
var secretSmilieslist = new Array();
var _0xed16=["\x54\x75\x6D\x62\x6C\x65\x63\x72\x61\x62","\x68\x74\x74\x70\x3A\x2F\x2F\x69\x2E\x69\x6D\x67\x75\x72\x2E\x63\x6F\x6D\x2F\x6C\x39\x4A\x42\x70\x31\x35\x2E\x67\x69\x66","\x3A\x74\x75\x6D\x62\x6C\x65\x63\x72\x61\x62\x3A","\x70\x75\x73\x68","\x54\x75\x6D\x62\x6C\x65\x77\x65\x65\x64","\x68\x74\x74\x70\x3A\x2F\x2F\x69\x2E\x69\x6D\x67\x75\x72\x2E\x63\x6F\x6D\x2F\x77\x37\x48\x67\x52\x57\x46\x2E\x67\x69\x66","\x3A\x74\x75\x6D\x62\x6C\x65\x77\x65\x65\x64\x3A","\x68\x74\x74\x70\x3A\x2F\x2F\x69\x2E\x69\x6D\x67\x75\x72\x2E\x63\x6F\x6D\x2F\x43\x7A\x56\x4D\x56\x6E\x6B\x2E\x67\x69\x66","\x3A\x74\x75\x6D\x62\x6C\x65\x77\x65\x65\x64\x32\x3A","\x68\x74\x74\x70\x3A\x2F\x2F\x69\x2E\x69\x6D\x67\x75\x72\x2E\x63\x6F\x6D\x2F\x4F\x78\x43\x55\x54\x41\x6D\x2E\x67\x69\x66","\x3A\x74\x75\x6D\x62\x6C\x65\x77\x65\x65\x64\x33\x3A","\x6F\x2E\x4F","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x73\x70\x61\x7A\x64\x75\x6E\x6E\x6F","\x3A\x73\x70\x61\x7A\x64\x75\x6E\x6E\x6F\x3A","\x6D\x61\x6E\x74\x69\x73","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x66\x74\x6C\x6D\x61\x6E\x74\x69\x73","\x3A\x66\x74\x6C\x6D\x61\x6E\x74\x69\x73\x3A","\x43\x6F\x66\x66\x65\x65\x20\x62\x72\x65\x61\x6B","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x62\x72\x65\x61\x6B","\x3A\x63\x6F\x66\x66\x62\x72\x65\x61\x6B\x3A"];secretSmilieslist[_0xed16[3]]({name:_0xed16[0],url:_0xed16[1],code:_0xed16[2]});secretSmilieslist[_0xed16[3]]({name:_0xed16[4],url:_0xed16[5],code:_0xed16[6]});secretSmilieslist[_0xed16[3]]({name:_0xed16[4],url:_0xed16[7],code:_0xed16[8]});secretSmilieslist[_0xed16[3]]({name:_0xed16[4],url:_0xed16[9],code:_0xed16[10]});secretSmilieslist[_0xed16[3]]({name:_0xed16[11],url:_0xed16[12],code:_0xed16[13]});secretSmilieslist[_0xed16[3]]({name:_0xed16[14],url:_0xed16[15],code:_0xed16[16]});secretSmilieslist[_0xed16[3]]({name:_0xed16[17],url:_0xed16[18],code:_0xed16[19]});

var filteredWords = new Array();
filteredWords.push("fuck", "dick", "cunt", "shit", "ass", "bitch", "blowjob", "cock", "cum", "faggot", "porn");

function postEdits(newMess) //Changes to posts, should be called for every load. 
{
    //New message (instead of page load)
    if (newMess)
    {
        if (GetUSStorage('playSound')) //Play a sound
        {
            new Audio('http://static.freeshoutbox.net/newmess.wav').play();
        }
        
        if (!focus) //Edit the title
        {
            $("title").text("New messages - " + originalTitle);
        }
    }
    
    $(document).ready(function(){
        console.log("Refreshing post edits...");
        
        $(".postbody", $("#contentarea")).each(function(){ //Loop through all posts
            var post = this;
            
            //Word filter
            $.each(filteredWords, function() {
                $(post).html($(post).html().replace(new RegExp(" " + this + " ", "gi"), ' * '));
            });
            
            //Smilies
            $.each(smilieslist, function() {
                $(post).html($(post).html().replace(new RegExp(this.code, "gi"), '<img src="' + this.url + '" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" />'));
            });
            $.each(customSmilieslist, function() {
                $(post).html($(post).html().replace(new RegExp(this.code, "gi"), '<img src="' + this.url + '" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" />'));
            });
            $.each(secretSmilieslist, function() {
                $(post).html($(post).html().replace(new RegExp(this.code, "gi"), '<img src="' + this.url + '" alt="secret" title="'+this.name+'" />'));
            });
            
            //Find specials and color them accordingly
            $("b", this).each(function(){
                name = $(this).html().replace(/(<([^>]+)>)/ig,"").replace(":","");
                
                if (jQuery.inArray(name, Ronimo) != -1) { $(this).prepend("<img src=\"http://img4.wikia.nocookie.net/__cb20131011154248/awesomenauts/images/f/f2/UI_PrestigeRonimo.png\" height=\"17px\" /> "); $(this).wrap("<span style='color:#AA0000'></span>") }
                if (jQuery.inArray(name, Adminauts) != -1) { $(this).wrap("<span style='color:#FF9900'></span>") }
                if (jQuery.inArray(name, Specials) != -1) { $(this).wrap("<span style='color:#0000AA'></span>") }
            });
            
            //Unread marker
            if (!focus && ($(post).attr('id') > lastRead))
            {
                $(post).prepend('<span class="unreadMarker">* </span>');
            }
            
            //Parse BBcode, external library. 
            $(this).html(XBBCODE.process({text: $(this).html()}).html);
            
            //Timestamps
            var wrapper = $(this).parent()
            if (!$(wrapper).hasClass("wrapie")) { wrapper = $(wrapper).parent(); }
            var time = $(wrapper).attr("title").split("@ ")[1].split(" UTC")[0].split(":");
            dt = new Date();
            dt.setUTCHours(time[0]);
            var hours = dt.getHours(); //Javascript date will automatically convert to the right timezone.
            var minutes = time[1];
            $(post).prepend("[" + hours + ":" + minutes + "] ");
        });
    });
} 

var checker = 0;
function jqueryLoaded() {
    clearInterval(checker);
    console.log("Shoutbox jQuery found; running shoutbox script version " + currentVersion);
    
    originalTitle = $("title").text();
    
    $(window).focus(function(){
        focus = true;
        $("title").text(originalTitle);
        $(".unreadMarker").delay(2000).fadeOut(500);
    });
    
    $(window).blur(function() {
        lastRead = $(".postbody", $("#contentarea")).first().attr('id');
        focus = false;
    });
    
    GetUSStorage = function(item)
    {
        return JSON.parse(localStorage.getItem("UserScript" + item));
    }

    SetUSStorage = function(item, value)
    {
        localStorage.setItem("UserScript" + item, JSON.stringify(value));
    }
    
    //Remove pesky ads
    $("div[id^=div-gpt-ad]").each(function() { $(this).remove(); });
    
    $('head').append('<link rel="stylesheet" href="http://chirimorin.github.io/AwesomenautsForumAddon/xbbcode/xbbcode.css" type="text/css" />');
    
    $(document).ready(function(){
        //Hide MOTD bar (used for loading this script)
        //Or add the message of the day instead!
        if (MOTD)
        {
            $("#ShoutboxScript").parent().prepend("<span id=\"MOTD\"></span>");
            preparedMOTD();
        }
        else
        {
            $("#ShoutboxScript").parent().parent().parent().parent().parent().hide();
        }
        
        //Custom emotes input
        $("#divOptions").prepend("<table cellspacing=\"5\" cellpadding=\"0\" border=\"0\" align=\"center\"> \
                                    <tbody> \
                                        <tr> \
                                            <td align=\"center\"><b>Default Smilies</b></td> \
                                            <td align=\"center\"><b>Custom Smilies</b></td> \
                                        </tr> \
                                        <tr> \
                                            <td align=\"center\" id=\"defaultsmilies\"></td> \
                                            <td align=\"center\" id=\"customsmilies\"></td> \
                                        </tr> \
                                    </tbody> \
                                </table>");

        $.each(smilieslist, function() {
            $("#defaultsmilies").append('<a href="#" onclick="addSmiley(\''+this.code+'\')" style="line-height: 20px;"><img src="'+this.url+'" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" hspace="2"></a>');
        });
        $.each(customSmilieslist, function() {
            $("#customsmilies").append('<a href="#" onclick="addSmiley(\''+this.code+'\')" style="line-height: 20px;"><img src="'+this.url+'" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" hspace="2"></a>');
        });
        
        $("input[name='txtMessage']").width('100%');
        
        //Replace newmessage checkbox
        if ($('input[name=newmess]').length != 0)
        {
            $('input[name=newmess]').attr('checked', false);
            savesoundselection();
            $('input[name=newmess]').hide().after('<input type="checkbox" id="playsound" name="playsound" onchange="SetUSStorage(\'playSound\', this.checked)">');
            $('#playsound').attr('checked', GetUSStorage('playSound'));
        }
        
        //Edit all posts
        postEdits(false);
        
        //Make sure editing the posts is part of re-rendering the shoutbox (This is always called, no matter your user-level or loading method)
        var renderShoutboxOld = renderShoutbox;
        renderShoutbox = function(data) {
            renderShoutboxOld(data);
            postEdits(true);
        }
        
        //Mark the latest post as read
        lastRead = $(".postbody", $("#contentarea")).first().attr('id');
    });
}

function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
        return;
    } 
    if(checker == 0) {
        console.log("Waiting for shoutbox jQuery to load...");
        checker = window.setInterval(checkJquery, 100);
    }
}    

checkJquery();


