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

const sideMenu = document.querySelector('.sidebar')
const sideMenuBg = document.querySelector('.menu-bg-overlay')
const sideMenuOpenButton = document.querySelector('#side-menu-button')
const sideMenuCloseWays = document.querySelectorAll('.close-button, .menu-bg-overlay')
let sideMenuBool = false

sideMenuOpenButton.addEventListener("click", () => {

    sideMenu.classList.add('open-sidebar')
    sideMenuBg.classList.add('open-menu-bg-overlay')
    sideMenuBool = true
})


sideMenuCloseWays.forEach(e => {

    e.addEventListener('click', () => {

        sideMenu.classList.remove('open-sidebar')
        sideMenuBg.classList.remove('open-menu-bg-overlay')
        sideMenuBool = false
    })


})




/////////SIDE MENU ITEMS GENERATOR/////////

if (sideMenuBool == false) {



    let sideMenuItens = sideMenuData.sort((a, b) => a.category.localeCompare(b.category))
    let sideMenuPag = document.querySelector('.sidebar-itens')

    if (window.innerWidth > 1200) {

        sideMenuItens.forEach((element, index, array) => {

            let li = document.createElement('li');


            li.innerHTML = `
            <a href='#'> <span>${sideMenuItens[index].name}</span></a>
            `;
            sideMenuPag.appendChild(li)
        })
        
        
        
        
        createLangbutton.innerHTML = `
        <a href="#" class="lang-selector">
                    <div class="lang-icon"><img src="assets/world-icon.svg" alt=""></div>
                    <div class="lang-info"><span class="country">United States</span>
                        <span class="language">English</span>
                    </div>
                </a>`;
                sideMenuPag.appendChild(createLangbutton)

    }


    let fullSideMenuData = sideMenuItens.concat(modelsData)

    let fullSideMenuItems = fullSideMenuData.sort((a, b) => a.category.localeCompare(b.category))

    let sideMenuPagItems = document.querySelectorAll('.sidebar-itens li')

    if (fullSideMenuItems.length > 20) {

        let createSideMenuPag2 = document.createElement('ul')
            createSideMenuPag2.classList.add('sidebar-itens')
            createSideMenuPag2.setAttribute('id', 'sidebar-pg-2')
            createSideMenuPag2.style.display = "none"
            sideMenu.appendChild(createSideMenuPag2)

            const SideMenuPag2 = document.querySelector('#sidebar-pg-2')

            console.log(fullSideMenuItems)
        fullSideMenuItems.forEach((element, index, array) => {
            let li = document.createElement('li');

            if (index <= 17) {
                li.innerHTML = `
        <a href='#'> <span>${fullSideMenuItems[index].name}</span></a>
        `;
                sideMenuPag.appendChild(li)

            }
        if (index > 17) {
    
    
            li.innerHTML = `
            <a href='#'> <span>${fullSideMenuItems[index].name}</span></a>
            `;
            SideMenuPag2.appendChild(li)
        }


        })
        
    
        let createMoreButton = document.createElement('li');
        let createLangbutton = document.createElement('li');
    
        createMoreButton.innerHTML = `
        <a href='#' class="menu-more"> More <img src="assets/arrow-rigth.svg" alt=""></a>
        `;

        createLangbutton.innerHTML = `
        <a href="#" class="lang-selector">
                    <div class="lang-icon"><img src="assets/world-icon.svg" alt=""></div>
                    <div class="lang-info"><span class="country">United States</span>
                        <span class="language">English</span>
                    </div>
                </a>`;
        sideMenuPag.appendChild(createMoreButton)
        sideMenuPag.appendChild(createLangbutton)

        let MoreButton = document.querySelector('.menu-more')
        let backButton = document.querySelector('.sidebar-back-button')

        MoreButton.addEventListener('click', () => {

            sideMenuPag.style.display = 'none'
            SideMenuPag2.style.display = 'initial'
            backButton.style.visibility = 'inherit'

        })

        backButton.addEventListener('click', () => {

            sideMenuPag.style.display = 'initial'
            SideMenuPag2.style.display = 'none'
            backButton.style.visibility = 'hidden'
            
        })
        


    }}






        // modelsData.forEach((element, index, array) => {
        //     let li = document.createElement('li');
        //     li.innerHTML = `
        //     <a href='#'> <span>${modelsData[index].model}</span></a>
        //     `;
        //     sideMenuPag.appendChild(li)
        // })

        // sideMenuItens.forEach((element, index, array) => {
        //     let sideMenuPagItems = document.querySelectorAll('.sidebar-itens li')
        //     let li = document.createElement('li');


        //     li.innerHTML = `
        //     <a href='#'> <span>${sideMenuItens[index].name}</span></a>
        //     `;
        //     sideMenuPag.appendChild(li)
        // })
    



 // sideMenuItens.forEach((element, index, array) => {
        //         let sideMenuPag = document.querySelector('.sidebar-itens')
        //         let sideMenuPagItems = document.querySelectorAll('.sidebar-itens li')

        //         let li = document.createElement('li');

        //         let liGenerator = (parent, data, index) => {

        //             li.innerHTML = `
        //         <a href='#'> <span>${data[index].name}</span></a>
        //         `;
        //             parent.appendChild(li)

        //         }
        //         if () {
        //             if (sideMenuPagItems.length <= 20 && element.screen == 'pc') {

        //                 liGenerator(sideMenuPag, sideMenuItens, index)

        //             }

        //         }


        // if (sideMenuPagItems.length <= 20) {


        //     liGenerator(sideMenuPag, sideMenuItens, index)

        // }








        // if (sideMenuPagItems.length <= 20) {

        //     li.innerHTML = `
        //     //     <a href='#' class="menu-more"> More <img src="assets/arrow-rigth.svg" alt=""></a>
        //     //     `;
        //     //     sideMenuItems.appendChild(li)
        // }












        // if (window.innerWidth < 1200) {

        //     modelsData.forEach((element, index, array) => {

        //         li.innerHTML = `
        //         <a href='#'> <span>${modelsData[index].name}</span></a>
        //         `;
        //         sideMenuPag.appendChild(li)

        //     })


        // if (sideMenuPagItems.length <= 20 && element.screen == 'pc') {

        //     li.innerHTML = `
        //     <a href='#'> <span>${sideMenuData[index].name}</span></a>
        //     `;
        //     sideMenuPag.appendChild(li)

        // }

        // if (sideMenuPagItems.length == 21) {

        //     li.innerHTML = `
        //     <a href='#' class="menu-more"> More <img src="assets/arrow-rigth.svg" alt=""></a>
        //     `;
        //     sideMenuItems.appendChild(li)

        //     console.log('cu')
        // }


        // }













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