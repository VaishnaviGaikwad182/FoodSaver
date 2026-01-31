document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("authSection");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* -------------------------
     BASE NAV LINKS
  ------------------------- */
  function buildBaseLinks() {
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="index.html#how">How It Works</a>
      <a href="index.html#impact">Impact</a>
    `;

    if (user && token && user.role === "provider") {
      navLinks.innerHTML += `<a href="provider.html">Provider Dashboard</a>`;
    }

    if (user && token && user.role === "collector") {
      navLinks.innerHTML += `<a href="collector.html">Collector Dashboard</a>`;
    }
  }

  /* -------------------------
     AUTH SECTION
  ------------------------- */
  function buildAuthSection() {
    authSection.innerHTML = "";

    // LOGGED IN → AVATAR
    if (user && token && user.name) {
      const firstLetter = user.name.charAt(0).toUpperCase();

      authSection.innerHTML = `
        <div class="user-wrapper">
          <div class="user-circle" id="userCircle">${firstLetter}</div>
          <div class="user-dropdown" id="userDropdown">
            <a href="profile.html">Profile</a>
            <a href="#" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;

      const userCircle = document.getElementById("userCircle");
      const userDropdown = document.getElementById("userDropdown");
      const logoutBtn = document.getElementById("logoutBtn");

      userCircle.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.style.display =
          userDropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", () => {
        userDropdown.style.display = "none";
      });

      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "login.html";
      });

    } 
    // LOGGED OUT → LOGIN + REGISTER (EVEN ON MOBILE)
    else {
      authSection.innerHTML = `
        <a href="login.html" class="login-btn">Login</a>
        <a href="register.html" class="nav-btn">Register</a>
      `;
    }
  }

  /* -------------------------
     HAMBURGER
  ------------------------- */
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  });

  /* -------------------------
     INIT
  ------------------------- */
  buildBaseLinks();
  buildAuthSection();
});
