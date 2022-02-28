const showBtn = document.getElementById("show");
const clearBtn = document.getElementById("clear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const hideBtn = document.getElementById("hide");
const addBtn = document.getElementById("add-card");

const cardsContainerEl = document.getElementById("cards-container");
const addContainerEl = document.getElementById("add-container");
const currentEl = document.getElementById("current");

const wordEl = document.getElementById("word");
const definitionEl = document.getElementById("definition");

let currentActiveCard = 0;
const cardsEl = [];

//Add card data to local storage
const setCardsData = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
};

//Get card data from local storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
};

//Add a new card
showBtn.addEventListener("click", () => addContainerEl.classList.add("show"));

hideBtn.addEventListener("click", () =>
  addContainerEl.classList.remove("show")
);

addBtn.addEventListener("click", () => {
  const word = wordEl.value;
  const definition = definitionEl.value;

  if (word.trim() && definition.trim()) {
    const newCard = { word, definition };

    createCard(newCard);

    wordEl.value = "";
    definition.value = "";

    addContainerEl.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  } else {
    alert(`Please write down what you want to remember!`);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainerEl.innerHTML = "";
  window.location.reload();
});

//Create all cards
const cardsData = getCardsData();

const createCards = () => {
  cardsData.forEach((data, index) => createCard(data, index));
};

//Display single card to DOM
const createCard = (data, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.word}</p>
    </div>
    
    <div class="inner-card-back">
      <p>${data.definition}</p>
    </div>
  </div>
  `;

  cardsEl.push(card);
  cardsContainerEl.appendChild(card);
  showCardIndex();

  //Add event listener to flip the card
  card.addEventListener("click", () =>
    card.classList.toggle("show-definition")
  );
};

const showCardIndex = () => {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
};

createCards();

//Add event listener to move to previous or next card
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right"; //Use to overwrite the class already there

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  showCardIndex();
});

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left"; //Use to overwrite the class already there

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  showCardIndex();
});
