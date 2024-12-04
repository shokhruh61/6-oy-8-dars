import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Foydalanuvchilarni olishda xato:", error);
      });
  }, []);

  function validate() {
    if (name.length < 3) {
      alert("Ism juda qisqa");
      return false;
    }
    if (email.length < 7) {
      alert("Email juda qisqa");
      return false;
    }
    return true;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  }

  return (
    <div className="container">
      <div className="cards">
        <h2>Yangi foydalanuvchi qo'shish</h2>
        <form onSubmit={handleSave}>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Foydalanuvchi nomi"
          />
          <br />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Foydalanuvchi email"
          />
          <br />
          <button type="submit">Saqlash</button>
        </form>
        <h1>Foydalanuvchilar</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// export default App;

// 2-masala

import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  function validate() {
    if (name.length < 2) {
      alert("Kitob nomi juda qisqa");
      return false;
    }
    if (author.length < 4) {
      alert("Muallif nomi juda qisqa");
      return false;
    }
    return true;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const newBook = {
      id: Date.now(),
      name: name,
      author: author,
      status: "O'qilmagan",
    };
    setBooks([...books, newBook]);
    setName("");
    setAuthor("");
  }

  function bookRead(id) {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            status: book.status === "O'qilgan" ? "O'qilmagan" : "O'qilgan",
          }
        : book
    );
    setBooks(updatedBooks);
  }

  return (
    <div>
      <div className="container">
        <div className="wrap">
          <h2>Kitob qo'shish</h2>
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kitob nomi"
            />
            <br />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Muallif nomi"
            />
            <br />
            <button type="submit">Saqlash</button>
          </form>

          <h2>Kitoblar</h2>
          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                className={
                  book.status === "Oqilgan" ? (
                    <p className="read">read</p>
                  ) : (
                    <p className="unread">unread</p>
                  )
                }
              >
                {book.name} - {book.author} ({book.status})
                <button onClick={() => bookRead(book.id)}>Oqilgan</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [weatherAll, setWeatherAll] = useState([]);
  const apiKey = "11fd3717469264084e0ba590185671a4";

  useEffect(() => {
    if (search) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
          let copeid = [...weatherAll];
          setWeatherAll([...copeid, response.data]);
        })

        .catch((error) => {
          console.error("Xato:", error);
          alert("Shahar topilmadi. Qayta urinib ko'ring.");
        });
    }
  }, [search]);

  function handleSearch(event) {
    event.preventDefault();
    if (city.length < 2) {
      alert("Shahar nomi juda qisqa yoki malumot toliq emas");
      return;
    }
    setSearch(city);
    setCity("");
  }

  return (
    <div className="container">
      <div className="cards-weather">
        <h1>Ob-havo ma'lumoti</h1>
        <form>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Shahar nomini kiriting"
          />
          <br />
          <button onClick={handleSearch}>Qidirish</button>
        </form>
      </div>

      <div className="weather-cards">
        {weatherAll.map((cityWeather, index) => (
          <div className="weather-card" key={index}>
            <h2>{cityWeather.name}</h2>
            <p>Harorat: {cityWeather.main.temp}°C</p>
            <p>Namlik: {cityWeather.main.humidity}%</p>
            <p>Shamol tezligi: {cityWeather.wind.speed}m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setFilterUser(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (name === "") {
      setFilterUser(user);
    } else {
      setFilterUser(
        user.filter((users) =>
          users.title.toLowerCase().includes(name.toLowerCase())
        )
      );
    }
  }, [name, user]);

  return (
    <div>
      <div className="container">
        <div className="workSpace">
          <h2>Ish qidiruv formasi</h2>
          <form className="work ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ish nomi....."
            />
          </form>
        </div>
        <div className="cards-title">
          {filterUser.length > 0 ? (
            filterUser.map((users, index) => (
              <div className="works-title" key={users.id}>
                <h3>Title: {users.title}</h3>
                <h5>Body: {users.body}</h5>
              </div>
            ))
          ) : (
            <p>error</p>
          )}
        </div>
      </div>
    </div>
  );
}

// export default App;

import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const api_key = "4ba1bb5e";
    function validate() {
        if (name.length < 1) {
            alert("kino nomi juda qisqa");
            return false;
        }
        return true;
    }
    const handleSearch = (e) => {
        e.preventDefault();
        const isvalid = validate();
        if (!isvalid) {
            return;
        }
        if (name.trim() === "") return;
        setLoading(true);
        axios
            .get(`http://www.omdbapi.com/?apikey=${api_key}&s=${name}`)
            .then((response) => {
                if (response.status === 200) {
                    setFilms(response.data.Search || []);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div className="app">
            <div className="container">
                <h2>Galivud Kinolarini Qidirish</h2>
                <form className="search-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Kino nomini kiriting"
                    />
                    <br />
                    <button onClick={handleSearch} className="search-button">
                        Qidirish
                    </button>//         </form>
            </div>

            <div className="container">
                {loading && <p>ozgina kutib turing...</p>}
                {films.length > 0 ? (
                    <div className="films-list">
                        {films.map((film, index) => (
                            <div key={index} className="film-card">
                                <h3>title:{film.Title}</h3>
                                <h4>year:{film.Year}</h4>
                                <img
                                    width="200px"
                                    src={film.Poster !== "N/A" ? film.Poster : "/placeholder.jpg"}
                                    alt={film.Title}
                                    className="film-poster"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p>boshqa kino qidirib koring</p>
                )}
            </div>
        </div>
    );
}

export default App;
