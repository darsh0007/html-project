// const form = document.querySelector(".form");
// const errorelement = document.getElementById("error");

//Dynamically print username on screen
const username = document.getElementById("username");
const usernameDisplay = document.getElementById("usernameDisplay");
username.addEventListener("input", (e) => {
    usernameDisplay.innerText = "Hello, " + e.target.value + " How are you?"
})


function handleFormSubmit(e) {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    // Get all selected checkboxes with the same name
    data.interests = formdata.getAll("interests");

    console.log(data); //just added to check if it writes on console
    window.location.href = "welcome.html"; //redirecting to a new page without server, if not i would have put it in .then(data)

    if (data.username) {
        // localStorage.setItem("username", data.username);
        // localStorage.setItem("formData", JSON.stringify(data));
        // Get existing data or initialize an empty array
        const existingData = JSON.parse(localStorage.getItem("formDataList")) || [];

        // Add new entry
        existingData.push(data);

        // Save updated array
        localStorage.setItem("formDataList", JSON.stringify(existingData));


    } //Storing formdata in localstorage to be able to print it with javascript.

    fetch("random.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {

            if (!response.ok) {
                // If the response is not okay, throw an error
                throw new Error("error fetching");
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log("Server response:", data);

            if (data.success) {
                // Do something if the response indicates success
                alert("Form submitted successfully!");
            } else {
                alert("There was an issue submitting the form.");
            }
        })
        .catch(error => {
            // Catch any error from the fetch call 
            console.error("Error during fetch:", error);
            alert("An error occurred, please try again.");
        });

}
function setupLoginForm() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", setupLoginForm);