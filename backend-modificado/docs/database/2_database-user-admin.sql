use hackAExperience;

-- Todos los usuarios tienen la misma contraseña: 1234
INSERT INTO `users` (
    id,
    name,
    email,
    bio,
    profilePic,
    role,
    password,
    verificationCode,
    verifiedAt,
    createdAt) 
VALUES (
    1,
    'Admin',
    'hackstudent101@yopmail.com',
    'añade tu bio',
    '1-avatar.png',
    'administrador',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    2,
    'usuario2',
    'hackstudent102@yopmail.com',
    'añade tu bio',
    '2-0NZFI8Tuvp.png',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    3,
    'usuario3',
    'hackstudent103@yopmail.com',
    'añade tu bio',
    '3-WOI4fByEmq.png',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    4,
    'usuario4',
    'hackstudent104@yopmail.com',
    'añade tu bio',
    '4-89C99QhOea.png',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    5,
    'usuario5',
    'hackstudent105@yopmail.com',
    'añade tu bio',
    '5-DvYwLUQkCg.png',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14')
;

INSERT INTO `categories` (
	id,
    name,
    description,
	createdAt)
VALUES (1, 'Bienestar', 'bienestar', '2021-12-30 11:50:00'),
    (2, 'Gastronomía','bienestar','2021-12-30 11:50:02'),
    (3, 'Velocidad','bienestar', '2021-12-30 11:50:04'),
    (4, 'Aventura','bienestar', '2021-12-30 11:50:06')
;

INSERT INTO `business` (
    id,
    name,
    createdAt
)
VALUES (1, 'Empresa 1', '2022-04-04 10:00:00'),
    (2, 'Empresa 2', '2022-04-04 10:02:00'),
    (3, 'Empresa 3', '2022-04-04 10:04:00'),
    (4, 'Empresa 4', '2022-04-04 10:06:00'),
    (5, 'Empresa 5', '2022-04-04 10:06:00'),
    (6, 'Empresa 6', '2022-04-04 10:06:00'),
    (7, 'Empresa 7', '2022-04-04 10:06:00'),
    (8, 'Empresa 8', '2022-04-04 10:06:00'),
    (9, 'Empresa 9', '2022-04-04 10:06:00'),
    (10, 'Empresa 10', '2022-04-04 10:06:00')
;



INSERT INTO `experiences`(
    id,
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    visits,
    createdAt,
    idCategory,
    idBusiness) 
VALUES (1, 'exp1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Madrid', 25, 10, 10, 0, '2021-12-30 11:52:00', 1, 1),
    (2, 'exp2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Santiago', 30, 10, 10, 0, '2021-12-30 11:50:02', 1, 2),  
    (3, 'exp3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'A Coruña', 60, 10, 10, 0, '2021-12-30 11:50:04', 2, 3),
    (4, 'exp4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Vigo', 15, 10, 10, 0, '2021-12-30 11:50:06', 2, 4),
    (5, 'exp5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Barcelona', 60, 10, 10, 0, '2021-12-30 11:50:08', 3, 5),
    (6, 'exp6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Zaragoza', 75, 10, 10, 0, '2021-12-30 11:50:10', 3, 6),
    (7, 'exp7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Valencia', 35, 10, 10, 0, '2021-12-30 11:50:12', 4, 7),
    (8, 'exp8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Madrid', 55, 10, 10, 0, '2021-12-30 11:50:14', 4, 8),
    (9, 'exp9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Madrid', 25, 10, 10, 0, '2021-12-30 11:52:00', 1, 1),
    (10, 'exp10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Santiago', 30, 10, 10, 0, '2021-12-30 11:50:02', 1, 2),  
    (11, 'exp11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'A Coruña', 60, 10, 10, 0, '2021-12-30 11:50:04', 2, 3),
    (12, 'exp12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Vigo', 15, 10, 10, 0, '2021-12-30 11:50:06', 2, 4),
    (13, 'exp13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Barcelona', 60, 10, 10, 0, '2021-12-30 11:50:08', 3, 5),
    (14, 'exp14', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Zaragoza', 75, 10, 10, 0, '2021-12-30 11:50:10', 3, 6),
    (15, 'exp15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Valencia', 35, 10, 10, 0, '2021-12-30 11:50:12', 4, 7),
    (16, 'exp16', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus. Donec ultrices tincidunt arcu non.', 'Madrid', 55, 10, 10, 0, '2021-12-30 11:50:14', 4, 8)
    ;

insert into `datesExperiences` (id, eventStartDate, eventEndDate, idExperience, createdAt) 
    values (1,'2022-01-11 11:30:00', '2022-01-11 14:00:00', 1, '2021-12-30 11:52:00'),
    (2, '2022-02-03 17:00:00', '2022-02-03 18:45:00', 2, '2021-12-30 11:50:02'),  
    (3, '2022-03-27 14:00:00', '2022-03-27 18:30:00', 3, '2021-12-30 11:50:04'),
    (4, '2022-04-11 07:00:00', '2022-04-11 11:00:00', 4, '2021-12-30 11:50:06'),
    (5, '2022-01-15 21:00:00', '2022-01-15 23:00:00', 5, '2021-12-30 11:50:08'),
    (6, '2022-02-21 15:00:00', '2022-02-21 17:30:00', 6, '2021-12-30 11:50:10'),
    (7, '2022-03-08 12:00:00', '2022-03-08 16:00:00', 7, '2021-12-30 11:50:12'),
    (8, '2022-04-25 20:00:00', '2022-04-25 22:30:00', 8, '2021-12-30 11:50:14'),
    (9, '2022-06-11 11:30:00', '2022-06-11 14:00:00', 9, '2021-12-30 11:52:00'),
    (10, '2022-07-03 17:00:00', '2022-07-03 18:45:00', 10, '2021-12-30 11:50:02'),  
    (11, '2022-08-27 14:00:00', '2022-08-27 18:30:00', 11, '2021-12-30 11:50:04'),
    (12, '2022-06-11 07:00:00', '2022-06-11 11:00:00', 12, '2021-12-30 11:50:06'),
    (13, '2022-07-15 21:00:00', '2022-07-15 23:00:00', 13, '2021-12-30 11:50:08'),
    (14, '2022-08-21 15:00:00', '2022-08-21 17:30:00', 14, '2021-12-30 11:50:10'),
    (15, '2022-09-08 12:00:00', '2022-09-08 16:00:00', 15, '2021-12-30 11:50:12'),
    (16, '2022-07-25 20:00:00', '2022-07-25 22:30:00', 16, '2021-12-30 11:50:14'),
    (17, '2022-08-05 11:30:00', '2022-08-05 14:00:00', 1, '2021-12-30 11:52:00'),
    (18, '2022-08-06 11:30:00', '2022-08-06 14:00:00', 1, '2021-12-30 11:50:02'),  
    (19, '2022-08-07 11:30:00', '2022-08-07 14:00:00', 1, '2021-12-30 11:50:04'),
    (20, '2022-07-11 07:00:00', '2022-07-11 11:00:00', 3, '2021-12-30 11:50:06'),
    (21, '2022-07-12 07:00:00', '2022-07-12 11:00:00', 3, '2021-12-30 11:50:08'),
    (22, '2022-07-13 07:00:00', '2022-07-13 11:00:00', 3, '2021-12-30 11:50:10'),
    (23, '2022-09-08 12:00:00', '2022-09-08 16:00:00', 5, '2021-12-30 11:50:12'),
    (24, '2022-09-09 12:00:00', '2022-09-09 16:00:00', 5, '2021-12-30 11:50:14'),
    (25, '2022-09-10 12:00:00', '2022-09-10 16:00:00', 5, '2021-12-30 11:52:00'),
    (26, '2022-06-03 17:00:00', '2022-06-03 18:45:00', 7, '2021-12-30 11:50:02'),  
    (27, '2022-06-04 17:00:00', '2022-06-04 18:45:00', 7, '2021-12-30 11:50:04')
    ;


insert into `bookings` (
    id,
    idUser,
    idExperience,
    idDate,
    createdAt)
values (1, 2, 1, 1, '2022-01-10 11:50:00'),
    (2, 3, 1, 1, '2022-01-05 10:30:00'),
    (3, 4, 1, 1, '2022-01-04 22:00:00'),
    (4, 3, 2, 2, '2022-01-15 17:38:00'),
    (5, 4, 2, 2, '2022-02-02 07:00:00'),
    (6, 5, 2, 2, '2022-01-31 22:35:00'),
    (7, 4, 3, 3, '2022-02-27 10:30:00'),
    (8, 5, 3, 3, '2022-03-15 15:02:00'),
    (9, 2, 3, 3, '2022-03-01 08:00:00'),
    (10, 5, 4, 4, '2022-04-02 14:32:00'),
    (11, 2, 4, 4, '2022-01-23 16:54:00'),
    (12, 3, 4, 4, '2022-04-05 06:05:02'),
    (13, 2, 5, 5, '2021-12-23 12:05:24'),
    (14, 3, 5, 5, '2021-11-15 15:00:00'),
    (15, 4, 5, 5, '2021-12-15 17:00:00'),
    (16, 3, 6, 6, '2022-01-15 16:00:00'),
    (17, 4, 6, 6, '2021-12-08 17:00:00'),
    (18, 5, 6, 6, '2022-02-01 08:00:00'),
    (19, 4, 7, 7, '2022-02-21 05:00:00'),
    (20, 5, 7, 7, '2022-01-31 06:00:00'),
    (21, 2, 7, 7, '2022-03-02 16:00:00'),
    (22, 5, 8, 8, '2022-04-21 13:00:00'),
    (23, 2, 8, 8, '2022-04-12 19:00:00'),
    (24, 3, 8, 8, '2022-04-23 23:00:00'),
    (25, 2, 1, 17,'2022-05-02 15:00:00'),
    (26, 3, 3, 21,'2022-05-02 15:00:00'),
    (27, 4, 5, 24,'2022-05-02 15:00:00'),
    (28, 5, 7, 27,'2022-05-02 15:00:00')
;

insert into `reviews` (
    id,
    idUser,
    idExperience,
    comment,
    rating,
    createdAt
) 
values (1, 2, 1, 'Sit amet nisl purus in mollis nunc sed id semper. Convallis convallis tellus id interdum velit laoreet. ', 4, '2022-03-29 11:50:00'),
    (2, 4, 2, 'Est placerat in egestas erat imperdiet sed. Nullam eget felis eget nunc. In hac habitasse platea', 2, '2022-03-29 11:50:00'),
    (3, 2, 3, 'Nunc mi ipsum faucibus vitae. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.', 5, '2022-03-29 11:52:00'),
    (4, 5, 4, 'Diam quam nulla porttitor massa id neque aliquam.', 4, '2022-04-29 11:56:00'),
    (5, 3, 5, 'Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.', 5, '2022-01-29 11:58:00'),
    (6, 5, 6, 'Nunc mi ipsum faucibus vitae.', 1, '2022-03-30 12:00:00'),
    (7, 4, 7, 'Leo vel fringilla est ullamcorper eget. Tempor orci eu lobortis elementum nibh tellus molestie.', 3, '2022-03-21 16:02:05'),
    (8, 2, 8, 'Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.', 4, '2022-05-02 14:25:25')
    ;

insert into `experienceImages` ( id, name, principal, idExperience, createdAt )
    values (1, 'photo1_1.png', 0, 1, '2021-12-30 11:52:00'),
    (2, 'photo1_2.png', 0, 1, '2021-12-30 11:52:00'),
    (3, 'photo1_3.png', 0, 1, '2021-12-30 11:52:00'),
    (4, 'photo2_1.png', 0, 2, '2021-12-30 11:50:02'),
    (5, 'photo2_2.png', 0, 2, '2021-12-30 11:50:02'),
    (6, 'photo2_3.png', 0, 2, '2021-12-30 11:50:02'),
    (7, 'photo3_1.png', 0, 3, '2021-12-30 11:50:04'),
    (8, 'photo3_2.png', 0, 3, '2021-12-30 11:50:04'),
    (9, 'photo3_3.png', 0, 3, '2021-12-30 11:50:04'),
    (10, 'photo4_1.png', 0, 4, '2021-12-30 11:50:06'),
    (11, 'photo4_2.png', 0, 4, '2021-12-30 11:50:06'),
    (12, 'photo4_3.png', 0, 4, '2021-12-30 11:50:06'),
    (13, 'photo5_1.png', 0, 5, '2021-12-30 11:50:08'),
    (14, 'photo5_2.png', 0, 5, '2021-12-30 11:50:08'),
    (15, 'photo5_3.png', 0, 5, '2021-12-30 11:50:08'),
    (16, 'photo6_1.png', 0, 6, '2021-12-30 11:50:10'),
    (17, 'photo6_2.png', 0, 6, '2021-12-30 11:50:10'),
    (18, 'photo6_3.png', 0, 6, '2021-12-30 11:50:10'),
    (19, 'photo7_1.png', 0, 7, '2021-12-30 11:50:12'),
    (20, 'photo7_2.png', 0, 7, '2021-12-30 11:50:12'),
    (21, 'photo7_3.png', 0, 7, '2021-12-30 11:50:12'),
    (22, 'photo8_1.png', 0, 8, '2021-12-30 11:50:14'),
    (23, 'photo8_2.png', 0, 8, '2021-12-30 11:50:14'),
    (24, 'photo8_3.png', 0, 8, '2021-12-30 11:50:14'),
    (25, 'photo9_1.png', 0, 9, '2021-12-30 11:52:00'),
    (26, 'photo9_2.png', 0, 9, '2021-12-30 11:52:00'),
    (27, 'photo9_3.png', 0, 9, '2021-12-30 11:52:00'),
    (28, 'photo10_1.png', 0, 10, '2021-12-30 11:50:02'),
    (29, 'photo10_2.png', 0, 10, '2021-12-30 11:50:02'),
    (30, 'photo10_3.png', 0, 10, '2021-12-30 11:50:02'),
    (31, 'photo11_1.png', 0, 11, '2021-12-30 11:50:04'),
    (32, 'photo11_2.png', 0, 11, '2021-12-30 11:50:04'),
    (33, 'photo11_3.png', 0, 11, '2021-12-30 11:50:04'),
    (34, 'photo12_1.png', 0, 12, '2021-12-30 11:50:06'),
    (35, 'photo12_2.png', 0, 12, '2021-12-30 11:50:06'),
    (36, 'photo12_3.png', 0, 12, '2021-12-30 11:50:06'),
    (37, 'photo13_1.png', 0, 13, '2021-12-30 11:50:08'),
    (38, 'photo13_2.png', 0, 13, '2021-12-30 11:50:08'),
    (39, 'photo13_3.png', 0, 13, '2021-12-30 11:50:08'),
    (40, 'photo14_1.png', 0, 14, '2021-12-30 11:50:10'),
    (41, 'photo14_2.png', 0, 14, '2021-12-30 11:50:10'),
    (42, 'photo14_3.png', 0, 14, '2021-12-30 11:50:10'),
    (43, 'photo15_1.png', 0, 15, '2021-12-30 11:50:12'),
    (44, 'photo15_2.png', 0, 15, '2021-12-30 11:50:12'),
    (45, 'photo15_3.png', 0, 15, '2021-12-30 11:50:12'),
    (46, 'photo16_1.png', 0, 16, '2021-12-30 11:50:14'),
    (47, 'photo16_2.png', 0, 16, '2021-12-30 11:50:14'),
    (48, 'photo16_3.png', 0, 16, '2021-12-30 11:50:14')
    ;



