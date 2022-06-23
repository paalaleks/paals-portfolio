const blogExcerpt = document.querySelector(".blog-excerpt");
const blogSection = document.querySelector(".blog-section");
const blogHeader = document.querySelector(".blog-header");
const intro = document.querySelector(".intro-container");
const contact = document.querySelector(".contact");

function contactForm() {
  const exitContact = document.querySelector(".exit-contact");

  contact.style.display = "block";
  intro.style.display = "none";
  blogHeader.style.display = "none";
  blogExcerpt.style.display = "none";
  blogSection.style.display = "none";

  exitContact.addEventListener("click", () => {
    contact.style.display = "none";
    intro.style.display = "block";
    blogHeader.style.display = "flex";
    blogExcerpt.style.display = "grid";
    blogSection.style.display = "none";
  });
}

export default contactForm;
