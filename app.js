const URL = "https://jsonplaceholder.typicode.com/posts";

document.getElementById("fetch-posts").addEventListener("click", getPosts);

function getPosts() {
  console.log("Getting posts");
  fetch(URL)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const liItem = document.createElement("li");
        liItem.classList.add("post");
        liItem.id = `post-${post.id}`;
        const postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = posts.title;
        const pItem = document.createElement("p");
        pItem.classList.add("post-body");
        pItem.textContent = post.body;

        const updatePostButton = document.createElement("a");
        updatePostButton.href = `./update-post.html?id=${post.id}`;
        updatePostButton.id = "update-post-btn";
        updatePostButton.textContent = "Update";
        updatePostButton.classList.add("button", "button--success");

        const deletePostButton = document.createElement("button");
        deletePostButton.textContent = "Delete";
        deletePostButton.addEventListener("click", () => deletePost(post.id));
        deletePostButton.classList.add("button", "button--danger");

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        liItem.appendChild(updatePostButton);
        liItem.appendChild(deletePostButton);
        document.getElementById("posts-container").appendChild(liItem);
      });
    });
}

function deletePost(postId) {
  fetch(`${URL}/${postId}`, {
    method: "DELETE",
  });
  const deletedItem = document.getElementById(`post-${postId}`);
  deletedItem.classList.add("none");
  console.log(`Deleted Post ID: ${postId}`);
}
