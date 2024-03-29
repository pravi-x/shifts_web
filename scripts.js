function generateTable() {
    var rowsInput = document.getElementById("rows");
    var columnsInput = document.getElementById("columns");

    var rows = parseInt(rowsInput.value);
    var columns = parseInt(columnsInput.value);

    if (!isNaN(rows) && !isNaN(columns)) {
        var table = "<table>";

        for (var i = 0; i < rows + 1; i++) {
            table += "<tr>";

            for (var j = 0; j < columns + 3; j++) {
                if (i === 0) {
                    if (j === 0) {
                        table += "<td>Name</td>";
                    } else if (j === 1) {
                        table += "<td>Total</td>";
                    } else if (j === 2) {
                        table += "<td>Total Holidays</td>";
                    } else {
                        table += "<td onclick=\"markHoliday(this)\">" + (j - 2) + "</td>";
                    }
                } else {
                    if (j === 0) {
                        table += "<td><input type=\"text\"></td>";
                    } else if (j === 1) {
                        table += "<td id=\"calculateRowTotals()\"></td>";
                    } else if (j === 2) {
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
        removeMarkedDay(cell.innerHTML); // Remove the marked day from the list
    } else {
        cell.style.backgroundColor = "gray";
        addMarkedDay(parseInt(cell.innerHTML)); // Add the marked day as a number to the list
    }
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



function markUnavaliabilityOrShift(cell) {
    if (cell.style.backgroundColor === "red") {
        cell.style.backgroundColor = "green";
        cell.innerHTML = "1";
    } else if (cell.style.backgroundColor === "green") {
        cell.style.backgroundColor = "";
        cell.innerHTML = "";
    } else {
        cell.style.backgroundColor = "red";
        cell.innerHTML = "-";
    }
}

function calculateRowTotals() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var count = 0;
        var holidaysCount = 0;

        for (var j = 3; j < cells.length; j++) {
            if (cells[j].innerHTML === "1") {
                count++;
                if (markedDays.includes(j - 2)) {
                    holidaysCount++;
                }
            }
        }

        cells[1].innerHTML = count || 0;
        cells[2].innerHTML = holidaysCount || 0;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the table for any click event
    document.querySelector('table').addEventListener('click', function() {
    calculateRowTotals(); // Update row totals on every click within the table
    });
});

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
    var table = document.querySelector('table');
    var rows = table.querySelectorAll('tr');
    var columnAssignments = {}; // Object to track assignments in each column

    // Initialize column assignments tracking
    for (var i = 0; i < rows[0].children.length; i++) {
        columnAssignments[i] = false; // Initialize all columns as unassigned
    }

    rows.forEach(function(row) {
        var cells = row.querySelectorAll('td');

        // Loop through cells starting from the third column
        for (var i = 2; i < cells.length; i++) {
            var columnIndex = i - 2;

            // Check if the cell is empty and not marked as unavailable ("-")
            if (cells[i].innerHTML === "" && cells[i].style.backgroundColor !== "red") {
                if (!columnAssignments[columnIndex]) {
                    // If no assignment in the column, assign the cell
                    cells[i].innerHTML = "1";
                    columnAssignments[columnIndex] = true; // Mark column as assigned
                } else {
                    // If there is already an assignment in the column, clear the cell
                    cells[i].innerHTML = "";
                }
            }
        }
    });

    // Update row totals after autofill
    calculateRowTotals();
}
