import React, { useState, useEffect } from "react";

const AppFour = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 border max-w-xl mx-auto mt-9">
            <h2 className="text-xl font-bold mb-4">Ish Qidiruv Formasi</h2>
            <input
                type="text"
                placeholder="Sarlavha bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul className="space-y-2">
                {filteredPosts.map((post) => (
                    <li
                        key={post.id}
                        className="p-4 border rounded shadow bg-gray-50 hover:bg-gray-100"
                    >
                        <h3 className="font-bold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppFour;
