// tag-bind.js — fetch tag values from GitPLC GitHub Issues
var HMI_TAGS = { tags:{}, ts:0 };
var PLC_OWNER = 'teslasolar';
var PLC_REPO = 'GITPLC';

async function fetchTags() {
  try {
    var url = 'https://api.github.com/repos/'+PLC_OWNER+'/'+PLC_REPO+'/issues?labels=gitplc-config&per_page=100&state=open';
    var r = await fetch(url);
    var issues = await r.json();
    if (!Array.isArray(issues)) return 0;
    issues.forEach(function(iss) {
      var m = iss.body && iss.body.match(/```json\s*([\s\S]*?)```/);
      if (m) {
        try {
          var obj = JSON.parse(m[1]);
          if (obj.tag_id) HMI_TAGS.tags[obj.tag_id] = obj;
        } catch(e) {}
      }
    });
    HMI_TAGS.ts = Date.now();
    return Object.keys(HMI_TAGS.tags).length;
  } catch(e) { return 0; }
}

function getTag(id) { return HMI_TAGS.tags[id] || null; }
function allTags() { return HMI_TAGS.tags; }
