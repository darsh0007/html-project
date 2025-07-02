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

    // Get all selected checkboxes with the same name, if not, only the last selected checkbox would be conisdered.
    data.interests = formdata.getAll("interests");

    //New code for editRow
    const editIndex = localStorage.getItem("editIndex");
    const formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];

    let isEdit = false;

    //If editing, update existing entry
    if (editIndex !== null) { //checks if we want to edit or add a new entry

        const existingData = formDataList[editIndex]; //(change need to be studied)

        //Leave the password input empty while editing.
        if (!data.password) { //(change need to be studied)
            data.password = existingData.password;
        }
        data.id = existingData.id; //(change need to be studied)
        formDataList[editIndex] = data;  //if edit, inputs the new data at that index
        localStorage.removeItem("editIndex"); // deletes editIndex from local storage after edit is complete
        isEdit = true;
    } else {
        data.id = Date.now(); // Assign new ID (change need to be studied)
        formDataList.push(data);  //add new entry
    }

    localStorage.setItem("formDataList", JSON.stringify(formDataList)); ////Storing formdata in localstorage to be able to print it with javascript.
    //redirecting to a new page without server, if not i would have put it in .then(data)
    // window.location.href = "welcome.html";

    if (isEdit) {
        //You copy the original id from existingData.id to data.id just above.
        //That id is the one generated and stored in JSON Server, and must be used for PUT.
        fetch(`http://localhost:8080/my-app/submitForm/${data.id}`, { //(change need to be studied)
            method: "PUT",
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
                    window.location.href = "welcome.html";
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
    else {
        fetch("http://localhost:8080/my-app/submitForm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to submit");
                return response.json();
            })
            .then(() => {
                alert("Form submitted successfully!");
                window.location.href = "welcome.html";
            })
            .catch(error => {
                console.error("Error during fetch:", error);
                alert("An error occurred, please try again.");
            });
    }
}

function setupLoginForm() {
    const form = document.querySelector(".form");
    // form.addEventListener("submit", handleFormSubmit);
}

//Ask for confirmation if reset is clicked
const Reset = document.getElementById("ResetBtn");
Reset.addEventListener("click", (e) => {

    const result = confirm("Are you sure you want to reset?");
    if (result == false) {
        e.preventDefault();
    }
});


document.addEventListener("DOMContentLoaded", () => {  //waits for the initial HTML to parse
    setupLoginForm();

    //Check if editing existing entry
    const editIndex = localStorage.getItem("editIndex"); //getting it from welcome.js
    if (editIndex !== null) {
        const formDataList = JSON.parse(localStorage.getItem("formDataList")) || [];
        const dataToEdit = formDataList[editIndex];

        //Updating all the data on form
        if (dataToEdit) {
            // Fill form fields with existing data
            document.getElementById("username").value = dataToEdit.username;
            document.getElementById("password").value = dataToEdit.password || "";
            document.getElementById("email").value = dataToEdit.email || "";
            document.getElementById("language").value = dataToEdit.language || "";

            // Set interests (checkboxes)
            if (Array.isArray(dataToEdit.interests)) { //checks if dataToEdit.interests is an array
                dataToEdit.interests.forEach((interest) => {    //If it is, it loops through each interest
                    const checkbox = document.querySelector(`input[type="checkbox"][value="${interest}"]`); //For each interest, it looks for a checkbox <input> element with a matching value
                    if (checkbox) checkbox.checked = true; //If the checkbox is found, it sets its checked property to true
                });
            }

            // Set employment choice
            const employmentRadio = document.querySelector(`input[name="employment"][value="${dataToEdit.employment}"]`);
            if (employmentRadio) employmentRadio.checked = true;

            // Set additional comments
            document.getElementById("explain").value = dataToEdit.explain || "";
        }
    }


});