chrome.webRequest.onCompleted.addListener(onRequestCompleted,
  { urls: ["https://draft.blogger.com/_/BloggerUi/data/*"], types: ["xmlhttprequest"] }
);

function  onRequestCompleted(details) {

  if (!details.url.includes('rpcids=ZmRkFc')) return;
  
  let notifId = '1';
  const notificationOptions = {
      type: 'basic',
      iconUrl: "data:image/webp;base64,UklGRiIBAABXRUJQVlA4TBUBAAAvH8AHAH/AJgDAJNMo6/8vjbsb8FHDSCQp675/ETKhUCgKoCaSFGlsIB5JaCCnyN7Lbv4D4P/flT5lC5QSUOHABniGRfBybZ80y3YB3GrblidVBviti2eYtPrEPQE2YIPICqwQrdA3UlH9tFRU7u5u3/viA0T0fwK0f9Jz/pVzzfO59ZfTkxXnJ9bzKBRgO6URWFtYz3CzTm50XQBwXYDNrGfGjwDGj1jmCOKsUxnCEQbgCANSSAkBa0ywDHU6EOeaU6g1gfpMfJWpx2FpwMQUmBGAWhPqJ8RtZfyVc2SkWaXQIoEIbk17fV0iZZbaD2m3pmlaf4nUdsv9ypy3WkTUbh1o4mu/1Wq1DtySdv56enLi1v5HAA==",
      title: `Template updated`,
      message: ``,
      requireInteraction: true,
  };
  chrome.notifications.create(notifId, notificationOptions);
  
  setTimeout(function() {
    chrome.notifications.clear(notifId);
  }, 2000);
    
}