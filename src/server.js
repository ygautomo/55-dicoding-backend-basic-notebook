// Filename: server.js
// Course: Dicoding- Back End Basics
// Description: Module 0420 Membangun Web Service menggunakan Node.js- Mempersiapkan proyek
// Description: Module 0424 Membangun Web Service menggunakan Node.js- Membuat HTTP server
// Description: Module 0425 Membangun Web Service menggunakan Node.js- Menyimpan catatan
// Description: Module 0426 Membangun Web Service menggunakan Node.js- Same-Origin Policy
// Description: Module 0427 Membangun Web Service menggunakan Node.js- Menampilkan catatan
// Description: Module 0428 Membangun Web Service menggunakan Node.js- Mengubah catatan
// Description: Module 0429 Membangun Web Service menggunakan Node.js- Menghapus catatan
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // host: 'localhost', // Restricted access from localhost only
    host: '0.0.0.0', // Publicy access from any ip
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

// Running command
// npm run start

// Endpoint on port 5000
// GET `http://localhost:5000` // Visual Studio terminal
// GET `http://{{IP_ADDRESS}}:5000`

// Test HTTP server status on port 5000- returns API status
// Web `http://{{IP_ADDRESS}}:5000`
// Postman GET `http://{{IP_ADDRESS}}:5000` // Postman 0420-server
// curl [-X GET] `http://{{IP_ADDRESS}}:5000`

// Notes: You should check Node.js version `node --version` should be > v10.0.0
// sudo npm install n -g
// sudo n stable
// node --version
