import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('An error occurred while fetching posts.');
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 1024) {
        setPostsPerPage(9);
      } else if (width > 1024 && width < 1370) {
        setPostsPerPage(12);
      }
        else if (width >= 1370 && width < 1640) {
            setPostsPerPage(15);
          }
          else if (width > 1640) {
            setPostsPerPage(100);
          }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="PostList">
        {error ? (
        <p className="PostList__error">{error}</p>
      ) : (
        <>
      <input
        className="PostList__searchInput"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />

{currentPosts.length > 0 ? (
      <ul className="PostList__postList">
        {currentPosts.map((post) => (
          <li className="PostList__postItem" key={post.id}>
            <h3 className="PostList__postTitle">{post.title}</h3>
            <p className="PostList__postBody">{post.body}</p>
          </li>
        ))}
      </ul>
)
     : (
      <p className="PostList__noPosts">No related posts found. Sorry.</p>
    )} 
      <div className="PostList__pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`PostList__pageButton ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <h4 className="PostList__Developer">Developed By: Sohail Khan</h4>
      </>
      )}
    </div>
  );
};

export default PostList;
