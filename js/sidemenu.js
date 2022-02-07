
import { sideMenuData } from "./data.js";
import { modelsData } from "./data.js";
import { openShopWays } from "./shop.js";
import { login } from "./account.js";

export const sideMenu = document.querySelector('.sidebar')
export const menuBgOverlay = document.querySelector('.menu-bg-overlay')
const sideMenuOpenButton = document.querySelector('#side-menu-button')
const sideMenuItens = sideMenuData.sort((a, b) => a.category.localeCompare(b.category))
export let sideMenuBool = false

const createMenuItens = (type, innerHTML, parent, atributeType, atribute) => {
    let createMenuItens = document.createElement(type);
    createMenuItens.innerHTML = innerHTML;
    if (atributeType != '') { createMenuItens.setAttribute(atributeType, atribute) }
    parent.appendChild(createMenuItens)
}

sideMenuOpenButton.addEventListener('click', () => {

    if (window.innerWidth > 1200 && sideMenuBool === false) {
        sideMenu.innerHTML = `
        <div class="sidebar-header"><span class="sidebar-back-button"><img src="assets/svg/arrow-rigth.svg">Back</span><img src="assets/svg/close-button.svg" class="close-button"></img></div> 
     `
        createMenuItens('ul', ``, sideMenu, 'id', 'sideMenuPag1')
        let sideMenuPag1 = document.querySelector('#sideMenuPag1')

        sideMenuItens.forEach((element) => {
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

    }

    if (window.innerWidth < 1200 && sideMenuBool === false) {
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
        fullSideMenuItems.forEach((element, index) => {

            if (index <= 18) {
                if (element.id != "shop") {
                    createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag1, '')
                }
                if (element.id == "shop") {
                    createMenuItens('li', `<a href='#' id="${element.id}-button"> <span>${element.name}</span></a>`, sideMenuPag1, '')

                }
            }

            if (index > 18) {
                if (element.id != "account") {
                    createMenuItens('li', `<a href='#'> <span>${element.name}</span></a>`, sideMenuPag2, '')
                }
                if (element.id == "account") {
                    createMenuItens('li', `<a href='#' id="${element.id}-button"> <span>${element.name}</span></a>`, sideMenuPag2, '')

                }
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
    sideMenuBool = true
    sideMenu.classList.add('open-sidebar')
    menuBgOverlay.classList.add('open-menu-bg-overlay')

    sideMenuCloseWays.forEach(e => {

        e.addEventListener('click', () => {

            sideMenu.classList.remove('open-sidebar')
            menuBgOverlay.classList.remove('open-menu-bg-overlay')
            sideMenuBool = false
        })

    })
    openShopWays()
    login()
})

