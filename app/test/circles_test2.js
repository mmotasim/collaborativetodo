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
         it("Should go inside a circle when the circle is clicked on", async function(){
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
                   method :"POST",
                   url: "http://localhost:8080/circles",
                   data:{
                       circlename:"abc"
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });
            var result = await axios(
               {
                   method :"GET",
                   url: "http://localhost:8080/circles",
                   headers:{
                       Cookie : cookies[0]
                   }
                   });
            //console.log(result.data);
            var $=cheerio.load(result.data);
            var x;
            $('#circs').filter(function(){
            
                var data = $(this);
                var title = data.attr('href');
                
                //console.log(title);
                x=title;
                
            });
            console.log(x);
            var result = await axios(
               {
                   method :"GET",
                   url: "http://localhost:8080"+x ,
                   headers:{
                       Cookie : cookies[0]
                   }
                   });
            // console.log(result.request._redirectable._currentUrl);
            assert(result.data.search("Rankings") >= 0 );
        });
    });
});