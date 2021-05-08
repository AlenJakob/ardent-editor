const btns = document.querySelectorAll(".btn");
const editor = document.querySelector(".editor");

const init = () => {
  for (let btn of btns) {
    btn.addEventListener("click", () => {
      let cmd = btn.dataset["command"];
      document.execCommand(cmd, false, null);
    });
  }
};

const exportText = () => {
  let html = editor.innerHTML;
  let json = JSON.stringify(html);
  saveFile({ txtHtml: json })
  console.log();
  localStorage.setItem("currentText", JSON.stringify({ txtHtml: json }));
};

const importText = () => {
  loadFile()
  const textSaved = JSON.parse(localStorage.getItem("currentText"));
  // prevent from overwrite with empty string
  if (textSaved) {
    editor.innerHTML = textSaved.txtHtml
      .replaceAll("\\n", "")
      .substring(1)
      .slice(0, -1);
  } else {
    console.log("Text not save on local storage")
  }


};
document.querySelector(".btn-export").addEventListener("click", exportText);
document.querySelector(".btn-import").addEventListener("click", importText);

// clear local Storage & dom
document.querySelector(".btn-remove").addEventListener("click", () => {
  localStorage.clear();
  editor.innerHTML = "";
});

// Init setup
init();



const saveFile = (body) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }
  fetch('http://localhost:3000', options)
  console.log("tetst", body.txtHtml)
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
    }).catch(err =>
      console.log("err", err))
}
