const catImg = document.querySelector("#cat");
const [leftEye, rightEye] = [...document.querySelectorAll(".eye")];
const [leftPupil, rightPupil] = [...document.querySelectorAll(".pupil")];

function onMouseMove(e) {
  const leftPupilOffset = getOffset(leftPupil);
  const leftDiff = {
    left: e.clientX - leftPupilOffset.left,
    top: e.clientY - leftPupilOffset.top,
  };

  leftPupil.style.left =
    (leftDiff.left / (window.innerWidth - leftEye.offsetWidth)) * 100 + "%";
  leftPupil.style.top =
    (leftDiff.top / (window.innerHeight - leftEye.offsetHeight)) * 100 + "%";

  const rightPupilOffset = getOffset(rightPupil);
  const rightDiff = {
    left: e.clientX - rightPupilOffset.left,
    top: e.clientY - rightPupilOffset.top,
  };

  rightPupil.style.left =
    (rightDiff.left / (window.innerWidth - rightEye.offsetWidth)) * 100 + "%";
  rightPupil.style.top =
    (rightDiff.top / (window.innerHeight - rightEye.offsetHeight)) * 100 + "%";
}

async function doWriteEffectOnElt(elt, newText = "") {
  const { innerText } = elt;

  const oldText = innerText.split("");
  for (let i = 1; i < innerText.length; i++) {
    await sleep(50);
    elt.innerText = oldText.slice(0, i * -1).join("");
  }
  // Not removing all letters; we keep the first one so the page doesn't shake weirdly

  const text = newText.split("");
  for (let i = 1; i <= newText.length; i++) {
    await sleep(50);
    elt.innerText = text.slice(0, i).join("");
  }
}

async function updateTitleText() {
  document.title = "Erreur 404 - Page introuvable";
  await doWriteEffectOnElt(
    document.querySelector(".title-container h1"),
    "Erreur 404."
  );
}

function updateTipText() {
  doWriteEffectOnElt(document.querySelector(".tip"), "Vive les chats.");
}

let isCatHovered = false;
async function onMouseOver(e) {
  if (isCatHovered) return;

  document.querySelector(".mouth").classList.add("smile");
  await updateTitleText();
  // Wait title to change before updating tip text.
  updateTipText();

  isCatHovered = true;
}

document.addEventListener("mousemove", onMouseMove);
catImg.addEventListener("mouseover", onMouseOver);

/* helpers.js */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
