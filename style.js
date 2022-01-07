const marker = document.querySelector('#marker');
const item = document.querySelectorAll('.container-central-menu a, .container-menu a');
const main = document.querySelector('main')

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

main.addEventListener('mouseenter', () => {

    marker.style.transition = 'opacity 1.5s , width 0.5s';
    marker.style.opacity = '0';
    marker.style.transition = 'opacity 1.5s , width 0.5s, left 0s ';

})
