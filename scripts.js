function generateTable() {
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
                        table += "<td>Name</td>";
                    } else if (j === 1) {
                        table += "<td>Max</td>";
                    } else if (j === 2) {
                        table += "<td>Total</td>";
                    } else if (j === 3) {
                        table += "<td>Total Holidays</td>";
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
        table += "<td>Total</td>";
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
        cells[3].innerHTML = holidaysCount || 0;
    }
    holidaysCount = 0;
    calculateCollumnsTotals()
    calculateDaysTotals()
}

function calculateCollumnsTotals() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    var column2Total = 0;
    var column3Total = 0;

    for (var i = 1; i < rows.length - 1; i++) {
        var cells = rows[i].getElementsByTagName("td");
        column2Total += parseInt(cells[2].innerHTML) || 0;
        column3Total += parseInt(cells[3].innerHTML) || 0;
    }

    rows[rows.length - 1].getElementsByTagName("td")[2].innerHTML = column2Total;
    rows[rows.length - 1].getElementsByTagName("td")[3].innerHTML = column3Total;
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
        rows[rows.length - 1].cells[j].innerHTML = count; // Set the total in the last row of each column
    }

}


function exportToExcel() {
    // Select the table element
    var table = document.querySelector('table');

    // Convert table data to a worksheet
    var ws = XLSX.utils.table_to_sheet(table);

    // Create a new workbook and add the worksheet
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an XLSX file
    XLSX.writeFile(wb, "table_data.xlsx");
}


function autofillTable() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");

    // Initialize an array to keep track of assigned days
    var assignedDays = new Array(rows[0].cells.length - 4).fill(false);

    // Initialize an array to keep track of the number of assignments per row
    var assignmentsPerRow = new Array(rows.length - 1).fill(0);

    // Create an array of days in random order
    var days = [];
    for (var j = 4; j < rows[0].cells.length; j++) {
        days.push(j);
    }
    shuffleArray(days);

    // Iterate over each day in random order
    for (var k = 0; k < days.length; k++) {
        var j = days[k];

        // Check if this day has been assigned already and if the previous and next days are not assigned
        if (!assignedDays[j - 4] && (!assignedDays[j - 5] || !assignedDays[j - 3])) {
            // Iterate over each row, skipping the first and last rows
            for (var i = 1; i < rows.length - 1; i++) {
                var cells = rows[i].getElementsByTagName("td");

                // Skip if the cell already has "-"
                if (cells[j].innerHTML !== "-") {
                    // Check if the current row can accept more assignments and there are no consecutive assigned days
                    if (assignmentsPerRow[i - 1] < parseInt(cells[1].getElementsByTagName("input")[0].value) && !assignedDays[j - 5] && !assignedDays[j - 3]) {
                        // Mark the cell as assigned
                        markShift(cells[j]);
                        // Increment the assignments count for this row
                        assignmentsPerRow[i - 1]++;
                        // Mark this day as assigned
                        assignedDays[j - 4] = true;
                        // Break the loop to move to the next day
                        break;
                    }
                }
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

