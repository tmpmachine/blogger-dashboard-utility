let utilPostEditor = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Foo,
  };
  
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
  
  async function Foo() {
    
    await waitUntil(() => {
      return $('iframe.editable');
    }).then(() => {
      injectScript();
    });
    
    let editorEl = $('iframe.editable');
    if (editorEl.dataset.isToolsLoaded) return;
  
    attachKeyboardListeners();
    
  }
  
  function attachKeyboardListeners() {
    
    let editorEl = document.querySelector('iframe.editable');
    editorEl.dataset.isToolsLoaded = true;
    
    // set format block
    editorEl.contentDocument.documentElement.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === '0') {
        event.preventDefault();
        editorEl.contentDocument.execCommand('formatBlock', false, 'p');
      } else if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        $('[aria-label="Clear formatting"]').click();
      } else if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        document.querySelector('iframe.editable').contentDocument.execCommand('backColor', false, '#fcff01');
      }
    });
    
  }
  
  return SELF;
  
})();