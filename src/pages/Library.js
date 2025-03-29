import { useEffect, useState } from "react";
import { getBooks, addBook, editBook, deleteBook, logout } from "../api";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Library = ({ onLogout }) => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    serialNumber: "",
    bookName: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Trigger exit animation
      setIsExiting(true);
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 700));
      
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setIsExiting(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      // Sort books by serial number in ascending order
      const sortedBooks = response.data.sort((a, b) => 
        parseInt(a.serialNumber) - parseInt(b.serialNumber)
      );
      setBooks(sortedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For serial number, only allow numbers
    if (name === "serialNumber") {
      // Replace any non-numeric characters
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const triggerHeartAnimation = () => {
    const heartBook = document.createElement("div");
    heartBook.classList.add("heart-book");
    document.body.appendChild(heartBook);
  
    setTimeout(() => {
      heartBook.remove();
    }, 1000);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate serial number is not empty and is a number
      if (!formData.serialNumber || isNaN(parseInt(formData.serialNumber))) {
        alert("Serial number must be a valid number");
        return;
      }

      if (editingId) {
        await editBook(editingId, formData);
      } else {
        await addBook(formData);
      }
      loadBooks();
      setFormData({ serialNumber: "", bookName: "", description: "" });
      setEditingId(null);
      triggerHeartAnimation();
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };
  
  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
    triggerHeartAnimation();
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book._id);
  };

  return (
    <div className={`library-container page-container ${isExiting ? 'page-exit' : 'page-enter'}`}>
      <div className="library-header">
        <h1>Little Neha's Library</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      {/* Add/Edit Book Form */}
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="NB Serial"
          required
        />
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Book</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
      </form>

      {/* Book List */}
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book">
            <h3>NB - {book.serialNumber.padStart(2, '0')} : {book.bookName}</h3>
            <p>{book.description}</p>
            <div className="book-actions">
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;