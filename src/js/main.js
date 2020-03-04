//main.js file

const toggleList = (control, list) => {
    console.log('okay', control)
    let controlItem = document.querySelector(`${control}`);
    if (controlItem) {
        controlItem.addEventListener("click", e => {
            e.preventDefault();
            let listItem = document.querySelector(`${list}`);

            if (listItem) {
                listItem.classList.toggle("hidden");
            }
        });
    }
}

// for profile list
toggleList("div.header-auth-nav", ".header-auth-nav-list");
// for mobile navigation
toggleList("button.toggle-nav", ".nav-list");
// for auth nav
toggleList("svg.auth-nav", '.auth-nav-list');

toggleList("a.send-money-nav", ".send-money-nav-list");
toggleList("a.utility-pay-nav", ".utility-pay-nav-list");



// to toggle password
let passwordField = document.querySelector("div.toggle-visibility");
if (passwordField) {
    passwordField.addEventListener("click", () => {
        let password = document.querySelector(".toggle-input");
        if (password) {
            let iconField = document.querySelector("div.toggle-visibility svg");
            if (password.type) {
                iconField.classList.toggle("text-blue-dark");
                if (password.type === 'password') password.type = "text";
                else password.type = "password";
            }
        }
    });
}


// restrict input number
let numberField = document.querySelector('input[type="number"]');
if (numberField) {
    numberField.addEventListener("keypress", event => {
        var code = (event.keyCode ? event.keyCode : event.which);

        if (!(
            (code >= 48 && code <= 57) //numbers
            || (code == 46) //period
        )
            || (code == 46 && numberField.value.indexOf('.') != -1)
            // || (code == 46 && $(this).val().indexOf('.') != -1)
        )
            event.preventDefault();
    })

}

