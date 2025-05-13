document
  .getElementById('id-btn')
  .addEventListener('click', function getPostById(postId) {
    const postValue = document.getElementById('get-post-value').value;
    console.log(postValue);
    fetch(`${URL}/${postValue}`)
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

        document.getElementById('get-post-value').value = '';
      });
      
  });
