document.getElementById("year").textContent = new Date().getFullYear();

// Only one FAQ answer stays open at a time, matching the compact reference layout.
document.querySelectorAll(".faq details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
const progressLine = document.querySelector(".progress-line > span");
function updateProgressLine() { if (!progressLine) return;
const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
progressLine.style.width = ${progress}%; }
window.addEventListener("scroll", updateProgressLine, { passive: true });
window.addEventListener("resize", updateProgressLine);
updateProgressLine();