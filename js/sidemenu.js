
import { sideMenuData } from "./data.js";
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
        <div class="sidebar-header"><span class="sidebar-back-button"><img src="assets/svg/arrow-rigth.svg">Back</span><img src="assets/svg/close-button.svg" class="close-button"></img></div> 
     `

        createMenuItens('ul', ``, sideMenu, 'id', 'sideMenuPag1')
        let sideMenuPag1 = document.querySelector('#sideMenuPag1')

        sideMenuItens.forEach((element, index, array) => {

            if (element.screen == "pc") {

                createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag1, '')

            }
        })

        createMenuItens('li', `<a href="#" class="lang-selector">
            <div class="lang-icon"><img src="assets/svg/world-icon.svg" alt=""></div>
            <div class="lang-info"><span class="country">United States</span>
                <span class="language">English</span>
            </div>
            </a>`, sideMenuPag1, '')

        sideMenuResponsiveBool = 'false'
    }

    if (window.innerWidth < 1200 && sideMenuBool == 'false' && sideMenuResponsiveBool != "true") {
        sideMenu.innerHTML = `
        <div class="sidebar-header"><span class="sidebar-back-button"><img src="assets/svg/arrow-rigth.svg">Back</span><img src="assets/svg/close-button.svg" class="close-button"></img></div>
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
                if (element.id != "shop") {
                    createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag1, '')
                }
                if (element.id == "shop") {
                    createMenuItens('li', `<a href='#' id="${element.id}-button"> <span>${element.name}</span></a>`, sideMenuPag1, '')

                    const openShopMenu = document.querySelectorAll('#shop-button')
                }
            }

            if (index > 18) {
                createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag2, '')

            }
        })

        createMenuItens('li', `<a href='#' class="menu-more"> More <img src="assets/svg/arrow-rigth.svg" alt=""></a>`, sideMenuPag1, '')

        createMenuItens('li', `<a href="#" class="lang-selector">
        <div class="lang-icon"><img src="assets/svg/world-icon.svg" alt=""></div>
        <div class="lang-info"><span class="country">United States</span>
            <span class="language">English</span>
        </div>
        </a>`, sideMenuPag1, '')

        createMenuItens('li', `<a href="#" class="lang-selector">
        <div class="lang-icon"><img src="assets/svg/world-icon.svg" alt=""></div>
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

