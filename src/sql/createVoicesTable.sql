CREATE TABLE `voices` (
  `ID` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `CATEGORY` enum('Movies/TV','Music/Arts','News/Politics','Sports') NOT NULL,
  `GENDER` enum('Male','Female') NOT NULL,
  `ACCENT` enum('US','Other') NOT NULL,
  `FIRSTNAME` varchar(24) NOT NULL,
  `LASTNAME` varchar(24) NOT NULL,
  `PIC` blob NOT NULL,
  `TIMES_ASKED` int(8) unsigned NOT NULL DEFAULT '0',
  `TIMES_RIGHT` int(8) unsigned NOT NULL DEFAULT '0',
  `CLIP_NAME` varchar(32) NOT NULL,
  `RACE` enum('White','Other') NOT NULL DEFAULT 'White',
  `DOB` set('1900-1945','1946-1964','1965-1980','1981-2000','2001-2020') NOT NULL DEFAULT '1946-1964',
  PRIMARY KEY (`ID`)
)