function loadHTML(id, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading file:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', 'header.html'); // Load header.html into element with id="header"
  loadHTML('footer', 'footer.html'); // Load footer.html into element with id="footer"
});