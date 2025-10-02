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
function addRow() { /* IMPLEMENT IN FEATURE BRANCH */ }
function addColumn() { /* IMPLEMENT IN FEATURE BRANCH */ }
function removeRow() { /* IMPLEMENT IN FEATURE BRANCH */ }
function removeColumn() { /* IMPLEMENT IN FEATURE BRANCH */ }
function fillUncolored() { /* IMPLEMENT IN FEATURE BRANCH */ }
function fillAll() { /* IMPLEMENT IN FEATURE BRANCH */ }
function clearAll() { /* IMPLEMENT IN FEATURE BRANCH */ }

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
