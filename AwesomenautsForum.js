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
	if ( window.location.href.indexOf('ForumScriptTest=1') != -1) //Load test script? To be updated!
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
