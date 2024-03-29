let $ = document.querySelector.bind(document);

let targetElement = $('title');
if (targetElement) {
	const observer = new MutationObserver(async (mutationsList, observer) => {
		for (const mutation of mutationsList) {
            // console.log(mutation.target.textContent.trim())
			// if (mutation.attributeName == 'selected') {
                // todo:
			// }
			
			applyMutation()
			
		}
	});
	
	const config = { 
	    childList: true, 
    };
	observer.observe(targetElement, config);
}

let init = false;

async function applyUpdateWatcher() {
  
  await waitUntil(() => $('[aria-live="polite"]'), 200);
  
  const observer = new MutationObserver( (mutationsList, observer) => {
		for (const mutation of mutationsList) {
      
      if (mutation.target.textContent.trim() == 'Update successful.') {
        chrome.runtime.sendMessage({
          action: 'sendMessageFromBackground',
          data: 200,
        });
      }
      
		}
	});
	
	const config = { 
	    childList: true, 
    };
	observer.observe($('[aria-live="polite"]'), config);
}

applyMutation();
applyUpdateWatcher();

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
  let isPostOrPageEdit = ( location.href.includes('blogger.com/blog/post/edit/') || location.href.includes('blogger.com/blog/page/edit/') );
  
  if (!isPostOrPageEdit) return;
  
  
  utilPostEditor.Foo();
  
}

function enhanceTemplateEditor() {
  
  if (!location.href.includes('blogger.com/blog/themes')) return;
  
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