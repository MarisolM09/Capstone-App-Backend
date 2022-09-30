DROP TABLE IF EXISTS hikers, hikes;

CREATE TABLE hikers (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE hikes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  hike_name VARCHAR(100),
  location VARCHAR(100),
  hike_length VARCHAR(50),
  elevation_gain VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
  REFERENCES hikers (id)
    ON DELETE CASCADE
);

INSERT INTO hikers
	(first_name, last_name, email)
VALUES 
  ("James","Butt", "test@test.com"),
  ("Art","Venere", "test@test.com");

INSERT INTO hikes
	(hike_name, location, hike_length, elevation_gain, user_id)
    
VALUES 
  ("Chain Lakes Loop", "Mount Baker Snoqualmie National Forest", "7.1 miles rt", "1,1886 ft", 1),
  ("Maple Pass Loop",  "North Cascades National Park", "7.4 miles rt", "2,191 ft", 2);