function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const errorElement = document.getElementById("error");
   
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata);

    console.log("Simulating login with data:", data);

    // Simulated server delay and response -- because i cant actually try fetch without server.
    setTimeout(() => {
        if (data.username === "admin" && data.password === "1234") {
            alert("Login successful");
        } else {
            errorElement.innerText = "Invalid username or password";
        }
    }, 1000);

    fetch("http://localhost:8080/YourProjectName/LoginServlet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("response: ",data);
            if (data === "success") {
                alert("Login successful");
            } else {
                errorElement.innerText = "Invalid username or password";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorElement.innerText = "Server error, please try again.";
        });
}

function setupLoginForm() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", setupLoginForm);

