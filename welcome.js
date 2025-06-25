const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];

if (dataList && dataList.length > 0) {
    // // Show the latest user's name in the welcome message
    // const latest = dataList[dataList.length - 1];
    // document.getElementById("welcome").innerText = `Welcome, ${latest.username}!`;


    const tbody = document.querySelector("table tbody"); //targetting table body
    const tableEl = document.querySelector("table"); //to target the table for delete activity

    // Prepare interests (can be string or array depending on checkboxes)
    dataList.forEach((data) => {
        let interests = "None";
        if (data.interests) {
            if (Array.isArray(data.interests)) {
                interests = data.interests.join(", "); //joining all interests with a comma
            } else {
                interests = data.interests; // In case it's a single string
            }
        }
        // Create new table row
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>${data.language}</td>
                <td>${data.employment}</td>
                <td>${interests}</td>
                <td><button class="deleteBtn">Delete</button></td>
                <td><button class="EditBtn">Edit</button></td>
            `;

        tbody.appendChild(row);
    });

    let rowToDelete = null;

    //Deleting a row
    function onDeleteRow(e) {
        if (!e.target.classList.contains("deleteBtn")) {
            return;
        } //checks if the clicked element was actually a "Delete" button. If not, the function exits early using return.
        rowToDelete = e.target.closest("tr"); //finds the nearest <tr> (row) that wraps this button.  This identifies which row to delete.
        document.getElementById("customConfirmModal").classList.remove("hidden"); //removes the hidden class from this element
    }

    document.getElementById("confirmYes").addEventListener("click", () => { //if yes is clicked
        if (rowToDelete) {
            const rowIndex = Array.from(rowToDelete.parentNode.children).indexOf(rowToDelete); //to get index of row
            // console.log(rowIndex); //to check the index on console

            rowToDelete.remove(); //Only removes the row from HTML table. Would exist if reloaded.

            //remove from local storage, if not it was shown after reloading the page
            dataList.splice(rowIndex, 1); // remove correct item from array
            localStorage.setItem("formDataList", JSON.stringify(dataList)); //update localstorage

            rowToDelete = null; //Again set the row to default
        }
        document.getElementById("customConfirmModal").classList.add("hidden"); //Again make the class hidden
    });

    document.getElementById("confirmNo").addEventListener("click", () => { //if No is clicked
        rowToDelete = null; //No row to delete if no is clicked
        document.getElementById("customConfirmModal").classList.add("hidden"); //Again make the class hidden
    });
    tableEl.addEventListener("click", onDeleteRow); //call the above function onclick








    //Redirect to old page for editing an existing row
    let rowToEdit = null;
    function onEditRow(e) {
        if (!e.target.classList.contains("EditBtn")) {
            return
        }; //checks if the clicked element was actually a "Delete" button. If not, the function exits early using return.
        rowToEdit = e.target.closest("tr"); //finds the nearest <tr> (row) that wraps this button.  This identifies which row to delete.
        document.getElementById("EditRow").classList.remove("hidden");
    }
    document.getElementById("EditYes").addEventListener("click", () => {
        //Write the code to navigate to forms and edit the existing row
        if (rowToEdit) {
            const rowIndex = Array.from(rowToEdit.parentNode.children).indexOf(rowToEdit); //to get index of row
            // console.log(rowIndex); //to check the index of row
            localStorage.setItem("editIndex", rowIndex); //store in localstorage to access it on form page
            window.location.href = "all_form.html"; //redirect to form page now
        }
        document.getElementById("EditRow").classList.add("hidden"); //Again make the class hidden
    });
    document.getElementById("EditNo").addEventListener("click", () => { //if No is clicked
        rowToDelete = null; //No row to delete if no is clicked
        document.getElementById("EditRow").classList.add("hidden"); //Again make the class hidden
    });
    tableEl.addEventListener("click", onEditRow); //call the above function onclick

} else {
    document.getElementById("welcome").innerText = "No data submitted.";
}







//Redirect to old page if we want to add more rows, Same format as delete button
const addRows = document.getElementById("addRows")
addRows.addEventListener("click", () => {
    document.getElementById("ConfirmAddRows").classList.remove("hidden");
});

document.getElementById("AddYes").addEventListener("click", () => {
    window.location.href = "all_form.html"; //Redirect to old page if yes is clicked
    document.getElementById("ConfirmAddRows").classList.add("hidden");
});

document.getElementById("AddNo").addEventListener("click", () => {
    document.getElementById("ConfirmAddRows").classList.add("hidden");
});