// Highlight Current Page link in the Navbar
document.addEventListener('DOMContentLoaded', () => {
const $navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'), 0);

if ($navLinks.length > 0) {
  $navLinks.forEach( el => {
    if(window.location.pathname == el.getAttribute("href")){
       el.className += " current";
    }
  })
}
});
// End of Highlight Current Page link in the Navbar