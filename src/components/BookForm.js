const BookForm = ({ initialData = {}, onSubmit }) => {
  const [bookData, setBookData] = useState({
    serialNumber: "",
    bookName: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setBookData({
        serialNumber: initialData.serialNumber || "",
        bookName: initialData.bookName || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Serial Number:</label>
        <input
          type="text"
          name="serialNumber"
          value={bookData.serialNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          name="bookName"
          value={bookData.bookName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};
