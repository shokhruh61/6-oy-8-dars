import React, { useState } from "react";

const AppFive = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    const fetchMovies = async () => {
        const apiKey = "YOUR_API_KEY"; // O'zingizning OMDB API kalitingizni kiriting
        try {
            const response = await fetch(
                `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
            );
            const data = await response.json();
            if (data.Response === "True") {
                setMovies(data.Search);
                setError("");
            } else {
                setError("Film topilmadi!");
                setMovies([]);
            }
        } catch (err) {
            setError("Xatolik yuz berdi!");
            setMovies([]);
        }
    };

    return (
        <div className="p-4 border max-w-xl mx-auto mt-9">
            <h2 className="text-xl font-bold mb-4">Film Qidirish</h2>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Film nomini kiriting..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={fetchMovies}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Qidirish
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="p-4 border rounded shadow bg-gray-50 hover:bg-gray-100"
                    >
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h3 className="font-bold">{movie.Title}</h3>
                        <p className="text-sm text-gray-600">Yili: {movie.Year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppFive;
