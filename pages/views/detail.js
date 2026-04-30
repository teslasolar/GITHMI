// detail.js — east dock detail panel + UDT/tag list views
function renderDetail(el) {
  el.innerHTML = '<div class="ph">⚙️ DETAIL</div>'
    + '<div id="detail-content" style="padding:4px 8px;font-size:7.5px;color:var(--t2)">Select an item</div>';
}

function showUDTDetail(id) {
  var udt = getUDT(id);
  var el = document.getElementById('detail-content');
  if (!udt || !el) return;
  el.innerHTML = '<div style="color:var(--ign);font-weight:700;margin-bottom:4px">'+id+'</div>'
    + '<pre style="font-size:7px;color:var(--t);white-space:pre-wrap">'
    + JSON.stringify(udt, null, 2) + '</pre>';
}

function renderUDTListView(el) {
  var ids = Object.keys(HMI_UDTS);
  if (!ids.length) { el.innerHTML = '<div style="padding:20px;color:var(--t2)">No UDTs loaded</div>'; return; }
  el.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px">'
    + ids.map(function(id) {
      var u = HMI_UDTS[id];
      var fields = u.members ? Object.keys(u.members).length : u.fields ? Object.keys(u.fields).length : '?';
      return '<div class="fp" onclick="showUDTDetail(\''+id+'\')" style="cursor:pointer">'
        +'<div class="fp-title">📐 '+id+'</div>'
        +'<div class="fp-row"><span>Fields</span><span>'+fields+'</span></div></div>';
    }).join('') + '</div>';
}

function renderTagListView(el) {
  var tags = allTags();
  var ids = Object.keys(tags);
  if (!ids.length) { el.innerHTML = '<div style="padding:20px;color:var(--t2)">No tags loaded</div>'; return; }
  el.innerHTML = '<table style="width:100%;font-size:8px;border-collapse:collapse">'
    +'<tr style="color:var(--ign);border-bottom:1px solid var(--b)"><th>Tag</th><th>Type</th><th>Value</th></tr>'
    + ids.map(function(id) {
      var t = tags[id];
      return '<tr style="border-bottom:1px solid var(--b)"><td style="color:var(--ig);padding:2px">'+id+'</td><td>'+(t.udt_type||'—')+'</td><td style="color:var(--ok)">'+(t.value||'—')+'</td></tr>';
    }).join('') + '</table>';
}
