import artworkModal from "./artworkModal.js";
import getArticles from "./api/getArticles.js";

const artworkLink = document.querySelector(".artwork-link");

artworkLink.addEventListener("click", artworkModal);

getArticles();
