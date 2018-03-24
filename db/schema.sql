### Schema

DROP DATABASE IF EXISTS innovata_db;
CREATE DATABASE innovata_db;

USE innovata_db;

CREATE TABLE visuals (
	vis_id INTEGER (11) AUTO_INCREMENT NOT NULL,
	userName VARCHAR (50) NOT NULL,
	data VARCHAR (2500) NOT NULL, 
	visualType VARCHAR (50) NOT NULL, 
    vizName VARCHAR (55) NOT NULL,
	PRIMARY KEY (vis_id)
);

INSERT INTO visuals(userName,data,vizName, visualType)
VALUES  ('John', 'Dog Cat Barks Meows ',  'textCloud ', 'Pets'),
        ('Jane', 'Giraffe Lion Hyena Tiger', 'textCloud ', 'Wildlife'),
        ('Doe', 'Horse Donkey Mule Hordo', 'textCloud ', 'Equines'),
        ('Alex', 'Cow Sheep Goat Ox', 'textCloud ', 'Domestic'),
        ('Ahmed', 'Cabbage Green Jalapenos Pepper', 'textCloud ', 'Groceries'),
        ('Jennifer', 'Beef Mutton Port Lamb','textCloud ',  'Meat'),
        ('Louis', 'Pants Trousers Blouse Shorts', 'textCloud ', 'Dresses'),
        ('Louise', 'Underwear Bras Langeries Bikinis', 'textCloud ', 'Unwears'),
        ('Luis', 'Children Child Babies Diper', 'textCloud ', 'Young'),
        ('Lando', 'Men Female Girl Boy', 'textCloud ', 'Sex'),
        ('Korma', 'Old Young Adult Grown', 'textCloud ', 'Ages'),
        ('Karma', 'Soccer Basketball Football Baseball','textCloud ',  'Sports'),
        ('Kadiro', 'Chicago Minneapolis Arizona Seattle', 'textCloud ', 'Cities'),
        ('Oromo', 'Area Ethiopia Region Continent', 'textCloud ', 'Country'),
        ('Oromia', 'Europe America Asia Africa', 'textCloud ', 'Continent'),
        ('Kaleb', 'Pharmacy Medications Drugs Prescriptions','textCloud ',  'Medicals'),
        ('Kendra', 'Grocery Amazon Walmart Target', 'textCloud ', 'Stores');