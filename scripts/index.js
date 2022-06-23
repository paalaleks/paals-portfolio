import artworkModal from "./artworkModal.js";
import getArticles from "./api/getArticles.js";
import contactForm from "./contact.js";

const artworkLink = document.querySelector(".artwork-link");
const contactLink = document.querySelector(".contact-link");
const contact = document.querySelector(".contact");

contact.style.display = "none";
artworkLink.addEventListener("click", artworkModal);
contactLink.addEventListener("click", contactForm);

getArticles();
