console.log("Awesomenauts forum userscript started!");

function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

var settings = [];

//Insert string function for use further in the script.
String.prototype.insert = function (index, string) 
{
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Get page filename 
var page = window.location.pathname.split("/").pop();
var scriptLoaded = false;

var currentVersion = 3.31;
var updateMessage = "Added an option to replace the top banner. You can turn that text off now.";
 
function main() {
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
        
        if (JSON.parse(localStorage.getItem('version')) == 3.16)
        {
            //Old settings for the userscript found. Clear everything. 
            //Forum script should load defaults after this.
            localStorage.clear();
        }

        if (GetUSStorage('version') < currentVersion)
        {
            console.log("Settings for version " + GetUSStorage('version') + " detected; Updating settings...");
            if (GetUSStorage('version')<2.5)
            {
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
            
            if (GetUSStorage('version')<3.2)
            {
                SetUSStorage('hideShoutbox',false); //Hide the shoutbox
                SetUSStorage('postMarkingMode', 2); 
                SetUSStorage('postMarkingColor', "#eee");
                SetUSStorage('postMarkingTextColor', "black");
                
                //No longer used
                localStorage.removeItem('UserScriptimageMarking');
                localStorage.removeItem('UserScriptimageMarkingColor');
                localStorage.removeItem('UserScriptpostMarkingText'); //Typod setting 
            }
            
            if (GetUSStorage('version')<3.21)
            {
                SetUSStorage('betterMarkRead', true); //Better "mark topics read"
            }
            
            if (GetUSStorage('version')<3.3)
            {
                SetUSStorage('quickReport', true);
                SetUSStorage('sortAvatars', true);
                SetUSStorage('postBreadcrumb', true);
                SetUSStorage('breadcrumbs', []);
                SetUSStorage('recolorButtons', true);
            }
            
            if (GetUSStorage('version') < 3.31)
            {
                SetUSStorage('bannerReplace', true);
            }
            
            SetUSStorage('testScript',false); //Disable the test script if an update is found. 
            
            SetUSStorage('version',currentVersion); //Set the current version to prevent resetting to defaults next time. 
            console.log("All settings updated");
            alert("Awesomenauts Forum UserScript updated! \n"+updateMessage+"\nPlease visit the main topic for more info.\nCurrent version: " + currentVersion); //Alert the user that an update has happened.
        }

        if ( GetUSStorage('testScript') == true ) //Load test script?
        {
            if (banner != undefined && GetUSStorage('bannerReplace'))
            {
                banner.src = "http://chirimorin.github.io/AwesomenautsForumAddon/Resources/ReplaceBannerTest.png";
                console.log("Banner replaced");
            }
            console.log("Loading test script...");
            script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumTest.js?v=" + currentVersion;
        }
        else //Load latest script version
        {
            if (banner != undefined && GetUSStorage('bannerReplace'))
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
        if (banner != undefined && GetUSStorage('bannerReplace'))
        {
            banner.src = "http://chirimorin.github.io/AwesomenautsForumAddon/Resources/ReplaceBanner.png";
            console.log("Banner replaced");
        }
        console.log("LocalStorage not supported. Loading legacy script...");
        script.src = "http://chirimorin.github.io/AwesomenautsForumAddon/AwesomenautsForumLegacy.js";
    }

    document.body.appendChild(script);
}

var jQueryAdded = false;
function addJquery() {
    if (!jQueryAdded)
    {
        jQueryAdded = true; 
        
        var jquery = document.createElement("script");
        jquery.type = "text/javascript";
        jquery.src = "//code.jquery.com/jquery-latest.min.js";
        document.head.appendChild(jquery);
        
        console.log("Waiting for jQuery to load...");
    }
}

function checkJquery() {
    if (window.jQuery) 
        main();
    else
    {
        addJquery();
        window.setTimeout(checkJquery, 100);
    }
}    

checkJquery();
