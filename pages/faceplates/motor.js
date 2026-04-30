// motor.js — ISA-101 motor faceplate
function renderMotorFP(el, tag) {
  var running = tag.Running || false;
  var amps = tag.Amps || 0;
  var speed = tag.Speed || 0;
  var fault = tag.Fault || false;
  var hoa = tag.HOA || 0;
  var hoaLabel = ['OFF','HAND','AUTO'][hoa] || 'OFF';
  var statusColor = fault ? 'var(--er)' : running ? 'var(--ok)' : 'var(--t2)';
  var statusText = fault ? 'FAULT' : running ? 'RUNNING' : 'STOPPED';

  el.innerHTML = '<div class="fp">'
    +'<div class="fp-title">⚙️ ' + (tag.DisplayName || tag.tag_id || 'Motor') + '</div>'
    +'<div class="fp-row"><span>Status</span><span style="color:'+statusColor+'">● '+statusText+'</span></div>'
    +'<div class="fp-row"><span>Mode</span><span style="color:var(--ig)">'+hoaLabel+'</span></div>'
    +'<div class="fp-row"><span>Amps</span><span style="color:var(--wh)">'+amps.toFixed(1)+' A</span></div>'
    +'<div class="fp-row"><span>Speed</span><span style="color:var(--wh)">'+speed.toFixed(0)+' RPM</span></div>'
    +'<div class="fp-bar"><div class="fp-fill" style="width:'+Math.min(amps/20*100,100)+'%;background:'+statusColor+'"></div></div>'
    +'</div>';
}
