// Create two buttons for the thank-you.html file, one to continue shopping and one to go to 'my account' with corresponding links

function createButtons() {
    const buttonPlace = document.querySelector('.continue-buttons');
    const continueButton = document.createElement("button");
    const continueLink = document.createElement("a");
    continueLink.href = "/";
    continueButton.textContent = "Continue shopping";
    buttonPlace.appendChild(continueLink);
    continueLink.appendChild(continueButton);

    const myAccButton = document.createElement("button");
    const myAccLink = document.createElement("a");
    myAccLink.href = "./account";
    myAccButton.textContent = "Go to my account";
    buttonPlace.appendChild(myAccLink);
    myAccLink.appendChild(myAccButton);
}

createButtons();
