"use strict"
const images = ["citrom.jpeg", "csengo.jpg", "cseresznye.png", "csillag.png", "fa.png", "virag.jpeg"]
const randint = (a, b) => Math.trunc(Math.random() * b) + a
let balance = 500
let done = ["","","",]

function changeBalance(x) {
  balance = x
  balanceP.textContent = `Egyenleg: ${balance} HUF`
}

function endAnimation(img, scrollOutImg, parent){
  img.classList.remove("scrolling-in")
  parent.removeChild(scrollOutImg)
}

function randomImgSrc(img, parent, duration) {
  const newSrc = images[randint(0, images.length)]
  const oldSrc = img.src

  const scrollOutImg = document.createElement("img")
  parent.appendChild(scrollOutImg)
  scrollOutImg.src = oldSrc
  scrollOutImg.classList.add("a-image")
  scrollOutImg.classList.add("scrolling-out")
  scrollOutImg.style.animationDuration = `${duration/1000}s`;

  img.src = newSrc
  img.classList.add("scrolling-in")
  img.style.animationDuration = `${duration/1000}s`;

  setTimeout(endAnimation, duration, img, scrollOutImg, parent)
  return newSrc
}

function finalImg(img, parent, duration){
  const newSrc = randomImgSrc(img ,parent, duration)
  img.classList.add("finalImg")
  done.push(newSrc)
  if (done.length === 3){
    let counter = {}
    let max = 0
    for (let s of done){
      counter[s] = counter[s]? counter[s] + 1: 1
      max = max < counter[s]? counter[s]: max
    }
    if (max === 2) changeBalance(balance + 70)
    else if (max === 3) changeBalance(balance + 600)
  }
}

function rollImg(img, parent){
  img.classList.remove("finalImg")
  const rolls = randint(15, 18)
  for (let i = 0; i < rolls; i++){
    setTimeout(randomImgSrc, i*i*10, img, parent, Math.abs(i*i - (i-1)*(i-1)) * 10)
  }
  setTimeout(finalImg, rolls * rolls * 10 , img, parent, Math.abs(rolls*rolls - (rolls-1)*(rolls-1)) * 10)
}

function rollAllImg() {
  if (done.length === 3){
    done = []
    changeBalance(balance - 50)
    for (let [index, img] of aImages.entries()) rollImg(img, imgDivs[index])
  }
}

const automataDiv = document.querySelector(".automata")
const gombokDiv = document.querySelector(".gombok")
const balanceP = document.querySelector(".egyenlegP")
const kar = document.querySelector(".kar")

const aImages = []
for (let i=0; i<3;i++){
  const imDiv = document.createElement("div")
  imDiv.classList.add("img-div")
  const im = document.createElement("img")
  im.classList.add("a-image")
  randomImgSrc(im, imDiv, 4000)
  aImages.push(im)
  imDiv.appendChild(im)
  automataDiv.appendChild(imDiv)
}
const imgDivs = document.querySelectorAll(".img-div")

kar.addEventListener("click", function () {
  kar.classList.add("pulled")
  setTimeout(()=>kar.classList.remove("pulled"), 1500)
  rollAllImg()
})
changeBalance(balance)
