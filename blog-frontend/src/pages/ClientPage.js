import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientPage() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get('https://backend-dominika.koyeb.app/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="rightcontent">
            <h1>Välkomna till The Siberian Brothers</h1>
            <br />
            <br />
            <h2>Sök post</h2>
            <input
                type="text"
                id="searchBox"
                placeholder="Sök"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div id="searchResults">
                {filteredPosts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>

                        <p>{post.content}</p>

                    </div>
                ))}
                {filteredPosts.length === 0 && <p>No matching posts found.</p>}
            </div>
        </section>
    );
}

export default ClientPage;
