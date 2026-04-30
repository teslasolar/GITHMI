// valve.js — ISA-101 valve faceplate
function renderValveFP(el, tag) {
  var open = tag.Open || false;
  var closed = tag.Closed || false;
  var transit = !open && !closed;
  var position = tag.Position || (open ? 100 : 0);
  var fault = tag.Fault || false;
  var statusColor = fault ? 'var(--er)' : transit ? 'var(--wr)' : open ? 'var(--ok)' : 'var(--t2)';
  var statusText = fault ? 'FAULT' : transit ? 'TRANSIT' : open ? 'OPEN' : 'CLOSED';

  el.innerHTML = '<div class="fp">'
    +'<div class="fp-title">🔧 ' + (tag.DisplayName || tag.tag_id || 'Valve') + '</div>'
    +'<div class="fp-row"><span>Status</span><span style="color:'+statusColor+'">● '+statusText+'</span></div>'
    +'<div class="fp-row"><span>Position</span><span style="color:var(--wh)">'+position+'%</span></div>'
    +'<div class="fp-bar"><div class="fp-fill" style="width:'+position+'%;background:'+statusColor+'"></div></div>'
    +'</div>';
}
