export const login = () => {
    let accountBgOverlay = document.querySelector('.account-bg-overlay')
    let openWays = document.querySelectorAll('.shop-buy-button, .shop-add-cart-button, #account-button')
    let closeWays = document.querySelectorAll('#account-cancel, .account-bg-overlay')
    let login = document.querySelector('#account-login')
    let emailInput = document.querySelector("#email")
    let passwordInput = document.querySelector("#password")
    let account = document.querySelector('.account')
    let warningError = document.querySelector('.warning-error')
    let accountMain = document.querySelector('.account-main')
    let loggedScreen = document.querySelector('.logged-screen')
    let loggedBool = false

    openWays.forEach((e) => {

        e.addEventListener('click', () => {

            account.classList.add('account-open')
            accountBgOverlay.classList.add('open-account-bg-overlay')

            if (loggedBool === false) {
                accountMain.classList.add("account-main-open")
            }

            closeWays.forEach((e) => {



                e.addEventListener("click", (e) => {
                    let t = e.target
                    if (t.id == 'account-bg-overlay' || t.id == "account-cancel") {
                        account.classList.remove('account-open')
                        accountBgOverlay.classList.remove('open-account-bg-overlay')
                    }
                })

            })



            login.addEventListener("click", () => {

                warningError.classList.remove('warning-error-open')
                if (!passwordInput.value || !emailInput.value || emailInput.value !== 'tesla@tesla.com' || passwordInput.value !== 'iloveelonmusk') {
                    warningError.classList.add('warning-error-open')
                } else {
                    accountMain.classList.remove("account-main-open")
                    accountMain.classList.add("account-main-close")

                    setTimeout(() => {
                        accountMain.classList.remove("account-main-close")
                        loggedScreen.classList.add('logged-screen-close')
                        setTimeout(() => {
                            loggedScreen.classList.remove('logged-screen-close')
                            loggedScreen.classList.add('logged-screen-open')
                        }, 100);

                    }, 600);


                    loggedBool = true
                }
            })


        })


    })

}