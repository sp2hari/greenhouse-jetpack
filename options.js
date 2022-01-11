function toBool(str) {
  if (str == 'true') {
    return true;
  }
  if (str == 'false') {
    return false;
  }
}

// Saves options to chrome.storage
function save_options() {

  var enableVoice = document.getElementById('voice').checked;
  var enableAutoMove = document.getElementById('automove').checked;
  var enableSlowInternet = document.getElementById('slowinternet').checked;

  chrome.runtime.sendMessage({storage: 'voice', value: enableVoice});
  chrome.runtime.sendMessage({storage: 'automove', value: enableAutoMove});
  chrome.runtime.sendMessage({storage: 'slowinternet', value: enableSlowInternet});

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.runtime.sendMessage({storage: 'voice'}, function(response) {
    document.getElementById('voice').checked = toBool(response.storage);
  });

  chrome.runtime.sendMessage({storage: 'automove'}, function(response) {
    document.getElementById('automove').checked = toBool(response.storage);
  });

  chrome.runtime.sendMessage({storage: 'slowinternet'}, function(response) {
    document.getElementById('slowinternet').checked = toBool(response.storage);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);