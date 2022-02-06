const marker = document.querySelector('#marker');
const header = document.querySelector('header');
const main = document.querySelector('main');
const headerCentral = document.querySelector('.header-wrapper .container-central-menu')
import { modelsData } from "./data.js";
const easeInOutCubic = (t) => {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};

//ELEMENTS GENERATOR
modelsData.forEach((e) => {
    let section = document.createElement('section');
    let a = document.createElement('a');

    //MODEL SECTIONS
    section.innerHTML = `
            <picture>
                <source media="(max-width: 911px)" srcset="${e.imageBgMobile}">
                <img src="${e.imageBg}">
            </picture>
        `;
    section.classList.add('section-model')
    section.setAttribute("id", e.id)
    main.appendChild(section)

    //CENTRAL MENU
    a.innerHTML = `<span>${e.name}</span>`
    a.setAttribute('href', `#${e.id}`)
    a.setAttribute('id', `${e.id}-menu`)
    headerCentral.appendChild(a)
})

const item = document.querySelectorAll('.container-central-menu a, .container-menu a');

//HEADER ANIMATIONS
function indicator(e) {
    marker.style.left = e.offsetLeft - 12 + 'px';
    marker.style.width = e.offsetWidth + 'px';
    marker.style.transition = 'opacity 1s , width 0.5s';
    marker.style.opacity = '1';
    marker.style.transition = 'opacity 1s , width 0.5s, left 0.5s';
}

item.forEach(link => {
    link.addEventListener('mouseover', (e) => {
        let t = e.target
        while (t && !t.id) { t = t.parentNode; }
        indicator(t);
    })
})

header.addEventListener('mouseleave', () => {

    marker.style.transition = 'opacity 1s , width 0.5s';
    marker.style.opacity = '0';
    marker.style.transition = 'opacity 1s , width 0.5s, left 0s ';

})

//SCROLL ANIMATIONS
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
            if (modelInfo.hasOwnProperty('price')) {
                modelReveal.children[0].innerHTML = `                
    
            <div class="model-wrapper">
                <h2 class="model-title">${modelInfo.name}</h2>
                <h3 class="model-description">${modelInfo.subtitle}</h3>
            </div>
            <div class="button-wrapper">
                <a href="#">CUSTOM ORDER</a>
                <a href="#">EXISTING INVENTORY</a>
             </div>`
            }
            if (modelInfo.id == 'solar-panels' || modelInfo.id == 'solar-roof') {
                modelReveal.children[0].innerHTML = `                
                <div class="model-wrapper">
                <h2 class="model-title">${modelInfo.name}</h2>
                <h3 class="model-description">${modelInfo.subtitle}</h3>
            </div>
            <div class="button-wrapper">
                <a href="#">ORDER NOW</a>
                <a href="#">LEARN MORE</a>
             </div>`
            }
            if (modelInfo.id == 'accessories') {
                modelReveal.children[0].innerHTML = `                
                    <div class="model-wrapper">
                        <h2 class="model-title">${modelInfo.name}</h2>
                    </div>
                    <div class="button-wrapper">
                        <a href="#">SHOP NOW</a>
                     </div>`
            }

            let iniAnimationItens = document.querySelectorAll('header, .model-title, .model-description, .button-wrapper a:nth-child(1), .button-wrapper a:nth-child(2)')

            iniAnimationItens.forEach(item => {
                item.classList.add('animation-none')
            });
        }
    }
})