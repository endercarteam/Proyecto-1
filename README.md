# Proyecto-1
* Proyecto de backend para la gestion de una biblioteca.
** las rutas estan basadas en un puerto y host por defecto, debe actualizar las rutas segun la configuracion que requiera
Registrar usuario:
POST: http://localhost:3000/api/auth/registro
body: {
  "nombre": "Juan Pérez",
  "correo": "juan@mail.com",
  "contraseña": "123456",
  "permisos": ["crear_libros", "modificar_libros", "inhabilitar_libros"]
}
nota: Los permisos puestos son los que puede llegar a tener un usuario, pero al registrarlo no se le puede dar a ningun usuario ningun tipo de permiso.
iniciar sesion:
POST: http://localhost:3000/api/auth/login
body: {
  
  "correo": "juan@mail.com",
  "contraseña": "123456"
  
}