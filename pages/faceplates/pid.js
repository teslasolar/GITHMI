// pid.js — ISA-101 PID loop faceplate
function renderPidFP(el, tag) {
  var pv = tag.PV || 0;
  var sp = tag.SP || 0;
  var out = tag.Output || 0;
  var mode = tag.Mode || 'AUTO';
  var err = Math.abs(pv - sp);
  var errColor = err > 10 ? 'var(--er)' : err > 5 ? 'var(--wr)' : 'var(--ok)';

  el.innerHTML = '<div class="fp">'
    +'<div class="fp-title">📈 ' + (tag.DisplayName || tag.tag_id || 'PID') + '</div>'
    +'<div class="fp-row"><span>PV</span><span style="color:var(--wh)">'+pv.toFixed(1)+'</span></div>'
    +'<div class="fp-row"><span>SP</span><span style="color:var(--ig)">'+sp.toFixed(1)+'</span></div>'
    +'<div class="fp-row"><span>Error</span><span style="color:'+errColor+'">'+err.toFixed(2)+'</span></div>'
    +'<div class="fp-row"><span>Output</span><span style="color:var(--ign)">'+out.toFixed(1)+'%</span></div>'
    +'<div class="fp-row"><span>Mode</span><span style="color:var(--ig)">'+mode+'</span></div>'
    +'<div class="fp-bar"><div class="fp-fill" style="width:'+out+'%;background:var(--ign)"></div></div>'
    +'</div>';
}
