// udt-fetch.js — load UDT definitions from GitPLC repo via GitHub API
var HMI_UDTS = {};
var UDT_DIRS = ['core','control','equipment','alarms','batch','io','comms','kpi'];

async function fetchUDT(dir, file) {
  var url = 'https://raw.githubusercontent.com/'+PLC_OWNER+'/'+PLC_REPO+'/main/'+dir+'/'+file;
  try {
    var r = await fetch(url);
    if (!r.ok) return null;
    var udt = await r.json();
    var id = dir+'/'+file.replace('.json','');
    HMI_UDTS[id] = udt;
    return udt;
  } catch(e) { return null; }
}

async function fetchAllUDTs() {
  var count = 0;
  for (var i=0; i<UDT_DIRS.length; i++) {
    var dir = UDT_DIRS[i];
    try {
      var url = 'https://api.github.com/repos/'+PLC_OWNER+'/'+PLC_REPO+'/contents/'+dir;
      var r = await fetch(url);
      var files = await r.json();
      if (!Array.isArray(files)) continue;
      for (var j=0; j<files.length; j++) {
        if (files[j].name.endsWith('.json')) {
          await fetchUDT(dir, files[j].name);
          count++;
        }
      }
    } catch(e) {}
  }
  return count;
}

function getUDT(id) { return HMI_UDTS[id] || null; }
