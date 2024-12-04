import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios
      .get('http://localhost:8080/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (isbn) => {
    navigate(`/update-book/${isbn}`); // Navigate to UpdateBook page with ISBN
  };

  const handleDelete = (isbn) => {
    const token = localStorage.getItem('jwt_token');
    axios
      .delete(`http://localhost:8080/books/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Book deleted successfully!');
        setBooks(books.filter((book) => book.isbn !== isbn)); // Remove book from the list
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        alert('Failed to delete book.');
      });
  };

  const handleAddBook = () => {
    navigate('/add-book'); // Navigate to the AddBook page
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="book-list">
      <h1>Books List</h1>

      {/* Add New Book Button */}
      <button onClick={handleAddBook} className="add-book-btn">Add New Book</button>

      {books.length > 0 ? (
        <div className="book-container">
          {books.map((book) => (
            <div key={book.isbn} className="book-item">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <div className="book-actions">
                <button onClick={() => handleEdit(book.isbn)}>Edit</button>
                <button onClick={() => handleDelete(book.isbn)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;
