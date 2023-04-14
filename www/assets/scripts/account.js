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
  console.log(user);

  document.getElementById('userNameHeader').textContent = user.name;
  document.getElementById('userName').textContent = user.name;
  document.getElementById('login').textContent = user.login;
  document.getElementById('email').textContent = user.email;
  document.getElementById('password').textContent = "user.password"; // Replace with user.password once added to DB
  document.getElementById('address').textContent = user.address;
  document.getElementById('creditcard').textContent = "user.creditCard"; // Replace with user.creditcard once added to DB
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
  const buttonPlace = document.querySelector('.continue-button');
  const continueButton = document.createElement("button");
  const continueLink = document.createElement("a");
  continueLink.href = "./logout";
  continueButton.textContent = "Log out";
  buttonPlace.appendChild(continueLink);
  continueLink.appendChild(continueButton);
}

logOutButton();