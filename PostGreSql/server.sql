--task 1
\du
--task 1.3
\c bookstore

--task 1.4
\conninfo

--task 2 
\l

--task 2.1
CREATE USER librarian WITH PASSWORD 'lib123';

--Task 2.2
CREATE USER visitor WITH PASSWORD 'vis123';

--task 2.3
\du

--CREATE ROLE ... & CREATE USER ... իրարից տարբերվում են միայն նրանով որ առաջինի հետ մենք պարզապես չենք կարող աշխատանք տանել մինչ դեռ user սահմնանոժելով ու նրան password տալով մենք կարող ենք հանգիստ աշխատել
--task 2.4
CREATE ROLE readers;

--task 2.5
GRANT CONNECT ON DATABASE bookstore TO visitor;

--task 2.6
ALTER USER librarian WITH PASSWORD 'newpass456';

--task 2.7
ALTER ROLE visitor NOLOGIN;
--\du
ALTER ROLE visitor LOGIN;
--\du

--task 7
--\du
--task 7.1
GRANT SELECT,INSERT, UPDATE, DELETE ON TABLE book TO librarian;

--task  7.2
GRANT SELECT ON TABLE book TO visitor;

--task 7.3 
-- մեզ կտա error քանի որ մենք իրեն ասել ենք որ այն  չի կարող INSERT հրաման կիրառել այս TABLE վրա
-- --INSERT INTO book (title, author_id, price, in_stock, published_date,pages) VALUES ('Mrdo', 2, 50.00,FALSE, '2015-04-1',3);

-- Task 7.4
-- Երբ visitor փորձեցի error եղավ 
-- SELECT * FROM author;

--task 7.5
GRANT readers TO visitor;

--task 7.6
REVOKE INSERT ON book FROM visitor;

--task 9.1
SELECT * FROM pg_stat_activity WHERE datname = 'bookstore';

--task 9.2 error տալիս ինձի
DROP USER visitor;

--task 9.3
REASSIGN OWNED BY visitor TO postgres;
DROP OWNED BY visitor;
DROP USER visitor;
\du

֊֊task 9.4
DROP TABLE author;
DROP TABLE book;

\l
\dt
 
--task 9.5 ԲԱՅՑ ՈՐՊԵՍ  պարտադրանք նենք պետք է նախ գտնվենք մեկ այլ DB մեջ որ նոր կարողնանաք ջնջել այս DB
DROP DATABASE bookstore;
