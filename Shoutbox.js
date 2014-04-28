console.log("Shoutbox script loaded");

var currentVersion = 0.5;

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
customSmilieslist.push({name: "Clunk (by Muffel)", url: "http://i.imgur.com/Bf5wECc.gif", code: ":clunk:"});
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
customSmilieslist.push({name: "Derpl (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/derpl_10.png", code: ":derpl:"});
customSmilieslist.push({name: "Vinnie (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_d10.gif", code: ":vinnie:"});
customSmilieslist.push({name: "Vinnie Face (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_h10.gif", code: ":vinnieface:"});
customSmilieslist.push({name: "Blow spike (by conorbebe)", url: "http://i.imgur.com/jm1zqZd.gif", code: ":spikeblow:"});
customSmilieslist.push({name: "Genji the Gray (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/wizrd_10.gif", code: ":genjismoke:"});
customSmilieslist.push({name: "Cocoon (by Muffel)", url: "http://i.imgur.com/HdvTy6k.gif", code: ":cocoon:"});
customSmilieslist.push({name: "Headbanging Swiggins (by Muffel)", url: "http://i.imgur.com/Nt1ng34.gif", code: ":headbang:"});
customSmilieslist.push({name: "Red Droid (by Muffel)", url: "http://i.imgur.com/iqKzH2e.gif", code: ":reddroid:"});
customSmilieslist.push({name: "Blue Droid (by Muffel)", url: "http://i.imgur.com/8TJJRjx.gif", code: ":bluedroid:"});
customSmilieslist.push({name: "Toast (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/toooas10.gif", code: ":toast:"});

function postEdits() //Changes to posts, should be called for every load. 
{
    $(document).ready(function(){
        console.log("Refreshing post edits...");
        
        $(".postbody", $("#contentarea")).each(function(){ //Loop through all posts
            var post = this;
            //Smilies!
            $.each(smilieslist, function() {
                $(post).html($(post).html().replace(new RegExp(this.code, "gi"), '<img src="' + this.url + '" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" />'));
            });
            $.each(customSmilieslist, function() {
                $(post).html($(post).html().replace(new RegExp(this.code, "gi"), '<img src="' + this.url + '" alt="'+this.code.replace(/:/gi,"")+'" title="'+this.name+'" />'));
            });
            
            //$(this).html($(this).html().replace(/:monkey:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_Monkey.gif" alt="monkey" title="Happy monkey">'));
            //$(this).html($(this).html().replace(/:ayla      :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_Ayla.gif" alt="ayla" title="happy">'));
            //$(this).html($(this).html().replace(/:aylaroll  :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_AylaRoll.gif" alt="aylaroll" title="roll">'));
            //$(this).html($(this).html().replace(/:voltarroll:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_VoltarRoll.gif" alt="voltarroll" title="roll eyes">'));
            //$(this).html($(this).html().replace(/:drool     :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_DerplDrool.gif" alt="drool" title="drool">'));
            //$(this).html($(this).html().replace(/:thumb     :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_FroggyThumb.gif" alt="thumb" title="thumb">'));
            //$(this).html($(this).html().replace(/:leoneyes  :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_LeonEyes.gif" alt="leoneyes" title="leonEyes">'));
            //$(this).html($(this).html().replace(/:shrug     :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_FrogShrug.gif" alt="shrug" title="shrug">'));
            //$(this).html($(this).html().replace(/:gnawshock :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_GnawSurprise.gif" alt="GnawShock" title="shock">'));
            //$(this).html($(this).html().replace(/:huh       :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_YuriHuh.gif" alt="huh" title="huh">'));
            //$(this).html($(this).html().replace(/:lolstar   :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_lolstar.gif" alt="lolstar" title="laughing">'));
            //$(this).html($(this).html().replace(/:derp      :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/SpikeDerp.gif" alt="derp" title="derp">'));
            //$(this).html($(this).html().replace(/:kiss      :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_CocoKiss.gif" alt="kiss" title="kiss">'));
            //$(this).html($(this).html().replace(/:worship   :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_GenjiWorship.gif" alt="worship" title="worship">'));
            //$(this).html($(this).html().replace(/:rae       :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_Raelynn.gif" alt="rae" title="Raelynn">'));
            //$(this).html($(this).html().replace(/:blabl     :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_Derpl.gif" alt="blabl" title="baffled">'));
            //$(this).html($(this).html().replace(/:drone     :/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_Drone.gif" alt="drone" title="mind_blown">'));
            //$(this).html($(this).html().replace(/:chew:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_ClunkBite.gif" alt="chew" title="Chew">'));
            //$(this).html($(this).html().replace(/:sleep:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_ClunkNose.gif" alt="sleep" title="sleep">'));
            //$(this).html($(this).html().replace(/:think:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_SentryThinking.gif" alt="think" title="think">'));
            //$(this).html($(this).html().replace(/:facepalm:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_SwigginsFacepalm.gif" alt="facepalm" title="facepalm">'));
            //$(this).html($(this).html().replace(/:tear:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_TedTear.gif" alt="tear" title="tear">'));
            //$(this).html($(this).html().replace(/:clap:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_VinnieClapping.gif" alt="clap" title="clapping">'));
            //$(this).html($(this).html().replace(/:shady:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_VoltarLook.gif" alt="shady" title="shady">'));
            //$(this).html($(this).html().replace(/:party:/ig, '<img src="http://www.awesomenauts.com/forum/images/smilies/Smiley_PartyPenny.gif" alt="party" title="party">'));
            
            
            //Find moderators and make them orange
            $("b", this).each(function(){
                name = $(this).html().replace(/(<([^>]+)>)/ig,"").replace(":","");
                
                if (jQuery.inArray(name, Ronimo) != -1) { $(this).wrap("<span style='color:#AA0000'></span>") }
                if (jQuery.inArray(name, Adminauts) != -1) { $(this).wrap("<span style='color:#FF9900'></span>") }
                if (jQuery.inArray(name, Specials) != -1) { $(this).wrap("<span style='color:#0000AA'></span>") }
            });
            
            //TODO: bad word filter.
        });
    });
} 

var checker = 0;
function jqueryLoaded() {
    clearInterval(checker);
    console.log("Shoutbox jQuery found; running shoutbox script version " + currentVersion);
    
    $(document).ready(function(){
        //Remove pesky ads
        $("div[id^=div-gpt-ad]").each(function() { $(this).remove(); });
        
        //Hide MOTD bar (used for loading this script)
        $("#ShoutboxScript").parent().parent().parent().parent().parent().hide();
        
        //TODO custom emote input
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
        
        postEdits();
        
        if (socket) //First page, autorefresh enabled. 
        {
            $( document ).ajaxComplete(function() { postEdits() }); //Shouldn't be needed, but somehow the socket function below fails when you're a mod.
            socket.on('newPost', function(mess) { postEdits(); });
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



