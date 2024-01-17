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

function applyTest() {
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

applyTest();