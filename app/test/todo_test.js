const axios = require('axios');
const assert = require('assert');
const querystring = require('querystring');

describe("Server", function(){
    var app,server;
    
    before(function(){  
        app=require("../app.js");
        server = app.listen(8080);
    });
    
    
    after(function(){
        server.close();
   
    });
    
    describe('/',function() {
         it("Check redirect to the profile page if user already logged in", async function(){
           var result = await axios("http://localhost:8080/signup");
           var cookies = result.headers['set-cookie'][0].split(';');
           var cs = cookies[0].split('=');
           var cname = cs[0];
           var cvalue = cs[1];
           
           var result = await axios(
               {
                   method :"POST",
                   url: "http://localhost:8080/signup",
                   data:{
                       name:"prasad"
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
            var result = await axios(
               {
                   method :"GET",//this is probably post
                   url: "http://localhost:8080/todolist",
                   data:{
                       myInput:"Immabadass"
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
            
                // console.log(result.request._redirectable._currentUrl);
                assert(result.data.search("Immabadass") >= 0 );
        });
    });
});