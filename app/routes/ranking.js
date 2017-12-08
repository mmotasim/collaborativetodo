var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/:circle_id', function(req, res, next) {
    circle_id = req.params.circle_id;
    cur_user = req.session.user;
    var oid = new mongoose.Types.ObjectId(circle_id.toString());
    circles.findOne({_id:oid},async function(err,circle){
        if(circle.members.includes(req.session.user))
        {
            mems=[]
            console.log(circle.members)
            for(var i=0;i<circle.members.length;i++)
            {
                mem ={}
                member = circle.members[i]
                member_doc = await users.findOne({username : member})
                mem.name = member_doc.username
                var completed=0
                var total = member_doc.to_do_list.length
                for(var j=0;j<member_doc.to_do_list.length;j++)
                {
                    if(member_doc.to_do_list[j].status == "checked")
                    {
                        completed+=1
                    }
                }
                if(total == 0)
                {
                    mem.percentage = 0
                }
                else
                {
                    mem.percentage = (completed/total)*100
                }
                
                mems.push(mem)
            }
            var temp = {}
            temp.name=""
            temp.percentage =0
            for(var i =0;i<mems.length;i++)
            {
                for(var j=i+1;j<mems.length;j++)
                {
                    if(mems[i].percentage<mems[j].percentage)
                    {
                        temp.name = mems[i].name
                        temp.percentage = mems[i].percentage
                        mems[i].name = mems[j].name
                        mems[i].percentage = mems[j].percentage
                        mems[j].name = temp.name
                        mems[j].percentage = temp.percentage
                    }
                }
            }
            for(var i=0;i<mems.length;i++)
            {
                mems[i].rank = i+1
            }
            console.log(mems)
            res.render('ranking',{members:mems})
        }
        else
        {
            res.send("You cannot view this page")
        }
        
    })

  });
  


module.exports = router;
