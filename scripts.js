// Flag to track first run
let isFirstRun = true;

function generateTablePopUp() {
    // If it's the first run, directly generate the table
    if (isFirstRun) {
        isFirstRun = false;
        generateTable();
        return;
    }
    // Create the popup container
    const popupContainer = document.createElement('div');
    popupContainer.id = 'confirmationPopup';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    popupContainer.style.height = '100%';
    popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupContainer.style.display = 'flex';
    popupContainer.style.justifyContent = 'center';
    popupContainer.style.alignItems = 'center';
    popupContainer.style.zIndex = '1000';

    // Create the popup content
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.borderRadius = '10px';
    popupContent.style.textAlign = 'center';
    popupContent.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Popup message
    const message = document.createElement('p');
    message.textContent = 'Ο υπάρχων πίνακας θα διαγραφεί. Είστε σίγουροι ότι θέλετε να δημιουργήσετε νέο πίνακα;';
    message.style.width = '100%';
    message.style.marginBottom = '20px';

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.gap = '10px';

    // Continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Συνέχεια';
    continueButton.style.backgroundColor = '#5C1E4C';
    continueButton.style.color = 'white';
    continueButton.style.border = 'none';
    continueButton.style.padding = '10px 20px';
    continueButton.style.borderRadius = '5px';
    continueButton.style.cursor = 'pointer';
    continueButton.style.transition = 'background-color 0.3s ease';
    continueButton.addEventListener('mouseover', () => {
        continueButton.style.backgroundColor = '#7A2A65';
    });
    continueButton.addEventListener('mouseout', () => {
        continueButton.style.backgroundColor = '#5C1E4C';
    });
    continueButton.addEventListener('click', () => {
        // Remove the popup
        document.body.removeChild(popupContainer);
        // Call the generateTable function
        generateTable();
    });

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Ακύρωση';
    cancelButton.style.backgroundColor = '#A63A3A';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.transition = 'background-color 0.3s ease';
    cancelButton.addEventListener('mouseover', () => {
        cancelButton.style.backgroundColor = '#C04D4D';
    });
    cancelButton.addEventListener('mouseout', () => {
        cancelButton.style.backgroundColor = '#A63A3A';
    });
    cancelButton.addEventListener('click', () => {
        // Simply remove the popup
        document.body.removeChild(popupContainer);
    });

    // Assemble the popup
    buttonsContainer.appendChild(continueButton);
    buttonsContainer.appendChild(cancelButton);
    popupContent.appendChild(message);
    popupContent.appendChild(buttonsContainer);
    popupContainer.appendChild(popupContent);

    // Add the popup to the body
    document.body.appendChild(popupContainer);
}

function generateTable() {
    // clear the table container
    document.getElementById("tableContainer").innerHTML = "";
    
    // clear the marked days
    markedDays = [];

    var rowsInput = document.getElementById("rows");
    var columnsInput = document.getElementById("columns");

    var rows = parseInt(rowsInput.value);
    var columns = parseInt(columnsInput.value);

    if (!isNaN(rows) && !isNaN(columns)) {
        var table = "<table>";

        for (var i = 0; i < rows + 1; i++) {
            table += "<tr>";

            for (var j = 0; j < columns + 4; j++) {
                if (i === 0) {
                    if (j === 0) {
                        table += '<td data-translate-key="name">Όνομα</td>';
                    } else if (j === 1) {
                        table += '<td data-translate-key="maximum">Μέγιστο Επιτρεπόμενο</td>';
                    } else if (j === 2) {
                        table += '<td data-translate-key="total">Σύνολο</td>';
                    } else if (j === 3) {
                        table += '<td data-translate-key="totalHolidays">Σύνολο Αργιών</td>';
                    } else {
                        table += "<td onclick=\"markHoliday(this)\">" + (j - 3) + "</td>";
                    }
                } else {
                    if (j === 0) {
                        table += "<td><input type=\"text\"></td>";
                    } else if (j === 1) {
                        table += "<td><input type=\"number\" value=\"3\" min=\"0\"></td>";
                    } else if (j === 2) {
                        table += "<td id=\"calculateRowTotals()\"></td>";
                    } else if (j === 3) {
                        table += "<td onclick=\"calculateRowTotals()\"></td>";
                    } else {
                        table += "<td onclick=\"markUnavaliabilityOrShift(this)\"></td>";
                    }
                }
            }

            table += "</tr>";
        }

        // Add a row that calculates the total for each column
        table += "<tr>";
        table += "<td>Σύνoλα</td>";
        table += "<td></td>";
        table += "<td></td>";
        table += "<td></td>";

        for (var j = 0; j < columns; j++) {
            table += "<td></td>";
        }

        table += "</tr>";

        table += "</table>";

        document.getElementById("tableContainer").innerHTML = table;
    }
}


var markedDays = []; // Initialize an empty array to store marked days

function markHoliday(cell) {
    if (cell.style.backgroundColor === "gray") {
        cell.style.backgroundColor = "";
        removeMarkedDay(parseInt(cell.innerHTML)); // Remove the marked day from the list
    } else {
        cell.style.backgroundColor = "gray";
        addMarkedDay(parseInt(cell.innerHTML)); // Add the marked day as a number to the list
    }
    calculateRowTotals()
}

function addMarkedDay(day) {
    markedDays.push(day); // Add the marked day to the list
}

function removeMarkedDay(day) {
    var index = markedDays.indexOf(day);
    if (index !== -1) {
        markedDays.splice(index, 1); // Remove the marked day from the list
    }
}

function markUnavaliability(cell) {
    cell.style.backgroundColor = "red";
    cell.innerHTML = "-";
}

function markShift(cell) {
    cell.style.backgroundColor = "green";
    cell.innerHTML = "1";
}

function markEmpty(cell) {
    cell.style.backgroundColor = "";
    cell.innerHTML = "";
}

function markUnavaliabilityOrShift(cell) {
    if (cell.style.backgroundColor === "red") {
        markShift(cell);
    } else if (cell.style.backgroundColor === "green") {
        markEmpty(cell);
    } else {
        markUnavaliability(cell);
    }
    calculateRowTotals()
}

function calculateRowTotals() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var count = 0;
        var holidaysCount = 0;

        for (var j = 4; j < cells.length; j++) {
            if (cells[j].innerHTML === "1") {
                count++;
                if (markedDays.includes(j - 3)) {
                    holidaysCount++;
                }
            }
        }

        cells[2].innerHTML = count || 0;
        if (count !== 0 ){
            UnMarkDayTotal(cells[2]);
        } else {
            markDayTotal(cells[2]);
        }
        cells[3].innerHTML = holidaysCount || 0;
        if (holidaysCount !== 0 ){
            UnMarkDayTotal(cells[3]);
        } else {
            markDayTotal(cells[3]);
        }
    }
    holidaysCount = 0;
    calculateCollumnsTotals()
    calculateDaysTotals()
}

// mark the columns DaysTotals
function markDayTotal(cell) {
    cell.style.backgroundColor = "#0A0510"; // black
    cell.style.color = "white";
}

function UnMarkDayTotal(cell){
    cell.style.backgroundColor = "#f2f2f2"; //gray
    cell.style.color = "#0A0510"; //black
}

// Mark the total cell if is has 0 or 2 enties

function calculateCollumnsTotals() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    var column1Total = 0;
    var column2Total = 0;
    var column3Total = 0;

    for (var i = 1; i < rows.length - 1; i++) {
        var cells = rows[i].getElementsByTagName("td");
        column1Total += parseInt(cells[1].querySelector("input").value) || 0; // Sum up maximum values
        column2Total += parseInt(cells[2].innerHTML) || 0;
        column3Total += parseInt(cells[3].innerHTML) || 0;
    }

    var lastRow = rows[rows.length - 1].getElementsByTagName("td");
    lastRow[1].innerHTML = column1Total; // Display column1Total (maximum values)
    lastRow[2].innerHTML = column2Total;
    lastRow[3].innerHTML = column3Total;
}

function calculateDaysTotals() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    var daysTotals = [];

    for (var j = 4; j < rows[0].cells.length; j++) {
        var count = 0;

        for (var i = 1; i < rows.length - 1; i++) {
            var cells = rows[i].getElementsByTagName("td");

            if (cells[j].innerHTML === "1") {
                count++;
            }
        }

        daysTotals.push(count);
        var dayT = rows[rows.length - 1].cells[j]
        dayT.innerHTML = count; // Set the total in the last row of each column
        if (count == 1 ){
            markDayTotal(dayT);
        } else {
            UnMarkDayTotal(dayT);
        }

    }

}


function exportToExcel() {
    const table = document.querySelector('table');
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Get values from input fields in the first column and insert them into the Excel sheet
    const firstColumnInputs = table.querySelectorAll("tr td:nth-child(1) input");
    firstColumnInputs.forEach((input, index) => {
        const value = input.value;
        XLSX.utils.sheet_add_aoa(worksheet, [[value]], { origin: { r: index + 1, c: 0 } });
    });

    // Get values from input fields in the second column and insert them into the Excel sheet
    const secondColumnInputs = table.querySelectorAll("tr td:nth-child(2) input");
    secondColumnInputs.forEach((input, index) => {
        const value = input.value;
        XLSX.utils.sheet_add_aoa(worksheet, [[value]], { origin: { r: index + 1, c: 1 } });
    });

    // Set column widths based on the content of the cells
    const columnWidths = [];
    table.querySelectorAll('tr').forEach(row => {
        row.querySelectorAll('td').forEach((cell, columnIndex) => {
            const len = cell.textContent.length;
            columnWidths[columnIndex] = Math.max(columnWidths[columnIndex] || 0, len);
        });
    });
    worksheet['!cols'] = columnWidths.map(width => ({ width: width * 1.2 }));

    // Check the columns 4 to the end and apply cell styles based on their values
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = 3; col <= range.e.c; col++) { // Adjusted starting index to 3 (4th column)
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            const cellValue = worksheet[cellAddress] ? worksheet[cellAddress].v : null;
            if (cellValue === "-") {
                worksheet[cellAddress].s = { fill: { fgColor: { rgb: "FFFF00" } } };
            } else if (cellValue === "1") {
                worksheet[cellAddress].s = { fill: { fgColor: { rgb: "FF00FF" } } };
            }
        }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, 'schedule.xlsx');
}


function autofillTable() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");

    // Initialize an array to keep track of assigned days
    var assignedDays = new Array(rows[0].cells.length - 4).fill(false);

    // Initialize an array to keep track of the number of assignments per row
    var assignmentsPerRow = new Array(rows.length - 2).fill(0);

    // Initialize an array to keep track of the maximum number of assignments per row
    var maxAssignmentsPerRow = [];
    for (var i = 1; i < rows.length - 1; i++) {
        maxAssignmentsPerRow.push(parseInt(rows[i].cells[1].getElementsByTagName("input")[0].value));
    }

    // Every employee must have at most one assignment on the marked days
    // Avg martked days per person are
    if (markedDays.length != 0) {
        var markedDaysPerPerson = Math.round(markedDays.length / (rows.length - 2));
    } else {
        var markedDaysPerPerson = 0;
    }

    //check if the table has have values in the cells. if it has update the proper arrays
    for (var i = 1; i < rows.length - 1; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 4; j < cells.length; j++) {
            if (cells[j].innerHTML === "1") {
                assignedDays[j - 4] = true;
                assignmentsPerRow[i - 1]++;
            }
        }
    }

    // shuffle marked days and assign them to each person
    var markedDaysCopy = markedDays.slice(); // Copy the array of marked days
    shuffleArray(markedDaysCopy); // Shuffle the array of marked days

    for (var i = 1; i < rows.length - 1; i++) // Iterate over each row except the first and last one
    {
        var cells = rows[i].getElementsByTagName("td"); // Get the cells of the row

        for (var j = 4; j < cells.length; j++) // Iterate over each cell except the first three
        {
            if (markedDaysCopy.length > 0) {
                var day = markedDaysCopy.pop(); // Get the day from the shuffled array

                if (isValidAssignment(i, cells, day - 1, assignmentsPerRow, maxAssignmentsPerRow, assignedDays)) {

                    // Adicional check to make sure that the marked days are distributed evenly
                    if (assignmentsPerRow[i - 1] < markedDaysPerPerson) {

                        markShift(cells[day + 3]); // Mark the cell as a shift
                        assignedDays[day - 1] = true; // Mark the day as assigned
                        assignmentsPerRow[i - 1]++; // Increment the number of assignments for the row
                    } else {
                        markedDaysCopy.push(day); // Add the day back to the array
                    }  
                } 
            }   
        }
    }

    // Create an array of days in random order
    var days = []; // the day are stored from 0 to 30 in the array (depending on the month)
    for (var j = 0; j < rows[0].cells.length-4; j++) {
        days.push(j);
        console.log(j);
    }
    // Shuffle the array of days
    shuffleArray(days);

    for (var i = 1; i < rows.length - 1; i++) // Iterate over each row except the first and last one
    {
        var cells = rows[i].getElementsByTagName("td"); // Get the cells of the row

        for (var j = 4; j < cells.length; j++) // Iterate over each cell except the first three
        {
            var day = days[j - 4]; // Get the day from the shuffled array

            if (isValidAssignment(i, cells, day, assignmentsPerRow, maxAssignmentsPerRow, assignedDays)) {
                markShift(cells[day + 4]); // Mark the cell as a shift
                assignedDays[day] = true; // Mark the day as assigned
                assignmentsPerRow[i - 1]++; // Increment the number of assignments for the row
            }
        }

    }
    calculateRowTotals(); // Recalculate totals after autofilling
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isValidAssignment(i, cells, day, assignmentsPerRow, maxAssignmentsPerRow, assignedDays) {
    // Check if the day is marked as unavailable "-"
    if (cells[day + 4].innerHTML === "-") {
        return false;
    }
    // Check if the row has reached the maximum number of assignments
    if (assignmentsPerRow[i - 1] >= maxAssignmentsPerRow[i - 1]) {
        return false;
    }

    // Check if the day is already assigned
    if (assignedDays[day]) {
        return false;
    }

    // Check if the next cell is not the last and if it is already assigned as a shift
    if (day < cells.length - 5 && cells[day + 5].innerHTML === "1") {
        return false;
    }

    // Check if the previous cell is not the first and if it is already assigned as a shift
    if (day > 0 && cells[day + 3].innerHTML === "1") {
        return false;
    }


    return true;
}

function clearTable() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length - 1; i++) {
        var cells = rows[i].getElementsByTagName("td");

        for (var j = 4; j < cells.length; j++) {
            if (cells[j].innerHTML !== "-") {
                markEmpty(cells[j]);
            }
        }
    }

    calculateRowTotals();
    calculateDaysTotals();
}


function toggleParagraph(id) {
    var paragraph = document.getElementById(id);
    if (paragraph.style.display === "none") {
        paragraph.style.display = "block";
    } else {
        paragraph.style.display = "none";
    }
}