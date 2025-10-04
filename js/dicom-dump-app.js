import wasm_init, { dump_to_json } from "../wasm/dicom-dump.js";
console.debug("loading dicom_dump app...");
await wasm_init();
console.debug("dicom_dump_js loaded!");
const container = document.getElementById('dicom-dump-container');

let fileinput = null;

/** @type {HTMLTableElement | null} */
let dumpTable = null;

/** @type {HTMLSpanElement | null} */
let errorSpan = null;

function init() {
    container.innerHTML = '';
    fileinput = document.createElement('input');
    fileinput.type = 'file';
    fileinput.accept = 'application/dicom,.dcm,*';

    const h = document.createElement('h3');
    h.innerText = 'Live DICOM meta-data inspector';

    const lbl1 = document.createElement('span');
    lbl1.innerHTML = `Open a DICOM file here to see its meta-data.`;

    const lbl2 = document.createElement('span');
    lbl2.innerHTML = `
    <p><em>
        Don't worry, the file stays on your computer.
        See the source code <a href=\"https://github.com/dicom-rs/website/tree/main/rust/dicom-dump-js\">here</a>.
    </em></p>
    `;

    container.appendChild(h);
    container.appendChild(lbl1);
    container.appendChild(fileinput);
    container.appendChild(lbl2);

    fileinput.addEventListener("change", handleFiles, false);
}

/**
 * @this {HTMLInputElement}
 */
async function handleFiles() {
    if (!this.value) return;

    console.debug(`Will load file ${this.value}`);
    let file = this.files[0];

    let fileData = await file.arrayBuffer();
    try {
        let dump = dump_to_json(new Uint8Array(fileData));

        updateTableWith(dump);
    } catch (e) {
        console.error(`Failed to open ${this.value} as a DICOM file:`, e);

        if (dumpTable) {
            dumpTable.remove();
            dumpTable = null;
        }
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error');
        }
        errorSpan.innerText = `Error: ${e.message} (is this a valid DICOM file?)`;
        container.appendChild(errorSpan);
    }
}

/**
 * @param {Array<{tag: string, alias: string, vr: string, value: string}>} dump 
 */
function updateTableWith(dump) {
    let attach = false;

    if (errorSpan) {
        errorSpan.remove();
        errorSpan = null;
    }

    if (!dumpTable) {
        dumpTable = document.createElement('table');
        let headRow = document.createElement('thead');
        headRow.innerHTML = '<tr><th>DICOM data dump</th></tr>';
        dumpTable.appendChild(headRow);
        dumpTable.appendChild(document.createElement('tbody'));
        attach = true;
    }

    // populate table
    let tbody = dumpTable.querySelector('tbody');

    // reset table (clearing it from previous data)
    tbody.innerHTML = '<tr><td>tag</td><td>value</td></tr>\n';

    for (const entry of dump) {
        const tr = document.createElement('tr');
        let tag = `${entry.alias}<br>${entry.tag}`;
        tr.innerHTML = `<td>${tag}</td><td>${entry.value}</td>\n`;
        tbody.appendChild(tr);
    }

    if (attach) {
        container.appendChild(document.createElement('hr'));
        container.appendChild(dumpTable);
    }
}

init();
