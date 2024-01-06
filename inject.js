function initTools() {
  
  let editorEl = document.querySelector('iframe.editable');
  if (!editorEl) return;
  if (editorEl.dataset.isToolsLoaded) return;
  
  attachKeyboardListeners();
}

function attachKeyboardListeners() {
  
  let editorEl = document.querySelector('iframe.editable');
  editorEl.dataset.isToolsLoaded = true;
  
  // set format block
  editorEl.contentDocument.documentElement.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === '!') {
      event.preventDefault();
       editorEl.contentDocument.execCommand('formatBlock', false, 'p');
    }
  });
  
  
  // set background color
  editorEl.contentDocument.documentElement.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'm') {
      event.preventDefault();
      document.querySelector('iframe.editable').contentDocument.execCommand('backColor', false, '#fcff01');
    }
  });  
}


// observe visibility change
document.addEventListener('visibilitychange', initTools, true);
initTools();