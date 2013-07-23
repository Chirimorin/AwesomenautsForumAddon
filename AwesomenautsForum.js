//Test behavior
if ( window.location.search.indexOf('ForumScriptTest=1') != -1)
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumTestVersion.js"
    document.body.appendChild(script);
}
else
{
//Normal script starts here
    
//Thanks to Nodja for the code to keep onclick behavior. 
//gets all td elements with class="row1 clickable"
var allClickables = document.evaluate
                                    (
                                      '//td[@class="row1 clickable"]',
                                      document, 
                                      null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                      null
                                    );

//replaces the onclick to check for left button and ctrl key
for (var i=0; i<allClickables.snapshotLength; i++) 
{
  var elem = allClickables.snapshotItem(i);
  elem.setAttribute("onclick","if (event.button == 0 && event.ctrlKey == false) " + elem.getAttribute("onclick"));
}
//End of Nodjas script


var postBodys = document.getElementsByClassName('postbody');
for (i=0; i<postBodys.length ; i++) 
{
    postBodys[i].style.maxWidth = '764px';
    postBodys[i].style.wordWrap = 'break-word';
    
    var imgs = postBodys[i].getElementsByTagName('img');
    for (j=0; j<imgs.length; j++) 
    {
        imgs[j].style.maxWidth = '764px';
		imgs[j].addEventListener('click', function(event) 
            {
				if (event.currentTarget.style.maxWidth == 'none') 
                {
					event.currentTarget.style.maxWidth = '764px';
				} 
                else 
                {
					event.currentTarget.style.maxWidth = 'none';
				}
			}, false);
    }
}

//extra smilies code by Nodja
var smilieslist = new Array();
smilieslist.push({name: "Duck (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/ducks10.gif", code: ":duck:"});
smilieslist.push({name: "Prestige 10 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/presti10.gif", code: ":p10:"});
smilieslist.push({name: "League 1 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg1_g11.gif", code: ":l1:"});
smilieslist.push({name: "League 2 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg210.gif", code: ":l2:"});
smilieslist.push({name: "League 3 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg310.gif", code: ":l3:"});
smilieslist.push({name: "League 4 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg410.gif", code: ":l4:"});
smilieslist.push({name: "Cluck (by conorbebe)", url: "http://i.imgur.com/BBctJc8.gif", code: ":cluck:"});
smilieslist.push({name: "Voltar (by conorbebe)", url: "http://i.imgur.com/KDfPpJQ.gif", code: ":voltar:"});
smilieslist.push({name: "Creepy Leon (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/creep_10.gif", code: ":creepyleon:"});
smilieslist.push({name: "Derpl (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/derpl_10.png", code: ":derpl:"});
smilieslist.push({name: "Rae YJM (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/rae_ma10.gif", code: ":YJM:"});
smilieslist.push({name: "Rae Smirk (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/rae_ne10.gif", code: ":smirk:"});
smilieslist.push({name: "Yummy Skolldir (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/yum_sk11.gif", code: ":yummy:"});
smilieslist.push({name: "Blow spike (by conorbebe)", url: "http://i.imgur.com/jm1zqZd.gif", code: ":spikeblow:"});
smilieslist.push({name: "Vinnie (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_d10.gif", code: ":vinnie:"});
smilieslist.push({name: "Vinnie Face (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_h10.gif", code: ":vinnieface:"});
smilieslist.push({name: "Vinnie Clap (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_a11.gif", code: ":vinnieclap:"});
smilieslist.push({name: "Gnaw (by conorbebe)", url: "http://i.imgur.com/gZ89B3d.gif", code: ":gnaw:"});
smilieslist.push({name: "Gnaw spit (by conorbebe)", url: "http://i.imgur.com/M50popG.gif", code: ":gnawspit:"});
smilieslist.push({name: "Toast (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/toooas10.gif", code: ":toast:"});
smilieslist.push({name: "Frog (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/frogst10.gif", code: ":frog:"});
smilieslist.push({name: "Coco (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/coco10.gif", code: ":coco:"});
smilieslist.push({name: "Genji the Gray (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/wizrd_10.gif", code: ":genjismoke:"});




function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

if(window.location.href.indexOf("posting.php") > -1) //figure out if we're posting
{
   var form = document.getElementsByName('postform')[0];
   if (form.attachEvent) {
      form.attachEvent("submit", submitHandler);
   } else {
      form.addEventListener("submit", submitHandler);
   }
   
   var message = document.getElementsByName("message")[0].value;

   
   for(i=0;i<smilieslist.length;i++)
   {
      var re = new RegExp(escapeRegExp("[img]" + smilieslist[i].url  + "[/img]"),"gi");
      message = message.replace(re, smilieslist[i].code);
   }
   document.getElementsByName("message")[0].value = message;
   
   //get all row1 tds
   var allRow1 = document.evaluate
                                    (
                                      '//td[@class="row1"]',
                                      document, 
                                      null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                      null
                                    );
   for (var i=0; i<allRow1.snapshotLength; i++) 
   {
      var elem = allRow1.snapshotItem(i);
      if (elem.innerHTML.indexOf("Message body:") > -1) break;
   }
   elem.innerHTML += "<table width=\"100%\" cellspacing=\"5\" cellpadding=\"0\" border=\"0\" align=\"center\"> \
      <tbody> \
         <tr> \
            <td class=\"gensmall\" align=\"center\"><b><a href=\"http://www.awesomenauts.com/forum/viewtopic.php?f=12&t=14829\">Custom Smilies</a></b></td> \
         </tr> \
         <tr> \
            <td align=\"center\" id=\"customsmilies\"> \
            </td> \
         </tr> \
      </tbody> \
   </table>";
   drawSmilies();
}

function submitHandler(e)
{
   var message = document.getElementsByName("message")[0].value;
   
   for(i=0;i<smilieslist.length;i++)
   {
      var re = new RegExp(smilieslist[i].code,"gi");
      message = message.replace(re, "[img]" + smilieslist[i].url + "[/img]");
   }
   document.getElementsByName("message")[0].value = message;
    return false;
}

function drawSmilies()
{
   var smilieshtml = '';
   for(i=0;i<smilieslist.length;i++)
   {
      smilieshtml += "<a href=\"#\" onclick=\"insert_text('";
      smilieshtml += smilieslist[i].code + "', true); return false;\" style=\"line-height: 20px;\"><img src=\"";
      smilieshtml += smilieslist[i].url + "\" alt=\"";
      smilieshtml += smilieslist[i].code + "\" title=\"";
      smilieshtml += smilieslist[i].name + "\" hspace=\"2\" vspace=\"2\"></a>\n";
   }
   document.getElementById("customsmilies").innerHTML = smilieshtml;
}

}

