// const newNoteButton = document.getElementById('save-button');
const newNoteButton = document.querySelector("#save-button");
newNoteButton.addEventListener("click", addNote);
const filterDDL = document.querySelector('#standard-select');
filterDDL.addEventListener("change", (event) => {
  getContacts(event.target.value)});
window.addEventListener('DOMContentLoaded', (event) => {
  getContacts('ALL');
});
document.querySelector('#searchy').addEventListener('keyup', searchList, false);


async function addNote(){
  let vclientID, vactionType, vnote, vcontactID;
  vactionType = document.querySelector('#action-select').value;
  vnote = document.querySelector(".new-note-input").value;
  //get selected contact recUIDContact & clientID
  
  const t = document.querySelector('.tbl-contacts');
  //loop all rows to remove class 'row-selected'
  for (let i = 0; i < t.rows.length; i++) {
    const e = t.rows[i].classList.contains('row-selected');
    if(e){
      vcontactID = t.rows[i].cells[0].lastElementChild.textContent;
      vclientID = t.rows[i].cells[3].innerText;
      break;
    }
  };
  console.log(vclientID,vcontactID);
  const link = 'http://localhost:3000/actions/';
  let headersList = {
    "Content-Type": "application/x-www-form-urlencoded"
   }
   let bodyContent = `clientID=${vclientID}&actionType=${vactionType}&note=${vnote}&contactID=${vcontactID}`;
   await fetch(link, { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   }).then(function(response) {
     return response.text();
   }).then(function(data) {
     //refresh action list
     getActions(vclientID)
     //clear input flds
     clrActionInputs()
   })

};

function clrActionInputs(){
  const sel = document.querySelector('#action-select');
  const inp = document.querySelector(".new-note-input");
  if(sel.value != 0){
    sel.value = 0;
    toggleActionDisplay(sel);
  }
  inp.value = '';
  actionInputOUT(inp);

}


async function getContacts(filter){
  let link = 'http://localhost:3000/contacts/'+filter;
  await fetch(link)
    .then( response => response.json() )
    .then( response => {
      loadContacts(response);
    });
};

async function getPatients(recordID){
  let url = new URL('http://localhost:3000/patients');
  url.searchParams.set('id', recordID);
  const response = await fetch(url);
  const resJson = await response.json(); 
  loadPatients(resJson);
}

async function getActions(recordID){
  let url = new URL('http://localhost:3000/actions');
  url.searchParams.set('id', recordID);
  const response = await fetch(url);
  const resJson = await response.json(); 
  loadActions(resJson);
}



function loadContacts(data){
  const tbody = document.querySelector('.contact-body');
  let s = '';
  let PROC = '';
  let INC = '';
  let STAT = '';
  let sel = '';
  let recID = '';
  let clientID = '';
  const incCHK = `<img class="icon" onclick="contactToggleINC(this,'contact')" src="img/check-mark.png" alt="Check Mark"></img>`;
  const procCHK = `<img class="icon" src="img/check-mark.png" alt="Check Mark"></img>`;
  const RED_X = `<img class="icon" onclick="contactToggleINC(this,'contact')" src="img/RED_X.png" alt="Check Mark"></img>`;

  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    INC = (record.include === 1) ? incCHK : RED_X;
    PROC = (record.processed === 1) ? procCHK : '';
    STAT = (record.clientStatusID === 19) ? `A` : 'I';
    emailDiv = '';
    //set up first record for selection
    if(i === 0){
      recID = record.recUID;
      clientID = record.clientID;
      sel = 'row-selected';
    } else {
      sel = '';
    }
    //setup INC toggle warning msg
    if(record.email==''){
      emailDiv = `<div id="msgWarning" class="truncate">No Email Address</div>`
    } else {
      emailDiv = `<div class="truncate">${record.email}</div>`
    }
    s +=`  <tr class="contact-item ${sel}" onclick="toggleSelect(this)">
        <td class="cname">
          <div class="truncate">${record.fullName}</div>
          <p hidden class="recordID">${record.recUID}</p>
        </td>
        <td class="caddress">
          <div class="truncate">${record.address}</div>
        </td>
        <td class="cemail">
          ${emailDiv}
        </td>
        <td class="cid">${record.clientID}
        </td>
        <td class="cphone">${record.phone}
        </td>
        <td class="cstat">${STAT}
        </td>
        <td class="cproc">${PROC}
        </td>
        <td class="cinc">${INC}
        </td>
      </tr>`
  }
  tbody.innerHTML = s;
  getPatients(recID);
  getActions(clientID);
};

function loadPatients(data){
  const tbody = document.querySelector('.patient-body');
  let s = '';
  let INC = '';
  let pastDueFormat = ''; 'class="past-due-service"';
  const incCHK = `<img class="icon" onclick="patientToggleINC(this,'patient')" src="img/check-mark.png" alt="Check Mark"></img>`;
  const RED_X = `<img class="icon" onclick="patientToggleINC(this,'patient')" src="img/RED_X.png" alt="Check Mark"></img>`;
  let CurrentDate = new Date();
  
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    INC = (record.Include === 1) ? incCHK : RED_X;
    let dueDate = new Date(record.DueDate);
    pastDueFormat = (dueDate >= CurrentDate) ? '' : 'class="past-due-service"';
    s += `<tr class="patient-item">
        <td class="ppatient">
          <div class="truncate">${record.PatientName}</div>
          <p hidden class="recordID">${record.recUID}</p>
        </td>
        <td class="pservice">
          <div class="truncate">${record.ServiceDesc}</div>
        </td>
        <td class="pduedate"><span ${pastDueFormat}>${formatDate(record.DueDate)}</span></td>
        <td class="pinclude">${INC}
        </td>
      </tr>`
  }
  tbody.innerHTML = s;
};

function loadActions(data){
  const tbody = document.querySelector('.actions-body');
  let s = '';
  
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    s += `<tr class="selected-row action-item">
        <td class="adate">${formatDate(record.ActionDate)}</td>
        <td class="aaction">${record.CodeDesc}</td>
        <td class="anotes">
          <div class="truncate">${record.Note}</div>
        </td>
      </tr>`
  }
  tbody.innerHTML = s;
};



function toggleSelect(x){
  const y = x.classList.contains('row-selected');
  const recordID = x.cells[0].lastElementChild.textContent;
  const contactID = x.cells[3].innerText;
  clrActionInputs();
  //if not currently selected:
  if(!y){
    const t = document.querySelector('.tbl-contacts');
    //loop all rows to remove class 'row-selected'
    for (let i = 0; i < t.rows.length; i++) {
      const e = t.rows[i].classList.contains('row-selected');
      if(e){
        t.rows[i].classList.toggle('row-selected');
      }
    };
    //set current row class to 'row select' 
    x.classList.toggle('row-selected');
  };
  //load patients
  getPatients(recordID);
  //load actions
  getActions(contactID);
}

function contactToggleINC(x, caller) {
  //const email = x.parentNode.parentNode.cells[2].innerText;
  //console.log(x.parentNode.parentNode.cells[2]);
  const email = x.parentNode.parentNode.cells[2];
  if(email.firstElementChild.id === 'msgWarning'){
    //display no email warning in email cell
    showMsgWarning(email.firstElementChild);
  }else{
    //toggle INC value
    const recUID = x.parentNode.parentNode.cells[0].lastElementChild.textContent;
    const cell = x.parentNode.parentNode.cells[7];
    let link = 'http://localhost:3000/contacts/'+recUID;
    let headersList = {
      "Content-Type": "application/x-www-form-urlencoded"
     }
    let bodyContent = ``;
    const options = {
      method: 'PUT',
      body: JSON.stringify({recID:recUID})
      };
    fetch(link, {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    })
      .then( response => response.json() )
      .then( response => {
        toggleIncDisplay(cell, caller);
      });
  }
};

function patientToggleINC(x, caller) {
  const recUID = x.parentNode.parentNode.cells[0].lastElementChild.textContent;
  const cell = x.parentNode.parentNode.cells[3];
  let link = 'http://localhost:3000/patients/'+recUID;
  let headersList = {
    "Content-Type": "application/x-www-form-urlencoded"
   }
  let bodyContent = ``;
  const options = {
    method: 'PUT',
    body: JSON.stringify({recID:recUID})
    };
  fetch(link, {
    method: "PUT",
    body: bodyContent,
    headers: headersList
  })
    .then( response => response.json() )
    .then( response => {
      toggleIncDisplay(cell, caller);
    });
};

function toggleIncDisplay(cell, caller){
  //Toggle display value....
  let s = '';
  if(cell.innerHTML.includes('check-mark.png')){
    s = `<img class="icon" onclick="${caller}ToggleINC(this,'${caller}')" src="img/Red_X.png" alt="Check Mark"></img>`;
    cell.innerHTML = s;
  } else {
    s = `<img class="icon" onclick="${caller}ToggleINC(this,'${caller}')" src="img/check-mark.png" alt="Check Mark"></img>`;
    cell.innerHTML = s;
  }
};

function toggleActionDisplay(x){
  //change input colors
  if(x.value != 0){
    x.classList.remove('select-def');
    x.classList.add('select-change');
    document.querySelector('#save-button').disabled = false;
    document.querySelector('#save-button').title = '';
  }else{
    x.classList.remove('select-change');
    x.classList.add('select-def');
    document.querySelector('#save-button').disabled = true;
    document.querySelector('#save-button').title = 'New Action is required';
  }
}
function actionInputIN(x){
  //clr placeholder while typing, change color select-change
  x.placeholder='';
  x.classList.add('select-change');
};
function actionInputOUT(x){
  //if empty: add placeholder, reset color select-def
  if(x.value==''){
    x.placeholder='Optional note...'
    x.classList.add('select-def');
  }
};

function searchList(event) {
  let filter = event.target.value.toUpperCase();
  let rows = document.querySelector(".tbl-body").rows;
  
  for (let i = 0; i < rows.length; i++) {
      let col1 = rows[i].cells[0].textContent.toUpperCase();
      let col2 = rows[i].cells[1].textContent.toUpperCase();
      let col3 = rows[i].cells[2].textContent.toUpperCase();
      let col4 = rows[i].cells[3].textContent.toUpperCase();
      let col5 = rows[i].cells[4].textContent.toUpperCase();
      if (col1.indexOf(filter) > -1 || col2.indexOf(filter) > -1 || col3.indexOf(filter) > -1 || col4.indexOf(filter) > -1 || col5.indexOf(filter) > -1) {
          rows[i].style.display = "";
      } else {
          rows[i].style.display = "none";
      }      
  }
}


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

function showMsgWarning(elementWithMsg){
  //pass in element with hidden text
  //const text = x.parentElement.cells[1].firstChild;
  elementWithMsg.classList.remove("msghide");
  setTimeout(function () {
    elementWithMsg.classList.add("msgfade-in");
    setTimeout(function () {
      elementWithMsg.classList.remove("msgfade-in");
      setTimeout(function () {
        elementWithMsg.classList.add("msghide");
      }, 1000);
    }, 2000);
  });
};