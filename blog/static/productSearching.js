APIurl = "http://127.0.0.1:8000/API/productSearch";

function searchForProduct() {
  
  fetch(APIurl)
    .then((response) => {
      return (response.ok) ? response.json() : null
    })
    .then((data) => {
      createProductsCards(data);
    })
    
};

function createOneProductCard(cardImageSource, cardTitleText, cardTextText) {
  
  const card = document.createElement("div");
  card.classList.add("standard-card");

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", cardImageSource);
  cardImage.classList.add("card-image");
  card.appendChild(cardImage);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = cardTitleText;
  card.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = cardTextText;
  card.appendChild(cardText);

  return card;
};

function createProductsCards(cardsProperties) {
  if (cardsProperties == null) {
    const card = CreateOneSliderPanel(ImgsRootPath + "default.jpg", "Title", "Lorem ipsum");
    slider.appendChild(card);
  }
  else {
    cardsProperties.forEach(element => {
      const card = CreateOneSliderPanel(element[0], element[1], element[2]);
      slider.appendChild(card);
    });
  }
};

/////////////////////////////////
//Execution starts here
searchForProduct()
