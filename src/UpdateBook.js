// UpdateBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBook.css';

const UpdateBook = () => {
  const { isbn } = useParams(); // Get ISBN from the URL
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch book details to pre-fill the form
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      window.location.href = '/login'; // Redirect to login if no token
      return;
    }

    axios
      .get(`http://localhost:8080/books/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [isbn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt_token');

    // Send PUT request to update the book details
    axios
      .put(
        `http://localhost:8080/books/${isbn}`,
        book,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert('Book details updated successfully!');
        navigate('/books'); // Redirect back to the book list
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        alert('Failed to update book details.');
      });
  };

  if (loading) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="update-book">
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            disabled
          />
        </label>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
