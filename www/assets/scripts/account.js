// Retrieve current user from the DB and get all of their information to display on the account.html page

const getUser = async () => {
  try {
      const response = await fetch('/user');
      return response.json();
  } catch (error) {
      console.error("Cannot retrieve user data");
  }
}

const displayUser = async () => {
  const user = await getUser();

  document.getElementById('userNameHeader').textContent = user.name;
  document.getElementById('userName').textContent = user.name;
  document.getElementById('login').textContent = user.login;
  document.getElementById('email').textContent = user.email;
  document.getElementById('password').textContent = "******";
  document.getElementById('address').textContent = user.address;
  document.getElementById('creditcard').textContent = user.credit_card;
  if (user.orderHistory) { // Check if user has order history
    document.getElementById('orderHistory').textContent = user.orderHistory;
  }
  else {
      document.getElementById('orderHistory').textContent = "No order history";
  }
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