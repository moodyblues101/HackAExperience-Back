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
<<<<<<< HEAD:docs/database/hackAExperience_DB.sql
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
=======
	idCategories INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
>>>>>>> origin/nadia:codigo back nadia/docs/database/hackAExperience_DB.sql
    name VARCHAR(150) NOT NULL,
    description VARCHAR(400),
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE business (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE experiences (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(400),
    city VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    totalPlaces INT NOT NULL,
    availablePlaces INT NOT NULL,
    visits INT NULL DEFAULT 0,
    eventStartDate DATE NOT NULL,
    eventEndDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL,
    idCategory INT UNSIGNED NOT NULL,
    FOREIGN KEY (idCategory) 
		REFERENCES categories(id),
	idBusiness INT UNSIGNED NOT NULL,
    FOREIGN KEY (idBusiness) 
		REFERENCES business(id)
);

CREATE TABLE experienceImages (
<<<<<<< HEAD:docs/database/hackAExperience_DB.sql
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
=======
	idExperienceImages INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    principal BOOLEAN NULL DEFAULT (0),
>>>>>>> origin/nadia:codigo back nadia/docs/database/hackAExperience_DB.sql
    name VARCHAR(200) NOT NULL,
    principal BOOLEAN NULL DEFAULT ('false'),
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idExperience) 
		REFERENCES experiences(id)
		ON DELETE CASCADE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE reviews (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUser INT UNSIGNED NOT NULL,
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUser)
		REFERENCES users(id)
		ON DELETE CASCADE,
	FOREIGN KEY (idExperience)
		REFERENCES experiences(id)
		ON DELETE CASCADE,
    comment VARCHAR(300),
    rating TINYINT CHECK(rating > 0 AND rating <= 5),
    createdAt DATETIME NOT NULL
);

CREATE TABLE bookings (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUser INT UNSIGNED NOT NULL,
    idExperience INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUser)
		REFERENCES users(id)
		ON DELETE CASCADE,
    FOREIGN KEY (idExperience)
		REFERENCES experiences(id)
		ON DELETE CASCADE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL DEFAULT NULL
);