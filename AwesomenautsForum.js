console.log("Awesomenauts forum userscript started!");

var jquery = document.createElement("script");
jquery.type = "text/javascript";
jquery.src = "http://code.jquery.com/jquery-latest.min.js";
document.head.appendChild(jquery);

function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

//Insert string function for use further in the script.
String.prototype.insert = function (index, string) 
{
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

var checker = 0;
var currentVersion = 3.16;
var updateMessage = "No more false positives on marking posts.";
 
function jqueryLoaded() {
    clearInterval(checker);
    console.log("jQuery found; loading script version " + currentVersion);
    
    //Find the banner at the top of the page
    var banner;
    var imgs = document.getElementsByTagName ('img');
    for (i=0; i<imgs.length ; i++) 
    {
        if(imgs[i].src == "http://www.awesomenauts.com/forum/styles/awesome/imageset/sitelogo.jpg")
        {
            console.log("Banner found");
            banner = imgs[i];
        }
    }

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (supports_local_storage()) //Local storage supported, good!
    {
        GetStorage = function(item)
        {
            return JSON.parse(localStorage.getItem(item));
        }

        SetStorage = function(item, value)
        {
            localStorage.setItem(item, JSON.stringify(value));
        }

        if (GetStorage('version') == undefined)
        {
            //Storage version not found, set default values for all variables. 
            SetStorage('version',0); //Set current version to 0. Will induce all default settings. 
        }

        if (GetStorage('version') < currentVersion)
        {
            console.log("Settings for version " + GetStorage('version') + " detected; Updating settings...");
            if (GetStorage('version')<2.5)
            {
                SetStorage('testScript',false);
                SetStorage('markingMode',1); //Post marking mode, 0 = none, 1 = avatar outline, 2 = avatar panel background
                SetStorage('markingColor',"blue"); //Post marking color. 
                SetStorage('markingText',"white"); //Text color used when markingMode = 2
                SetStorage('extraSmilies',true); //Extra smilies for posting. 
                SetStorage('strawpollEmbed',true); //Auto embedding of Strawpoll.me polls. 
            }
            
            if (GetStorage('version')<2.61)
            {
                SetStorage('settingsLink',true); //Puts a link for the settings in the top menu
            }
            
            if (GetStorage('version')<2.7)
            {
                SetStorage('extraBBCode',true); //Adds extra bbcode to the post menu
            }
            
            if (GetStorage('version')<2.9)
            {
                SetStorage('postMarkingMode',GetStorage('markingMode')); //rename saved variable
                SetStorage('postMarkingColor',GetStorage('markingColor')); //rename saved variable
                SetStorage('postMarkingTextColor',GetStorage('markingText')); //rename saved variable
                
                localStorage.removeItem('markingMode');
                localStorage.removeItem('markingColor');
                localStorage.removeItem('markingText');
                
                SetStorage('imageMarking',true); //Marks resized images
                SetStorage('imageMarkingColor',"red"); //Color of marking resized images
                
            }
            
            if (GetStorage('version')<3.0)
            {
                SetStorage('youtubeEmbed',true); //Adds embed button to all youtube videos
                SetStorage('hideTopics', true); //Allows the hiding of specific topics
                SetStorage('hiddenTopics', new Array()); //An array containing all hidden topics
                SetStorage('hideForums', true); //Allows the hiding of specific forums
                SetStorage('hiddenForums', new Array()); //An array containing all hidden forums
                SetStorage('magnifyText', true); //Magnifies tiny text when hovering over it
            }
            
            if (GetStorage('version')<3.1)
            {
                SetStorage('shoutbox',true); //Adds a shoutbox to the forum
            }
            
            if (GetStorage('version')<3.11)
            {
                SetStorage('shoutboxHeight',200); //Height of the shoutbox.
            }
            
            SetStorage('testScript',false); //Disable the test script if an update is found. 
            
            SetStorage('version',currentVersion); //Set the current version to prevent resetting to defaults next time. 
            console.log("All settings updated");
            alert("Awesomenauts Forum UserScript updated! \n"+updateMessage+"\nCurrent version: " + currentVersion); //Alert the user that an update has happened.
        }

        if ( GetStorage('testScript') == true ) //Load test script?
        {
            if (banner != undefined)
            {
                banner.src = "http://chirimorin.github.io/AwesomenautsForumAddon/Resources/ReplaceBannerTest.png";
                console.log("Banner replaced");
            }
            console.log("Loading test script...");
            script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumTest.js?v=" + currentVersion;
        }
        else //Load latest script version
        {
            if (banner != undefined)
            {
                banner.src = "http://chirimorin.github.io/AwesomenautsForumAddon/Resources/ReplaceBanner.png";
                console.log("Banner replaced");
            }
            console.log("Loading live script...");
            script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLatest.js?v=" + currentVersion;
        }
    }
    else //Local storage not supported, load legacy script. 
    {
        if (banner != undefined)
        {
            banner.src = "http://chirimorin.github.io/AwesomenautsForumAddon/Resources/ReplaceBanner.png";
            console.log("Banner replaced");
        }
        console.log("LocalStorage not supported. Loading legacy script...");
        script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLegacy.js";
    }

    document.body.appendChild(script);
}

function checkJquery() {
    if (window.jQuery) {
            jqueryLoaded();
    } 
        if(checker == 0) {
            console.log("Waiting for jQuery to load...");
            checker = window.setInterval(checkJquery, 100);
        }
}	

checkJquery();
