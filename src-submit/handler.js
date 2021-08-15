// Filename: handler.js
// Course: Dicoding- Back End Basics
// Description: Module 0701 Penutup- Submission Bookshelf API
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = {
    // eslint-disable-next-line max-len
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  // eslint-disable-next-line max-len
  // const isSuccess = (books.filter((book) => book.id === id).length > 0) && (name !== undefined) && (readPage <= pageCount);
  const isSuccess = (name !== undefined) && (readPage <= pageCount);

  // console.log(newBook);
  // console.log(isSuccess);
  if (isSuccess) {
    books.push(newBook);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
        bookName: name,
      },
    });
    response.code(201);
    return response;
  }

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  // console.log('Bebek', name, reading, finished);

  if (name) {
    const response = h.response({
      status: 'success',
      message: 'List Buku Name',
      data: {
        // eslint-disable-next-line max-len
        books: books.filter((item) => item.name.toLowerCase().includes(name.toLowerCase())).map((item) => ({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
          // reading: item.reading,
        })),
      },
    });
    return response;
  }

  if (reading) {
    const isReading = (reading === '1');
    console.log(reading);
    const response = h.response({
      status: 'success',
      message: 'List Buku Dibaca',
      data: {
        // eslint-disable-next-line max-len
        books: books.filter((item) => item.reading === isReading).map((item) => ({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
          // reading: item.reading,
        })),
      },
    });
    return response;
  }

  if (finished) {
    const isFinished = (finished === '1');
    console.log(finished);
    const response = h.response({
      status: 'success',
      message: 'List Buku Selesai',
      data: {
        // eslint-disable-next-line max-len
        books: books.filter((item) => item.finished === isFinished).map((item) => ({
          id: item.id,
          name: item.name,
          publisher: item.publisher,
          // finished: item.finished,
        })),
      },
    });
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'List Buku',
    data: {
      books: books.map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
        // finished: item.finished,
        // reading: item.reading,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      message: 'Buku berhasil ditemukan',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
