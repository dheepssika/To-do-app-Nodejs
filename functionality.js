/* Displays the dropdown of tasks that are stored*/
function displayDropdownList(){
    document.getElementById('left-tabs-container').style.cssText="visibility:visible";
}
/*Return the item entered in the field*/
function addItemToList(){
    document.getElementById('add-item-pop-up').style.cssText="visibility:visible";   

}
function hideItemPopUp(){
    document.getElementById('add-item-pop-up').style.cssText="visibility:hidden";   
}

function enable_details(){
    
}
/*Reminder tabs contains multiple fields:date, time etc, whihc are stored in the DB along with the reminder details*/
function displayAddItemPopup(item){
    console.log(item);
    var TheInnerHTML='';
    TheInnerHTML+='Enter the name of the '+item+':<br><input id="new-element-name" class="new-element-input"></input><br>'+
    'Enter the date:<br><input id="new-element-date" class="new-element-input" placeholder="yyyy/mm/dd"></input><br>'+
    'Enter the time:<br><input id="new-element-time" class="new-element-input" placeholder="HH:MM hrs"></input><br>'+
    '<button class="reminder-done-button" onclick="addNewItemToDb(\''+item+'\')">Add to '+item+'</button>'+
    '<button class="remainder-cancel-button" onclick="hideNewitemPopup(\''+item+'\')">Cancel</button>';
    if(item!= 'reminder' & item!= 'scheduled'){
        console.log("hello");
        document.getElementById('general-popup-container').innerHTML=TheInnerHTML;
        document.getElementById('general-popup-container').style.cssText="visibility:visible";    
    }else{
        document.getElementById(item+'-popup-container').innerHTML=TheInnerHTML
        document.getElementById(item+'-popup-container').style.cssText="visibility:visible";
        }
}

function loadDivision(name){     
    document.getElementById('result-container').style.cssText="";   
    if(name=='Reminder'){
        $('.scheduled-page-container').hide();                
        $('.general-container').hide();
        $('.reminder-container').show(); 
        $('.search-result-container').hide();   
    }else{        
        $('.reminder-container').hide();        
        $('.scheduled-page-container').hide();
        $('.general-container').show();
        $('.search-result-container').hide();
        TheInnerHTML=" ";
        var payload={
            task_name:name
        }
        var data = JSON.stringify( payload );
        //console.log("data:"+data);
        fetch('http://localhost:5000/right_nav',{
            method:'POST',
            body:data,
            headers:new Headers({'Content-Type': 'application/json'}) 
        })
        .then(res => res.json())
        .then(data=>
        {
            var TheInnerHTML='';
            for (var i=0;i<data.length;i++){		
            var date=toDate(data[i].creation_date);
            //console.log(data);
            var time=toTime(data[i].creation_time);
            TheInnerHTML+='<div class="right-nav-tabs" title="'+data[i].list_item+'">'+
             '<div class="right-nav-tabs-color-bubble" onclick="markCompleted(\''+data[i].item_name+'\')"></div><div class="right-nav-text">'+data[i].item_name+'</div> <div class="rem-date">'+date+'</div><div class="rem-time">'+time+'</div><div class="details-tab" onclick="displayDetailsTab(\''+data[i].item_name+","+data[i].priority+'\')">Details</div></div>';
        }	            
        TheInnerHTML+='<div class="add-new-general-task-container"><div id="add-reminder-button" onClick="displayAddItemPopup(\''+name+'\')">+ New Item</div></div>';
        document.getElementById("right-general-tabs-container").innerHTML = TheInnerHTML;})
        document.getElementById('general-page-text').innerHTML=name;        
    }                
}

function displayScheduleTab(){
    $('.reminder-container').hide();
    $('.general-container').hide();
    $('.scheduled-page-container').show();
    $('.search-result-container').hide();       
}
function hideNewitemPopup(item){
    if(item!= 'reminder' & item!= 'scheduled'){
        console.log("hello");
        document.getElementById('general-popup-container').style.cssText="visibility:hidden";
    }else{
        document.getElementById(item+'-popup-container').style.cssText="visibility:hidden";
        }    
}
//Display the details tab along with the details of it's priority         
function displayDetailsTab(priority){
    priority=priority.split(","); //contains the reminder_name and the priority     
    //console.log("fn called"+ priority[1] + "hello");
    //console.log(priority[0]);
    TheInnerHTML="";
    TheInnerHTML+='<div id="popup_box_details">'+
                        '<div class="details-title">Details</div>'+
                            '<div class="details-remindme">Remind Me</div>'+
                                '<div class="on-a-day-container">'+
                                    '<input type="checkbox" id="on-a-day-checkbox"> On a day<br>'+                            
                                '</div>'+      
                                '<div class="details-list-container">'+
                                    '<div class="details-list-title">List</div>'+
                                    '<select name="list-title">'+
                                        '<option value="reminder">'+priority[0]+'</option>'+                                                                        
                                    '</select>'+
                                '</div>'+                          
                                '<div id="details-priority-container">';
                                //console.log(priority[1]);
    if(priority[1] == 1){ 
            TheInnerHTML+='<div class="details-priority-title">Priority</div><select id="priority-title" ><option value="1">Important</option><option value="0">None</option></select>';
    }else{        
            console.log("else"+priority[1]);     
            TheInnerHTML+='<div class="details-priority-title">Priority</div><select id="priority-title"><option value="0">None</option><option value="1">Important</option></select>'       
         }
    TheInnerHTML+='</div>'+'<div id="notes-container">'+
    '<div class="details-note-container"><textarea placeholder="Note(Optional)" class="details-note-textarea"></textarea></div><button class="button-details delete-button" onclick="hideOptionsTab()">DELETE</button><button class="button-details done-button" onclick="updatePriority(\''+priority+'\')">DONE</button>';

    TheInnerHTML+='</div>'+'</div>';    
    $('.details-popup-container').html(TheInnerHTML);
    $('.details-popup-container').css("visibility","visible");
}

//The options tab is displayed based on it's requirement  
function displayOptionsTab(){
    document.getElementById('options-popup-box').style.cssText="visibility:visible";      
}
function hideOptionsTab(){
    /*functionality to delete */
    document.getElementById('options-popup-box').style.cssText="visibility:hidden";      
}
//Change colors of the bubbles
function changeColor(color){
    var length=document.getElementsByClassName("right-nav-tabs-color-bubble").length;
	var elt=document.getElementsByClassName("right-nav-tabs-color-bubble");
	for (i=0;i<length;i++){			
		elt[i].style.borderColor = color; 
	}
}


