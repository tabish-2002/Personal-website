document.addEventListener('DOMContentLoaded', function() {
  const blogList = document.getElementById('blog-list');
  
  // Show loading state
  blogList.innerHTML = '<div class="loading">Loading blog posts...</div>';
  
  // Function to display error message
  function showError(message) {
    blogList.innerHTML = `
      <div class="error-message">
        <h3>Error Loading Blog Posts</h3>
        <p>${message}</p>
        <p>Please try refreshing the page or check back later.</p>
      </div>
    `;
    console.error('Blog loading error:', message);
  }

  // Function to format date
  function formatDate(dateString) {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.warn('Date formatting error:', e);
      return dateString; // Return raw string if date parsing fails
    }
  }

  // Fetch blog posts
  fetch('posts.json')
    .then(response => {
      // Check if request was successful
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      // Check content type to ensure we got JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we didn't get JSON!");
      }
      
      return response.json();
    })
    .then(posts => {
      // Validate posts data structure
      if (!Array.isArray(posts)) {
        throw new Error('Expected an array of posts but got something else');
      }
      
      // Clear loading state
      blogList.innerHTML = '';
      
      // Process and display each post
      posts.forEach(post => {
        // Validate post structure
        if (!post.title || !post.date || !post.content) {
          console.warn('Invalid post structure:', post);
          return; // Skip this malformed post
        }
        
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
          <header>
            <h2>${post.title}</h2>
            <time datetime="${post.date}">${formatDate(post.date)}</time>
          </header>
          <div class="post-content">
            ${post.content}
          </div>
        `;
        blogList.appendChild(postElement);
      });
      
      // If no posts were valid
      if (blogList.children.length === 0) {
        showError('No valid blog posts found in the data.');
      }
    })
    .catch(error => {
      showError(error.message);
      
      // Additional error logging
      if (error instanceof TypeError) {
        console.error('This is likely a network or CORS error:', error);
      } else {
        console.error('Other fetch error:', error);
      }
    });
});