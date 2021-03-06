//be careful here . As the storage is persistant , you will have to change the data manually


const axios = require('axios');
const assert = require('assert');
const querystring = require('querystring');
const cheerio = require('cheerio');
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
    this.timeout(5000);    
    it("should go to the requests page", async function(){
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
                       name:"praj",
                       password:"abc"
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
            var result = await axios(
               {
                   method :"GET",
                   url: "http://localhost:8080/requests",
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
                   
            assert(result.data.search("Here are your requests") >= 0 );
        });
    });
});