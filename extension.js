/* Not an official extension
Forest: https://chrome.google.com/webstore/detail/forest-stay-focused-be-pr/kjacjjdnoddnpbbcjilcajfhhbdhkpgk?hl=de
You can use: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld for JS-Injection */


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Set Cookie 
function setCookie(name, value, seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// async function to hide forest content "Tree is still growing"
async function hideForest() {
    await (async function() {
        var counter = 0;
        while (!document.getElementById("forest-ext-shadow-host")) {
            await sleep(100);
            counter++;
            if (counter > 100) break;
        }
        document.getElementById("forest-ext-shadow-host").setAttribute("style", "visibility: hidden;");
    })();
}

// adds a button for exceptional timeout to forest
function addBtn(shadow, minutes) {
    var wrapper = document.createElement("div");

    wrapper.setAttribute("class", "sc-crXcEl pnnXW");

    wrapper.innerHTML = minutes + ' minute use';

    wrapper.addEventListener('click', function(event) {
        setCookie("time-" + window.location.hostname, "true", 60 * minutes);
        hideForest();
    });
    shadow.appendChild(wrapper);
}

// if there is a cookie set, then also hide 
// if we took a break for a site, we dont want to have the popup again for that site
if (getCookie("time-" + window.location.hostname)) {
    hideForest();
}

// adds buttons to forest, we need to wait a little bit that the forest div is created
setTimeout(function() {
    var shadow = document.getElementById("forest-ext-shadow-host").shadowRoot.querySelectorAll("div.sc-ftvSup.bYNZtS")[0];
    addBtn(shadow, 5);
    addBtn(shadow, 10);
    addBtn(shadow, 25);
    addBtn(shadow, 60);
}, 2000);