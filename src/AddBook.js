import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Create a new book object
    const newBook = {
      title,
      author,
      isbn,
    };

    // Send POST request to add a new book
    axios.post('http://localhost:8080/books/addBook', newBook, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token in Authorization header
      },
    })
    .then(() => {
      navigate('/books');  // Redirect to the books list after adding the book
    })
    .catch((error) => {
      console.error('Error adding book:', error);
    });
  };

  return (
    <div className="add-book-form">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input 
            type="text" 
            value={isbn} 
            onChange={(e) => setIsbn(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
