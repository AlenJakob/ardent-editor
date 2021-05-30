const btns = document.querySelectorAll(".btn");
const editor = document.querySelector(".editor");
const textSaved = JSON.parse(localStorage.getItem("currentText"));
// Get purpose of buttons
const init = () => {
  for (let btn of btns) {
    btn.addEventListener("click", () => {
      let cmd = btn.dataset["command"];
      document.execCommand(cmd, false, null);
    });
  }
};
// Export data to LocalStorage & Json file
const exportText = () => {
  let html = editor.innerHTML;
  let json = JSON.stringify(html);
  saveFile({ txtHtml: json })


  console.log("object txthtm", { txtHtml: json })
  localStorage.setItem("currentText", JSON.stringify({ txtHtml: json }));
};

// Import data to Local Storage & Json
const importText = () => {
  console.log(textSaved)
  // prevent from overwrite with empty string local storage
  // Get data from local storage if exist other way read file 
  if (textSaved) {
    console.log("There is local storage")
    editor.innerHTML = textSaved.txtHtml
      .replaceAll("\\n", "")
      .substring(1)
      .slice(0, -1);
  } else if (!textSaved) {
    editor.innerHTML = 'no data Saved !'
    setTimeout(() => {
      editor.innerHTML = '';
      loadFile()
    }, 1000)
  }


};


// clear local Storage & dom
document.querySelector(".btn-remove").addEventListener("click", () => {

  if (textSaved) {
    localStorage.clear();
    fetch("http://localhost:3000/file-remove", {
      method: 'PUT'
    })
    editor.innerHTML = 'You have been remove data !'
    setTimeout(() => {
      editor.innerHTML = '';
    }, 2000)
  }else{
    editor.innerHTML = 'There is no Data to remove, please wrote your text !'
    setTimeout(() => {
      editor.innerHTML = '';
    }, 2000)
  }

});




const saveFile = (body) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }
  fetch('http://localhost:3000', options)
}

const loadFile = () => {
  fetch('http://localhost:3000/file')
    .then(response => response.json())
    .then(result => {
      if (result) {
        const rawData = JSON.parse(result).txtHtml.replaceAll("\\n", "")
          .substring(1)
          .slice(0, -1)
        editor.innerHTML = rawData
      }
    }).catch(err => {
      console.log("err", err)
    })
}
//  Export & Import listeners
document.querySelector(".btn-export").addEventListener("click", exportText);
document.querySelector(".btn-import").addEventListener("click", importText);

// Init setup
init();
