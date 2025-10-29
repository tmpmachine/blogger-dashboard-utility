let utilPostEditor = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Init,
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
  
  async function Init() {
    
    await waitUntil(() => {
      return $('iframe.editable');
    });
    
    attachKeyboardListeners();
  }
  
  function attachKeyboardListeners() {
    for (let editorEl of document.querySelectorAll('iframe.editable')) {
      editorEl.contentDocument.documentElement.removeEventListener('keydown', keyListener.bind(editorEl));
      editorEl.contentDocument.documentElement.addEventListener('keydown', keyListener.bind(editorEl));
    }
  }
  
  function keyListener(event) {
    if (event.ctrlKey && event.key === '5') {
      event.preventDefault();
      this.contentDocument.execCommand('formatBlock', false, 'p');
    } else if (event.ctrlKey && event.code === 'Space') {
      event.preventDefault();
      $('[aria-label="Clear formatting"]')?.click();
    } else if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      $('[aria-label="Update"]')?.click();
    } else if (event.ctrlKey && event.key === 'm') {
      event.preventDefault();
      this.contentDocument.execCommand('backColor', false, '#fcff01');
    }
  }
  
  return SELF;
  
})();