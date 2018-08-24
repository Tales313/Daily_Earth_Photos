let burguer = document.querySelector('.fa-bars')
let header = document.querySelector('header')
let isMenuOpen = false

burguer.addEventListener('click', function() {
    if(isMenuOpen) {
        burguer.style.transform = "rotate(0deg)"
        header.style.left = "-100%"
        burguer.style.color = "#fff"
        isMenuOpen = false
    }else {
        burguer.style.transform = "rotate(-180deg)"
        header.style.left = "0%"
        burguer.style.color = "#000"
        isMenuOpen = true
    }
})