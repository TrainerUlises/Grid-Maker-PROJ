// ===== Element lookups =====
// grab elements we need to interact with
const grid = document.getElementById('grid');          // the table
const tbody = grid.querySelector('tbody');             // the <tbody> inside table
const colorPicker = document.getElementById('colorPicker'); // dropdown of colors
const actionSelect = document.getElementById('actionSelect'); // dropdown of actions
const doActionBtn = document.getElementById('doAction');     // run button
const gridSizeEl = document.getElementById('gridSize');      // label showing grid size
const swatch = document.getElementById('swatch');            // little color square
swatch.style.backgroundColor = colorPicker.value;            // initialize swatch

// ===== Helpers =====
function rowCount() {
  return tbody.children.length; // counts how many <tr> are inside tbody
}
function colCount() {
  const firstRow = tbody.children[0]; // look at first row if it exists
  return firstRow ? firstRow.children.length : 0; // return # of cells
}
function updateGridSizeLabel() {
  gridSizeEl.textContent = `Grid: ${rowCount()} × ${colCount()}`;
}

// helper: each cell will be clickable and paint itself
function wireCell(td) {
  td.onclick = () => {
    td.style.backgroundColor = colorPicker.value; // paint cell with chosen color
    td.dataset.colored = 'true'; // mark as "colored"
  };
  return td;
}

// ====== TODO stubs (these will be filled in feature branches) ======
function addRow() 
{ 
const cols = colCount() || 1; //if grid empty, initialize with 1
const tr = document.createElement('tr'); // create a new row

for (let i = 0; i < cols; i++) {
    const td = document.createElement('td'); // create cell
    wireCell(td);                            // allowing it to be selected and changes color
    tr.appendChild(td);                      // adds cell to row
  }
  tbody.appendChild(tr); // add row to table
}
function addColumn() { 
    const rows = tbody.getElementsByTagName('tr');

    // if grid is empty, start with 1 row
    if (rows.length === 0) {
      addRow(); // fallback, ensures at least 1 row exists
      return;
    }
  
    // loop through each row, adding  a new cell
    for (let i = 0; i < rows.length; i++) {
      const td = document.createElement('td'); // new cell
      wireCell(td);                            // make it clickable/colorable
      rows[i].appendChild(td);                 // attach to row
    } 
}
function removeRow()
{ 
    
const rows = tbody.getElementsByTagName('tr');

// only remove if there’s at least one row
if (rows.length > 0) 
{
    tbody.removeChild(rows[rows.length - 1]); // remove the last row  }
}
}
function removeColumn() 
{
    const rows = tbody.getElementsByTagName('tr');

    // only proceeding there are rows and at least 1 column
    if (rows.length > 0 && rows[0].children.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].removeChild(rows[i].lastElementChild); // removes last cell from each row
      }
    } else {
      console.log("No columns to remove."); // simple output
    }
}
function fillUncolored() {  }
function fillAll() {  }
function clearAll() {  }

// ===== Action menu wiring =====
// when user clicks "Run", check selected action and call right function
doActionBtn.addEventListener('click', () => {
  const action = actionSelect.value;
  if (action === 'add-row') addRow();
  else if (action === 'add-col') addColumn();
  else if (action === 'remove-row') removeRow();
  else if (action === 'remove-col') removeColumn();
  else if (action === 'fill-uncolored') fillUncolored();
  else if (action === 'fill-all') fillAll();
  else if (action === 'clear-all') clearAll();
  updateGridSizeLabel(); // always refresh size label
});

// when user changes color dropdown, update swatch square
colorPicker.addEventListener('change', () => {
  swatch.style.backgroundColor = colorPicker.value;
});

// initialize label on load
updateGridSizeLabel();
