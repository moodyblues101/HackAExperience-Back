DROP DATABASE IF EXISTS hackAExperience;
CREATE DATABASE hackAExperience;
USE hackAExperience;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    bio VARCHAR(250) NULL DEFAULT NULL,
    profilePic VARCHAR(200) NULL DEFAULT NULL,
    role ENUM ('administrador', 'usuario') NULL DEFAULT ('usuario'),
    password VARCHAR(128) NOT NULL,
    verificationCode VARCHAR(64) NULL DEFAULT NULL,
    verifiedAt DATETIME NULL DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE categories (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(400),
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE experiences (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(400),
    city VARCHAR(50) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    totalPlaces INT NOT NULL,
    availablePlaces INT NULL DEFAULT NULL,
    visits INT NULL DEFAULT NULL,
    eventStartDate DATE NOT NULL,
    eventEndDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL,
    idCategory INT UNSIGNED NOT NULL,
    FOREIGN KEY (idCategory) REFERENCES categories(id)
);

CREATE TABLE subCategories (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idExperience) 
    REFERENCES experiences(id),
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE experienceImages (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    principal BOOLEAN NULL DEFAULT ('false'),
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idExperience) 
    REFERENCES experiences(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE reviews (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUser INT UNSIGNED NOT NULL,
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUser)
    REFERENCES users(id),
	FOREIGN KEY (idExperience)
    REFERENCES experiences(id),
    comment VARCHAR(300),
    rating TINYINT CHECK(rating > 0 AND rating <= 5),
    createdAt DATETIME NOT NULL
);

CREATE TABLE bookings (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUser INT UNSIGNED NOT NULL,
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUser)
    REFERENCES users(id),
    FOREIGN KEY (idExperience)
    REFERENCES experiences(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);