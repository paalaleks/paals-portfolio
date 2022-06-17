const artworkLink = document.querySelector(".artwork-link");
const intro = document.querySelector(".intro");
const xMark = document.querySelector(".fa-xmark");

export default function artwork() {
  artworkLink.addEventListener("click", () => {
    intro.classList.toggle("toggle");
  });
  xMark.addEventListener("click", () => {
    intro.classList.toggle("toggle");
  });
}
