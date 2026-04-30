// tank.js — ISA-101 tank/vessel faceplate
function renderTankFP(el, tag) {
  var level = tag.Level || 0;
  var temp = tag.Temp || 0;
  var pressure = tag.Pressure || 0;
  var hihi = tag.HiHi || 95;
  var hi = tag.Hi || 85;
  var lo = tag.Lo || 15;
  var lolo = tag.LoLo || 5;
  var color = level >= hihi ? 'var(--cr)' : level >= hi ? 'var(--wr)' : level <= lolo ? 'var(--cr)' : level <= lo ? 'var(--wr)' : 'var(--ig)';

  el.innerHTML = '<div class="fp">'
    +'<div class="fp-title">🛢️ ' + (tag.DisplayName || tag.tag_id || 'Tank') + '</div>'
    +'<div style="height:60px;background:var(--s2);border-radius:4px;position:relative;overflow:hidden;margin:4px 0">'
    +'<div style="position:absolute;bottom:0;width:100%;height:'+level+'%;background:'+color+';opacity:.3;transition:height .5s"></div>'
    +'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--wh)">'+level.toFixed(1)+'%</div>'
    +'</div>'
    +'<div class="fp-row"><span>Temp</span><span style="color:var(--wh)">'+temp.toFixed(1)+'°F</span></div>'
    +'<div class="fp-row"><span>Pressure</span><span style="color:var(--wh)">'+pressure.toFixed(1)+' psi</span></div>'
    +'</div>';
}
