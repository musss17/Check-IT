
const showMenu = (toggleId, navbarId)=>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId)
    
  
    if(toggle && navbar){
      toggle.addEventListener('click', ()=>{
        navbar.classList.toggle('expander')
  
      })
    }
  }
  showMenu('nav-toggle','navbar')

const linkColor = document.querySelectorAll('.nav__link')
function colorLink(){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

const linkCollapse = document.getElementsByClassName('collapse__link')
var i

for(i=0;i<linkCollapse.length;i++){
  linkCollapse[i].addEventListener('click', function(){
    const collapseMenu = this.nextElementSibling
    collapseMenu.classList.toggle('showCollapse')

    const rotate = collapseMenu.previousElementSibling
    rotate.classList.toggle('rotate')
  })
}

function CourseFunction() {
  document.getElementById("DropdownCourse").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtnCourse')) {
    var dropdownss = document.getElementsByClassName("dropdownCourse-content");
    var j;
    for (j = 0; j < dropdownss.length; j++) {
      var openDropdowns = dropdownss[j];
      if (openDropdowns.classList.contains('show')) {
        openDropdowns.classList.remove('show');
      }
    }
  }
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").then(registration => {
    console.log("SW Registered!");
    console.log(registration);
  }).catch(error => {
    console.log("SW Registration Failed!");
    console.log(error);
  })
}
