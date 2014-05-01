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
var currentVersion = 3.18;
var updateMessage = "No more false update messages.\nYour settings have been reset. I'm sorry for this.";
var scriptLoaded = false;
 
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
        GetUSStorage = function(item)
        {
            return JSON.parse(localStorage.getItem("UserScript" + item));
        }

        SetUSStorage = function(item, value)
        {
            localStorage.setItem("UserScript" + item, JSON.stringify(value));
        }

        if (GetUSStorage('version') == undefined)
        {
            //Storage version not found, set default values for all variables. 
            SetUSStorage('version',0); //Set current version to 0. Will induce all default settings. 
        }
        
        if (JSON.parse(localStorage.getItem('version') == 3.16))
        {
            //Old settings for the userscript found. Clear everything. 
            //Forum script should load defaults after this.
            localStorage.clear();
        }

        if (GetUSStorage('version') < currentVersion)
        {
            var oldStorage = true;
            console.log("Settings for version " + GetUSStorage('version') + " detected; Updating settings...");
            if (GetUSStorage('version')<2.5)
            {
                oldStorage = false;
                SetUSStorage('postMarkingMode',2); //Post marking mode, 0 = none, 1 = avatar outline, 2 = avatar panel background
                SetUSStorage('postMarkingColor',"#eee"); //Post marking color. 
                SetUSStorage('postMarkingTextColor',"black"); //Text color used when markingMode = 2
                SetUSStorage('testScript',false);
                SetUSStorage('extraSmilies',true); //Extra smilies for posting. 
                SetUSStorage('strawpollEmbed',true); //Auto embedding of Strawpoll.me polls. 
            }
            
            if (GetUSStorage('version')<2.61)
            {
                SetUSStorage('settingsLink',true); //Puts a link for the settings in the top menu
            }
            
            if (GetUSStorage('version')<2.7)
            {
                SetUSStorage('extraBBCode',true); //Adds extra bbcode to the post menu
            }
            
            if (GetUSStorage('version')<2.9)
            {
                if (oldStorage)
                {
                    SetUSStorage('postMarkingMode',GetUSStorage('markingMode')); //rename saved variable
                    SetUSStorage('postMarkingColor',GetUSStorage('markingColor')); //rename saved variable
                    SetUSStorage('postMarkingTextColor',GetUSStorage('markingText')); //rename saved variable
                    localStorage.removeItem('markingMode');
                    localStorage.removeItem('markingColor');
                    localStorage.removeItem('markingText');
                }
                
                SetUSStorage('imageMarking',true); //Marks resized images
                SetUSStorage('imageMarkingColor',"red"); //Color of marking resized images
            }
            
            if (GetUSStorage('version')<3.0)
            {
                SetUSStorage('youtubeEmbed',true); //Adds embed button to all youtube videos
                SetUSStorage('hideTopics', true); //Allows the hiding of specific topics
                SetUSStorage('hiddenTopics', new Array()); //An array containing all hidden topics
                SetUSStorage('hideForums', true); //Allows the hiding of specific forums
                SetUSStorage('hiddenForums', new Array()); //An array containing all hidden forums
                SetUSStorage('magnifyText', true); //Magnifies tiny text when hovering over it
            }
            
            if (GetUSStorage('version')<3.1)
            {
                SetUSStorage('shoutbox',true); //Adds a shoutbox to the forum
            }
            
            if (GetUSStorage('version')<3.11)
            {
                SetUSStorage('shoutboxHeight',200); //Height of the shoutbox.
            }
            
            SetUSStorage('testScript',false); //Disable the test script if an update is found. 
            
            SetUSStorage('version',currentVersion); //Set the current version to prevent resetting to defaults next time. 
            console.log("All settings updated");
            alert("Awesomenauts Forum UserScript updated! \n"+updateMessage+"\nCurrent version: " + currentVersion); //Alert the user that an update has happened.
        }

        if ( GetUSStorage('testScript') == true ) //Load test script?
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
