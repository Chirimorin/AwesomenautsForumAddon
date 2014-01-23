function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}


var script = document.createElement("script");
script.type = "text/javascript";

if (supports_local_storage()) //Local storage supported, good!
{
	var currentVersion = 2.5;

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
		if (GetStorage('version')<2.5)
		{
			SetStorage('testScript',false);
			SetStorage('markingMode',1); //Post marking mode, 0 = none, 1 = avatar outline, 2 = background
			SetStorage('markingColor',"#0000FF"); //Post marking color. HEX value.
			SetStorage('markingText',"#FFFFFF"); //Text color used when markingMode = 2
			SetStorage('extraSmilies',true); //Extra smilies for posting. 
			SetStorage('strawpollEmbed',true); //Auto embedding of Strawpoll.me polls. 
		}
		
		SetStorage('version',currentVersion); //Set the current version to prevent resetting to defaults next time. 
		alert("Awesomenauts Forum UserScript updated! Current version: " + currentVersion); //Alert the user that an update has happened.
	}

	if ( GetStorage('testScript') == true ) //Load test script?
	{
		script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumTest.js"
	}
	else //Load latest script version
	{
		script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumLatest.js"
	}
}
else //Local storage not supported, load legacy script. 
{
    script.src = "https://github.com/Chirimorin/AwesomenautsForumAddon/raw/master/AwesomenautsForumLegacy.js"
}

document.body.appendChild(script);
