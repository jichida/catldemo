const JPush = require('jpush-sdk');
const config = require('../config.js');

const client = JPush.buildClient('460d89b68a1f3715b8bc3ab5', 'd81fb805922be4d1c0f2d7f4');

// messagetype:String,//all,app
// touserid:String,
// messagetitle:String,
// messagecontent:String,
// created_at:{ type: Date, default:new Date()},

let sendallmsg = (notifymessage,fncallback)=>{
  client.push().setPlatform('ios', 'android')
    .setAudience(JPush.ALL)
    .setNotification(notifymessage.messagetitle,
        JPush.ios(notifymessage.messagetitle, 'happy', 1,false,{_id:notifymessage._id}),
        JPush.android(notifymessage.messagetitle, null, 1,{_id:notifymessage._id})
    )
    .setMessage(notifymessage.messagecontent)
    .send( (err, res)=> {
      if (err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      } else {
        console.log('Sendno: ' + res.sendno)
        console.log('Msg_id: ' + res.msg_id)
      }
      fncallback(err,res);
    });
}


//useralias 用逗号分隔
let sendusermsg = (notifymessage,fncallback)=>{
  client.push().setPlatform('ios', 'android')
    .setAudience(JPush.alias(notifymessage.touserid))
    .setNotification(notifymessage.messagetitle,
        JPush.ios(notifymessage.messagetitle, 'happy', 1,false,{_id:notifymessage._id}),
        JPush.android(notifymessage.messagetitle, null, 1,{_id:notifymessage._id})
    )
    .setMessage(notifymessage.messagecontent)
    .setOptions(null, 60)
    .send((err, res)=> {
      if (err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message)
          // Response Timeout means your request to the server may have already received,
          // please check whether or not to push
          console.log(err.isResponseTimeout)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      } else {
        console.log('Sendno: ' + res.sendno)
        console.log('Msg_id: ' + res.msg_id)
      }
      fncallback(err,res);
    })
}

let sendnotifymessage =  (notifymessage,fn)=>{
    if(!!notifymessage.touserid){
        sendusermsg(notifymessage,fn);
    }
    else{
        sendallmsg(notifymessage,fn);
    }
}

exports.sendnotifymessage = sendnotifymessage;

// let notifymessage =
// {
//     _id:'5902fdb605647e59a3714f80',
//     touserid:'58e455e7f6de2471258b292d',
//     messagetitle:'标题',
//     messagecontent:'内容'
// };
//
// sendallmsg(notifymessage,(err,result)=>{
//     console.log(`err:${JSON.stringify(err)}`)
//     console.log(`result:${JSON.stringify(result)}`)
// });
