var http = require('http');
var querystring = require('querystring');
var fs = require("fs") ;

module.exports.get = function (req, res) {
    var action = req.query['action'];
    if (!action) {
        res.status(200).send('{"err":"invalid parameter"}');
        return;
    }
    if (action == null) {
        res.status(200).send('{"error":"the action does not exist"}');
    }
    else if(action == "getPeople"){
        fs.readFile("server/data/user.json","utf8",function (error,data){
            var jd = JSON.parse(data);
            var rslt=jd.t_person;
            var key = null;
            for (var i = 0; i < rslt.length; i++) {
                if (rslt[i].issuper == 1) {
                     key = i;
                     break;
                }
            }
            rslt.splice(key,1);
            if(!rslt){
                res.status(200).send({err:"没有人员"});
                return;
            }
            for (var i = 0; i < rslt.length; i++) {
                delete rslt[i]['loginpsd'];
                delete rslt[i]['loginname'];
            }
            res.status(200).send(rslt);         
        }) ;
    }
    else if(action == "getcourse"){
        fs.readFile("server/data/user.json","utf8",function (error,data){
            var jd = JSON.parse(data);
            var rslt=jd.t_course;
            if(!rslt){
                res.status(200).send({err:"添加失败"});
                return;
            }
            res.status(200).send(rslt);         
        }) ;
    }
    else {
        res.status(200).send('{"error":"invalid parameter"}');
    }
}

module.exports.post = function (ps, res, req) {
    var action = ps['action']?ps['action'].toLocaleLowerCase():null;
    if (action == null) {
        res.status(200).send('{"error":"the action does not exist"}');
    }
    else  if (action == "login") {
        fs.readFile("server/data/user.json","utf8",function (error,data){
        	var status = ps.status;
		    var jd = JSON.parse(data);
		    var rslt=null;
		    for (var i = 0; i < jd.t_person.length; i++) {
		    	if (ps.username == jd.t_person[i].loginname && 
		    		ps.password == jd.t_person[i].loginpsd) {
		    		rslt = jd.t_person[i];
		    		break;
		    	}
		    }
            if(!rslt){
            	res.status(200).send({err:"用户名或密码错误"});
            	return;
            }
            req.session['USERID'] = rslt['userid'];
            delete rslt['loginpsd'];
            delete rslt['loginname'];
            res.status(200).send(rslt);		   
		}) ;
    }
    else if(action == "addcourse"){
        fs.readFile("server/data/user.json","utf8",function (error,data){
            var userid = ps.userid;
            var title = ps.title;
            var realname = ps.realname;
            var jd = JSON.parse(data);
            var rslt={
                "userid":userid,
                "title":title,
                "realname":realname,
                "trainingtime":" ",
                "status":0         
            };
            jd.t_course.push(rslt);
            fs.writeFile("server/data/user.json",JSON.stringify(jd),function(err){  
                if(err){
                    res.status(200).send({err:'写入json数据出错'});   
                }else{
                    res.status(200).send({msg:"添加成功"});  
                };  
            });       
        }) ;
    }
    else if(action == "update"){
        fs.readFile("server/data/user.json","utf8",function (error,data){
            var trainingtime = ps.trainingtime;
            var index=ps.index;
            var jd = JSON.parse(data);
            jd.t_course[index]["trainingtime"] = trainingtime;       
            jd.t_course[index]["status"] = "1";       
            fs.writeFile("server/data/user.json",JSON.stringify(jd),function(err){  
                if(err){
                    res.status(200).send({err:'写入时间出错'});   
                }else{
                    res.status(200).send({msg:'课程更新成功'});  
                };  
            });       
        }) ;
    }
    else if(action == "delcourse"){
        fs.readFile("server/data/user.json","utf8",function (error,data){
            var index=ps.index;
            var jd = JSON.parse(data);
            jd.t_course.splice(index,1);        
            fs.writeFile("server/data/user.json",JSON.stringify(jd),function(err){  
                if(err){
                    res.status(200).send({err:'删除有误'});   
                }else{
                    res.status(200).send({msg:'课程删除成功'});  
                };  
            });       
        }) ;
    }
    else {
        res.status(200).send('{"error":"invalid parameter"}');
    }
}