var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var requests = require('../models/request.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.post('/',function(req,res,next){
        var item ={}
        item.description = req.body.desc;
        item.privacy = req.body.priv;
        item.status = req.body.stat;

        user = req.session.user
        
        users.findOne({username : user},function(err,user_doc){
            del_done = req.body.del_done
            item_id = req.body.item_id
            for(var i=0;i<user_doc.to_do_list.length;i++)
            {
                if(user_doc.to_do_list[i].id == item_id)
                {
                    if(del_done == "delete")
                    {
                        user_doc.to_do_list[i].remove()
                        user_doc.save()
                        res.send("0")
                    }
                    else
                    {
                        user_doc.to_do_list[i].status = "checked"
                        user_doc.save()
                        res.send("1")
                    }
                }
            }
        })
});

module.exports = router;
