# Proyecto Handlebars y WebSocket
Este proyecto configura un servidor para trabajar con Handlebars como motor de plantillas y utiliza socket.io para la comunicación en tiempo real. El objetivo es crear una aplicación web que permita visualizar y actualizar productos en tiempo real mediante WebSockets.

## Tecnologías utilizadas
- Node.js: Entorno de ejecución de JavaScript en el servidor.
- Express.js: Framework web para Node.js.
- Handlebars: Motor de plantillas para la generación de vistas dinámicas.
- Socket.IO: Biblioteca que permite la comunicación bidireccional en tiempo real entre cliente y servidor.
- File System: Utilizado para almacenar y gestionar los datos de los productos en archivos JSON.

## Instalacion
1. Clona el repositorio: git clone https://github.com/CaroContrerasAR/70080-PE2.git
2. Navega al directorio del proyecto: cd 70080-PE2
3. Instala dependencias: npm install

## Uso
1. inicia el servidor: npm run dev
2. Accede a las vistas:
    . Lista de productos: http://localhost:8080/products
    . Productos en tiempo real: http://localhost:8080/realtimeproducts

## Project Tree
70080-PE2
├─ src
│  ├─ controller
│  │  ├─ cartsManager.controller.js
│  │  └─ productsManager.controller.js
│  ├─ data
│  │  ├─ carts.json
│  │  └─ products.json
│  ├─ public
│  │  ├─ css
│  │  │  └─ style.css
│  │  ├─ js
│  │  │  └─ main.js
│  ├─ routes
│  │  ├─ carts.routes.js
│  │  ├─ products.routes.js
│  │  └─ views.routes.js
│  ├─ views
│  │  ├─ layouts
│  │  │  └─ main.handlebars
│  │  ├─ home.handlebars
│  │  └─ realtimeproducts.handlebars
│  └─ app.js
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ Readme.md

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.