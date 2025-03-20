# Schedule Calculation Tool - Vardion

## Description

The **Schedule Calculation Tool** is a web-based application designed to facilitate the computation of work schedules, particularly tailored for the needs of Vardion. This tool aims to simplify the process of assigning duties and managing work shifts for a group of individuals across a specified period, typically a month.

### Key Features

- **Dynamic Table Generation**: Users can input the number of individuals and the total number of days in a month to generate a corresponding table for schedule management.
- **Interactive User Interface**: The application provides an intuitive interface where users can mark holidays, assign shifts, mark unavailability, and clear cells as needed.
- **Automated Autofill Functionality**: This feature automatically populates the table with shift assignments based on specified constraints, such as maximum assignments per individual and marked holidays.
- **Export to Excel**: Users can export the generated schedule to an Excel file for further processing or sharing.
 
## How to Use

### Getting Started

1. Clone or download the project repository to your local machine.
2. Run `python -m http.server 8000` and visit http://localhost:8000.

or

1. visit https://pravi-x.github.io/shifts_web/

### Instructions

1. **Input Parameters**: Enter the total number of individuals (`ΣΥΝΟΛΟ ΑΤΟΜΩΝ`) and the total number of days in the month (`ΣΥΝΟΛΟ ΗΜΕΡΩΝ`) in the respective input fields.
2. **Generate Table**: Click the "Generate New Table" button to create the schedule table based on the provided parameters.
3. **Mark Holidays**: Click on the cells corresponding to holidays to mark them in gray.
4. **Assign Shifts**: Click on the cells to assign shifts (indicated by "1" in red) to individuals. Clicking again will clear the cell.
5. **Autofill Table**: Click the "Autofill Table" button to automatically populate the schedule based on specified constraints.
6. **Export to Excel**: Click the "Export to Excel" button to save the schedule as an Excel file on your computer.

## About

The **Schedule Calculation Tool** was developed to address the challenges encountered in managing work schedules efficiently. It was initially created for personal use and later adapted for broader utility.

For feedback, suggestions, or support, please contact the developer at [pravitas.dev@gmail.com](mailto:pravitas.dev@gmail.com). If you find this tool helpful and wish to support further development, consider making a contribution via PayPal at [https://paypal.me/hpravitas](https://paypal.me/hpravitas).

Enjoy using the **Schedule Calculation Tool** and may it simplify your scheduling tasks effectively! 📅✨
