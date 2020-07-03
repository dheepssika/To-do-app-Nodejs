//Loads this section on page reload
document.addEventListener("DOMContentLoaded", function(event) { 
	 fetch('http://localhost:5000/left_nav')
	.then(res => res.json())
	.then(data=>
    {var TheInnerHTML='';
    //console.log(data);
	for (var i=0;i<data.length;i++){
        TheInnerHTML+='<div class="left-nav-tabs '+data[i].list_item+'" title="'+data[i].list_item_description+'" onclick="loadDivision(\''+data[i].list_item+'\')">'+
		'<div class="left-nav-tabs-color-bubble" style="background-color:'
        +data[i].list_item_color+';"></div><div class="left-nav-text">'+data[i].list_item+'</div></div>';
    }
    
	document.getElementById("left-tabs-container").innerHTML = TheInnerHTML;})
});

//The right section has all the rmeinders fetched from the db and the various options avalilable for each reminder
document.addEventListener("DOMContentLoaded", function(event) { 
    var payload={
        task_name:"Reminder"
    }
    var data = JSON.stringify( payload );
    console.log("data:"+data);
    fetch('http://localhost:5000/right_nav',{
        method:'POST',
        body:data,
        headers:new Headers({'Content-Type': 'application/json'}) 
     })
    .then(res => res.json())
    .then(data=>
    {var TheInnerHTML='';
    for (var i=0;i<data.length;i++){		
        var date=toDate(data[i].creation_date);
        var time=toTime(data[i].creation_time);
        TheInnerHTML+='<div class="right-nav-tabs" title="'+data[i].list_item+'">'+        
            '<div class="right-nav-tabs-color-bubble" onclick="markCompleted(\''+data[i].item_name+'\')"></div><div class="right-nav-text">'+data[i].item_name+'</div> <div class="rem-date">'+date+'</div><div class="rem-time">'+time+'</div><div class="details-tab" onclick="displayDetailsTab(\''+data[i].item_name+","+data[i].priority+'\')">Details</div></div>';
    }	
        TheInnerHTML+='<div class="add-new-reminder-container"><div id="add-reminder-button" onClick="displayAddItemPopup(\'reminder\')">+ New Item</div></div>';
        document.getElementById("right-tabs-container").innerHTML = TheInnerHTML;})
});
document.addEventListener("DOMContentLoaded", function(event) { 
    fetch('http://localhost:5000/count_completed')
   .then(res => res.json())
   .then(data=>
   {var TheInnerHTML='';          
       TheInnerHTML+='<div class="reminders-count">'+data+" Completed"+'</div>';              
       document.getElementById("reminders-count-value").innerHTML = TheInnerHTML;})
});
document.addEventListener("DOMContentLoaded", function(event) { 
    fetch('http://localhost:5000/scheduled_nav_tabs')
   .then(res => res.json())
   .then(data=>
   {var TheInnerHTML='';
   for (var i=0;i<data.length;i++){		       
       var date=toDate(data[i].creation_date);
       var time=toTime(data[i].creation_time);
       
      TheInnerHTML+='<div class="scheduled-task-date">'+date+'</div><div class="scheduled-nav-tabs"><div class="scheduled-task-text-container"><div class="scheduled-task-bubble"></div><div class="scheduled-task-text">'+data[i].task_name+'</div><div class="scheduled-task-date-2">'+date+'</div><div class="sheduled-task-time">'+time+'</div></div></div>';       
        
   }	
    TheInnerHTML+='<div class="add-new-scheduled-task-container"><div id="add-reminder-button" onClick="displayAddItemPopup(\'scheduled\')">+ New Item</div></div>';
    document.getElementById("right-scheduled-tabs-container").innerHTML = TheInnerHTML;})
});
function searchCall(){
    $('.search-result-container').show();
    var payload={
        search_query:document.getElementById('search-box-area').value+'%',
    }
    var data=JSON.stringify( payload ); 
    fetch('http://localhost:5000/search_call',{method: "POST", body: data,headers:{'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(data=>{
        var TheInnerHTML='';
        for (var i=0;i<data.length;i++){		
        var date=toDate(data[i].creation_date);        
        var time=toTime(data[i].creation_time);        
        TheInnerHTML+='<div class="right-nav-tabs" title="'+data[i].list_item+'">'+
         '<div class="right-nav-tabs-color-bubble" onclick="markCompleted(\''+data[i].item_name+'\')"></div><div class="right-nav-text">'+data[i].item_name+'</div> <div class="rem-date">'+date+'</div><div class="rem-time">'+time+'</div><div class="details-tab" onclick="displayDetailsTab(\''+data[i].item_name+","+data[i].priority+'\')">Details</div></div>';
    }
    document.getElementById("right-search-tabs-container").innerHTML = TheInnerHTML;
         
     $('.reminder-container').hide();
     $('.general-container').hide();
     $('.scheduled-page-container').hide();
     
    })
}
//adding an item with it's resoectine description and color 
function AddItemToDb()
 {      
		var payload={
		list_item:''+document.getElementById('todo-element-name').value,
		list_item_color:''+document.getElementById('todo-element-color').value,
		list_item_description:''+document.getElementById('todo-element-desc').value}
		var data=JSON.stringify( payload );
        fetch('http://localhost:5000/add_todo',{method: "POST", body: data,headers:{'Content-Type': 'application/json'}})
        .then(function (res){
        
            fetch('http://localhost:5000/left_nav')
            .then(res => res.json())
            .then(data=>
            {var TheInnerHTML='';
            console.log(data);
            for (var i=0;i<data.length;i++){
                TheInnerHTML+='<div class="left-nav-tabs '+data[i].list_item+'" title="'+data[i].list_item_description+'" onclick="loadDivision(\''+data[i].list_item+'\')">'+
                '<div class="left-nav-tabs-color-bubble" style="background-color:'
                +data[i].list_item_color+';"></div><div class="left-nav-text">'+data[i].list_item+'</div></div>';
            }
            document.getElementById("left-tabs-container").innerHTML = TheInnerHTML;})

        });
        //window.location.reload();

       
 }
 function toTime(time){
    var result='';
    time=time.split(':');		
    var hrs=time[0];
    time[0]=time[0] % 12 ;
    result=result+time[0];
    result=result.padStart(2,'0');
    result=result+':'+time[1];
    result=result+' '+(hrs >= 12 ? "PM" : "AM");		
    return result;		
}
function toDate(date){	
    date=date.split('T')[0];
    //console.log(date);
    date=date.split('-');	
    date=date[2]+'/'+date[1]+'/'+date[0];
    return date;
}
//priority can be important or none
function updatePriority(priority){
    //console.log(priority[1]);
    console.log(document.getElementById('priority-title').value);
    priority=priority.split(",");
        console.log(priority[1]);
       // console.log("fn");
        var payload={
            priority_value:''+document.getElementById('priority-title').value,
            item_name:''+priority[0],}
            var data=JSON.stringify( payload );    
            //console.log("data in prior"+data);
            fetch('http://localhost:5000/update_priority',{method: "POST", body: data,headers:{'Content-Type': 'application/json'}})
            window.location.reload();         
    
    $('.details-popup-container').css("visibility","hidden");
     
 }

function addNewItemToDb(task_name){
    if(task_name == 'scheduled'){
        console.log("from db handler");
    }
    var payload={   
	element_name:''+document.getElementById('new-element-name').value,
	element_date:''+document.getElementById('new-element-date').value,
    element_time:''+document.getElementById('new-element-time').value,
    task_name:''+task_name}
    var data=JSON.stringify( payload );    
    console.log(data);
	fetch('http://localhost:5000/element_add_item',{method: "POST", body: data,headers:{'Content-Type': 'application/json'}})
	window.location.reload();
 }
 function markCompleted(name){
     console.log("name:"+name);
    var payload={
        reminder_name:''+name,        
    }
    var data=JSON.stringify(payload);
    fetch('http://localhost:5000/update_remainder_status',{method: "POST", body: data,headers:{'Content-Type': 'application/json'}})
	window.location.reload();
 }
