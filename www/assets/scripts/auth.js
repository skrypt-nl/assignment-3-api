const login = async (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
    });

    const jsonData = await response.json();

    console.log(jsonData);
}

const register = async () => {

}

document.getElementById("login").addEventListener("submit", login);
