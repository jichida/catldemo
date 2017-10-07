let db = require('./models.js');
let dbs ={
  'systemconfig':{
    urlname:'/systemconfig',
    schema:db.SystemConfigSchema,
    collectionname:'systemconfig',
  },
  'organization':{
    urlname:'/organization',
    schema:db.OrganizationSchema,
    collectionname:'organization',
  },
  'device':{
    urlname:'/device',
    schema:db.DeviceSchema,
    collectionname:'device',
  },
  'devicegroup':{
    urlname:'/devicegroup',
    schema:db.DeviceGroupSchema,
    collectionname:'devicegroup',
  },
  'user':{
    urlname:'/user',
    schema:db.UserSchema,
    collectionname:'user',
  },
  'usergroup':{
    urlname:'/usergroup',
    schema:db.UserGroupSchema,
    collectionname:'usergroup',
  },
  'permission':{
    urlname:'/permission',
    schema:db.PermissionSchema,
    collectionname:'permission',
  },
  'realtimealarm':{
    urlname:'/realtimealarm',
    schema:db.RealtimeAlarmSchema,
    collectionname:'realtimealarm',
  },
  'historytrack':{
    urlname:'/historytrack',
    schema:db.HistoryTrackSchema,
    collectionname:'historytrack',
  },
  'historydevice':{
    urlname:'/historydevice',
    schema:db.HistoryDeviceSchema,
    collectionname:'historydevice',
  },
  'userlog':{
    urlname:'/userlog',
    schema:db.UserLogSchema,
    collectionname:'userlog',
  },
};

module.exports= dbs;
