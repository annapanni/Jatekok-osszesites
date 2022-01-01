"use strict"

const tabla = document.querySelector(".tablazat")
for (let i=0; i<12; i++){
  const r = tabla.insertRow()
  const elso = i*3 + 1
  if (i === 0){
    const c = r.insertCell()
    c.innerHTML = `<img src="red_token.png" id="_0_00_1_2_3" class="token">`
  }else{
    //line
    let c = r.insertCell()
    let bets = []
    for (let x=0; x<6; x++) bets.push(elso+x)
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //split 1
    c = r.insertCell()
    bets = [elso, elso+3]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //corner 1
    c = r.insertCell()
    bets = [elso, elso+1, elso+3, elso+4]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    // split 2
    c = r.insertCell()
    bets = [elso+1, elso+4]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    //corner 2
    c = r.insertCell()
    bets = [elso+1, elso+2, elso+4, elso+5]
    c.innerHTML = `<img src="red_token.png" id="_${bets.join("_")}" class="token">`
    // split 3
    c = r.insertCell()
    bets = [elso+2, elso+5]
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
