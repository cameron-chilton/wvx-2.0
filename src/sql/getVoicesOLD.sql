(SELECT DISTINCT
  id, firstname, lastname, clip_name FROM voices
  WHERE CATEGORY = 'Movies/TV' AND GENDER = 'Male' AND ACCENT = 'US' AND RACE = 'White' AND DOB = '1946-1964'
  AND ID NOT LIKE '642'
  AND firstname NOT LIKE 'PAULY'
  AND lastname NOT LIKE 'SHORE'
  ORDER BY RAND() LIMIT 4) 
UNION (SELECT id, firstname, lastname, clip_name FROM voices WHERE ID = '642')