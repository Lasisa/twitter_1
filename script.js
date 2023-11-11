
const postsContainer = document.querySelector("#posts")

async function fetchPosts() {
  try {
      const response = await fetch("https://dummyjson.com/posts");
     
      const data = await response.json();
      if (data.posts) {
          const posts = data.posts;
          console.log(posts);
          displayPosts(posts);
      } else {
          throw new Error("Отсутствуют посты в данных");
      }
  } catch (error) {
      console.error(error);
  }
}

async function displayPosts(posts) {
  postsContainer.innerHTML = "";

  for (const post of posts) {
      try {
          const userData = await fetch(`https://dummyjson.com/users/${post.userId}`)
              .then(response => response.json());
          console.log(userData);

          const userName = userData.username;
          const image = userData.image;
        

          const postDiv = document.createElement("div");
          postDiv.classList.add('user-post');
          postDiv.innerHTML = `
              <div class="user-img">
                   <img src="${image}" alt="${userName}'s image">
              </div>
              <div class="title">
                  <div class="name">
                      <h2>${post.title}</h2>
                      <p>${userName}</p>
                  </div>
                  <div class="body">
                       <p>${post.body}</p>
                       <div class='reactions'><img src="./img/reactions.svg" alt="">
                       <p>${post.reactions}</p></div>
                  </div>
              </div>
              <hr>
          `;
          postsContainer.appendChild(postDiv);
      } catch (error) {
          console.error(error);
      }
  }
}

document.addEventListener("DOMContentLoaded", fetchPosts);


function addComment() {
  const comment = document.querySelector("#comment");

  const commentDiv = document.createElement("div");
  commentDiv.classList.add('user-comment');
  commentDiv.innerHTML = `<h4>${comment.value}</h4>`;
  postsContainer.insertBefore(commentDiv, postsContainer.children[0]);
  comment.value = "";
}

const tweetBtn = document.querySelector("#tweetBtn");
tweetBtn.addEventListener("click", addComment);




