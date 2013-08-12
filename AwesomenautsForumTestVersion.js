//TEST SCRIPT ONLY, DO NOT COPY

//Replace the banner at the top of the page with the test version banner
var imgs = document.getElementsByTagName ('img');
for (i=0; i<imgs.length ; i++) 
{
    if(imgs[i].src == "http://www.awesomenauts.com/forum/styles/awesome/imageset/sitelogo.jpg")
    {
        imgs[i].src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/Resources/ReplaceBannerTest.png";
    }
}

//Get all the links on the page for editing
var links = document.links;

//Add the ForumScriptTest to all forum links
for (var i=0; i < links.length; i++)
{ 
    var thisLink = links[i]
    if (thisLink.href.search('awesomenauts.com/forum') != -1) //make sure the link is to a forum page
    {
        if (thisLink.href.search('#') == -1)
        {
            if (thisLink.href.search('\\?') == -1 ) 
            {
                thisLink.href += '?ForumScriptTest=1';
            }
            else
            {
                thisLink.href += '&ForumScriptTest=1';
            }
        }
        else
        {
            var originalLinkSplit = thisLink.href.split("#");
            if (thisLink.href.search('\\?') == -1 ) 
            {
                thisLink.href = originalLinkSplit[0] + '?ForumScriptTest=1#' + originalLinkSplit[1];
            }
            else
            {
                thisLink.href = originalLinkSplit[0] + '&ForumScriptTest=1#' + originalLinkSplit[1];
            }
        }
    }
}


//NORMAL SCRIPT STARTS HERE

//Insert string function for use further in the script.
String.prototype.insert = function (index, string) 
{
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

//Add options button to UCP
if (window.location.href.indexOf("ucp.php") != -1)
{
    options = document.getElementsByClassName('tablebg');
    for (i=0; i<options.length; i++)
    {
        if (options[i].innerHTML.indexOf('Friends &amp; Foes') != -1) //Make sure we're in the options panel
        {
            options[i].innerHTML = options[i].innerHTML.insert(options[i].innerHTML.indexOf('<tr><td class="cat-bottom">') - 1,"<tr><td class=\"row2\" nowrap=\"nowrap\" onmouseover=\"this.className='row1'\" onmouseout=\"this.className='row2'\" onclick=\"location.href=this.firstChild.href;\"><a class=\"nav\" href=\"./ucp.php?i=userscript\">Userscript Settings</a></td></tr>");
        }
    }
}

var ForumButtons = document.getElementsByClassName('forum-buttons');
for (i=0; i<ForumButtons.length; i++)
{
    //Find the username of the person who is logged in.
    //Will return bullshit if nobody is logged in, but this is just used for searching so no harm is done.
    var UserName = ForumButtons[i].innerHTML.substring(ForumButtons[i].innerHTML.indexOf("Logout [ ") + 9, ForumButtons[i].innerHTML.indexOf(" ]"));
    
    //Add button for the options menu
    ForumButtons[i].innerHTML = ForumButtons[i].innerHTML.insert((ForumButtons[i].innerHTML.indexOf('>Forum</a>')+91),"<a href=\"./ucp.php?i=userscript\">Userscript Settings</a><br />");
    ForumButtons[i].style.backgroundSize="1px 40px";
}

//Find posts by the logged in user and outline the avatar. 
var PostAuthors = document.getElementsByClassName('postauthor');
var PostBodys = document.getElementsByClassName('row-post-body');
for (i=0; i<PostAuthors.length; i++)
{
    if (PostAuthors[i].innerHTML.indexOf(UserName) != -1)
    {
        PostBodys[((i+1)*2)-2].innerHTML = PostBodys[((i+1)*2)-2].innerHTML.insert((PostBodys[((i+1)*2)-2].innerHTML.indexOf('User avatar')+12)," style='border:3px solid #0000FF'");
    }
}

//Userscript settings page
//if ( window.location.href.indexOF('i=userscript') != -1)
//{
//    var body = document.getElementById('errorpage');
//    body.style.height='99%';
//    body.innerHTML = "<object data='http://www.awesomenauts.com/forum/ucp.php?i=413' width='100%' height='100%'> <embed src='http://www.awesomenauts.com/forum/ucp.php?i=413' width='100%' height='100%'> </embed> Error: Embedded data could not be displayed. </object>";
//}

//Thanks to Nodja for the code to keep onclick behavior. 
// gets all td elements with class="row1 clickable"
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

//array that contains all the smiley codewords, name and image urls;
var smilieslist = new Array();
smilieslist.push({name: "Duck (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/ducks10.gif", code: ":duck:"});
smilieslist.push({name: "Prestige 10 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/presti10.gif", code: ":p10:"});
smilieslist.push({name: "League 1 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg1_g11.gif", code: ":l1:"});
smilieslist.push({name: "League 2 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg210.gif", code: ":l2:"});
smilieslist.push({name: "League 3 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg310.gif", code: ":l3:"});
smilieslist.push({name: "League 4 (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/lg410.gif", code: ":l4:"});
smilieslist.push({name: "Frog (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/frogst10.gif", code: ":frog:"});
smilieslist.push({name: "Creepy Leon (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/creep_10.gif", code: ":creepyleon:"});
smilieslist.push({name: "Clunk (by Muffel)", url: "http://i.imgur.com/Bf5wECc.gif", code: ":clunk:"});
smilieslist.push({name: "Cluck (by conorbebe)", url: "http://i.imgur.com/BBctJc8.gif", code: ":cluck:"});
smilieslist.push({name: "Voltar (by conorbebe)", url: "http://i.imgur.com/KDfPpJQ.gif", code: ":voltar:"});
smilieslist.push({name: "Exploding Drone (by Muffel)", url: "http://i.imgur.com/mJzlvKm.gif", code: ":voltardrone:"});
smilieslist.push({name: "Gnaw (by conorbebe)", url: "http://i.imgur.com/gZ89B3d.gif", code: ":gnaw:"});
smilieslist.push({name: "Gnaw spit (by conorbebe)", url: "http://i.imgur.com/M50popG.gif", code: ":gnawspit:"});
smilieslist.push({name: "Plant1 (by Muffel)", url: "http://i.imgur.com/LjlUxjU.gif", code: ":plant1:"});
smilieslist.push({name: "Plant2 (by Muffel)", url: "http://i.imgur.com/4zgWOG5.gif", code: ":plant2:"});
smilieslist.push({name: "Coco (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/coco10.gif", code: ":coco:"});
smilieslist.push({name: "Yummy Skolldir (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/yum_sk11.gif", code: ":yummy:"});
smilieslist.push({name: "Rae YJM (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/rae_ma10.gif", code: ":YJM:"});
smilieslist.push({name: "Rae Smirk (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/rae_ne10.gif", code: ":smirk:"});
smilieslist.push({name: "Derpl (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/derpl_10.png", code: ":derpl:"});
smilieslist.push({name: "Vinnie (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_d10.gif", code: ":vinnie:"});
smilieslist.push({name: "Vinnie Face (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_h10.gif", code: ":vinnieface:"});
smilieslist.push({name: "Vinnie Clap (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/vini_a11.gif", code: ":vinnieclap:"});
smilieslist.push({name: "Blow spike (by conorbebe)", url: "http://i.imgur.com/jm1zqZd.gif", code: ":spikeblow:"});
smilieslist.push({name: "Genji the Gray (by RiceMaster)", url: "http://i36.servimg.com/u/f36/17/49/01/19/wizrd_10.gif", code: ":genjismoke:"});
smilieslist.push({name: "Cocoon (by Muffel)", url: "http://i.imgur.com/HdvTy6k.gif", code: ":cocoon:"});
smilieslist.push({name: "Headbanging Swiggins (by Muffel)", url: "http://i.imgur.com/Nt1ng34.gif", code: ":headbang:"});
smilieslist.push({name: "Blabl Zork OMG (by conorbebe)", url: "http://i.imgur.com/LdNa43H.gif", code: ":omg:"});
smilieslist.push({name: "Red Droid (by Muffel)", url: "http://i.imgur.com/ROmI7JY.gif", code: ":reddroid:"});
smilieslist.push({name: "Blue Droid (by Muffel)", url: "http://i.imgur.com/A9cQWeI.gif", code: ":bluedroid:"});
smilieslist.push({name: "Toast (by RiceMaster)", url: "http://i83.servimg.com/u/f83/17/49/01/19/toooas10.gif", code: ":toast:"});



//smilieslist.push({name: " (by )", url: "", code: "::"});


//function used to escape a string to be used inside a regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

if(window.location.href.indexOf("posting.php") > -1) //figure out if we're posting
{
   //find form and attack an event that will handle the submit, submit works for both preview and submit buttons
   var form = document.getElementsByName('postform')[0];
   if (form.attachEvent) {
      form.attachEvent("submit", submitHandler);
   } else {
      form.addEventListener("submit", submitHandler);
   }
   
   
   var message = document.getElementsByName("message")[0].value; //gets the message textarea text
   // this loop will replace all urls in our array that are around [img] tags and replace it with 
   // the smiley code word (things like :happy:, [img]http://i.imgur.com/KDfPpJQ.gif[/img], etc)
   for(i=0;i<smilieslist.length;i++)
   {
      //we need to escape the url and the tags here since they contain special regex characters (/, [, ., etc)
      var re = new RegExp(escapeRegExp("[img]" + smilieslist[i].url  + "[/img]"),"gi");
      message = message.replace(re, smilieslist[i].code);
   }
   document.getElementsByName("message")[0].value = message;
   
   //get all row1 tds, one of the will contain the smileys
   var allRow1 = document.evaluate
                                    (
                                      '//td[@class="row1"]',
                                      document, 
                                      null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                      null
                                    );
   // find out which row1 has the smileys, we know this because it contains "Message body:",
   // this will probably break if the interface is in another language                        
   for (var i=0; i<allRow1.snapshotLength; i++) 
   {
      var elem = allRow1.snapshotItem(i);
      if (elem.innerHTML.indexOf("Message body:") > -1) break;
   }
   // elem should now be the td with the smileys on it (the one on the left of the screen)
   
   // this will add out custom html code to the row1, notice the td with id customsmilies
   // this customsmilies td will be where our custom smileys will be inserted
   elem.innerHTML += "<table width=\"100%\" cellspacing=\"5\" cellpadding=\"0\" border=\"0\" align=\"center\"> \
      <tbody> \
         <tr> \
            <td class=\"gensmall\" align=\"center\"><b>Custom Smilies</b></td> \
         </tr> \
         <tr> \
            <td align=\"center\" id=\"customsmilies\"> \
            </td> \
         </tr> \
         <tr> \
            <td class=\"gensmall\" align=\"center\"><a href=\"http://www.awesomenauts.com/forum/viewtopic.php?f=12&t=14829\">RiceMasters thread</a><br /> \
            <a href=\"http://www.awesomenauts.com/forum/viewtopic.php?f=12&t=18484\">Muffels thread</a></td> \
         </tr> \
      </tbody> \
   </table>";
   
   // put the drawsmilies in a separate function so we can update them on the fly in the future
   drawSmilies();
}

// this will change the message text when you press submit/preview, basically replacing things 
// like [img]http://i.imgur.com/KDfPpJQ.gif[/img], [img]http://i83.servimg.com/u/f83/17/49/01/19/derpl_10.png[/img], etc to an image tag with the corresponding url
function submitHandler(e)
{
   var message = document.getElementsByName("message")[0].value;
   
   for(i=0;i<smilieslist.length;i++)
   {
      var re = new RegExp(smilieslist[i].code,"gi");
      message = message.replace(re, "[img]" + smilieslist[i].url + "[/img]");
   }
   document.getElementsByName("message")[0].value = message;
   
   // returning true here supposedly prevents the submit behaviour, doesn't seem to affect anything in chrome
   // we return false anyway, just in case
    return false; 
}

function drawSmilies()
{
   // generates the html and adds the smilies to our td that we made before, 
   // the width and height are not set on the images, so be careful with the image urls used
   // will probably set a maxwidth/maxheight when we allow people to use their own images
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




