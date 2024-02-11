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
  