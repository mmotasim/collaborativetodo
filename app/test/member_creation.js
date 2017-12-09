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
        it("should allow an HTTP GET request", async function () {
            var result = await axios("http://localhost:8080");
            assert(result.status == 200);});

        it("should show request on a user's page", async function(){
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
            var y= x.split('/')[2]
            console.log(y)
             var result = await axios(
               {
                   method :"POST",
                   url: "http://localhost:8080/addmember" ,
                   data:{
                       newuser:"pramod",
                       circle: y
                   },
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });  

             
             var result = await axios(
               {
                   method :"GET",
                   url: "http://localhost:8080/logout",
                   headers:{
                       Cookie : cookies[0]
                   }
                   
                   });


            
            // console.log(result.request._redirectable._currentUrl);
            //assert(result.data.search("has invited you to join the circle") >= 0 );
        });
        it("should show request on a user's page", async function(){
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
                       name:"pramod",
                       password:"abcd",
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
                   
            assert(result.data.search("has invited you to join the circle") >= 0 );
        });
        
    });
});