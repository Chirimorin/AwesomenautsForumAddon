console.log("Shoutbox script loaded");

var currentVersion = 1.01;

var Ronimo = new Array();

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
customSmilieslist.push({name: "Creepy Leon (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/creep_10.gif", code: ":creepyleon:"});
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
customSmilieslist.push({name: "Toast (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/toooas10.gif", code: ":toast:"});
customSmilieslist.push({name: "Solar", url: "http://cdn.steamcommunity.com/economy/emoticon/solar", code: ":solar:"});
customSmilieslist.push({name: "Clunk", url: "http://cdn.steamcommunity.com/economy/emoticon/clunk", code: ":clunk:"});
customSmilieslist.push({name: "Lonestar", url: "http://cdn.steamcommunity.com/economy/emoticon/lonestar", code: ":lonestar:"});
customSmilieslist.push({name: "Froggy G", url: "http://cdn.steamcommunity.com/economy/emoticon/froggy", code: ":froggy:"});
customSmilieslist.push({name: "Creep", url: "http://cdn.steamcommunity.com/economy/emoticon/creep", code: ":creep:"});
customSmilieslist.push({name: "Awesome", url: "http://cdn.steamcommunity.com/economy/emoticon/awesome", code: ":awesome:"});

//I see what you're trying to do!
var secretSmilieslist = new Array();
var _0xd3d0=["\x6F\x2E\x4F","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x73\x70\x61\x7A\x64\x75\x6E\x6E\x6F","\x3A\x73\x70\x61\x7A\x64\x75\x6E\x6E\x6F\x3A","\x70\x75\x73\x68","\x6D\x61\x6E\x74\x69\x73","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x66\x74\x6C\x6D\x61\x6E\x74\x69\x73","\x3A\x66\x74\x6C\x6D\x61\x6E\x74\x69\x73\x3A","\x43\x6F\x66\x66\x65\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x63\x64\x6E\x2E\x73\x74\x65\x61\x6D\x63\x6F\x6D\x6D\x75\x6E\x69\x74\x79\x2E\x63\x6F\x6D\x2F\x65\x63\x6F\x6E\x6F\x6D\x79\x2F\x65\x6D\x6F\x74\x69\x63\x6F\x6E\x2F\x62\x72\x65\x61\x6B","\x3A\x63\x6F\x66\x66\x62\x72\x65\x61\x6B\x3A"];secretSmilieslist[_0xd3d0[3]]({name:_0xd3d0[0],url:_0xd3d0[1],code:_0xd3d0[2]});secretSmilieslist[_0xd3d0[3]]({name:_0xd3d0[4],url:_0xd3d0[5],code:_0xd3d0[6]});secretSmilieslist[_0xd3d0[3]]({name:_0xd3d0[7],url:_0xd3d0[8],code:_0xd3d0[9]});

var filteredWords = new Array();
filteredWords.push("fuck", "dick", "cunt", "shit", "ass", "bitch", "blowjob", "cock", "cum", "faggot", "porn");

function postEdits() //Changes to posts, should be called for every load. 
{
    $(document).ready(function(){
        console.log("Refreshing post edits...");
        
        $(".postbody", $("#contentarea")).each(function(){ //Loop through all posts
            var post = this;
            
            //Word filter
            $.each(filteredWords, function() {
                $(post).html($(post).html().replace(new RegExp(" " + this + " ", "gi"), ' * '));
            });
            
            //Smilies!
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
                
                if (jQuery.inArray(name, Ronimo) != -1) { $(this).wrap("<span style='color:#AA0000'></span>") }
                if (jQuery.inArray(name, Adminauts) != -1) { $(this).wrap("<span style='color:#FF9900'></span>") }
                if (jQuery.inArray(name, Specials) != -1) { $(this).wrap("<span style='color:#0000AA'></span>") }
            });
            
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
    
    $('head').append('<link rel="stylesheet" href="http://chirimorin.github.io/AwesomenautsForumAddon/xbbcode/xbbcode.css" type="text/css" />');
    
    $(document).ready(function(){
        //Remove pesky ads
        $("div[id^=div-gpt-ad]").each(function() { $(this).remove(); });
        
        //Hide MOTD bar (used for loading this script)
        $("#ShoutboxScript").parent().parent().parent().parent().parent().hide();
        
        //Custom emotes input
        $("#divOptions").prepend("<table cellspacing=\"5\" cellpadding=\"0\" border=\"0\" align=\"center\"> \
                                    <tbody> \
                                        <tr> \
                                            <td class=\"gensmall\" align=\"center\"><b>Default Smilies</b></td> \
                                            <td class=\"gensmall\" align=\"center\"><b>Custom Smilies</b></td> \
                                        </tr> \
                                        <tr> \
                                            <td width=\"187\" align=\"center\" id=\"defaultsmilies\"></td> \
                                            <td width=\"187\" align=\"center\" id=\"customsmilies\"></td> \
                                        </tr> \
                                    </tbody> \
                                </table>");

        $.each(smilieslist, function() {
            $("#defaultsmilies").append('<a href="#" onclick="addSmiley(\''+this.code+'\')" style="line-height: 20px;"><img src="'+this.url+'" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" hspace="2"></a>');
        });
        $.each(customSmilieslist, function() {
            $("#customsmilies").append('<a href="#" onclick="addSmiley(\''+this.code+'\')" style="line-height: 20px;"><img src="'+this.url+'" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" hspace="2"></a>');
        });
        
        //Edit all posts
        postEdits();
        
        if (socket) //First page, autorefresh enabled. 
        {
            var renderShoutboxOld = renderShoutbox;
            renderShoutbox = function(data) {
                renderShoutboxOld(data);
                postEdits();
            }
            //$( document ).ajaxComplete(function() { postEdits() }); //Shouldn't be needed, but somehow the socket function below fails when you're a mod.
            //socket.on('newPost', function(mess) { postEdits(); });
        }
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


