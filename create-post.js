document
  .getElementById("create-post-btn")
  .addEventListener("click", function createPost() {
    const userId = document.getElementById("userId");
    const title = document.getElementById("title");
    const body = document.getElementById("body");

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

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        userId: userId.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
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

        title.value = "";
        body.value = "";
        userId.value = "";
      });
  });
