import { login } from "./account.js";
import { modelsData } from "./data.js";
const openShopModal = document.querySelectorAll('#shop-button')
const modalResults = document.querySelector('.shop-results')
const shopBgOverlay = document.querySelector('.shop-bg-overlay')

openShopModal.forEach((e) => {
    e.addEventListener('click', () => {
        let shopModal = document.querySelector('.shop-modal')
        let closeModalWays = document.querySelectorAll('.modal-close-btn, .shop-bg-overlay')

        shopModal.classList.add('shop-modal-open')
        shopBgOverlay.classList.add('open-shop-bg-overlay')

        closeModalWays.forEach((e) => {

            e.addEventListener("click", () => {

                shopModal.classList.remove('shop-modal-open')
                shopBgOverlay.classList.remove('open-shop-bg-overlay')
            })
        })
    })
})

//ITENS GENERATOR
const ModelResult = (data) => {
    modalResults.innerHTML = ``
    data.forEach((e) => {

        if (e.hasOwnProperty('price')) {

            let createItem = document.createElement("div")
            createItem.setAttribute('id', e.id)
            createItem.classList.add('shop-item')

            createItem.innerHTML = `
                    <div class="item-img"><img src="${e.imageShop}" alt=""></div>
                    <div class="item-description">
                        <span class="shop-model-title">${e.name}</span>
                        <span class="shop-model-price">$${e.price}</span>
                    </div>
                    <div class="item-buttons">
                        <input class="shop-buy-button" type="button" value="Buy now">
                        <input class="shop-add-cart-button" type="button" value="Add to Cart">
                    </div>
            `
            modalResults.appendChild(createItem)
        }
    })

    //SIDE BAR

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
                <div class="back-button"> <img src="assets/svg/arrow-rigth.svg" class="" alt="">
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
                login()
            }
        })
    })
    login()
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