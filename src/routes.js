// Filename: routes.js
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

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
