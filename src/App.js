import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update the import
import Login from './Login';
import BookList from './BookList';
import SignUp from './SignUp';
import AddBook from './AddBook'; // Import the AddBook component
import UpdateBook from './UpdateBook'; // Import the UpdateBook component

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/add-book" element={<AddBook />} /> {/* Add the route for AddBook */}
        <Route path="/update-book/:isbn" element={<UpdateBook />} />
      </Routes>
    </Router>
  );
};

export default App;
