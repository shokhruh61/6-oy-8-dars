import React, { useState } from "react";

const AppTwo = () => {
    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");

    const addBook = () => {
        setBooks([...books, { id: Date.now(), name: bookName, author, read: false }]);
        setBookName("");
        setAuthor("");
    };

    const toggleReadStatus = (id) => {
        setBooks(
            books.map((book) =>
                book.id === id ? { ...book, read: !book.read } : book
            )
        );
    };

    const deleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div className="p-4 border max-w-xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Kitoblar boshqaruvi</h2>
            <form
                className="space-y-2 mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    addBook();
                }}
            >
                <input
                    type="text"
                    placeholder="Kitob nomi"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Muallif ismi"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Qo'shish
                </button>
            </form>
            <ul className="space-y-2">
                {books.map((book) => (
                    <li
                        key={book.id}
                        className={`p-4 rounded shadow ${book.read ? "bg-green-100" : "bg-red-100"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{book.name}</p>
                                <p className="text-sm text-gray-600">{book.author}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleReadStatus(book.id)}
                                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {book.read ? "O'qilmagan" : "O'qilgan"}
                                </button>
                                <button
                                    onClick={() => deleteBook(book.id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    O'chirish
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppTwo;
