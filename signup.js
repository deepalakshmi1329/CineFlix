document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const data = await response.json();

    document.getElementById("message").textContent = data.message;

    if (response.ok) {
        setTimeout(() => {
            window.location.href = "/login.html";
        }, 1000);
    }
});