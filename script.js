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
const progressFill = document.querySelector(".episode-progress-fill");
function updateEpisodeProgress() { if (!progressFill) return;
const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
progressFill.style.width = ${Math.min(100, Math.max(0, progress))}%; }
window.addEventListener("scroll", updateEpisodeProgress, { passive: true });
window.addEventListener("resize", updateEpisodeProgress);
updateEpisodeProgress();