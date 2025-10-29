(function() {
  
  let $ = document.querySelector.bind(document);
  
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
  
  function applyCodeMirrorShortcut() {
    waitUntil(() => {
      return CodeMirror;
    }).then(() => {
      
      CodeMirror.keyMap.default["Ctrl-G"] = function(cm) {
        let line = prompt("Go to Line:");
        if (line) {
          cm.setCursor(Number(line) - 1, 0);
        }
      };
      
    });
  }
  
  async function taskApplyThemeEditorShortcut() {
    
    await waitUntil(() => $('[data-tooltip="Save"]'));
    
    $('[data-tooltip="Save"]').style.borderBottom = '1px solid dodgerblue';
    
    // wait for key release to save again
    let lockSave = false; 
    
    window.addEventListener('blur', (e) => {
    	lockSave = false;
    });
    
    
    window.addEventListener('keydown', keyhandler);
    window.addEventListener('keyup', keyhandler);
    
    function keyhandler(e) {
    	switch(e.key) {
    		case 's':
    			if (e.type == 'keydown' && e.ctrlKey) {
    				e.preventDefault();
    				if (!lockSave) {
    					lockSave = true;
    					autoClickSave();
    				}
    			} else if (e.type == 'keyup'){
    				lockSave = false;
    			}
    			break;
    	}
    }
    
    function autoClickSave() {
    	document.querySelector('[data-tooltip="Save"]').click();
    }
    
  }
  
  applyCodeMirrorShortcut();
  taskApplyThemeEditorShortcut();
  
})();
