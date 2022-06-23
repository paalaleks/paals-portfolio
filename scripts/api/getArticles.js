import { baseUrl } from "./baseUrl.js";
import blogModal from "../blogModal.js";

const blog = document.querySelector(".blog-excerpt");

async function getArticles() {
  const res = await fetch(baseUrl + "/" + "api/articles?populate=image");
  const json = await res.json();
  const data = json.data;

  data.forEach((element) => {
    blog.innerHTML += `
      <div class="article" data-id="${element.id}">
        <div
          style="background-image: url(${element.attributes.image.data[0].attributes.url}); 
          background-position: center; background-repeat: no-repeat; width: 100%; min-height: 250px;">
        </div>
        <h2>${element.attributes.title}</h2>
        <p>
        ${element.attributes.excerpt}
        </p>
      </div>     
    `;
    blogModal(blog);
  });
}

export default getArticles;
