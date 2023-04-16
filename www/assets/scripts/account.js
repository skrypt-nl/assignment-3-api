// Retrieve current user from the DB and get all of their information to display on the account.html page

const getUser = async () => {
  try {
      const response = await fetch('/user');
      return response.json();
  } catch (error) {
      console.error("Cannot retrieve user data");
  }
}

const getHistory = async () => {
  try {
      const response = await fetch('/tickets');
      return response.json();
  } catch (error) {
      console.error("Cannot retrieve user order history");
  }
}

const displayUser = async () => {
  const user = await getUser();
  const history = await getHistory();
  
  document.getElementById('userNameHeader').textContent = user.name;
  document.getElementById('userName').textContent = user.name;
  document.getElementById('login').textContent = user.login;
  document.getElementById('email').textContent = user.email;
  document.getElementById('password').textContent = "******";
  document.getElementById('address').textContent = user.address;
  document.getElementById('creditcard').textContent = user.credit_card;


  history.forEach(function (hist) {

    const displayhistory = (history) => {
      document.querySelectorAll('.history-group__list').forEach((listElement) => {
          addhistoryToElement(history, listElement);
      });
  }

  const addhistoryToElement = (hist, parentElement) => {
      const histDiv = document.createElement('div');
      histDiv.classList.add('hs', 'hs--hist');
  
      const metaDiv = document.createElement('div');
      metaDiv.classList.add('hs-meta');
      histDiv.appendChild(metaDiv);

      const idHeading = document.createElement('h5');
      idHeading.classList.add('hs-meta__ID');
      idHeading.textContent = 'Order #' + hist.ticketId;
      metaDiv.appendChild(idHeading);

      const titleHeading = document.createElement('h5');
      titleHeading.classList.add('hs-meta__data');
      titleHeading.textContent = 'Movie: ' + hist.title;
      metaDiv.appendChild(titleHeading);

      const dateHeading = document.createElement('h5');
      dateHeading.classList.add('hs-meta__data');
      dateHeading.textContent = 'Movie date: ' + hist.movie_date;
      metaDiv.appendChild(dateHeading);

      const amountHeading = document.createElement('h5');
      amountHeading.classList.add('hs-meta__data');
      amountHeading.textContent = `Tickets: ${hist.amount}x`;
      metaDiv.appendChild(amountHeading);

      const purchaseHeading = document.createElement('h5');
      purchaseHeading.classList.add('hs-meta__data');
      purchaseHeading.textContent = 'Order date: ' + hist.purchased_on;
      metaDiv.appendChild(purchaseHeading);


       
      parentElement.appendChild(metaDiv);
  }

  displayhistory(hist);

  });
 
}

displayUser();

// Logout button
function logOutButton() {
  const buttonPlace = document.querySelector('.account-buttons');
  const continueButton = document.createElement("button");
  const continueLink = document.createElement("a");
  continueLink.href = "./logout";
  continueButton.textContent = "Log out";
  buttonPlace.appendChild(continueLink);
  continueLink.appendChild(continueButton);
}

logOutButton();

function cartButton() {
  const cartButtonPlace = document.querySelector('.account-buttons');
  const cartButton = document.createElement("button");
  const cartLink = document.createElement("a");
  cartLink.href = "./cart";
  cartButton.textContent = "Go to cart";
  cartButtonPlace.appendChild(cartLink);
  cartLink.appendChild(cartButton);
}

cartButton();