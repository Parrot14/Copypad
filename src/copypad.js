function inject() {
	let button_template = '<div id="connor-copy-button" class="button-group relative inline-block"><button class="btn btn-story-lists btn-sm btn-orange" aria-label="Copy">Copy</button></div>'
	// Button n controls bar
	let controls = document.getElementById("funbar-controls")
	// Template to Node
	let c_button = htmlToElement( button_template )
	// Add event to button
	c_button.addEventListener("click", event => {
		let text = ""
		// Get every text container
		document.querySelectorAll( "#sticky-end pre" ).forEach( 
		pre =>
		{
			// Copy element to avoid document modification
			let tmp =	pre.cloneNode( true )
			// Delecte trash comment markers
			tmp.querySelectorAll( ".comment-marker" ).forEach( comment => comment.outerHTML = "" )
			// Append text
			text += tmp.innerText
		})
		// Copy text to clipboard
		navigator.clipboard.writeText( text )
		// Alert to make the user know
		alert("Copiado!")
	})	
	// Add to the start of the bar
	controls.prepend( c_button )
}
// Convert html like string to html Node object
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
// Check if site is a story chapter
function checkPreInject() {
	let regex = /^\/\d+-[\w\W]+$/
	let path = window.location.pathname
	if( regex.test( path ) ) { inject() }
}
// Observe for changer on SPA
function init() {
	let lastUrl = location.href;
	new MutationObserver(() => {
  	const url = location.href
	  if (url !== lastUrl) {
  	  lastUrl = url
			checkPreInject()
	  }
	}).observe(document, {subtree: true, childList: true})
	checkPreInject()
}

init()