const dataList = JSON.parse(localStorage.getItem("formDataList"));

if (dataList && dataList.length > 0) {
    // Show the latest user's name in the welcome message
    const latest = dataList[dataList.length - 1];
    document.getElementById("welcome").innerText = `Welcome, ${latest.username}!`;

    const tbody = document.querySelector("table tbody");

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
            `;
        tbody.appendChild(row);
    });
} else {
    document.getElementById("welcome").innerText = "No data submitted.";
}

