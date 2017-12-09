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
        it("should allow an HTTP GET request", async function () {
            var result = await axios("http://localhost:8080");
            assert(result.status == 200);
        });
    it("should go the user's profile page", async function(){
           var result = await axios("http://localhost:8080/signup");
           var cookies = result.headers['set-cookie'][0].split(';');
           var cs = cookies[0].split('=');
           var cname = cs[0];
           var cvalue = cs[1];
           
           var result = await axios(
               {
                   method :"POST",
                   url: "http://localhost:8080/login",
                   data:{
                       name:"qaa1v", //enter new unique user - the url is login temporarily so that "npm test" runs successfully
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
            var result = await axios(
               {
                   method :"GET",
                   url: "http://localhost:8080/profile",
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
                assert(result.data.search("This is the profile of ") >= 0 );
        });
    
            
    
    });
});