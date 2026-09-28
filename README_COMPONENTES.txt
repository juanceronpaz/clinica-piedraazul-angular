CLINICA PIEDRAAZUL - VERSION ANGULAR CON COMPONENTES

Esta version conserva el contenido, apariencia y funcionalidades de la version Angular anterior,
pero separa en componentes Angular las partes principales solicitadas por la rubrica:

- HeaderComponent -> src/app/header/
- NavbarComponent -> src/app/navbar/
- CarouselComponent -> src/app/carousel/
- DoctorsComponent -> src/app/doctors/
- FooterComponent -> src/app/footer/
- AppComponent -> coordina el contenido principal, formulario, productos y estado de la pagina.

Los modelos compartidos estan en:
- src/app/models.ts

La apariencia se mantiene en src/styles.css para que todos los componentes compartan exactamente
la misma identidad visual.

Para ejecutar:
1. Abrir una terminal en esta carpeta.
2. Ejecutar: npm install
3. Ejecutar: ng serve
4. Abrir: http://localhost:4200/

No se incluye node_modules para facilitar la entrega y evitar un archivo ZIP innecesariamente grande.
