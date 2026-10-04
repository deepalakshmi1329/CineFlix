document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const data = await response.json();

    document.getElementById("message").textContent = data.message;

    if (response.ok) {
        window.location.href = "/dashboard.html";
    }
});