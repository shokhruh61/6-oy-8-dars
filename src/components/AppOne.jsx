import React, { useState, useEffect } from "react";

const AppOne = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const addUser = (e) => {
        e.preventDefault();
        const newUser = { id: users.length + 1, name, email };
        setUsers([...users, newUser]);
        setName("");
        setEmail("");
    };

    return (
        <div className="p-4 border max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Foydalanuvchilar Ro'yxati</h2>
            <ul className="list-disc list-inside mb-4">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} (<span className="text-gray-500">{user.email}</span>)
                    </li>
                ))}
            </ul>
            <form className="space-y-2" onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Ism"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Qo'shish
                </button>
            </form>
        </div>
    );
};

export default AppOne;
