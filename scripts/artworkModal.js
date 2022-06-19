const artworkLink = document.querySelector(".artwork-link");
const intro = document.querySelector(".intro");
const exitArtwork = document.querySelector(".exit-artwork");

export default function artwork() {
  artworkLink.addEventListener("click", () => {
    intro.classList.toggle("toggleIntro");
  });
  exitArtwork.addEventListener("click", () => {
    intro.style.display = "block";
  });
}
