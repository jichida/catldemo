const jsondata = require('../test/data');

let startmodule = (app)=>{
  app.get('/api/getdevicegeo',(req,res)=>{
    jsondata.getjsondata((list)=>{
      res.status(200).json({list});
    });
  });
  app.post('/api/setdevicegeo',(req,res)=>{
      console.log(`get data:${JSON.stringify(req.body)}`);
      jsondata.setjsondata(req.body);
      res.status(200).json({result:'OK'});
  });
};

module.exports=  startmodule;
