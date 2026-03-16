let currentEditingId = null;

function edit() {
    let s = Object.keys(sel);
    if (s.length) {
        currentEditingId = s.pop();
        let p = ods[currentEditingId];console.log(p);clearsel();
        document.querySelector('.edit1').innerHTML = renderEditUI(p);
        document.querySelector('.edit #my56').innerHTML = gentbl(p.od);
        document.querySelector('#modal').classList.add('dn');
        let tot=document.querySelector('#tblom1[name]').getAttribute("name");
        document.querySelector('#save').innerHTML='Save Total - '+tot+'pcs';
    }
}

function renderEditUI(p) {
    return `<style>.edit input::-webkit-outer-spin-button,.edit input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}.edit input {-moz-appearance:textfield;}.edit input{text-align: center;}div.bd {padding: 10px 10px 0 10px;margin-bottom: 4px;overflow: auto;font-size: 18px;font-family: sans-serif;font-weight: 600;border-style: dashed;border-width: 0.5px;}table, th, td {border: 1px solid black;border-collapse: collapse;text-align: center;font-weight: 600;padding:2px}#tblom1 {width: 100%;border: none;margin: 10px 0;}#tblom1  tbody tr:first-child{color:blue;background: #ffdfdd;}</style>
    <div class="fw p12 w3-indigo" style="margin-top: 170px;">${p.odid.slice(-13)} | ${p.nm} | ${p.shp}</div>
    <div class="w3-top w3-topbar w3-border w3-white" style="max-width: 980px;">
        <div class="fx">
            <div class="w3-half">
                <select id="newType" class="w3-select w3-border" onchange="updateColors()">
                    <option value="" disabled selected>Select Type</option>
                    ${Object.keys(tbl[0]).map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
            </div>
            <div class="w3-half">
                <select id="newColor" class="w3-select w3-border" onchange="renderSizeInputs()" disabled>
                    <option value="" disabled selected>Select Color</option>
                </select>
            </div>
        </div>
        <div id="sizeContainer" class="fw" style="height: 80px;">
            <!-- Size inputs will be here -->
        </div>
        <div>
            <div id="save" class="w3-border w3-button w3-right w3-red" onclick="backedit('${p.odid.slice(-13)}')">Save Total - 0</div>
            <button class="w3-button w3-green" onclick="addItem()">Update</button>
        </div>
    </div>`;
}

function updateColors() {
    const type = document.getElementById('newType').value;
    const colorSelect = document.getElementById('newColor');
    colorSelect.innerHTML = '<option value="" disabled selected>Select Color</option>' +
        Object.keys(tbl[0][type]).map(c => `<option value="${c}">${c}</option>`).join('');
    colorSelect.disabled = false;
    document.getElementById('sizeContainer').innerHTML = '';
}

function renderSizeInputs() {
    const type = document.getElementById('newType').value;
    const color = document.getElementById('newColor').value;
    const container = document.getElementById('sizeContainer');
    if (!type || !color) return;
    const sizes = Object.keys(tbl[0][type][color]);
    const p = ods[currentEditingId];
    const currentQty = (p.od[type] && p.od[type][color]) ? p.od[type][color] : {};
    let html = '';let ss='';
    sizes.forEach(size => {
        const qty = currentQty[size] || '';
        ss += `<span class="w3-block w3-border-right w3-button">${size}</span>`;
        html += `<div>
            <input class="w3-input w3-border size-input" type="number" min="0" data-size="${size}" value="${qty}" title="${size}">
        </div>`;
    });
    container.innerHTML = '<div class="fx w3-green" style="justify-content: space-around;">'+ss+'</div><div class="fx" style="justify-content: space-around;">'+html+'</div>';
}
addItem.p=[];
function addItem() {
    const type = document.getElementById('newType').value;
    const color = document.getElementById('newColor').value;
    if (!type || !color) {alert("Please select Type and Color");return;}
    if(!(addItem.p[currentEditingId])){
        addItem.p[currentEditingId] = structuredClone(ods[currentEditingId]);
    }
    let p=addItem.p[currentEditingId];
    if (!p.od[type]) p.od[type] = {};
    if (!p.od[type][color]) p.od[type][color] = {};
    const inputs = document.querySelectorAll('.size-input');
    inputs.forEach(input => {
        const size = input.getAttribute('data-size');
        const qty = parseInt(input.value);
        if (qty > 0) {
            p.od[type][color][size] = qty;
        } else {
            delete p.od[type][color][size];
        }
    });
    if (Object.keys(p.od[type][color]).length === 0) {
        delete p.od[type][color];
    }
    if (Object.keys(p.od[type]).length === 0) {
        delete p.od[type];
    }
    
    document.querySelector('.edit #my56').innerHTML = gentbl(p.od);
    let tot=document.querySelector('#tblom1[name]').getAttribute("name");
    document.querySelector('#save').innerHTML='Save Total - '+tot+'pcs';addItem.tot=tot;
    p.shp=tot+p.shp.slice(-2);if(p?.dl?.length){dl[0]=Number(tot)}
}

document.querySelector('.edit #my56').addEventListener('click', function (e) {
    let t=e.target;//console.dir(t);
    const cl=t.closest('tr');
    if (cl) {
        let s=cl.children[2]?.tagName.toLowerCase();
        console.log('pass',cl,s);
       if (s === 'td'){
           const d=cl.dataset;
           const el=document.querySelector('#newType');
           el.querySelector(`option[value='${d.t}']`).selected=true;
           el.dispatchEvent(new Event('change'));
           const el1=document.querySelector('#newColor');
           el1.querySelector(`option[value='${d.c}']`).selected=true;
           el1.dispatchEvent(new Event('change'));
        }
    }else{
        console.log('none',cl);
    }
});
function backedit(v) {
    document.querySelector('#modal').classList?.remove('dn');
    document.querySelector("#b"+v+" > div:nth-child(3)").innerHTML=addItem.tot;
    ods[v]=addItem.p[v];console.log(ods[v]);
    let s = { "q": "ed", "v": ods[v] };
    let fmd = new FormData(); fmd.append("myd", JSON.stringify(s));
    fetch("https://script.google.com/macros/s/AKfycbwAERsQuAd05odSohoOxFDFN6fvL5jznyTWt7aGou2CJPHd2GgOliAmxFljAfmJFMq-/exec", { method: 'POST', body: fmd }).then(res => res.json()).finally((v) => {
        snackbar('Updated', 1000); console.log('Updated');
        // Update Live Website sheet with edited order data
        updateLiveWebOrder(currentEditingId, ods[currentEditingId].od);
    })
}