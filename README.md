create a html page that has a title and 2 fields to be completed by the user. 
the first one is the rows and the second the columns (check that the entry is a number at both, ).
under them put a button. When the user presses the button a table appears with rows = rows + 2 of the given rows from before and columns = columns + 3 of the given columns from before

The table is as follows :
first row:
Name | Total | Total Holidays | 1 | 2 | ... | 30
Note that cells with tha number must be clickables and change color to gray if pressed

# TODO
# autocomplete
# manipulate rules of auto complete
make the autofillTable() function. based on the following rules
- "1" means assigns
- assign each day (column) one "1"
- every row must have at most 3 assignments
- a cell can not be assign if there is the "-" in the cell
# export to excel 
name not exporting