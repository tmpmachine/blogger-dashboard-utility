chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,
  { urls: ["https://draft.blogger.com/_/BloggerUi/data/*"], types: ["xmlhttprequest"] }
);

chrome.webRequest.onCompleted.addListener(onRequestCompleted,
  { urls: ["https://draft.blogger.com/_/BloggerUi/data/*"], types: ["xmlhttprequest"] }
);

let isNotifiedForErrors = false;

function onBeforeRequest() {
  isNotifiedForErrors = false;
}

function waitUntil(stateCheckCallback, delay = 100) {
  return new Promise(resolve => {
      let interval = setInterval(() => {
      let shouldResolve = stateCheckCallback();
      if (shouldResolve) {
          clearInterval(interval);
          resolve();
      }
      }, delay);
  });
}

let waitTimeout;

async function  onRequestCompleted(details) {

  if (!details.url.includes('rpcids=ZmRkFc')) return;

  waitTimeout = setTimeout(() => {
    isNotifiedForErrors = true;
    sendNotif('Check for errors');
  }, 1000);
}

function sendNotif(message) {

  let notifId = '1';
  const notificationOptions = {
      type: 'basic',
      iconUrl: "data:image/webp;base64,UklGRiIBAABXRUJQVlA4TBUBAAAvH8AHAH/AJgDAJNMo6/8vjbsb8FHDSCQp675/ETKhUCgKoCaSFGlsIB5JaCCnyN7Lbv4D4P/flT5lC5QSUOHABniGRfBybZ80y3YB3GrblidVBviti2eYtPrEPQE2YIPICqwQrdA3UlH9tFRU7u5u3/viA0T0fwK0f9Jz/pVzzfO59ZfTkxXnJ9bzKBRgO6URWFtYz3CzTm50XQBwXYDNrGfGjwDGj1jmCOKsUxnCEQbgCANSSAkBa0ywDHU6EOeaU6g1gfpMfJWpx2FpwMQUmBGAWhPqJ8RtZfyVc2SkWaXQIoEIbk17fV0iZZbaD2m3pmlaf4nUdsv9ypy3WkTUbh1o4mu/1Wq1DtySdv56enLi1v5HAA==",
      title: ``,
      message,
      requireInteraction: true,
  };
  chrome.notifications.create(notifId, notificationOptions);
  
  setTimeout(function() {
    chrome.notifications.clear(notifId);
  }, 2000);
}


async function execInPage(code) {
  const [tab] = await chrome.tabs.query({currentWindow: true, active: true});
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: code => {
      const el = document.createElement('script');
      el.textContent = 'console.log(123)';
      document.documentElement.appendChild(el);
      el.remove();
    },
    args: [code],
    world: 'MAIN',
    injectImmediately: true, // Chrome 102+
  });
}



// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'sendMessageFromBackground') {
    if (request.data == 200) {
      clearInterval(waitTimeout);
      if (!isNotifiedForErrors) {
        sendNotif('Template updated');
      }
    }
  }
});