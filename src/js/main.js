//main.js file

const toggleList = (control, list, toggle = "hidden") => {
    let controlItem = document.querySelector(`${control}`);
    if (controlItem) {
        controlItem.addEventListener("click", e => {
            e.preventDefault();
            let listItem = document.querySelector(`${list}`);

            if (listItem) {
                listItem.classList.toggle(`${toggle}`);
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
toggleList("label.automate", "span.check", "bg-blue");
toggleList("label.automate", "span.check", "transform");
toggleList("label.automate", "span.check", "translate-x-full");

const tabNavigationn = () => {
    const tabs = document.querySelector('ul.tabs');
    if (tabs) {
        tabs.addEventListener("click", e => {
            let target = e.target; // Clicked element
            // console.log(target)
            while (target && target.parentNode !== tabs) {
                target = target.parentNode; // If the clicked element isn't a direct child
                if (!target) { return; } // If element doesn't exist
            }
            if (target.tagName === 'LI') {
                let x = tabs.children;
                for (let index = 0; index < x.length; ++index) {
                    const element = x[index];
                    element === target ? element.classList.add('active') : element.classList.remove('active');
                }
                const tabList = document.querySelector('div.tabs-list');
                const incomingTab = document.querySelector(`div.tabs-list>.${target.id}`);

                if (tabList) {
                    let x = tabList.children;
                    for (let index = 0; index < x.length; ++index) {
                        const element = x[index];
                        element === incomingTab ? element.classList.remove('hidden') : element.classList.add('hidden');
                    }
                }
            }
        });
    }
}

tabNavigationn();
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
let numberField = document.querySelector('input.number');
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



var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
    }
};


function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}
