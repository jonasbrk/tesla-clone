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
    a.setAttribute('id', `${modelsData[index].id}-menu`)
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
const bgOverlay = document.querySelector('.menu-bg-overlay')
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

    let sideMenuCloseWays = document.querySelectorAll('.close-button, .menu-bg-overlay')
    sideMenuBool = 'true'
    sideMenu.classList.add('open-sidebar')
    bgOverlay.classList.add('open-menu-bg-overlay')

    sideMenuCloseWays.forEach(e => {

        e.addEventListener('click', () => {

            sideMenu.classList.remove('open-sidebar')
            bgOverlay.classList.remove('open-menu-bg-overlay')
            sideMenuBool = "false"
        })

    })

})




///////////////SHOP MODAL///////////////


const openShopModal = document.querySelector('#shop-button')
const modalResults = document.querySelector('.shop-results')

openShopModal.addEventListener('click', () => {

    let shopModal = document.querySelector('.shop-modal')
    let closeModalWays = document.querySelectorAll('.modal-close-btn', bgOverlay)

    shopModal.classList.add('shop-modal-open')
    bgOverlay.classList.add('open-menu-bg-overlay')


    closeModalWays.forEach((element, index) => {

        element.addEventListener("click", () => {

            shopModal.classList.remove('shop-modal-open')
            bgOverlay.classList.remove('open-menu-bg-overlay')
        })

    })
})


///////////////ITENS GENERATOR///////////////


const ModelResult = (data) => {
    modalResults.innerHTML = ``
    data.forEach((element, index, array) => {

        if (element.hasOwnProperty('price')) {

            let createItem = document.createElement("div")
            createItem.setAttribute('id', element.id)
            createItem.classList.add('shop-item')

            createItem.innerHTML = `
                    <div class="item-img"><img src="${element.imageShop}" alt=""></div>
                    <div class="item-description">

                        <span class="shop-model-title">${element.name}</span>
                        <span class="shop-model-price">$${element.price}</span>
                    </div>
                    <div class="item-buttons">
                        <input class="shop-buy-button" type="button" value="Buy now">
                        <input class="shop-add-cart-button" type="button" value="Add to Cart">
                    </div>
            
            
            `
            modalResults.appendChild(createItem)

        }

    })





    ///////////////SIDE BAR///////////////

    let itens = document.querySelectorAll('.shop-item')
    let sideBar = document.querySelector('.shop-side-section')
    let shopSideBarBool = false


    itens.forEach((e) => {


        e.addEventListener('click', (i) => {

            let t = i.target
            while (t && !t.id) { t = t.parentNode; }
            itens.forEach((e) => {
                e.classList.remove('shop-item-hover')
            })
            if (t) {

                t.classList.add('shop-item-hover')

                let itemId = t.id
                let item = modelsData.filter((e) => { return e.id == itemId })

                sideBar.innerHTML = ` <div class="shop-side-section-wrapper "> <div class="side-section-top"> 
                <div class="back-button"> <img src="assets/arrow-rigth.svg" class="" alt="">
                    <span>Back</span>
                </div>

            </div>
            <span class="shop-model-title">${item[0].name}</span>

            <div class="item-img"><img src="${item[0].imageShop}" alt=""></div>
            <div class="item-description">


                <div class="shop-model-position-1">
                    <div class="shop-model-position-1-item shop-model-range">
                        <span class="position-1-value">${item[0].autonomy}<span class="position-1-unity">mi</span></span>
                        <span class="position-1-type">Range (est.)</span>

                    </div>
                    <div class="shop-model-position-1-item shop-model-top-speed">
                        <span class="position-1-value">${item[0].topSpeed}<span class="position-1-unity">mph</span></span>
                        <span class="position-1-type">Top Speed</span>
                    </div>
                    <div class="shop-model-position-1-item shop-model-aceleration">
                        <span class="position-1-value">${item[0].topSpeed}<span class="position-1-unity">sec</span></span>
                        <span class="position-1-type">0-60 mph</span>
                    </div>


                </div>
                <div class="shop-model-position-2">
                    <p class="shop-model-description">

                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, vel veniam optio minima qui
                        expedita corrupti saepe recusandae hic nam magnam, praesentium provident inventore! Voluptas
                        aperiam minus illo numquam quos?

                    </p>

                </div>


            </div>
            <div class="item-buttons">
                <span>Order your ${item[0].name}</span>
                <input class="shop-buy-button" type="button" value="Continue to payment">
                <input class="shop-add-cart-button" type="button" value="Add to Cart">
            </div></div>
                `

                let shopWrapper = document.querySelector('.shop-side-section-wrapper')
                let backButton = document.querySelector('.side-section-top .back-button')

                sideBar.classList.remove('shop-side-section-close')
                modalResults.classList.add('shop-results-open')
                sideBar.classList.add('shop-side-section-open')

                if (shopSideBarBool === false) {
                    setTimeout(() => {
                        shopWrapper.classList.remove('shop-side-section-wrapper-close')
                        shopWrapper.classList.add('shop-side-section-wrapper-open')
                        shopSideBarBool = true
                    }, 700)
                } else {
                    shopWrapper.classList.remove('shop-side-section-wrapper-close')
                    shopWrapper.classList.add('shop-side-section-wrapper-open')
                }

                backButton.addEventListener('click', () => {

                    shopWrapper.classList.remove('shop-side-section-wrapper-open')
                    shopWrapper.classList.add('shop-side-section-wrapper-close')
                    setTimeout(() => {
                        shopWrapper.classList.remove('shop-side-section-wrapper-close')
                        sideBar.classList.remove('shop-side-section-open')
                        sideBar.classList.add('shop-side-section-close')

                        shopSideBarBool = false
                        itens.forEach((e) => {
                            e.classList.remove('shop-item-hover')
                        })
                    }, 300)
                })
            }
        })
    })
}

const selectInput = document.querySelector('#order-by')
const seachInput = document.querySelector('.search-bar')
const model = modelsData.filter((e) => e.hasOwnProperty('price'))


selectInput.addEventListener('input', (input) => {
    let t = input.target.value

    if (t == 'lower-price') {
        let modelFiltered = model.sort((a, b) => a.price.localeCompare(b.price))

        ModelResult(modelFiltered)

    } if (t == 'highest-price') {
        let modelFiltered = model.sort((a, b) => b.price.localeCompare(a.price))

        ModelResult(modelFiltered)

    } if (t == 'lower-autonomy') {
        let modelFiltered = model.sort((a, b) => a.autonomy.localeCompare(b.autonomy))

        ModelResult(modelFiltered)

    } if (t == 'highest-autonomy') {
        let modelFiltered = model.sort((a, b) => b.autonomy.localeCompare(a.autonomy))

        ModelResult(modelFiltered)

    }

})



seachInput.addEventListener('keyup', (input) => {

    let t = input.target.value

    let modelFiltered = model.filter((allmodels) => allmodels.name.toLocaleLowerCase().includes(t))

    ModelResult(modelFiltered)


})




ModelResult(modelsData)