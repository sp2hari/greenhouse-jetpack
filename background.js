chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    var key = request.storage;
    if (typeof request.value != 'undefined') {
      // localStorage used to coerce values to strings; toBool() in the callers expects that.
      var value = String(request.value);
      chrome.storage.local.set({[key]: value}, function() {
        sendResponse({storage: value});
      });
    } else {
      chrome.storage.local.get(key, function(items) {
        sendResponse({storage: items[key]});
      });
    }
    return true;
  }
  sendResponse({});
});
