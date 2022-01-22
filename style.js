const marker = document.querySelector('#marker');
const header = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const headerCentral = document.querySelector('.header-wrapper .container-central-menu')
import modelsData from "./data.js";
// const model = document.querySelectorAll('#models div');
const easeInOutCubic = (t) => {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};




///////////////ELEMENTS GENERATOR///////////////

modelsData.forEach((element, index, array) => {

    let section = document.createElement('section');
    let a = document.createElement('a');

    /////////MODEL SECTIONS/////////
    section.innerHTML = `
            <picture>
                <source media="(max-width: 911px)" srcset="${modelsData[index].imageBgMobile}">
                <img src="${modelsData[index].imageBg}">
            </picture>
        `;
    section.classList.add('section-model')
    section.setAttribute("id", modelsData[index].id)
    main.appendChild(section)

    /////////CENTRAL MENU/////////

    a.innerHTML = `<span>${modelsData[index].model}</span>`
    a.setAttribute('href', `#${modelsData[index].id}`)
    headerCentral.appendChild(a)

})

const item = document.querySelectorAll('.container-central-menu a, .container-menu a');






///////////////HEADER ANIMATIONS///////////////


function indicator(e) {

    marker.style.left = e.offsetLeft - 12 + 'px';
    marker.style.width = e.offsetWidth + 'px';
    marker.style.transition = 'opacity 1s , width 0.5s';
    marker.style.opacity = '1';
    marker.style.transition = 'opacity 1s , width 0.5s, left 0.5s';


}

item.forEach(link => {
    link.addEventListener('mouseover', (e) => {

        indicator(e.target);

    })


})

header.addEventListener('mouseleave', () => {

    marker.style.transition = 'opacity 1s , width 0.5s';
    marker.style.opacity = '0';
    marker.style.transition = 'opacity 1s , width 0.5s, left 0s ';

})


///////////////SCROLL ANIMATIONS///////////////

main.addEventListener('scroll', () => {

    let model = document.querySelectorAll('.section-model')
    let modelReveal = document.querySelector('#model')
    let sectionScrollValue = model[0].getBoundingClientRect().top / window.innerHeight;
    let sectionIndex = Math.abs(sectionScrollValue.toFixed(0))
    let scrollOpacity = Math.abs(1 - ((Math.abs(sectionScrollValue.toFixed(2)) % 1) * 2));
    let modelInfo = modelsData[sectionIndex];

    for (let i = 0; i < model.length; i++) {

        if (easeInOutCubic(scrollOpacity) > 0 && sectionIndex == i) {
            modelReveal.style.opacity = easeInOutCubic(scrollOpacity)
        }
        if (easeInOutCubic(scrollOpacity) >= 0.000000 && easeInOutCubic(scrollOpacity) <= 0.01 && sectionIndex == i) {

            modelReveal.children[0].innerHTML = `                
    
            <div class="model-wrapper">
                <h2 class="model-title">${modelInfo.model}</h2>
                <h3 class="model-description">Order Online for <a href="#">Touchless Delivery</a></h3>
            </div>
            <div class="button-wrapper">
                <a href="#">CUSTOM ORDER</a>
                <a href="#">EXISTING INVENTORY</a>
             </div>`

            let iniAnimationItens = document.querySelectorAll('header, .model-title, .model-description, .button-wrapper a:nth-child(1), .button-wrapper a:nth-child(2)')


            iniAnimationItens.forEach(item => {

                item.classList.add('animation-none')
            });

        }
    }
})




///////////////SIDE MENU///////////////


// const sideMenu = document.querySelector('.sidebar')
// const sideMenuButton = document.querySelector('#side-menu-button')


// sideMenuButton.addEventListener("click", sideMenu.showModal())















/*function reveal() {
    let reveals = document.querySelectorAll('#models');
    let revealtop = reveals[0].getBoundingClientRect().top;
    let screenindex = (revealtop + 0.4444580078125) / window.innerHeight;
    let screenopacitycalc = Math.abs(screenindex.toFixed(2)) % 1;
    let screenopacity = Math.abs(1 - (screenopacitycalc.toFixed(2) * 2))

    for (let i = 0; i < model.length; i++) {

        if (easeInOutCubic(screenopacity) > 0 && i == Math.abs(Math.round(screenindex))) {

            var revealsIndex = i
            reveals[Math.abs(Math.round(screenindex))].children[0].style.display = "flex"
            reveals[Math.abs(Math.round(screenindex))].children[1].style.display = "flex"
            reveals[Math.abs(Math.round(screenindex))].children[0].style.opacity = easeInOutCubic(screenopacity);
            reveals[Math.abs(Math.round(screenindex))].children[1].style.opacity = easeInOutCubic(screenopacity);

        }
        if (revealsIndex != Math.abs(Math.round(screenindex)) && revealsIndex != Math.abs(Math.round(screenindex)) + 1) {

            for (let i = 0; i < model.length; i++) {
                model[i].style.display = "none"
            }
        }
    }
}
*/
