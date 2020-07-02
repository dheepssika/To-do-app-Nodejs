create database to_do;
use to_do;
create table to_do_list(
	list_item varchar(25) NOT NULL PRIMARY KEY,
	list_item_color varchar(15) NOT NULL,
	list_item_description varchar(60) 
);
create table scheduled(
	task_name varchar(100) primary key, 
    creation_date date not null,
    creation_time time not null,
    status boolean not null,
    priority boolean not null    
);
CREATE TABLE list_content(
    item_name varchar(100) not null, 
    list_item varchar(25) not null,
    creation_date date not null,
    creation_time time not null,
    FOREIGN KEY (list_item) REFERENCES to_do_list(list_item),
    PRIMARY KEY(item_name,list_item)
);
--ALTER TABLE list_content ADD priority boolean not null;
--ALTER TABLE list_content ADD status boolean not null;

--Adding some items into the table that will be dispalyed in the home page
insert into to_do_list(list_item,list_item_color,list_item_description) values('Secret','#95E233','secret list'),('Reminder','#FD96FF','To note Reminders');
insert into scheduled values('Car service','2019-02-04','10:05',0,0)
insert into list_content values('Demo Presentation','Reminder','2019-06-02','17:05',0,0),('Client Meeting','Reminder','2019-06-12','11:30',0,0);

