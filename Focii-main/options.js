var bg = chrome.extension.getBackgroundPage();

// Saves options to localStorage.
function save_options() {
  // Save blacklist domains
  var blackListEl = document.getElementById("blacklist");
  var blacklist_domains = blackListEl.value.split(/\r?\n/);
  var blacklist = [];
  // Get rid of empty lines
  for (var i = 0; i < blacklist_domains.length; i++) {
    var domain = blacklist_domains[i];
    if (domain) {
      blacklist.push(domain);
    }
  }
  blackListEl.value = blacklist.join("\n");
  localStorage["blacklist"] = JSON.stringify(blacklist);

  // Remove data for sites that have been added to the blacklist
  var domains = JSON.parse(localStorage["domains"]);
  for (var domain in domains) {
    for (var i = 0; i < blacklist.length; i++) {
      if (domain.match(blacklist[i])) {
        // Remove data for any domain on the blacklist
        delete domains[domain];
        delete localStorage[domain];
        localStorage["domains"] = JSON.stringify(domains);
      }
    }
  }

  // Check limit data
  var limit_data = document.getElementById("chart_limit");
  var limit = parseInt(limit_data.value);
  if (limit) {
    localStorage["chart_limit"] = limit;
    limit_data.value = limit;
  } else {
    limit_data.value = localStorage["chart_limit"];
  }

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  status.className = "success";
  setTimeout(function () {
    status.innerHTML = "";
    status.className = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var blacklist = JSON.parse(localStorage["blacklist"]);
  var blackListEl = document.getElementById("blacklist");
  blackListEl.value = blacklist.join("\n");
  var limitEl = document.getElementById("chart_limit");
  limitEl.value = localStorage["chart_limit"];
}

// Clear all data except for blacklist
function clearData() {
  // Clear everything except for blacklist
  var blacklist = localStorage["blacklist"];
  localStorage.clear();
  localStorage["blacklist"] = blacklist;
  bg.setDefaults();
  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  // Restore options
  restore_options();

  // Set handlers for option descriptions
  document
    .querySelector("#save-button")
    .addEventListener("click", save_options);
  document.querySelector("#clear-data").addEventListener("click", clearData);
  var rows = document.querySelectorAll("tr");
  var mouseoverHandler = function () {
    this.querySelector(".description").style.visibility = "visible";
  };
  var mouseoutHandler = function () {
    this.querySelector(".description").style.visibility = "hidden";
  };
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    row.addEventListener("mouseover", mouseoverHandler);
    row.addEventListener("mouseout", mouseoutHandler);
  }
});


      document.addEventListener('DOMContentLoaded', function() {
        var whitelist = document.getElementById('whitelist');
        var form = document.getElementById('addForm');
      
        chrome.storage.sync.get('whitelist', function(data) {
          var whitelistArray = data.whitelist || [];
          whitelistArray.forEach(function(site) {
            var li = document.createElement('li');
            li.textContent = site;
            whitelist.appendChild(li);
          });
        });
      
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          var input = document.getElementById('siteInput');
          var site = input.value.trim();
          if (site) {
            var li = document.createElement('li');
            li.textContent = site;
            whitelist.appendChild(li);
      
            chrome.storage.sync.get('whitelist', function(data) {
              var whitelistArray = data.whitelist || [];
              whitelistArray.push(site);
              chrome.storage.sync.set({ 'whitelist': whitelistArray });
            });
      
            input.value = '';
          }
        });
      });
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the current switch state from storage and update the UI
  chrome.storage.sync.get('switchState', function(data) {
    var switchState = data.switchState;
    document.getElementById('switch').checked = switchState;
  });

  // Add event listener to the switch
  document.getElementById('switch').addEventListener('change', function() {
    var switchState = this.checked; // Get the new state of the switch
    // Update the switch state in storage
    chrome.storage.sync.set({ switchState: switchState });
  });
});


      

