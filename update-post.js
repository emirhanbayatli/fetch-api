const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const URL = 'https://jsonplaceholder.typicode.com/posts';
console.log(params, postId);

const userId = document.getElementById('userId');
const title = document.getElementById('title');
const body = document.getElementById('body');
const listItem = document.createElement('li');

fetch(`${URL}/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    userId.value = post.id;
    title.value = post.title;
    body.value = post.body;
  });

document
  .getElementById('update-post-btn')
  .addEventListener('click', function () {
    fetch(`${URL}/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
        title: title.value,
        body: body.value,
        userId: userId.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
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

        userId.value = '';
        title.value = '';
        body.value = '';
      });

    console.log(`Update Post ID: ${postId}`);
  });


// When a user submits the form, validate the form data
// If form data is not valid, show error messages
// If form data is valid, make an API request to update the post (PUT request)
// Shouw a success message (do NOT use alert!) on the screen after successful response is recieved in the API request

