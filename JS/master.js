// settings
//Color settings
document.querySelector(".settings-box i").onclick = function () {
  document.querySelector(".settings-box").classList.toggle("open");
};
let colorLi = document.querySelectorAll(".box li");

let mainColors = localStorage.getItem("color_option");

if (mainColors != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  document.querySelectorAll(".box li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color == mainColors) {
      element.classList.add("active");
    }
  });
}

colorLi.forEach((li) => {
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
//Background settings
let backgroundLi = document.querySelectorAll(".box .background-option span");

let localBackground = localStorage.getItem("background_option");

let backgroundOption = true;
let backgroundInterval;

if (localBackground != null) {
  if (localBackground === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document
    .querySelectorAll(".box .background-option span")
    .forEach((element) => {
      element.classList.remove("active");

      if (element.dataset.background == localBackground) {
        element.classList.add("active");
      }
    });
}

backgroundLi.forEach((span) => {
  span.addEventListener("click", function (e) {
    localStorage.setItem("background_option", e.target.dataset.background);
    handleActive(e);

    if (e.target.dataset.background === "true") {
      backgroundOption = true;
      controlImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// landing
let landing = document.querySelector(".landing");
let imgsArr = [
  "blob-scatter-haikei.png",
  "blob-scene-haikei.png",
  "layered-waves-haikei.png",
  "polygon-scatter-haikei.png",
  "stacked-steps-haikei.png",
];
// let randomNum = Math.floor(Math.random() * imgsArr.length);
// console.log(randomNum);
function controlImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArr.length);
      landing.style.backgroundImage = 'url("./img/' + imgsArr[randomNum] + '")';
    }, 1000);
  }
}
controlImg();

//skills
let skills = document.querySelector(".skills");
window.onscroll = function () {
  let skillOffsetTop = skills.offsetTop;
  let skillOffsetHeight = skills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};

//img popUp
let allImg = document.querySelectorAll(".gallary .img-container img");

allImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlayPopup = document.createElement("div");
    overlayPopup.classList = "popup-overlay";
    document.body.appendChild(overlayPopup);

    let imgBox = document.createElement("div");
    imgBox.classList = "imgBox-popup";

    if (img.alt !== null) {
      let popupHeader = document.createElement("h3");
      let headerText = document.createTextNode(img.alt);
      popupHeader.appendChild(headerText);
      imgBox.appendChild(popupHeader);
    }
    let image = document.createElement("img");
    image.src = img.src;

    imgBox.appendChild(image);
    document.body.appendChild(imgBox);

    let closePopup = document.createElement("span");
    closePopup.className = "close-popup";
    let closeText = document.createTextNode("x");
    closePopup.appendChild(closeText);
    imgBox.appendChild(closePopup);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-popup") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//bullets
const allBullets = document.querySelectorAll(".bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    console.log(e.target.dataset.section);
    document.querySelector(e.target.dataset.section).scrollIntoView({
      // behavior: 'smooth'
      behavior: "smooth",
    });
  });
});
//Show Bullets
let bulletsOption = document.querySelectorAll(".box .bullets-option span");
let bullets = document.querySelector(".bullets");
let bulletLocal = localStorage.getItem("bullet-options");
if (bulletLocal !== null) {
  bulletsOption.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocal === "true") {
    bullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "true") {
      bullets.style.display = "block";
      localStorage.setItem("bullet-options", e.target.dataset.display);
    } else {
      bullets.style.display = "none";
      localStorage.setItem("bullet-options", e.target.dataset.display);
    }

    handleActive(e);
  });
});

//active function
function handleActive(event) {
  event.target.parentElement
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));
  event.target.classList.add("active");
}
//Reset
document.querySelector(".reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

//Add Open class to links-container
let linksContainer = document.querySelector(".links-container");
let icon = document.querySelector(".links-container i");
let links = document.querySelector(".links-container ul");
linksContainer.onclick = function () {
  this.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if ((e.target !== icon) & (e.target !== links)) {
    if(linksContainer.classList.contains('open')){
    linksContainer.classList.toggle("open");
    }
  }
});
links.addEventListener("click", (e) => {
  e.stopPropagation();
});
