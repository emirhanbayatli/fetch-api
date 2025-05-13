const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const URL = "https://jsonplaceholder.typicode.com/posts";
console.log(params, postId);

const userId = document.getElementById("userId");
const title = document.getElementById("title");
const body = document.getElementById("body");
const listItem = document.createElement("li");

fetch(`${URL}/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    userId.value = post.id;
    title.value = post.title;
    body.value = post.body;
  });

document
  .getElementById("update-post-btn")
  .addEventListener("click", function () {
    if (userId.value === "" || title.value === "" || body.value === "") {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Please fill in all fields.";
      document.getElementById("posts-container").appendChild(errorMessage);
      setTimeout(() => {
        errorMessage.remove();
      }, 3000);
      return;
    }
    fetch(`${URL}/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: postId,
        title: title.value,
        body: body.value,
        userId: userId.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((post) => {
        const liItem = document.createElement("li");
        liItem.classList.add("post");
        const postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = post.title;
        const pItem = document.createElement("p");
        pItem.classList.add("post-body");
        pItem.textContent = post.body;

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        document.getElementById("posts-container").appendChild(liItem);

        const successMessage = document.createElement("p");
        successMessage.classList.add("success-message");
        successMessage.textContent = "Completed Successfully!";
        document.getElementById("posts-container").appendChild(successMessage);
        setTimeout(() => {
          successMessage.remove();
        }, 3000);

        userId.value = "";
        title.value = "";
        body.value = "";
      });

    console.log(`Update Post ID: ${postId}`);
  });
