import { baseUrl } from "./api/baseUrl.js";

const blogExcerpt = document.querySelector(".blog-excerpt");
const blogSection = document.querySelector(".blog-section");
const pageBreak = document.querySelector(".page-break");
const intro = document.querySelector(".intro-container");

function blogModal(e) {
  const articles = e.querySelectorAll(".article");

  articles.forEach((element) => {
    element.addEventListener("click", async () => {
      blogSection.style.display = "block";
      intro.style.display = "none";
      pageBreak.style.display = "none";
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
  const getTitle = data.attributes.title;
  const addHyphons = getTitle.trim().replace(/[^a-z0-9]+/gi, "-");

  checkHyphen(addHyphons);

  function checkHyphen(addHyphons) {
    if (addHyphons.at(-1) === "-") {
      return newSlug();
    } else {
      history.pushState("", "", `/${addHyphons}`);
    }
  }

  function newSlug() {
    const noHyphenSlug = addHyphons.slice(0, addHyphons.length - 1);
    history.pushState("", "", `/${noHyphenSlug}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  blogSection.innerHTML = "";
  blogSection.innerHTML += `
  <div class="topbar">
    <h2>${data.attributes.title}</h2>
    <i class="fa-solid fa-xmark exit-article"></i>
  </div>
  <div class="blog-container section">

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
  window.addEventListener("popstate", () => {
    goBack();
  });
  exit.addEventListener("click", () => {
    history.go(-1);
    intro.style.display = "block";
    pageBreak.style.display = "flex";
    blogExcerpt.style.display = "grid";
    blogSection.style.display = "none";
  });

  function goBack() {
    history.go(-1);
    intro.style.display = "block";
    pageBreak.style.display = "flex";
    blogExcerpt.style.display = "grid";
    blogSection.style.display = "none";
  }
}

export default blogModal;
