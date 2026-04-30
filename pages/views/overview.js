// overview.js — plant overview screen with equipment grid
function renderOverview(el) {
  var tags = allTags();
  var ids = Object.keys(tags);
  if (!ids.length) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--t2)"><h2 style="color:var(--ign)">No Tags Loaded</h2><p>Create GitHub Issues with label <code>gitplc-config</code> and a JSON code block.</p></div>';
    return;
  }
  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">';
  ids.forEach(function(id) {
    var t = tags[id];
    var type = t.udt_type || 'unknown';
    var div = document.createElement('div');
    if (type === 'motor') renderMotorFP(div, t);
    else if (type === 'valve') renderValveFP(div, t);
    else if (type === 'pid') renderPidFP(div, t);
    else if (type === 'tank') renderTankFP(div, t);
    else div.innerHTML = '<div class="fp"><div class="fp-title">' + id + '</div><div class="fp-row"><span>Type</span><span>' + type + '</span></div></div>';
    html += div.innerHTML;
  });
  el.innerHTML = html + '</div>';
}
