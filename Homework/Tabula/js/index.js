const body = document.body;
const nav = document.querySelector(".page-header nav");
const subnav = document.querySelector(".sub-nav");
const menu = document.querySelector(".page-header .menu");

const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }
 
  if (currentScroll > lastScroll && currentScroll > 200) {
    // down
    console.log('Last scroll ' + lastScroll);
    subnav.classList.add('header-visible');

    if (currentScroll > 300) {
        // down
        subnav.classList.add('header-active');
    }

  } else if (currentScroll < lastScroll && currentScroll <= 300) {
    // up
    subnav.classList.remove('header-active');
    subnav.classList.remove('header-visible');
  } 

  lastScroll = currentScroll;
});