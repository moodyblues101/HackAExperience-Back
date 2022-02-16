# Hack A Experience

## ⚙️ Instalación y ejecución del proyecto

1. Clonar repositorio, si lo queremos modificar fork.
2. Moverse dentro de la carpeta del repositorio.
3. Ejecutar `npm install`
4. Crear el fichero `.env` con las variables propias de nuestro proyecto en local.
5. Ejecutar script nodemon `"npm run dev"`

## Endpoints API

### Endpoints EXPERIENCES - /api/v1/experiences/

- POST - /experiences - Crear una experiencia | Solo el admin
- POST - /experiences/:id/image - Sube una imagen de una experiencia | Solo el admin
- POST - /experiences/:id/images - Sube varias imagenes de una experiencia a la vez | Solo el admin
- GET - /experiences - Devuelve la información de todas las experiencias
- GET - /experiences/:id - Devuelve una experiencia
- GET - /experiences/:id/rating - Devuelve la valoración media de una experiencia
- DELETE - /experiences/:id - Elimina un experiencia | Solo el admin
- PUT - /experiences/:id - Reescribir los datos de una experiencia | Solo el admin
- PATCH - /experiences/:id - Editar algunos datos de una experiencia | Solo el admin

### Endpoints CATEGORIES - /api/v1/categories/

- GET - /categories/:id/experiences - Devuelve todas las experiencias por categoria
- POST - /categories - Crear una categoria | Solo el admin
- GET - /categories - Devuelve todas las categoriass
- GET - /categories/:id - Devuelve una categoria
- DELETE - /categories/:id - Elimina un categoria | Solo el admin
- PUT - /categories/:id - Reescribir los datos de una categoria | Solo el admin
- PATCH - /categories/:id - Editar algunos datos de una categoria | Solo el admin

### Endpoints USERS - /api/v1/users/

- POST - /users - Registrar un usuario pendiente por activar
- GET - /users/activation?code=xxxx - Activar la cuenta de un usuario recien registrado
- POST - /users/login - Login de un usuario, devuelve el accessToken
- POST - /users/:id/image - Sube una imagen de avatar | accessToken necesario
- GET - /users - Devolver información de todos los usuarios | Solo el admin
- GET - /users/:id - Devuelve el perfil del usuario logeado, accessToken necesario
- DELETE - /users/:id - Elimina un ususario | Solo el admin
- PUT - /users/:id - Reescribir los datos de perfil de un usuario | Solo el propio usuario, accessToken necesario
- PATCH - /users/:id - Editar algunos datos de perfil de un usuario | Solo el propio usuario, accessToken necesario

### Endpoints BOOKINGS - /api/v1/bookings/

- POST - /experiences/:id/bookings - Crear una reserva | Solo el admin
- GET - /bookings - Devuelve todas las reservas | Solo el admin
- GET - /bookings/:id - Devuelve una reserva | accessToken necesario o usuario administrador
- GET - /experiences/:id/bookings - Devuelve las reservas por experiencia | Solo el admin
- GET - /users/:id/bookings - Devuelve las reservas por usuario | accessToken necesario
- DELETE - /bookings/:id - Elimina un reserva | accessToken necesario o usuario administrador

### Endpoints REVIEWS - /api/v1/reviews/

- POST - /experiences/:id/reviews - Crear una review | requiere accessToken
- GET - /reviews - Devuelve todas las reviews
- GET - /reviews/:id - Devuelve una review | accessToken o usuario administrador necesario
- GET - /experiences/:id/reviews - Devuelve las reviews por experiencia | Solo el admin
- GET - /users/:id/reviews - Devuelve las reviews por usuario | accessToken necesario
- DELETE - /reviews/:id - Elimina un review | Solo el admin
