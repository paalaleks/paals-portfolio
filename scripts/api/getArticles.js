import { baseUrl } from "./baseUrl.js";

const blog = document.querySelector(".blog-section");

async function getArticles() {
  const res = await fetch(baseUrl + "api/articles?populate=img");
  const json = await res.json();
  const data = json.data;

  data.forEach((element) => {
    console.log(element.attributes.img.data[0].attributes.url);
    blog.innerHTML += `
      <div class="page-break"><img src="${baseUrl}${element.attributes.img.data[0].attributes.url}" alt="" /></div>
      <a class="blog" href="">
        <div>
          <img src="${baseUrl}${element.attributes.img.data[1].attributes.url}" alt="" />    
        </div>
        <h2>${element.attributes.title}</h2>
        <p>
        ${element.attributes.summary}
        </p>
      </a>     
    `;
  });
}

export default getArticles;
