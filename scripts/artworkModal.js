const artworkLink = document.querySelector(".artwork-link");
const intro = document.querySelector(".intro");
const exitArtwork = document.querySelector(".exit-artwork");
const roses = document.querySelector(".roses");

export default function artwork() {
  artworkLink.addEventListener("click", () => {
    intro.classList.toggle("toggleIntro");
    roses.style.display = "none";
  });
  exitArtwork.addEventListener("click", () => {
    intro.style.display = "block";
    roses.style.display = "block";
  });
}
