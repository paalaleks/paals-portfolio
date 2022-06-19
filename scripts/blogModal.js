import { baseUrl } from "./api/baseUrl.js";

const blogExcerpt = document.querySelector(".blog-excerpt");
const blogSection = document.querySelector(".blog-section");
const blogHeader = document.querySelector(".blog-header");
const intro = document.querySelector(".intro-container");

function blogModal(e) {
  const articles = e.querySelectorAll(".article");

  articles.forEach((element) => {
    element.addEventListener("click", async () => {
      intro.classList.toggle("toggleIntro");
      blogSection.style.display = "block";
      const res = await fetch(
        baseUrl +
          "/api/articles/" +
          element.attributes[1].textContent +
          "?populate=*"
      );
      const json = await res.json();
      const data = json.data;

      createHTML(data);
    });
  });
}

function createHTML(data) {
  blogHeader.classList.toggle("toggleBlog");
  blogExcerpt.classList.toggle("toggleBlog");

  blogSection.innerHTML = "";

  blogSection.innerHTML += `
  <div>
    <div class="topbar">
      <h2>${data.attributes.title}</h2>
      <i class="fa-solid fa-xmark exit-article"></i>
    </div>
    <div 
      class="blog-img"
      style="background-image: url(${data.attributes.image.data[0].attributes.url}); 
      background-position: center; background-repeat: width: 100%; min-height: 350px;">
    </div>
    <p>${data.attributes.content}</p>
  </div>
  `;
  exitArticle(blogSection);
}

function exitArticle(e) {
  const exit = e.querySelector(".exit-article");
  exit.addEventListener("click", () => {
    intro.classList.toggle("toggleIntro");
    blogHeader.classList.toggle("toggleBlog");
    blogExcerpt.classList.toggle("toggleBlog");
    blogSection.style.display = "none";
  });
}

export default blogModal;
