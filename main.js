window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
const SLOW_INTERNET_DELAY = 2000;
// recognition.continuous = true;

function toBool(str) {
  if (str == 'true') {
    return true;
  }
  if (str == 'false') {
    return false;
  }
}

window.onload = function()
{

  if(document.getElementById('preview_resume_button')) {
    document.getElementById('preview_resume_button').click();
  }

  recognition.addEventListener('end', recognition.start);

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    if (speechToText == "no") {
      setTimeout(
        function() {
          document.getElementById("reject_button").click();
        }, 1000);      
    }
  }

  chrome.runtime.sendMessage({storage: 'voice'}, function(response) {
    if (toBool(response.storage) == true) {
      recognition.start();
    }
  });

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      setTimeout(
        function() {
          document.getElementById("reject_button").click();
        }, 1000);            
    }
  };
}

if(document.getElementById('reject_button')) {
  document.getElementById("reject_button").onclick = function() {


    chrome.runtime.sendMessage({storage: 'slowinternet'}, function(response) {
      var delay = 3500;
      if (toBool(response.storage) == true) {
        delay += SLOW_INTERNET_DELAY;      
      }

      setTimeout(
        function() {
          document.getElementById("reject_with_email_button").click();
        }, delay);      
    });

    chrome.runtime.sendMessage({storage: 'automove'}, function(response) {
      if (toBool(response.storage) == true) {
        chrome.runtime.sendMessage({storage: 'slowinternet'}, function(response) {
          var delay = 5000;
          if (toBool(response.storage) == true) {
            delay += SLOW_INTERNET_DELAY;
          }

          setTimeout(function() {
            if (document.getElementsByClassName("next").length) {
              document.getElementsByClassName("next")[0].click()  
            }
          }, delay);          
        });
      }
    });
  };
}