--id — auto-incrementing primary key
--full_name — text, cannot be empty
--email — text, must be unique and cannot be empty
--phone — text, can be empty
--registered_at — timestamptz, default current time

CREATE TABLE customer (id SERIAL PRIMARY KEY, full_name text NOT NULL,email TEXT UNIQUE NOT NULL, phone TEXT, registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);
INSERT INTO customer (full_name, email, phone) VALUES
('Արամ Կիրակոսյան', 'aram.kirakosyan@mail.com', '+37491010203'),
('Անի Հովհաննիսյան', 'ani.hov@gmail.com', '+37493123456'),
('Գոռ Վարդանյան', 'gor.vardanyan@yahoo.com', '+37494555666'),
('Մարիամ Գրիգորյան', 'mariam.mkr@gmail.com', '+37477889900'),
('Դավիթ Սարգսյան', 'david.sargsyan@yandex.com', '+37499112233'),
('Լիլիթ Խաչատրյան', 'lilit.kh@mail.com', '+37455443322'),
('Հայկ Հարությունյան', 'hayk.harut@gmail.com', '+37491778899'),
('Էլեն Ավետիսյան', 'elen.avet@yahoo.com', '+37493221100'),
('Տիգրան Պետրոսյան', 'tigran.petros@outlook.com', '+37494001122'),
('Արմեն Հակոբյան', 'armen.hakob@yandex.com', '+37499667788');


ALTER TABLE customer ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE customer RENAME COLUMN full_name TO name;

SELECT * FROM customer;