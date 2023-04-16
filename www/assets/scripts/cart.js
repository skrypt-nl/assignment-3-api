// Retrieve all movies that a user has added to their cart and display them (incl time, date & number of tickets) on the cart.html page

const addOrderToElement = (order, parentElement) => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('ord', 'ord--order');

    const metaDiv = document.createElement('div');
    metaDiv.classList.add('ord-meta');
    orderDiv.appendChild(metaDiv);

    const titleHeading = document.createElement('h5');
    titleHeading.classList.add('ord-meta__title');
    titleHeading.textContent = order.movie.title;

    const parentDivTitle = document.querySelector('.cart-card__header');
    parentDivTitle.appendChild(titleHeading);

    const nrHeading = document.createElement('p');
    nrHeading.classList.add('ord-meta__data');
    nrHeading.textContent = order.numberOfTickets;

    const parentDivNr = document.querySelector('.cart-card__tickets');
    parentDivNr.appendChild(nrHeading);

    const dateHeading = document.createElement('p');
    dateHeading.classList.add('ord-meta__data');
    dateHeading.textContent = order.movieDate;

    const parentDivDate = document.querySelector('.cart-card__date');
    parentDivDate.appendChild(dateHeading);

    const timeHeading = document.createElement('p');
    timeHeading.classList.add('ord-meta__data');
    timeHeading.textContent = order.movieTime;

    const parentDivTime = document.querySelector('.cart-card__time');
    parentDivTime.appendChild(timeHeading);
}

const displayOrder = (order) => {
    document.querySelectorAll('.orders-group--order').forEach((groupElement) => {
        groupElement.querySelectorAll('.orders-group__label').forEach((labelElement) => {});

        groupElement.querySelectorAll('.orders-group__list').forEach((listElement) => {
            addOrderToElement(order, listElement);
        });
    });
}

async function getOrders() {
    const url = `/group42/api/movies/orderStates`

    const response = await fetch(url);
    const orders = await response.json();

    orders.forEach((order) => displayOrder(order));

    const continueButton = document.getElementById('checkout-button');
    // Hide 'confirm order' button if there are no orders found; a user cannot confirm an empty shopping cart
    if (orders.length === 0) {
        continueButton.style.background = 'grey';
        continueButton.style.opacity = 0.5;
        const infoTextParent = document.querySelector('.cart-card__header');
        const infoText = document.createElement('p');
        infoText.textContent = "Your shopping cart is empty";
        infoText.classList.add("ord-meta__data");
        infoText.style.fontStyle = "italic";
        infoTextParent.appendChild(infoText);
    } else {
        continueButton.style.display = 'inline';
    }
}

getOrders();