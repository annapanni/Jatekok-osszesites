"use strict"

function rmvFromList(list, item) {
  const i = list.indexOf(item)
  list.splice(i, 1)
}

const tabla = document.querySelector(".tablazat")

//fill table with the little tokens
for (let i=0; i<12; i++){
  const r = tabla.insertRow()
  const elso = i*3 + 1
  if (i === 0){
    const c = r.insertCell()
    c.innerHTML = `<img src="red_token.png" id="_0_-1_1_2_3" class="token">`
  }else{
    //line
    let c = r.insertCell()
    let bets = [elso-3, elso-2, elso-1, elso, elso+1, elso+2]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //split 1
    c = r.insertCell()
    bets = [elso-3, elso]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //corner 1
    c = r.insertCell()
    bets = [elso-3, elso-2, elso, elso+1]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    // split 2
    c = r.insertCell()
    bets = [elso-2, elso+1]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //corner 2
    c = r.insertCell()
    bets = [elso-2, elso-1, elso+1, elso+2]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    // split 3
    c = r.insertCell()
    bets = [elso-1, elso+2]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
  }
  const r2 = tabla.insertRow()
  //street
  let c2 = r2.insertCell()
  let bets2 = []
  for (let x=0; x<3; x++) bets2.push(elso+x)
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
  //straight up 1
  c2 = r2.insertCell()
  bets2 = [elso]
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
  //split 1
  c2 = r2.insertCell()
  bets2 = [elso, elso+1]
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
  //straight up 2
  c2 = r2.insertCell()
  bets2 = [elso+1]
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
  //split 2
  c2 = r2.insertCell()
  bets2 = [elso+1, elso+2]
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
  //straight up 3
  c2 = r2.insertCell()
  bets2 = [elso+2]
  c2.innerHTML = `<img src="red_token.png" id="_${bets2.join("_")}" class="token">`
}

const selected = []
const colors = {}
let currenColor = "red"
const sorrend = [30,26,9,28,0,2,14,35,23,4,16,33,21,6,18,31,19,8,12,29,25,10,27,-1,1,13,36,24,3,15,34,22,5,17,32,20,7,11]
const pirosok = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const prices = {
  "red":500,
  "blue":2000,
  "green":5000,
  "black":10000
}
const specFogadasok = {
  "eleje": x => 0<x && x<19,
  "vege": x => x>18,
  "paros": x => !x%2,
  "paratlan": x => x%2,
  "elso-harmad": x => 0<x && x<13,
  "masodik-harmad":x => 12<x && x<25,
  "harmadik-harmad":x => 24<x,
  "elso-oszlop": x => x%3===1,
  "masodik-oszlop": x => x%3===2,
  "harmadik-oszlop": x => x%3===0,
  "piros": x => pirosok.includes(x),
  "fekete": x => ! pirosok.includes(x),
}

const wheel = document.getElementById("kerek")
const btn = document.querySelector("button")
const display = document.getElementById("display-p")
const tokens = document.querySelectorAll(".token")
let rotation = 5
let prevWinnerIndex = 0

function harmasTagolas(num) {
  let n = String(num)
  const l = n.length
  const darabok = []
  for (let i=0; i<l/3; i++){
    darabok.push(n.slice(-3))
    n = n.slice(0,-3)
  }
  darabok.push(n)
  return darabok.reverse().join(" ").slice(1)
}

function evalSpin(winnerNumber){
  const payback = [0]
  for (let bet of selected){
    const betNums = bet.split("_").filter(x=>x).map(x=>Number(x))
    //t??bl??n k??v??li fogad??sok
    if (Object.keys(specFogadasok).includes(bet) && specFogadasok[bet](winnerNumber)){
      if (bet.includes("oszlop") || bet.includes("harmad")) payback.push(2 * prices[colors[bet]])
      else payback.push(prices[colors[bet]])
    }else if (betNums.includes(winnerNumber)){ //tabl??n bel??li fogad??sok
      payback.push(Math.trunc(36/betNums.length -1) * prices[colors[bet]])
    }else{
      payback.push(-prices[colors[bet]])
    }
  }
  display.innerHTML =
  `Nyeres??g: ${harmasTagolas(payback.filter(x=>x>=0).reduce((a, x)=>a+x))} Ft <br>
  Vesztes??g: ${harmasTagolas(-payback.filter(x=>x<=0).reduce((a, x)=>a+x))} Ft <br>
  ??sszesen: ${harmasTagolas(payback.reduce((a, x)=>a+x))} Ft`
}

function spin(){
  const ennyiszer = Math.trunc(Math.random() * 40) + 36
  let prevTime = 0
  for (let i=1; i<ennyiszer; i++){
    rotation += 360/38
    const r = rotation
    const t = i*i/10 + prevTime
    setTimeout(()=> {wheel.style.transform = `rotate(${r}deg)`;
      }, t)
    prevTime += i*i/10
  }
  setTimeout(() => {
    const index = (prevWinnerIndex + (ennyiszer-1)%38)%38
    const winnerNumber = sorrend[index]
    prevWinnerIndex = index
    evalSpin(winnerNumber)
  }, prevTime)
}

function changeToken(e) {
  const colour = e.target.id.replace("Token","")
  Array.from(document.querySelectorAll(".token"))
    .filter((x)=>!selected.includes(x.id))
    .forEach((item) => item.src = `${colour}_token.png`)
  currenColor = colour
}

tokens.forEach((t, i) => {t.addEventListener("click", function (e) {
  e.target.classList.toggle("clicked")
  colors[t.id] = currenColor
  if (selected.includes(t.id)) rmvFromList(selected, t.id)
  else selected.push(t.id)
  })});
btn.addEventListener("click", spin)
document.querySelectorAll(".colour-token")
  .forEach((t)=>t.addEventListener("click",changeToken))
document.querySelectorAll(".token-label")
  .forEach((item, i) => item.innerText = harmasTagolas(Object.values(prices)[i]));
