const marker = document.querySelector('#marker');
const item = document.querySelectorAll('.container-central-menu a, .container-menu a');
const header = document.querySelector('header');
const main = document.querySelector('main');


///////////////HEADER ANIMATIONS///////////////


function indicator(e) {

    marker.style.left = e.offsetLeft - 12 + 'px';
    marker.style.width = e.offsetWidth + 'px';
    marker.style.transition = 'opacity 1.5s , width 0.5s';
    marker.style.opacity = '1';
    marker.style.transition = 'opacity 1.5s , width 0.5s, left 0.5s';


}

item.forEach(link => {
    link.addEventListener('mouseover', (e) => {

        indicator(e.target);

    })


})

header.addEventListener('mouseleave', () => {

    marker.style.transition = 'opacity 1.5s , width 0.5s';
    marker.style.opacity = '0';
    marker.style.transition = 'opacity 1.5s , width 0.5s, left 0s ';

})

///////////////SCROLL ANIMATIONS///////////////
    
// main.addEventListener('scroll', reveal);


// function reveal(){
//     let reveals = document.querySelectorAll('#models div');
    

//     for(let i = 0; i <  reveals.length; i++) {

//         let windowheigth = window.innerHeight;
//         let revealtop = reveals[i].getBoundingClientRect().top;
//         let revealpoint = 150
        
//         console.log(reveals[i].getBoundingClientRect().top)
//         if (revealtop < windowheigth - revealpoint) {

//             reveals[i].style.display = 'none'
            
//         } else {

//             reveals[i].style.display = 'block'
            
//         }


//     }

// }
