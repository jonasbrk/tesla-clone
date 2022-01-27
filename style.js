const marker = document.querySelector('#marker');
const header = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const headerCentral = document.querySelector('.header-wrapper .container-central-menu')
import { modelsData } from "./data.js";
import { sideMenuData } from "./data.js";



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

    a.innerHTML = `<span>${modelsData[index].name}</span>`
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
                <h2 class="model-title">${modelInfo.name}</h2>
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

const sideMenu = document.querySelector('.sidebar')
const sideMenuBg = document.querySelector('.menu-bg-overlay')
const sideMenuOpenButton = document.querySelector('#side-menu-button')
const sideMenuItens = sideMenuData.sort((a, b) => a.category.localeCompare(b.category))
let sideMenuBool = "false"
let sideMenuResponsiveBool = ""

const createMenuItens = (type, innerHTML, parent, atributeType, atribute) => {
    let createMenuItens = document.createElement(type);
    createMenuItens.innerHTML = innerHTML;
    if (atributeType != '') { createMenuItens.setAttribute(atributeType, atribute) }
    parent.appendChild(createMenuItens)
}

sideMenuOpenButton.addEventListener('click', () => {

    if (window.innerWidth > 1200 && sideMenuBool == 'false' && sideMenuResponsiveBool != "false") {
        sideMenu.innerHTML = `
        <div class="sidebar-header"><span class="sidebar-back-button"><img src="assets/arrow-rigth.svg">Back</span><img src="assets/close-button.svg" class="close-button"></img></div> 
     `

        createMenuItens('ul', ``, sideMenu, 'id', 'sideMenuPag1')
        let sideMenuPag1 = document.querySelector('#sideMenuPag1')

        sideMenuItens.forEach((element, index, array) => {

            if (element.screen == "pc") {

                createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag1, '')

            }
        })

        createMenuItens('li', `<a href="#" class="lang-selector">
            <div class="lang-icon"><img src="assets/world-icon.svg" alt=""></div>
            <div class="lang-info"><span class="country">United States</span>
                <span class="language">English</span>
            </div>
            </a>`, sideMenuPag1, '')

        sideMenuResponsiveBool = 'false'
    }

    if (window.innerWidth < 1200 && sideMenuBool == 'false' && sideMenuResponsiveBool != "true") {
        sideMenu.innerHTML = `
        <div class="sidebar-header"><span class="sidebar-back-button"><img src="assets/arrow-rigth.svg">Back</span><img src="assets/close-button.svg" class="close-button"></img></div>
     `

        createMenuItens('ul', ``, sideMenu, 'id', 'sideMenuPag1')
        createMenuItens('ul', ``, sideMenu, 'id', 'sideMenuPag2')
        let sideMenuPag1 = document.querySelector('#sideMenuPag1')
        let sideMenuPag2 = document.querySelector('#sideMenuPag2')
        sideMenuPag2.style.display = 'none'

        let fullSideMenuData = sideMenuItens.concat(modelsData)
        let fullSideMenuItems = fullSideMenuData.sort((a, b) => a.category.localeCompare(b.category))
        fullSideMenuItems.forEach((element, index, array) => {

            if (index <= 18) {
                createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag1, '')
            }

            if (index > 18) {
                createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag2, '')

            }
        })

        createMenuItens('li', `<a href='#' class="menu-more"> More <img src="assets/arrow-rigth.svg" alt=""></a>`, sideMenuPag1, '')

        createMenuItens('li', `<a href="#" class="lang-selector">
        <div class="lang-icon"><img src="assets/world-icon.svg" alt=""></div>
        <div class="lang-info"><span class="country">United States</span>
            <span class="language">English</span>
        </div>
        </a>`, sideMenuPag1, '')

        createMenuItens('li', `<a href="#" class="lang-selector">
        <div class="lang-icon"><img src="assets/world-icon.svg" alt=""></div>
        <div class="lang-info"><span class="country">United States</span>
            <span class="language">English</span>
        </div>
        </a>`, sideMenuPag2, '')

        sideMenuResponsiveBool = 'true'

        const MoreButton = document.querySelector('.menu-more')
        const backButton = document.querySelector('.sidebar-back-button')

        MoreButton.addEventListener('click', () => {
            sideMenuPag1.style.display = 'none'
            sideMenuPag2.style.display = 'inherit'
            backButton.style.visibility = 'inherit'
        })
        backButton.addEventListener('click', () => {
            sideMenuPag1.style.display = 'inherit'
            sideMenuPag2.style.display = 'none'
            backButton.style.visibility = 'hidden'
        })
    }

    const sideMenuCloseWays = document.querySelectorAll('.close-button, .menu-bg-overlay')
    sideMenuBool = 'true'
    sideMenu.classList.add('open-sidebar')
    sideMenuBg.classList.add('open-menu-bg-overlay')

    sideMenuCloseWays.forEach(e => {

        e.addEventListener('click', () => {

            sideMenu.classList.remove('open-sidebar')
            sideMenuBg.classList.remove('open-menu-bg-overlay')
            sideMenuBool = "false"
        })

    })

})