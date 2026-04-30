// nav.js — west dock navigation tree
var VIEWS = ['overview','alarms','udts','tags'];
var VIEW_ICONS = { overview:'🏭', alarms:'🔔', udts:'📐', tags:'🏷️' };
var currentView = 'overview';

function renderNav(el) {
  el.innerHTML = '<div class="ph">📋 SCREENS</div>'
    + VIEWS.map(function(v) {
      return '<div class="nav-item'+(v===currentView?' on':'')+'" onclick="switchView(\''+v+'\')">'
        + VIEW_ICONS[v]+' '+v.toUpperCase()+'</div>';
    }).join('')
    + '<div class="ph" style="margin-top:8px">📐 UDT TREE</div>'
    + '<div id="udt-tree"></div>';
}

function renderUDTTree(el) {
  var tree = el || document.getElementById('udt-tree');
  if (!tree) return;
  var dirs = Object.keys(HMI_UDTS);
  tree.innerHTML = dirs.map(function(id) {
    return '<div class="nav-item" onclick="showUDTDetail(\''+id+'\')">'
      + '📄 ' + id + '</div>';
  }).join('');
}

function switchView(name) {
  currentView = name;
  var main = document.getElementById('main-panel');
  renderNav(document.getElementById('west-dock'));
  if (name === 'overview') renderOverview(main);
  else if (name === 'alarms') renderAlarmView(main);
  else if (name === 'udts') renderUDTListView(main);
  else if (name === 'tags') renderTagListView(main);
}
