import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks(); // Refresh list after delete
  };

  return (
    <div>
      <h2>📚 Library Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.serialNumber}</strong> - {book.name}  
            <p>{book.description}</p>
            <Link to={`/edit/${book._id}`}>Edit</Link>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
