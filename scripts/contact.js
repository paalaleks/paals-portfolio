const blogExcerpt = document.querySelector(".blog-excerpt");
const blogSection = document.querySelector(".blog-section");
const pageBreak = document.querySelector(".page-break");
const intro = document.querySelector(".intro-container");
const contact = document.querySelector(".contact");

function contactForm() {
  const exitContact = document.querySelector(".exit-contact");
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.pushState("", "", "/contact");

  contact.style.display = "block";
  intro.style.display = "none";
  pageBreak.style.display = "none";
  blogExcerpt.style.display = "none";
  blogSection.style.display = "none";

  exitContact.addEventListener("click", () => {
    history.go(-1);
    contact.style.display = "none";
    intro.style.display = "block";
    pageBreak.style.display = "flex";
    blogExcerpt.style.display = "grid";
    blogSection.style.display = "none";
  });
}

export default contactForm;
