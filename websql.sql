CREATE DATABASE if not exists Jewelry;
USE Jewelry;

DROP TABLE if exists Orders;
DROP TABLE if exists Users;
DROP TABLE if exists Jewels;

CREATE TABLE Users ( 
	Users_ID INT auto_increment primary key,
    Users_created datetime,
	Users_name varchar(20),
	Users_mail varchar(50),
	Users_phone varchar(40),
	Users_address varchar(50),
    Users_role varchar(20),
	Users_passwords varchar(200)
);

CREATE TABLE Jewels (
	Jewel_ID INT auto_increment primary key,
	Jewel_material varchar (20),
   	size int,
	price float ,
   	Jewel_name varchar (100),
	Stone varchar (9),
   	Jewel_category varchar(25),
	Stock int,
	Images varchar(80)
    );

CREATE TABLE Orders (
	Order_ID INT auto_increment primary key,
	Orders_product INT, -- varchar(50) NOT NULL,
    Name_of_product varchar(50),
	Orders_adress varchar (90) NOT NULL,
	Orders_payment varchar(50) NOT NULL,
	Number_of_product INT NOT NULL,
	order_date varchar(20) not null,
   	Users_ID INT NOT NULL,
	foreign key(Users_ID) REFERENCES Users(Users_ID),
	foreign key (Orders_product) REFERENCES Jewels(Jewel_ID)
);

 INSERT INTO Jewels VALUES
-- silver necklaces
(1,'silver',50,50, 'Silver Necklace','no','Necklace',5,'SilverNecklace.png'),
(2,'silver',52,50, 'Silver Necklace','no','Necklace',5,'SilverNecklace.png'),
-- gold necklaces
(3,'gold',50,60, 'Gold Necklace','no','Necklace',5,'GoldNecklace.png'),
(4,'gold',52,60, 'Gold Necklace','no','Necklace',5,'GoldNecklace.png'),
-- platinium necklaces
(5,'platinium',50,80, 'Platinium Necklace','yes','Necklace',5,'PlatiniumNecklace.jpg'),
(6,'platinium',52,80, 'Platinium Necklace','yes','Necklace',5,'PlatiniumNecklace.jpg'),
-- biodegradable necklaces
(7,'biodegradable',50,1000, 'Biodegradable Necklace','yes','Necklace',5,'BiodegradableNecklace.jpg'),
(8,'biodegradable',52,1000, 'Biodegradable Necklace','yes','Necklace',5,'BiodegradableNecklace.jpg'),
-- silver rings
(9,'silver',50,50, 'Silver Ring','no','Ring',5,'SilverRing.png'),
(10,'silver',52,50, 'Silver Ring','no','Ring',5,'SilverRing.png'),
-- gold rings
(11,'gold',50,60, 'Gold Ring','no','Ring',5,'GoldRing.png'),
(12,'gold',52,60, 'Gold Ring','no','Ring',5,'GoldRing.png'),
-- platinium rings
(13,'platinium',50,80, 'Platinium Ring','yes','Ring',5,'PlatiniumRing.jpg'),
(14,'platinium',52,80, 'Platinium Ring','yes','Ring',5,'PlatiniumRing.jpg'),
-- biodegradable rings 
(15,'biodegradable',50,2000, 'Biodegradable Ring','yes','Ring',5,'BiodegradableRing.jpg'),
(16,'biodegradable',52,2000, 'Biodegradable Ring','yes','Ring',5,'BiodegradableRing.jpg'),
-- silver bracelets
(17,'silver',50,50, 'Silver Bracelet','no','Bracelet',5,'SilverBracelet.png'),
(18,'silver',52,50, 'Silver Bracelet','no','Bracelet',5,'SilverBracelet.png'),
-- gold bracelets
(19,'gold',50,60, 'Gold Bracelet','no','Bracelet',5,'GoldBracelet.png'),
(20,'gold',52,60, 'Gold Bracelet','no','Bracelet',5,'GoldBracelet.png'),
-- platinium bracelets
(21,'platinium',50,80, 'Platinium Bracelet','yes','Bracelet',5,'PlatiniumBracelet.jpg'),
(22,'platinium',52,80, 'Platinium Bracelet','yes','Bracelet',5,'PlatiniumBracelet.jpg'),
-- biodegradable bracelets
(23,'biodegradable',50,3000, 'Biodegradable Bracelet','yes','Bracelet',5,'BiodegradableBracelet.jpg'),
(24,'biodegradable',52,3000, 'Biodegradable Bracelet','yes','Bracelet',5,'BiodegradableBracelet.jpg'),
-- silver earrings
(25,'silver',0,50, 'Silver Earring','no','Earring',5,'SilverEarring.png'),
-- gold earrings
(26,'gold',0,60, 'Gold Earring','no','Earring',5,'GoldEarring.jpg'),
-- platinium earrings
(27,'platinium',0,80, 'Platinium Earring','yes','Earring',5,'PlatiniumEarring.jpg'),
-- biodegradable earrings
(28,'biodegradable',0,100, 'Biodegradable Earring','yes','Earring',5,'BiodegradableEarring.jpg');
 
INSERT INTO Users VALUES

(1,now(),'Rami','jose.rami@gmail.com','+33712345678','13 rue France','Users',sha2(concat(now(), 'Ramipass'), 224) ),
(2,now(),'Christophe','robert.christophe@gmail.com','+33712345678','1 Avenue des Champs Elysées','Users',sha2(concat(now(), 'Christophepass'), 224) ),
(3,now(),'Jean','jose.jean@gmail.com','+33712345678','19 Avenue des Champs Elysées','Users',sha2(concat(now(), 'Jeanpass'), 224) ),
(4,now(),'Bob','Jose.bob@gmail.com','+33712345678','13 Rue Mozart','Users',sha2(concat(now(), 'Bobpass'), 224) ),
(5,now(),'Wayne','bruce.wayne@gmail.com','+33712345678','17 Rue Mozart','Users',sha2(concat(now(), 'Waynepass'), 224) ),
(6,now(),'Kent','clark.kent@gmail.com','+33712345678','13 rue France','Users',sha2(concat(now(), 'Kentpass'), 224) ),
(7,now(),'Parker','peter.parker@gmail.com','+33712345678','35 rue de la Paix','Users',sha2(concat(now(), 'Parkerpass'), 224) ),
(8,now(),'Stark','tony.stark@gmail.com','+33712345678','27 rue France','Users',sha2(concat(now(), 'Starkpass'), 224) ),
(9,now(),'Goku','son.goku@gmail.com','+33712345678','18 rue de la Paix','Users',sha2(concat(now(), 'Gokupass'), 224) ),
(10,now(),'Vegeta','vegeta@gmail.com','+33712345678','115 rue de la Liberté','Users',sha2(concat(now(), 'Vegetapass'), 224) ),
(11,now(),'Bulma','bulma@gmail.com','+33712345678','23 Rue Mozart','Users',sha2(concat(now(), 'Bulmapass'), 224) ),
(12,now(),'ADMIN','THEADMIN@gmail.com','+33712345678','No @','ADMIN',sha2(concat(now(), 'ADMINpass'), 224) );


 INSERT INTO Orders VALUES
(1,1,'Silver Necklace','Avenue de la Liberté','Carte',1,'23/12/2022',6),
(2,3,'Gold Necklace','115 rue de la Liberté','Paypal',1,'23/12/2022',10),
(3,5,'Platinium Necklace','18 rue de la Paix','Carte',1,'23/12/2022',9),
(4,7,'Biodegradable Necklace','35 rue de la Paix','Paypal',2,'23/12/2022',7),
(12,9,'Silver Ring','35 rue de la Paix','Paypal',2,'23/12/2022',7),
(5,11,'Gold Ring','27 rue France','Apple Pay',1,'23/12/2022',8),
(6,14,'Platinium Ring','13 rue France','Apple Pay',1,'23/12/2022',1),
(7,16,'Biodegradable Ring','1 Avenue des Champs Elysées',' Carte',1,'23/12/2022',2),
(8,17,'Silver Bracelet','19 Avenue des Champs Elysées',' Apple Pay',1,'23/12/2022',3),
(9,19,'Gold Bracelet','13 Rue Mozart',' Carte',1,'23/12/2022',4),
(10,21,'Platinium Bracelet','17 Rue Mozart',' Carte',1,'23/12/2022',5),
(11,23,'Biodegradable Bracelet', '23 Rue Mozart', 'Apple Pay',3, '12/01/2023',11),
(13,27,'Platinium Earring','23 Rue Mozart','Apple Pay',3,'12/01/2023',11),
(14,28,'Biodegradable Earring','23 Rue Mozart','Apple Pay',3,'12/01/2023',11);

/*
SELECT Jewel_ID,Jewel_name, Jewel_category FROM Jewels where Jewel_material = "silver";
SELECT Jewel_ID,Jewel_name FROM Jewels where Jewel_material = "gold";
SELECT Jewel_ID,Jewel_name FROM Jewels where Jewel_material = "platinium";
SELECT Jewel_ID,Jewel_name FROM Jewels where Jewel_material = "biodegradable";
SELECT Jewel_ID,Jewel_name FROM Jewels where Stone = "yes";
SELECT Jewel_ID,Jewel_name FROM Jewels where Stone = "no";
SELECT Jewel_ID,Jewel_name, Jewel_category FROM Jewels where size = 50;
SELECT Jewel_ID,Jewel_name FROM Jewels where Jewel_category = 'Necklace';
INSERT INTO Jewels (Jewel_material,size,price,Jewel_name, stone,Jewel_category,Jewel_ID ) VALUES ("NULL",0,0,"NULL","NULL","NULL",null);
UPDATE Jewels SET Jewel_material="Silver", size=15, price=35, Jewel_name="Chocolat", Stone="yes", Jewel_category = "neck" WHERE Jewel_ID=28;
select * from Jewels;


/*Select * FROM Orders;
select * From Orders where Client_ID = 11;
DELETE FROM Orders WHERE Order_ID = 2;
Select * FROM Orders;
INSERT INTO Orders (Orders_product_ID,Name_of_product,Orders_adress,Orders_payment,Number_of_product,order_date,Client_ID,Order_ID) VALUES (NULL,NULL,"NULL","NULL",0,'0/0/0000',9,null);
UPDATE Orders SET Orders_product_ID= 17, Name_of_product = 'Silver Bracelet',Orders_adress='1 Rue de Napoléon', Orders_payment='Carte', Number_of_product= 1 , order_date= '1/1/2023',Client_ID= 9 WHERE Order_ID= 15;
Select * FROM Orders;*/

-- select * From Users;
-- SELECT * FROM Users WHERE Users_ID = 5;*/