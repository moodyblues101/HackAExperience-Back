DROP DATABASE IF EXISTS hackAExperience;
CREATE DATABASE hackAExperience;
USE hackAExperience;

CREATE TABLE users (
    idUsers INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
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
	idCategories INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    mame VARCHAR(150) NOT NULL,
    description VARCHAR(400),
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE experiences (
	idExperiences INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(400),
    city VARCHAR(50) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    totalPlaces INT NOT NULL,
    availablePlaces INT,
    visits INT,
    eventStartDate DATE NOT NULL,
    eventEndDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL,
    idCategories INT UNSIGNED NOT NULL,
    FOREIGN KEY (idCategories) REFERENCES categories(idCategories)
);

CREATE TABLE subCategories (
	idSubcategories INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    idCategories INT UNSIGNED NOT NULL,
    idExperiences INT UNSIGNED NOT NULL,
    FOREIGN KEY (idCategories) 
    REFERENCES categories(idCategories),
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE experienceImages (
	idExperienceImages INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    principal BOOLEAN NULL DEFAULT ('false'),
    name VARCHAR(200) NOT NULL,
    idExperiences INT UNSIGNED NOT NULL,
    FOREIGN KEY (idExperiences) 
    REFERENCES experiences(idExperiences),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE reviews (
	idReviews INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUsers INT UNSIGNED NOT NULL,
    idExperiences INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUsers)
    REFERENCES users(idUsers),
	FOREIGN KEY (idExperiences)
    REFERENCES experiences(idExperiences),
    commentary VARCHAR(300),
    rating TINYINT CHECK(rating > 0 AND rating <= 5),
    createdAt DATETIME NOT NULL
);

CREATE TABLE bookings (
	idBookings INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUsers INT UNSIGNED NOT NULL,
    idExperiences INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUsers)
    REFERENCES users(idUsers),
    FOREIGN KEY (idExperiences)
    REFERENCES experiences(idExperiences),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);