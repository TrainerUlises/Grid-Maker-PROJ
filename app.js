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
        let max = 0;
        const rows = tbody.getElementsByTagName('tr');
        for (const r of rows) {
          const count = r.children.length; // node.children
          if (count > max) max = count;
        }
        return max;
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

    // loop through each row and remove its last cell
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells.length > 0) {
            rows[i].deleteCell(-1); // remove last cell
        }
    }

    // clean up: remove rows that are now empty (0 cells left)
    for (let i = rows.length - 1; i >= 0; i--) {
        if (rows[i].cells.length === 0) {
            tbody.removeChild(rows[i]);
        }
    }

    updateGridSizeLabel(); // make sure label stays correct
}
function fillUncolored() {  
    const cells = tbody.getElementsByTagName('td');
    const color = colorPicker.value;

    for (let cell of cells) {
        // Only fill cells that are still white/uncolored
        if (cell.style.backgroundColor === '' || cell.style.backgroundColor === 'white') {
            cell.style.backgroundColor = color;
        }
    }
}
function fillAll() {  
    const color = colorPicker.value; // gets color
    const cells = tbody.getElementsByTagName('td'); // all cells in grid are selected

    for(let cell of cells){
        cell.style.backgroundColor = color; // overwrite all cells
    }
}
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
