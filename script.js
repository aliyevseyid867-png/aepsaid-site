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
