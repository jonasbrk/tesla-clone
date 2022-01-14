const marker = document.querySelector('#marker');
const item = document.querySelectorAll('.container-central-menu a, .container-menu a');
const header = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const model = document.querySelectorAll('#models div');




const easeInOutCubic = (t) => {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};




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

main.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('#models');
    let revealtop = reveals[0].getBoundingClientRect().top;
    let screenindex = (revealtop + 0.4444580078125) / window.innerHeight;
    let screenopacitycalc = Math.abs(screenindex.toFixed(2)) % 1;
    let screenopacity = Math.abs(1 - (screenopacitycalc.toFixed(2) * 2))


    // console.log(Math.round(screenopacity))
    //console.log(Math.abs(Math.round(screenindex)))

    for (let i = 0; i < model.length; i++) {

        if (easeInOutCubic(screenopacity) > 0 && i == Math.abs(Math.round(screenindex))) {


            var revealsIndex = i
            reveals[Math.abs(Math.round(screenindex))].children[0].style.display = "flex"
            reveals[Math.abs(Math.round(screenindex))].children[1].style.display = "flex"
            reveals[Math.abs(Math.round(screenindex))].children[0].style.opacity = easeInOutCubic(screenopacity);
            reveals[Math.abs(Math.round(screenindex))].children[1].style.opacity = easeInOutCubic(screenopacity);

            // for (let i = 0; i < reveals[Math.abs(Math.round(screenindex))].children.length; i++) {
            //     reveals[Math.abs(Math.round(screenindex))].model[i].style.display = "flex"
            //     reveals[Math.abs(Math.round(screenindex))].model[i].style.opacity = easeInOutCubic(screenopacity);


            // }



        }


        else {
            if (revealsIndex != Math.abs(Math.round(screenindex)) && revealsIndex != Math.abs(Math.round(screenindex)) + 1) {

                for (let i = 0; i < model.length; i++) {
                    model[i].style.display = "none"
                }
            }

        }





    }
}
