document
  .getElementById('create-post-btn')
  .addEventListener('click', function createPost() {
    // Validate the form data
    // If form data is not valid, show error messages on the screen (do NOT use alert!)
    // If form data is valid, make an API request to create the post (POST request)
    // Once succesccful response is recieved, show a success message on the screen
    // Clear the form
    const userId = document.getElementById('userId');
    const title = document.getElementById('title');
    const body = document.getElementById('body');
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        userId: userId.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      if (!response.ok) {
        
      }
      return response.json();
    })
      .then((post) => {
        const liItem = document.createElement('li');
        liItem.classList.add('post');
        const postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.textContent = post.title;
        const pItem = document.createElement('p');
        pItem.classList.add('post-body');
        pItem.textContent = post.body;

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        document.getElementById('posts-container').appendChild(liItem);   
        
        title.value = '';
        body.value = '';
        userId.value = '';
      });
  });
         