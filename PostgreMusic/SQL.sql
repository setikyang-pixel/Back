CREATE TABLE artist (
    artist_id SERIAL PRIMARY KEY,
    nameArtist VARCHAR(30)   NOT NULL,
    push_albom_id INT,                    
    albomCount INT  DEFAULT 0,
    pushTime  DATE,
    Reiting NUMERIC(5,2)  NOT NULL CHECK (Reiting > 0 AND Reiting <= 10)
);
 
CREATE TABLE albom (
    AlbId SERIAL PRIMARY KEY,
    AlbomName  VARCHAR(30) NOT NULL,
    AlbomTitle TEXT,
    artist_id INT  NOT NULL REFERENCES Artist(artist_id),
    release_year INT,
    SaveAlbom BOOLEAN DEFAULT FALSE,
    PremiumAlbom BOOLEAN DEFAULT FALSE,
    ignore   BOOLEAN  DEFAULT FALSE,
    img TEXT DEFAULT 'link',
    time TIMESTAMPTZ DEFAULT NOW(),
    Reiting NUMERIC(5,2) NOT NULL CHECK (Reiting > 0 AND Reiting <= 5)
);
 
CREATE TABLE music (
    music_id SERIAL PRIMARY KEY,
    record_id INT NOT NULL DEFAULT 0,
    title TEXT NOT NULL DEFAULT 'MusicTitle',
    timeMusic INt CHECK (timeMusic > 0),
    genre TEXT,
    save BOOLEAN DEFAULT FALSE,
    album_id INT NOT NULL REFERENCES albom(AlbId),
    listen_count BIGINT DEFAULT 0,
    image TEXT DEFAULT 'link',
    created_at TIMESTAMPTZ   DEFAULT NOW()
);
 
CREATE TABLE "USER" (
    id BIGSERIAL PRIMARY KEY,
    userName VARCHAR(30)   NOT NULL,
    ListSong INT DEFAULT 0,
    gmail TEXT  UNIQUE,
    image TEXT,
    MusicListId INT,
    Premium BOOLEAN DEFAULT FALSE,
    signup_date DATE DEFAULT CURRENT_DATE
);
 
CREATE TABLE recording_music (
    record_id SERIAL PRIMARY KEY,
    user_id BIGINT  NOT NULL REFERENCES "USER"(id),
    music_id INT NOT NULL REFERENCES Music(music_id),
    time INTEGER,
    played_at TIMESTAMPTZ DEFAULT NOW()
);
 
ALTER TABLE artist ADD COLUMN biography TEXT;
ALTER TABLE artist RENAME COLUMN biography TO bio;
ALTER TABLE artist DROP COLUMN bio;

INSERT INTO artist (nameArtist, albomCount, pushTime, Reiting) VALUES
    ('System of a Down',  4, '2005-05-17', 9.5), 
    ('Daft Punk', 3, '2013-05-20', 9.2), 
    ('Adele', 3, '2021-11-19', 9.0),
    ('BTS',5, '2022-06-10', 8.8),
    ('Stromae',3, '2022-03-04', 9.1), 
    ('Cem Adrian',2, '2019-09-15', 8.5);
 
INSERT INTO albom (AlbomName, AlbomTitle, artist_id, release_year, Reiting) VALUES
    ('Toxicity','Toxicity Album', 1, 2001, 4.9),
    ('Mezmerize','Mezmerize Album', 1, 2005, 4.8),
    ('Random Access Memories', 'RAM',2, 2013, 5.0),
    ('Discovery','Discovery Album', 2, 2001, 4.9),
    ('21','Twenty One', 3, 2011, 4.8),
    ('30','Thirty', 3, 2021, 4.7),
    ('Map of the Soul','MOTS: 7',4, 2020, 4.6),
    ('Racine Carrée','Square Root',5, 2013, 4.8),
    ('Multitude','Multitude Album',5, 2022, 4.5);
 
INSERT INTO music (title, timeMusic, genre, album_id, listen_count) VALUES
    ('Toxicity',230, 'Metal',  1, 15000),
    ('Chop Suey',210, 'Metal',  1, 18000),
    ('Aerials', 257, 'Metal',  1, 12000),
    ('Prison Song',186, 'Metal',  1,  9000),
    ('B.Y.O.B.', 214, 'Metal',  2, 20000),
    ('Question!', 227, 'Metal',  2, 11000),
    ('Get Lucky', 369, 'Electronic',  3, 50000),
    ('Instant Crush',337, 'Electronic',  3, 30000),
    ('Lose Yourself to Dance', 354, 'Electronic',3, 25000),
    ('One More Time',       320, 'Electronic',  4, 55000),
    ('Harder Better Faster', 224, 'Electronic', 4, 40000),
    ('Rolling in the Deep', 228, 'Pop',5, 70000),
    ('Someone Like You',    285, 'Pop',5, 65000),
    ('Set Fire to the Rain',242, 'Pop',5, 48000),
    ('Easy On Me',225, 'Pop',6, 60000),
    ('Oh My God', 213, 'Pop',6, 35000),
    ('Black Swan',230, 'K-Pop',7, 80000),
    ('ON',242, 'K-Pop',7, 90000),
    ('Papaoutai',253, 'Electronic',8, 45000),
    ('Formidable',237, 'Pop', 8, 38000),
    ('L amour toujours',202, 'Electronic', 9, 22000),
    ('Santé',193, 'Pop',9, 19000);
 
INSERT INTO "USER" (userName, ListSong, gmail, Premium, signup_date) VALUES
    ('ArmenH',    0, 'armen@mail.com',   TRUE,  '2023-01-15'),
    ('MarineG',   0, 'marine@mail.com',  FALSE, '2023-06-01'),
    ('DavidK',    0, 'david@mail.com',   TRUE,  '2024-02-20'),
    ('SofiaN',    0, 'sofia@mail.com',   FALSE, '2024-08-10');
 

INSERT INTO recording_music (user_id, music_id, time, played_at) VALUES
    (1, 1,  230, NOW() - INTERVAL '1 day'),
    (1, 2,  210, NOW() - INTERVAL '2 days'),
    (1, 3,  257, NOW() - INTERVAL '3 days'),
    (1, 4,  186, NOW() - INTERVAL '4 days'),
    (1, 5,  214, NOW() - INTERVAL '5 days'),
    (1, 6,  227, NOW() - INTERVAL '6 days'),
    (1, 1,  230, NOW() - INTERVAL '10 days'),
    (1, 2,  210, NOW() - INTERVAL '20 days'),
    (2, 12, 228, NOW() - INTERVAL '1 day'),
    (2, 13, 285, NOW() - INTERVAL '2 days'),
    (2, 14, 242, NOW() - INTERVAL '3 days'),
    (2, 7,  369, NOW() - INTERVAL '4 days'),
    (2, 8,  337, NOW() - INTERVAL '5 days'),
    (2, 15, 225, NOW() - INTERVAL '8 days'),
    (2, 16, 213, NOW() - INTERVAL '15 days'),
    (2, 19, 253, NOW() - INTERVAL '30 days'),
    (2, 20, 237, NOW() - INTERVAL '45 days'),
    (2, 10, 320, NOW() - INTERVAL '60 days'),
    (3, 17, 230, NOW() - INTERVAL '1 day'),
    (3, 18, 242, NOW() - INTERVAL '2 days'),
    (3, 7,  369, NOW() - INTERVAL '3 days'),
    (3, 9,  354, NOW() - INTERVAL '4 days'),
    (3, 10, 320, NOW() - INTERVAL '5 days'),
    (3, 11, 224, NOW() - INTERVAL '6 days'),
    (3, 17, 230, NOW() - INTERVAL '10 days'),
    (3, 18, 242, NOW() - INTERVAL '20 days'),
    (4, 12, 228, NOW() - INTERVAL '1 day'),
    (4, 13, 285, NOW() - INTERVAL '2 days'),
    (4, 15, 225, NOW() - INTERVAL '3 days'),
    (4, 20, 237, NOW() - INTERVAL '5 days'),
    (4, 22, 193, NOW() - INTERVAL '7 days'),
    (4, 1,  230, NOW() - INTERVAL '14 days'),
    (4, 19, 253, NOW() - INTERVAL '21 days');
 
SELECT nameArtist FROM artist ORDER BY nameArtist ASC;
 
SELECT title, timeMusic
FROM music
WHERE timeMusic > 240
ORDER BY timeMusic DESC;
 
SELECT albomName, release_year
FROM albom
WHERE release_year BETWEEN 2010 AND 2020;
 
SELECT title FROM music WHERE title ILIKE '%the%';
 
SELECT title, created_at
FROM music
ORDER BY created_at DESC
LIMIT 5;
 
SELECT DISTINCT genre FROM music ORDER BY genre;
 
SELECT *
FROM recording_music
WHERE played_at > NOW() - INTERVAL '1 days';
 
SELECT COUNT(*) AS total_songs FROM music;
 
SELECT
    ROUND(AVG(timeMusic))             AS avg_seconds,
    ROUND(AVG(timeMusic) / 60, 2)   AS avg_minutes
FROM music;
 
SELECT
    MIN(timeMusic) AS shortest_sec,
    MAX(timeMusic) AS longest_sec
FROM music;
 
SELECT album_id, COUNT(*) AS song_count
FROM music
GROUP BY album_id
ORDER BY album_id;
 
SELECT genre, COUNT(*) AS song_count
FROM music
GROUP BY genre
ORDER BY song_count DESC;
 
SELECT genre, ROUND(AVG(timeMusic), 1) AS avg_seconds
FROM music
GROUP BY genre
ORDER BY avg_seconds DESC;
 
SELECT genre, COUNT(*) AS song_count
FROM music
GROUP BY genre
HAVING COUNT(*) > 3;

SELECT
    (release_year / 10) * 10 AS decade,
    COUNT(*) AS albom_count
FROM albom
WHERE release_year IS NOT NULL
GROUP BY decade
ORDER BY decade;
 
SELECT user_id, COUNT(*) AS listen_count
FROM recording_music
GROUP BY user_id
ORDER BY user_id;
 
SELECT music_id, COUNT(*) AS play_count
FROM recording_music
GROUP BY music_id
ORDER BY play_count DESC
LIMIT 1;
 
SELECT m.title AS song_title, a.AlbomName AS album_name
FROM music m
JOIN albom a ON m.album_id = a.AlbId
ORDER BY a.AlbomName, m.title;
 
SELECT
    m.title          AS song_title,
    al.AlbomName     AS album_name,
    ar.nameArtist    AS artist_name
FROM music m
JOIN albom  al ON m.album_id = al.AlbId
JOIN artist ar ON al.artist_id = ar.artist_id
ORDER BY ar.nameArtist, al.AlbomName, m.title;
 
SELECT
    ar.nameArtist,
    COUNT(al.AlbId) AS album_count
FROM artist ar
LEFT JOIN albom al ON ar.artist_id = al.artist_id
GROUP BY ar.artist_id, ar.nameArtist
ORDER BY album_count DESC;
 
SELECT ar.nameArtist
FROM artist ar
LEFT JOIN albom al ON ar.artist_id = al.artist_id
WHERE al.AlbId IS NULL;
 
SELECT
    ar.nameArtist,
    COUNT(m.music_id) AS total_songs
FROM artist ar
LEFT JOIN albom  al ON ar.artist_id = al.artist_id
LEFT JOIN music  m  ON al.AlbId     = m.album_id
GROUP BY ar.artist_id, ar.nameArtist
ORDER BY total_songs DESC;
 
SELECT
    ar.nameArtist,
    ROUND(SUM(m.timeMusic) / 60.0, 2) AS total_minutes
FROM artist ar
JOIN albom al ON ar.artist_id = al.artist_id
JOIN music m  ON al.AlbId     = m.album_id
GROUP BY ar.artist_id, ar.nameArtist
ORDER BY total_minutes DESC;
 
SELECT
    u.userName,
    COUNT(r.record_id) AS songs_listened
FROM "USER" u
LEFT JOIN recording_music r ON u.id = r.user_id
GROUP BY u.id, u.userName
ORDER BY songs_listened DESC;
 
SELECT
    m.genre,
    COUNT(*) AS listen_count
FROM recording_music r
JOIN music m ON r.music_id = m.music_id
WHERE r.user_id = 1
GROUP BY m.genre
ORDER BY listen_count DESC;
 
SELECT
    m.title,
    COUNT(r.record_id) AS play_count
FROM recording_music r
JOIN music m ON r.music_id = m.music_id
GROUP BY m.music_id, m.title
ORDER BY play_count DESC
LIMIT 5;
 
SELECT
    u.userName,
    ROUND(SUM(m.timeMusic) / 60.0, 2) AS total_minutes_listened
FROM "USER" u
JOIN recording_music r ON u.id       = r.user_id
JOIN music m          ON r.music_id = m.music_id
GROUP BY u.id, u.userName
ORDER BY total_minutes_listened DESC
LIMIT 3;
 
ALTER TABLE albom DROP CONSTRAINT albom_artist_id_fkey;
 
ALTER TABLE albom
    ADD CONSTRAINT album_artist_id_fkey
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
    ON DELETE CASCADE;

ALTER TABLE albom DROP CONSTRAINT album_artist_id_fkey;
 
ALTER TABLE albom
    ADD CONSTRAINT album_artist_id_fkey
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
    ON DELETE RESTRICT;