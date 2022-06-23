import { baseUrl } from "./api/baseUrl.js";

const intro = document.querySelector(".intro");
const blog = document.querySelector(".blog-excerpt");
const pageBreak = document.querySelector(".page-break");
const roses = document.querySelector(".roses");

const artworkInner = document.querySelector(".artwork-inner");
const artworkSection = document.querySelector(".artwork");

const exitArtwork = document.querySelector(".exit-artwork");

async function artworkModal() {
  artworkSection.style.display = "block";
  roses.style.display = "none";
  intro.style.display = "none";
  blog.style.display = "none";
  pageBreak.style.display = "none";

  const res = await fetch(baseUrl + "/api/artworks" + "?populate=*");
  const json = await res.json();
  const data = json.data;
  createHTML(data);
}

function createHTML(data) {
  data.forEach((element) => {
    artworkInner.innerHTML += `
    <div class="landscape-img img">
      <img
        src="${element.attributes.artwork.data[0].attributes.url}"
        alt="${element.attributes.artworkTitle}"
      />
    </div>
  `;
  });
}

exitArtwork.addEventListener("click", () => {
  artworkSection.style.display = "none";

  roses.style.display = "block";
  intro.style.display = "block";
  blog.style.display = "grid";
  pageBreak.style.display = "flex";
});

export default artworkModal;
