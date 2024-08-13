const express= require('express');
const mongoose =require('mongoose');
const bodyparser=require('body-parser');
const account=require('./routers/userlogin');
const create=require('./routers/adminplan');
const subsc=require('./routers/subsroutes');
const admin=require('./routers/admins');
class App{
  constructor() {
    this.app=express();
    this.database();
    this.middleware();
    this.routes();
    this.server();
  }
  database(){
mongoose.connect('mongodb://localhost:27017/subscription-manage')
.then(()=>{
  console.log('connected to mongoDB');
})
.catch(err=>{
  console.error('err connecting to the mongodb',err.message)
});
  }
middleware(){
  this.app.use(bodyparser.json());
}
routes(){
 this.app.use('/api',account);
 this.app.use('/api',create);
 this.app.use('/api',subsc);
 this.app.use('/api',admin);
}
server(){
  this.PORT=process.env.PORT || 3000;
  this.app.listen(this.PORT,()=>{
    console.log(`server is been running on port ${this.PORT}`);
  })
}
}
new App();