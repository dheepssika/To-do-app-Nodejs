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

/*Reminder tabs contains multiple fields:date, time etc, whihc are stored in the DB along with the reminder details*/
function displayAddItemPopup(item){
    console.log(item);
    var TheInnerHTML='';
    TheInnerHTML+='Enter the name of the reminder:<br><input id="reminder-name" class="reminder-element-input"></input><br>'+
    'Enter the date:<br><input id="reminder-date" class="reminder-element-input" placeholder="yyyy/mm/dd"></input><br>'+
    'Enter the time:<br><input id="reminder-time" class="reminder-element-input" placeholder="HH:MM hrs"></input><br>'+
    '<button class="reminder-done-button" onclick="addReminderToDb()">Add Remainder</button>'+
    '<button class="remainder-cancel-button" onclick="hideReminder(\''+item+'\')">Cancel</button>';
    document.getElementById(item+'-popup-container').innerHTML=TheInnerHTML
    document.getElementById(item+'-popup-container').style.cssText="visibility:visible";
}
function hideReminder(item){
    console.log(item);
    document.getElementById(item+'-popup-container').style.cssText="visibility:hidden";
}
  
//Display the details tab along with the details of it's priority
function displayDetailsTab(priority){
    priority=priority.split(","); //contains the reminder_name and the priority     
    //console.log(priority[1]);
    var TheInnerHTML='';
    if(priority[1] == 1){ 
        TheInnerHTML+='<div class="details-priority-title">Priority</div><select id="priority-title" ><option value="1">Important</option><option value="0">None</option></select>';
    }else{                                                                                                                                                                          
        TheInnerHTML+='<div class="details-priority-title">Priority</div><select id="priority-title"><option value="0">None</option><option value="1">Important</option></select>'       
    }
    document.getElementById('details-priority-container').innerHTML=TheInnerHTML;    
    var TheInnerHTML='';                                                                                                                                                                                                                            
    TheInnerHTML+='<div class="details-note-container"><textarea placeholder="Note(Optional)" class="details-note-textarea"></textarea></div><button class="button-details delete-button" onclick="hideOptionsTab()">DELETE</button><button class="button-details done-button" onclick="updatePriority(\''+priority+'\')">DONE</button>';
    document.getElementById('notes-container').innerHTML=TheInnerHTML;    
    //if(priority[1]!=document.getElementById('priority-title').value)
    //console.log(document.getElementById('priority-title').value);
    document.getElementById('details-popup-container').style.cssText="visibility:visible";  
}

//The options tab is displayed based on it's requirement  
function displayOptionsTab(){
    document.getElementById('options-popup-box').style.cssText="visibility:visible";      
}
function hideOptionsTab(){    
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


