// app.js — boot: header → UDTs → tags → alarms → nav → overview
(async function() {
  // Header
  var h = document.getElementById('header');
  h.innerHTML = '<span style="color:var(--ign);font-weight:700;font-size:11px">🖥️ GitHMI</span>'
    +'<span style="color:var(--b);margin:0 6px">│</span>'
    +'<span id="hmi-state" style="color:var(--ok);font-size:8px">● BOOT</span>'
    +'<span id="alarm-count" style="font-size:8px;margin-left:8px"></span>'
    +'<span style="flex:1"></span>'
    + ['overview','alarms','udts','tags'].map(function(v) {
      return '<span class="btn" onclick="switchView(\''+v+'\')" style="margin-left:4px">'
        + { overview:'🏭', alarms:'🔔', udts:'📐', tags:'🏷️' }[v] + ' ' + v.toUpperCase() + '</span>';
    }).join('')
    +'<span style="color:var(--b);margin:0 6px">│</span>'
    +'<span id="clock" style="color:var(--t2);font-size:8px"></span>';

  // Load data
  document.getElementById('hmi-state').textContent = '● LOADING UDTs...';
  var udtCount = await fetchAllUDTs();

  document.getElementById('hmi-state').textContent = '● LOADING TAGS...';
  var tagCount = await fetchTags();

  // Render docks
  renderNav(document.getElementById('west-dock'));
  renderUDTTree();
  renderDetail(document.getElementById('east-dock'));
  renderAlarmBanner(document.getElementById('alarm-banner'));

  // Status bar
  document.getElementById('status-bar').innerHTML =
    '<span style="color:var(--ok)">● ONLINE</span>'
    +'<span style="color:var(--b);margin:0 4px">│</span>'
    +'<span style="color:var(--t2)">'+udtCount+' UDTs · '+tagCount+' tags</span>'
    +'<span style="flex:1"></span>'
    +'<span style="color:var(--t2)">GitHMI · ISA-101 · '+PLC_OWNER+'/'+PLC_REPO+'</span>';

  // Boot complete
  document.getElementById('hmi-state').textContent = '● RUN';
  switchView('overview');

  // Polling
  setInterval(async function() {
    await fetchTags();
    renderAlarmBanner(document.getElementById('alarm-banner'));
    if (currentView === 'overview') renderOverview(document.getElementById('main-panel'));
  }, 30000);

  // Clock
  setInterval(function() {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
  }, 1000);
})();
