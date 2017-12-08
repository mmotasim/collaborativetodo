const axios = require('axios');
const assert = require('assert');
const querystring = require('querystring');
const rp= require('request-promise');

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
        it("should allow an HTTP GET request", async function () {
            var result = await axios("http://localhost:8080");
            assert(result.status == 200);
        });
    it("Check for message ", async function(){
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
                       name:"qaa112",
                       password:"abc"
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
                assert(result.data.search("qaa112") >= 0 );
        });
    
            
    
    });
});