use hackAExperience;


INSERT INTO `users` (
    id,
    name,
    email,
    role,
    password,
    verificationCode,
    verifiedAt,
    createdAt) 
VALUES (
    1,
    'Admin',
    'hackstudent101@yopmail.com',
    'administrador',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    2,
    'usuario2',
    'hackstudent102@yopmail.com',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    3,
    'usuario3',
    'hackstudent103@yopmail.com',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    4,
    'usuario4',
    'hackstudent104@yopmail.com',
    'usuario',
    '$2a$10$cRlNLuF9ySIA6rW.DpwZmunEdUTzKcoGpdIcXyAstPhkOR.LvDDDC',
    '88af7ec004103d086b596021a91c25d25c6336da5c012c078031b51acd3d2860',
    '2021-04-22 01:11:14',
    '2021-04-22 01:11:14'),
    (
    5,
    'usuario5',
    'hackstudent105@yopmail.com',
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
    (4, 'Aventura','bienestar', '2021-12-30 11:50:06'),
    (5, 'Sorpresa','bienestar', '2021-12-30 11:50:08')
;

INSERT INTO `business` (
    id,
    name,
    createdAt
)
VALUES (1, 'Empresa 1', '2022-04-04 10:00:00'),
    (2, 'Empresa 2', '2022-04-04 10:02:00'),
    (3, 'Empresa 3', '2022-04-04 10:04:00'),
    (4, 'Empresa 4', '2022-04-04 10:06:00')
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
    eventStartDate,
    eventEndDate,
    createdAt,
    idCategory,
    idBusiness) 
VALUES (1, 'exp1', 'descripicion1', 'Madrid', 25, 10, 10, 0, '2022-01-11', '2022-01-11','2021-12-30 11:52:00', 1, 1),
    (2, 'exp2', 'descripicion2', 'Santiago', 30, 10, 10, 0, '2022-02-11', '2022-02-11', '2021-12-30 11:50:02', 2, 3),  
    (3, 'exp3', 'descripicion3', 'A Coruña', 60, 10, 10, 0,'2022-03-11', '2022-03-11', '2021-12-30 11:50:04', 3, 2),
    (4, 'exp4', 'descripicion4', 'Vigo', 15, 10, 10, 0, '2022-04-11', '2022-04-11', '2021-12-30 11:50:06', 4, 4),
    (5, 'exp5', 'descripicion5', 'Barcelona', 60, 10, 10, 0, '2022-01-11', '2022-01-11', '2021-12-30 11:50:08', 5, 1),
    (6, 'exp6', 'descripicion6', 'Zaragoza', 75, 10, 10, 0, '2022-02-11', '2022-02-11', '2021-12-30 11:50:10', 1, 2),
    (7, 'exp7', 'descripicion7', 'Valencia', 35, 10, 10, 0, '2022-03-11', '2022-03-11', '2021-12-30 11:50:12', 2, 3),
    (8, 'exp8', 'descripicion8', 'Madrid', 55, 10, 10, 0, '2022-04-11', '2022-04-11', '2021-12-30 11:50:14', 3, 4),
    (9, 'exp9', 'descripicion9', 'Vigo', 50, 10, 10, 0, '2022-01-11', '2022-01-11', '2021-12-30 11:50:16', 4, 4),
    (10, 'exp10', 'descripicion10', 'Santiago', 30, 10, 10, 0, '2022-02-11', '2022-02-11', '2021-12-30 11:50:18', 5, 3),
    (11, 'exp11', 'descripicion11', 'A Coruña', 40, 10, 10, 0, '2022-03-11', '2022-03-11', '2021-12-30 11:50:20', 1, 2),
    (12, 'exp12', 'descripicion12', 'A Coruña', 40, 10, 10, 0, '2022-04-11', '2022-04-11', '2021-12-30 11:50:22', 2, 1)  
;



insert into `bookings` (
    id,
    idUser,
    idExperience,
    createdAt)
values (1, 2, 1, '2022-06-28 11:50:00'),
    (2, 3, 2, '2022-06-28 11:50:00'),
    (3, 4, 3, '2022-06-28 11:52:00'),
    (4, 5, 3, '2022-06-28 11:56:00'),
    (5, 4, 4, '2022-06-28 11:58:00'),
    (6, 3, 4, '2022-06-28 12:00:00')
;

insert into `reviews` (
    id,
    idUser,
    idExperience,
    comment,
    rating,
    createdAt
) 
values (1, 2, 1, 'me gusto', 4, '2022-03-29 11:50:00'),
    (2, 3, 2, 'pasable', 2, '2022-03-29 11:50:00'),
    (3, 4, 3, 'me encanto', 5, '2022-03-29 11:52:00'),
    (4, 5, 3, 'guay', 4, '2022-03-29 11:56:00'),
    (5, 4, 4, 'genial', 5, '2022-03-29 11:58:00'),
    (6, 3, 4, 'una mierda', 1, '2022-03-30 12:00:00');




