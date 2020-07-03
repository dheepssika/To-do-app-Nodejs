const express = require('express');
const mysql = require('mysql');
const path = require('path');
const testy = express();
const bodyParser = require('body-parser');

const port = 5000;
// configuring middle-ware
testy.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

testy.use(bodyParser.json()); 
testy.use(bodyParser.urlencoded({ extended: true })); 

testy.set('port', process.env.port || port);

testy.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//mysql database connector;
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
	database : 'to_do'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//data to be displayed on page reload
testy.get('/left_nav', function (req, res) {
	db.query("SELECT * FROM to_do_list", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
    });
});
//adds data from the pop up
testy.post('/add_todo',function(req,res){
    var quer=`insert into to_do_list(list_item,list_item_color,list_item_description) values('${req.body.list_item}','${req.body.list_item_color}','${req.body.list_item_description}');`	
	db.query(quer, function (err, result, fields){
    if (err) throw err;
    res.end("yes");});
});
testy.post('/search_call',function(req,res){
	var quer=`select * from list_content where item_name like '${req.body.search_query}'	`;
	db.query(quer,function(err,result,fields){
		console.log(result);
		if(err) throw err;
	res.json(result); });
	
});

testy.post('/right_nav', function (req, res) {
	db.query(`SELECT * FROM list_content where list_item = '${req.body.task_name}' and status = 0 order by priority asc`, function (err, result, fields) {				
		if (err) throw err;
		res.json(result);
	});
});
//Layout changes for scheduled tab
testy.get('/scheduled_nav_tabs', function (req, res) {
	db.query("SELECT * FROM scheduled  order by creation_date", function (err, result, fields) {				
		if (err) throw err;
		res.json(result);
	});
});
//Function to keep a track of the completed task
testy.get('/count_completed', function (req, res) {
	db.query("Select count (*)  as count FROM list_content where status=1", function (err, result, fields) {						
		if (err) throw err;
			res.json(result[0].count);
	});
}); 
//funtion to update when the priority of a task changes
testy.post('/update_priority',function(req,res){	
	var quer=`update list_content set priority='${req.body.priority_value}' where item_name='${req.body.item_name}';`
	db.query(quer,function(err,result,fields){
		if(err) throw err;
	res.end("yes"); });
	
});
testy.post('/element_add_item',function(req,res){
	if(req.body.task_name == 'scheduled'){
        var quer=`insert into scheduled values('${req.body.element_name}','${req.body.element_date}','${req.body.element_time}',0,0);`
    }else{
		var quer=`insert into list_content values('${req.body.element_name}','${req.body.task_name}','${req.body.element_date}','${req.body.element_time}',0,0);`
	}
	db.query(quer,function(err,result,fields){
		if(err) throw err;
	res.end("yes"); });
	
});
testy.post('/update_remainder_status',function(req,res){
    var quer=`update list_content set status = 1 where item_name='${req.body.reminder_name}';`
	db.query(quer,function(err,result,fields){
		if(err) throw err;
	res.end("yes"); });
	
});
