--id — auto-incrementing primary key
--title — text, cannot be empty
--author_id — integer, must refer to an existing author
--price — numeric with 2 decimal places, must be greater than 0
--in_stock — boolean, default true
--published_date — date
--created_at — timestamptz, default current time

CREATE TABLE book (id SERIAL PRIMARY KEY, title TEXT NOT NULL, author_id INTEGER, price NUMERIC(10,2) NOT NULL CHECK(price >= 1 ),in_stock BOOLEAN DEFAULT TRUE,published_date DATE,created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);
INSERT INTO book (title, author_id, price, in_stock, published_date) VALUES
('1984', 2, 3.00, TRUE, '1949-06-08'),
('Անասնաֆերմա', 1, 2.00, DEFAULT, '1945-08-17'),
('Նորվեգական անտառ', 3, 42.00, TRUE, '1987-09-04'),
('Կաֆկան ծովափին', 4, 50.00, TRUE, '2002-09-12'),
('Ծերունին և ծովը', 7, 260.00, TRUE, '1592-09-01'),
('Ում մահն է գուժում զանգը', 5, 65.00, FALSE, '1940-10-21'),
('Թոմ Սոյերի արկածները', 5, 7.00, TRUE, '1876-06-01');
---Երբ ես ուզում եմ պայմանիս չբավարարող արժեք ավեկացենլ այն error տալիս ինձի 
INSERT INTO book (title, author_id, price, in_stock, published_date) VALUES
('Անուշ', 1, 0, TRUE, '1902-03-15');

SELECT * FROM book;

--Թանկից դեպի էժան գրքերի դասավորոթյուն
SELECT * FROM book ORDER BY price ASC;

--Կտպի միայն այն գրքերը որնեց գինը մեծ է 20ից
SELECT * FROM book WHERE price < 20;

--կցուցադրվի միայն վերնագիրը և գների սյունակները 
SELECT title, price FROM book;

--եթե պահեստում կան կտպի եթե չկա չի տպի
SELECT * FROM book WHERE in_stock = FALSE;

--ավելացնում ենք pages սյունը 
ALTER TABLE book ADD COLUMN pages INTEGER;

SELECT * FROM book;

--փոպում ենք իմ pages type 
ALTER TABLE book ALTER COLUMN pages TYPE SMALLINT;
\d book
SELECT * FROM book;

--սահմանափակում ենք pages իրավուննքները
ALTER TABLE book ADD CONSTRAINT pages CHECK (pages > 0);
INSERT INTO book (title, author_id, price, in_stock, published_date,pages) VALUES ('ՀԱԿՈԲԸ', 1, 150.00,FALSE, '2012-02-10',5);
SELECT * FROM book;
