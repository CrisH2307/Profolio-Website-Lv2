/*===================typed====================*/
var typed = new Typed(".text", {
  strings: ["Frontend Developer", "Backend Developer", "UX Designer", "Full Stack Developer", "Web Designer", "Game Designer and Developer", "Data Scientist as Software Programming Analysts"],
  typeSpeed: 85,
  backSpeed: 85,
  backDelay: 1000,
  loop: true,
});

/*===================toggle icon navbar====================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*===================scroll sctions active link====================*/

let sections = document.querySelectorAll("section");
let navLink = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLink.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });
    }
  });
  /*===================Navbar====================*/
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*===================remove toggle icon and navbar when click navbar link(scroll)====================*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*===================scroll reveal====================*/
ScrollReveal({
  //reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .knowledges-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });
