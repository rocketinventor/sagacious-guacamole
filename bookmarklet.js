//need to add support for gray <article> before this part (otherwiise it will overide the <body> background).

//set background
document.body.style.backgroundColor = "#DADADA"; //set backup color (in case image doesn't load)
//need to get this image hosted on a server that supports https to fix possible security issues...
document.body.style.backgroundImage = "url('http://bradjasper.com/subtle-patterns-bookmarklet/patterns/squairy_light.png')"; //set actual image
//ar c = document.getElementsByClassName("row part-content")[0].children;


//give text content areas a gray background
//supported on Wikipedia and Wattpadd
//See comment at head of this page (relating to <Article> tags)

var i; //create dummy variable i, duh.
var c; //create var c ahead of time

//set all 'panels' (areas with the book text in Wattpad) to have a gray background
c = document.getElementsByClassName("panel"); //get all panel elements and create variable
for (i = 0; i < c.length; i++) { //apply to all elements
        c[i].style.background = "#D0DAE3"; //set to gray
    }
    
//make content area gray (for wikipedia)
//needs to select child elements, too for homepage but I don't feel like it right now.
c = document.getElementsByClassName("mw-body"); //get the article content
for (i = 0; i < c.length; i++) { //just in case there is more than one "mw-body", apply to all elements with that class rather than just [0]
        c[i].style.background = "#D0DAE3"; //set to gray
    }

//function that allows to add rules to CSS using js
function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

//add css rule which makes all <p> dark pink/purple
//Support for h1, h2, etc. will be added in the future
addCSSRule(document.styleSheets[0], "p", "color: #D7598B");

//actual code that attempts to allow text-selection when it is blocked
function allowTextSelection() {
  var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
  jQuery('head').append(jQuery('<style />').html(styles));
  
  window.console && console.log('allowTextSelection');
  
  var allowNormal = function(){
    return true;
  };
  
  window.console && console.log('Elements unbound: '+
    jQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv'
    ).unbind('contextmenu').unbind('selectstart').unbind('dragstart'
    ).unbind('mousedown').unbind('mouseup').unbind('click'
    ).attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal
    ).attr('ondragstart',allowNormal).size());
}

//main anti-anti text-selection function
function allowTextSelectionWhenPossible() { 
  window.console && console.log('allowTextSelectionWhenPossible');
  if (window.jQuery) {
    window.console && console.log('jQuery has now loaded');
    allowTextSelection();
  } else {
    window.console && console.log('jQuery still not loaded.');
    window.setTimeout(allowTextSelectionWhenPossible, 100);
  }
}

//make sure there's jquery
if (window.jQuery) {
    window.console && console.log('jQuery exists; will use');
  allowTextSelection();
} else {
  window.console && console.log('jQuery not loaded; will include.');
  var s = document.createElement('script');
  s.setAttribute('src', 
    // Hard to read, but the intention here is to set a protocol
    // ONLY IF we are *not* running on HTTP or HTTPS already.
    // That is to allow the script to work on e.g. file:/ URLs,
    // but using the protocol-agnosting `//tld/file` format which allows
    // the bookmarklet to run on HTTP & HTTPS pages, both. Should fix issue #2.
    (document.location.toString().substr(0,4) === 'http' ? '' : 'http:') + '//code.jquery.com/jquery-1.9.1.min.js'
  );
  document.getElementsByTagName('body')[0].appendChild(s);
  allowTextSelectionWhenPossible();
}