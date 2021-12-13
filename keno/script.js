"use strict"

const selected = []
let balance = 5000
const odds = [
  // 0 kijelölt
  {"nyeremenyek": ["∅","∅","∅","∅","∅","∅","∅","∅","∅","∅","∅"],
    "eselyek": ["∅","∅","∅","∅","∅","∅","∅","∅","∅","∅","∅"]
  },
  // 1 kijelölt
  {"nyeremenyek": ["∅", 2, "∅","∅","∅","∅","∅","∅","∅","∅","∅"],
    "eselyek": ["∅",4,"∅","∅","∅","∅","∅","∅","∅","∅","∅"]
  },
  // 2 kijelölt
  {"nyeremenyek": ["∅","∅", 6,"∅","∅","∅","∅","∅","∅","∅","∅"],
    "eselyek": ["∅","∅", 17,"∅","∅","∅","∅","∅","∅","∅","∅"]
  },
  // 3 kijelölt
  {"nyeremenyek": ["∅","∅", 1, 15,"∅","∅","∅","∅","∅","∅","∅"],
    "eselyek": ["∅","∅", 7, 72,"∅","∅","∅","∅","∅","∅","∅"]
  },
  // 4 kijelölt
  {"nyeremenyek": ["∅","∅","∅", 2, 100,"∅","∅","∅","∅","∅","∅"],
    "eselyek": ["∅","∅","∅", 23, 326,"∅","∅","∅","∅","∅","∅"]
  },
  // 5 kijelölt
  {"nyeremenyek": ["∅","∅","∅", 2, 10, 200,"∅","∅","∅","∅","∅"],
    "eselyek": ["∅","∅","∅", 12, 83, 1551,"∅","∅","∅","∅","∅"]
  },
  // 6 kijelölt
  {"nyeremenyek": [1,"∅","∅","∅", 3, 20, 500,"∅","∅","∅","∅"],
    "eselyek": [6,"∅","∅","∅", 35, 323, 7753,"∅","∅","∅","∅"]
  },
  // 7 kijelölt
  {"nyeremenyek": [1,"∅","∅","∅", 2, 6, 60, 5000,"∅","∅","∅"],
    "eselyek": [8,"∅","∅","∅", 19, 116, 1366, 40979,"∅","∅","∅"]
  },
  // 8 kijelölt
  {"nyeremenyek": [1, "∅","∅","∅","∅", 5, 25, 350, 2000, "∅","∅"],
    "eselyek": [11,"∅","∅","∅","∅", 55, 423, 6232, 230115,"∅","∅"]
  },
  // 9 kijelölt
  {"nyeremenyek": [2,"∅","∅","∅","∅", 3, 12, 100, 1200, 100000,"∅"],
    "eselyek": [16,"∅","∅","∅","∅", 31, 175, 1690, 30682, 1380688,"∅"]
  },
  // 10 kijelölt
  {"nyeremenyek": [2,"∅","∅","∅","∅", 1, 3, 30, 350, 8000, 1000000],
    "eselyek": [22,"∅","∅","∅","∅", 19, 87, 621, 7384, 163381, 8911711]
  }
]
const tickImage = "<img src=tick.png>"
const selectedInfo = document.getElementById("selected-info")
const table1 = document.getElementById("table1")
const table2 = document.getElementById("table2")
const oddsTable = document.getElementById("odds-table")
const doneBtn = document.getElementById("doneBtn")
const eredmenyJelzo = document.querySelector(".eredmenyJelzo")
const balanceJelzo = document.querySelector(".current-balance")

function randint(x){
  return Math.floor(Math.random()*x) + 1
}
function removeItem(arr, value){
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr
}

function changeSelectionInfo(){
  selectedInfo.innerHTML = `${selected.length} kiválsztva <br>
  Jegy ára: ${selected.length*150} HUF`
  for (const [i,r] of Object.entries(oddsTable.rows).slice(1)){
    const ny = odds[selected.length].nyeremenyek[i-1]
    r.cells[1].textContent = ny==="∅"? ny: ny + "×"
    const es = odds[selected.length].eselyek[i-1]
    r.cells[2].textContent = es==="∅"? es: "1:" + es
    if (ny !=="∅") r.classList.add("valid-odd")
    else r.classList.remove("valid-odd")
  }
}

function changeBalance(toX){
  balance = toX
  balanceJelzo.innerHTML = `Egyenleg:<br>${balance} HUF`
}

function max10error() {
  const prev = selecetedInfo.textContent
  selecetedInfo.textContent = "Nem lehet 10-nél többet választani!"
  setTimeout(() => selecetedInfo.textContent = prev, 1500)
}

function select(e){
  const n = Number(e.currentTarget.dataset.number)
  if (!selected.includes(n)) {
    if (selected.length >= 10){
      max10error()
      return
    }
    selected.push(n)
  }else{
    removeItem(selected, n)
  }
  e.currentTarget.children[1].classList.toggle("hidden")
  changeSelectionInfo()
}

function done(){
  let rolled = []
  while (rolled.length < 20){
    const r = randint(80)
    if (!rolled.includes(r)) rolled.push(r)
  }
  const talalt =  selected.filter( n => rolled.includes(n))
  const tippszam = selected.length
  const a = odds[tippszam].nyeremenyek[talalt.length]
  const szorzo = a !=="∅"? a: 0
  const diff = (szorzo-1)*tippszam*150
  eredmenyJelzo.innerHTML = `Húzottak: ${rolled.join(", ")}<br>
  Talált: ${talalt.join(", ")} (${talalt.length} db)<br>
  Nyeremény: ${diff} HUF`
  changeBalance(balance + diff)

  console.log(rolled, selected, talalt, diff);

}

function fillTable(table, start){
  for (let  r = 0; r < 4; r++){
    const row = table.insertRow()
    for (let c = 0; c < 10; c++){
      const cell = row.insertCell()
      cell.dataset.number = 10*r + c + start
      cell.addEventListener("click", select)
      const p = document.createElement("p")
      p.classList.add("number")
      p.textContent = cell.dataset.number
      cell.appendChild(p)
      const img = document.createElement("img")
      img.classList.add("hidden")
      img.src="tick.png"
      cell.appendChild(img)
    }
  }
}
function fillOddsTable(table) {
  for (let r=0; r<11; r++){
    const row = table.insertRow()
    const t = row.insertCell()
    t.textContent = r
    const ny = row.insertCell()
    ny.textContent = "∅"
    const es = row.insertCell()
    es.textContent = "∅"
  }
}

fillTable(table1, 1)
fillTable(table2, 41)
fillOddsTable(oddsTable)
changeBalance(balance)
doneBtn.addEventListener("click", done)
