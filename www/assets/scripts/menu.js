// File responsible for generating the menu, based on the login status of the user

class Menu {
    constructor(menuContainer) {
        this.menuContainer = menuContainer;
    }

    createMenuItem(text, href, active = false) {
        const li = document.createElement("li");
        li.className = "menu-item";
        if (active) {
            li.classList.add("menu-item--active");
        }
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
        return li;
    }

    displayMenuItems(menuItems) {
        this.menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const isActive = window.location.pathname === item.href;
            const menuItem = this.createMenuItem(item.text, item.href, isActive);
            this.menuContainer.appendChild(menuItem);
        });
    }
}

async function checkUserStatus() {
    try {
        const response = await fetch('/user');
        const loggedIn = response.status === 200;

        const menuItems = [
            { text: 'Movies', href: '/' },
            ...(loggedIn
                ? [
                    { text: 'My Account', href: '/account' },
                    { text: 'Logout', href: '/logout' },
                ] : [
                    { text: 'Login', href: '/login' },
                    { text: 'Sign Up', href: '/signup' },
                ]),
        ];

        menu.displayMenuItems(menuItems);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

const menuContainer = document.getElementById('menu');
const menu = new Menu(menuContainer);
checkUserStatus();