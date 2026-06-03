--id — auto-incrementing primary key
--name — text, cannot be empty
--birth_year — integer, must be between 1000 and 2100
--country — text, with a default value of 'Unknown'

CREATE TABLE author (id SERIAL PRIMARY KEY, name text,birth_year integer CHECK( birth_year BETWEEN 1000 AND 2100),country text DEFAULT 'UNKNOWN');
INSERT INTO author (name, birth_year, country) VALUES
('Հովհաննես Թումանյան', 1869, 'Armenia'),
('Եղիշե Չարենց', 1897, 'Armenia'),
('Ավետիք Իսահակյան', 1875, 'Armenia'),
('Պարույր Սևակ', 1924, 'Armenia'),
('Վիլյամ Սարոյան', 1908, 'USA'),
('William Shakespeare', 1564, 'UK'),
('Fyodor Dostoevsky', 1821, 'Russia'),
('Leo Tolstoy', 1828, 'Russia'),
('Albert Camus', 1913, 'France');
SELECT * FROM author;

--Կտպի միայն այն անձանց որոնց country Armenia է
SELECT * FROM author WHERE country = 'Armenia';

--ես սրաանով տալիս եմ ժամնակավոր փոփոխական որով ես կարող եմ մաինգամից տպել արդեն իսկ Sort֊աորված ձևաչափով 
SELECT * FROM (SELECT * FROM author ORDER BY ID DESC LIMIT 3) AS s ORDER BY id ASC;

--Ջնջում ենք country col
ALTER TABLE author DROP COLUMN country;
SELECT * FROM author;

--Սրանով մենք նոր col ենք ավելացնում country անունով ու DEFAULT ՏԱԼԻՍ Armenia
ALTER TABLE author ADD COLUMN country TEXT DEFAULT 'Armenia';
SELECT * FROM author;

