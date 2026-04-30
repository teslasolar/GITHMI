// alarm-engine.js — ISA-18.2 alarm manager from tag values
var HMI_ALARMS = { active:[], acked:[], history:[] };
var PRI = { 1:'CRITICAL', 2:'HIGH', 3:'MEDIUM', 4:'LOW' };
var PRI_COLOR = { 1:'#ff2244', 2:'#ff4466', 3:'#f0a030', 4:'#38b5f9' };
var PRI_ICON = { 1:'🔴', 2:'🟠', 3:'🟡', 4:'🔵' };

function raiseAlarm(tag_id, priority, msg) {
  var a = { tag_id:tag_id, priority:priority, msg:msg, ts:Date.now(), acked:false };
  HMI_ALARMS.active.push(a);
  HMI_ALARMS.history.push(a);
}

function ackAlarm(idx) {
  if (HMI_ALARMS.active[idx]) {
    HMI_ALARMS.active[idx].acked = true;
    HMI_ALARMS.acked.push(HMI_ALARMS.active.splice(idx, 1)[0]);
  }
}

function renderAlarmBanner(el) {
  if (!HMI_ALARMS.active.length) {
    el.innerHTML = '<span style="color:var(--ok)">✓ No active alarms</span>';
    return;
  }
  el.innerHTML = HMI_ALARMS.active.map(function(a, i) {
    var cls = a.priority===1?'cr':a.priority===2?'hi':a.priority===3?'md':'lo';
    return '<span class="alarm-pill '+cls+'" onclick="ackAlarm('+i+')">'
      +PRI_ICON[a.priority]+' '+a.tag_id+': '+a.msg+'</span>';
  }).join(' ');
}
