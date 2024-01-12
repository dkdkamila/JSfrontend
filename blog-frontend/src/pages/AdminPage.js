import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userPosts, setUserPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('');
    /* ... API hantering... */
    useEffect(() => {
        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('https://backend-dominika.koyeb.app/api/posts');
            setUserPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const createPost = async (e) => {
        e.preventDefault(); // Förhindra standardformulärsbeteende
        console.log('Title:', title);
        console.log('Content:', content);
        try {
            await axios.post('https://backend-dominika.koyeb.app/api/posts', { title, content });
            setTitle('');
            setContent('');
            fetchAllPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const deletePost = async (postId) => {
        console.log('Deleting post with ID:', postId);
        try {
            await axios.delete(`https://backend-dominika.koyeb.app/api/posts/${postId}`);
            setStatus('Delete successful');
            fetchAllPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            setStatus('Error deleting post');
        }
    };


    const handleEdit = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setShowModal(false);
    };

    const updatePost = async (postId, updatedData) => {
        try {
            await axios.put(`https://backend-dominika.koyeb.app/api/posts/${postId}`, updatedData);
            setSelectedPost(null);
            fetchAllPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    const handleClickDelete = (postId) => {
        deletePost(postId);
    };

    return (
        <section id="rightcontent">
            <h1>Välkommen till Admin-sidan</h1>
            { /* ... Formulär för att skapa nytt inlägg och lista med inlägg ... */}
            <form onSubmit={createPost}>
                <div>
                    <label htmlFor="title">Titel:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="content">Text:</label>
                    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <div>
                    <button type="submit">Skapa inlägg</button>
                </div>
            </form>

            <h2>Alla inlägg</h2>
            {userPosts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <button onClick={() => handleClickDelete(post._id)}>Radera</button>
                    <button onClick={() => handleEdit(post)}>Redigera</button>
                </div>
            ))}

            {/* Modal för redigering */}
            {showModal && selectedPost && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Redigera inlägg</h2>
                        <input
                            type="text"
                            value={selectedPost.title}
                            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                        />
                        <textarea
                            value={selectedPost.content}
                            onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                        ></textarea>
                        <button onClick={() => updatePost(selectedPost._id, selectedPost)}>Spara ändringar</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AdminPage;
