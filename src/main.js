// Buttons
var homeButton = document.querySelector(".home-button");
var randomCoverButton = document.querySelector(".random-cover-button");
var saveCoverButton = document.querySelector(".save-cover-button");
var viewSavedCoversButton = document.querySelector(".view-saved-button");
var makeNewCoverButton = document.querySelector(".make-new-button");
// Cover elements
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");
// Views
var homeView = document.querySelector(".home-view");
var formView = document.querySelector(".form-view");
var savedView = document.querySelector(".saved-view");
var savedCoverSection = document.querySelector(".saved-covers-section"); 
// Form elements
var userInputCover = document.querySelector(".user-cover");
var userInputTitle = document.querySelector(".user-title");
var userInputDesc1 = document.querySelector(".user-desc1");
var userInputDesc2 = document.querySelector(".user-desc2");
var createNewBookButton = document.querySelector(".create-new-book-button");

var savedCovers = [];
var currentCover = {}

document.addEventListener("DOMContentLoaded", getRandomCover);
randomCoverButton.addEventListener("click", getRandomCover);
makeNewCoverButton.addEventListener("click", makeYourOwnCoverClicked);
viewSavedCoversButton.addEventListener("click", viewSavedCoversClicked);
homeButton.addEventListener("click", homeButtonClicked);
createNewBookButton.addEventListener("click", createNewCover);
saveCoverButton.addEventListener("click", saveCover);
savedCoverSection.addEventListener("dblclick", removeCover);


function getRandomCover() {
  var currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
};

function makeYourOwnCoverClicked(){
  homeView.classList.add('hidden');
  formView.classList.remove('hidden');
  savedView.classList.add('hidden');
  homeButton.classList.remove('hidden');
  saveCoverButton.classList.add('hidden');
  makeNewCoverButton.classList.remove('hidden');
  randomCoverButton.classList.add('hidden');
  viewSavedCoversButton.classList.remove('hidden');

};

function viewSavedCoversClicked() {
  homeView.classList.add('hidden');
  formView.classList.add('hidden');
  savedView.classList.remove('hidden');
  homeButton.classList.remove('hidden');
  saveCoverButton.classList.add('hidden');
  makeNewCoverButton.classList.remove('hidden');
  randomCoverButton.classList.add('hidden');
  viewSavedCoversButton.classList.remove('hidden');
  savedCoverSection.innerHTML = ``;
  showSavedCovers();
};

function homeButtonClicked() {
  homeView.classList.remove('hidden');
  formView.classList.add('hidden');
  savedView.classList.add('hidden');
  homeButton.classList.add('hidden');
  saveCoverButton.classList.remove('hidden');
  makeNewCoverButton.classList.remove('hidden');
  randomCoverButton.classList.remove('hidden');
  viewSavedCoversButton.classList.remove('hidden');
  savedCoverSection.innerHTML = ``;
}

function showSavedCovers(){
  var len = savedCovers.length
  for(var i=0;i<len;i++){
    savedCoverSection.innerHTML += `
    <section class="mini-cover">
        <img class="cover-image" id="${savedCovers[i].id}" src="${savedCovers[i].cover}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      </section>
    `
  }
}

function saveCover(){
  var savedCoverImage = coverImage.src
  var savedTitle = coverTitle.innerText
  var savedDesc1 = tagline1.innerText
  var savedDesc2 = tagline2.innerText
  var savedCover = new Cover(savedCoverImage,savedTitle,savedDesc1,savedDesc2)
  var originalCover = true
  for(var i = 0 ; i < savedCovers.length ; i++) {
    if(savedCoverImage === savedCovers[i].cover && savedTitle === savedCovers[i].title && savedDesc1 === savedCovers[i].tagline1 && savedDesc2 === savedCovers[i].tagline2) {
        originalCover = false;
        alert("This Cover has already been saved!")
    }
  }
  if (originalCover === true) {
    savedCovers.push(savedCover);
  }
}

function createNewCover(){
  event.preventDefault();
  if(!userInputCover.value || !userInputTitle.value || !userInputDesc1.value || !userInputDesc2.value) {
    alert("Please fill out all fields");
  } else {
      coverImage.src = userInputCover.value;
      coverTitle.innerText = userInputTitle.value;
      tagline1.innerText = userInputDesc1.value;
      tagline2.innerText = userInputDesc2.value;
      currentCover = new Cover(coverImage.src, coverTitle.innerText, tagline1.innerText, tagline2.innerText);
      pushValuesToArray();
      homeButtonClicked();
      document.querySelector("form").reset();
    };
};

function pushValuesToArray(){
  covers.push(userInputCover.value);
  titles.push(userInputTitle.value);
  descriptors.push(userInputDesc1.value);
  descriptors.push(userInputDesc2.value);
}

function removeCover(event) {
  var coverId = event.target.id
  for(var i=0;i<savedCovers.length;i++){
    if(coverId === `${savedCovers[i].id}`){
      savedCovers.splice(i,1)
    }
  }
viewSavedCoversClicked();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};
