let $ = document.querySelector.bind(document);

let targetElement = $('title');
if (targetElement) {
	const observer = new MutationObserver(async (mutationsList, observer) => {
		for (const mutation of mutationsList) {
			applyMutation()
		}
	});
	
	const config = { 
	    childList: true, 
    };
	observer.observe(targetElement, config);
}

let init = false;

applyMutation();

function waitUntil(stateCheckCallback, delay = 100) {
  return new Promise(resolve => {
      let interval = window.setInterval(() => {
      let shouldResolve = stateCheckCallback();
      if (shouldResolve) {
          window.clearInterval(interval);
          resolve();
      }
      }, delay);
  });
}

function applyMutation() {
  enchancePostEditor();
  enhanceTemplateEditor();
}

function enchancePostEditor() {
  let isPostOrPageEdit = ( location.href.includes('/post/edit/') || location.href.includes('/page/edit/') );
  
  if (!isPostOrPageEdit) return;
  
  utilPostEditor.Init();
  
}

function enhanceTemplateEditor() {
  
  if (!location.href.includes('/blog/themes/edit')) return;
  
  waitUntil(() => {
    return $('.CodeMirror');
  }).then(() => {
    injectScript();
  });
}

function injectScript() {
  let el = document.createElement('script');
  el.src = chrome.runtime.getURL('codemirror-custom-shortcut.js');
  document.body.append(el);
}