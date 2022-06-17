import { baseUrl } from "./api/baseUrl.js";
import artwork from "./modal.js";
// import getArticles from "./api/getArticles.js";

artwork();
getArticles();

const blog = document.querySelector(".blog-section");

async function getArticles() {
  const res = await fetch(baseUrl + "/" + "api/articles?populate=image");
  const json = await res.json();
  const data = json.data;

  console.log(data);

  data.forEach((element) => {
    blog.innerHTML += `
      <a class="blog" href="">
        <div>
          <img src="${baseUrl}${element.attributes.image.data[0].attributes.url}" alt="" />    
        </div>
        <h2>${element.attributes.title}</h2>
        <p>
        ${element.attributes.excerpt}
        </p>
      </a>     
    `;
  });
}

export default getArticles;
