document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("openInvitation");
  const hero = document.getElementById("hero");
  const invitation = document.getElementById("invitation");

  openButton.addEventListener("click", function () {
    hero.classList.add("hidden");
    invitation.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
