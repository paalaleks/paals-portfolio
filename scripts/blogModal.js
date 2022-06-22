import { baseUrl } from "./api/baseUrl.js";

const blogExcerpt = document.querySelector(".blog-excerpt");
const blogSection = document.querySelector(".blog-section");
const blogHeader = document.querySelector(".blog-header");
const intro = document.querySelector(".intro-container");

function blogModal(e) {
  const articles = e.querySelectorAll(".article");

  articles.forEach((element) => {
    element.addEventListener("click", async () => {
      blogSection.style.display = "block";
      intro.style.display = "none";
      blogHeader.style.display = "none";
      blogExcerpt.style.display = "none";

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
  blogSection.innerHTML = "";
  blogSection.innerHTML += `
  <div class="blog-container">
    <div class="topbar">
      <h3>${data.attributes.title}</h3>
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
    intro.style.display = "block";
    blogHeader.style.display = "flex";
    blogExcerpt.style.display = "grid";
    blogSection.style.display = "none";
  });
}

export default blogModal;
