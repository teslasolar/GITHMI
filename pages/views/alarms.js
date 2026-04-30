// alarms.js — alarm list view
function renderAlarmView(el) {
  var all = HMI_ALARMS.active.concat(HMI_ALARMS.acked);
  if (!all.length) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ok)"><h3>No Alarms</h3></div>';
    return;
  }
  var html = '<table style="width:100%;font-size:8px;border-collapse:collapse">'
    +'<tr style="color:var(--ign);border-bottom:1px solid var(--b)"><th>Time</th><th>Tag</th><th>Priority</th><th>Message</th><th>State</th></tr>';
  all.sort(function(a,b){return a.priority-b.priority||b.ts-a.ts});
  all.forEach(function(a) {
    var c = PRI_COLOR[a.priority];
    var t = new Date(a.ts).toLocaleTimeString();
    var st = a.acked ? '<span style="color:var(--t2)">ACK</span>' : '<span style="color:'+c+'">ACTIVE</span>';
    html += '<tr style="border-bottom:1px solid var(--b)">'
      +'<td style="padding:3px">'+t+'</td>'
      +'<td>'+a.tag_id+'</td>'
      +'<td style="color:'+c+'">'+PRI[a.priority]+'</td>'
      +'<td>'+a.msg+'</td>'
      +'<td>'+st+'</td></tr>';
  });
  el.innerHTML = html + '</table>';
}
