const APIurl2 = "../API/product-search";
const SearchForm = document.querySelector('#formElem');

function searchForProduct(form) {
  
  fetch(url=APIurl2,{method: "POST", body:JSON.stringify({
    body:document.querySelector('#input-form-product-name')

  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }}
  )
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
  cardImage.classList.add("card-product-image");
  card.appendChild(cardImage);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-product-title");
  cardTitle.textContent = cardTitleText;
  card.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.classList.add("card-product-text");
  cardText.textContent = cardTextText;
  card.appendChild(cardText);

  return card;
};

function createProductsCards(cardsProperties) {
  if (cardsProperties == null) {
    const card = CreateOneSliderPanel(ImgsRootPath + "default.jpg", "Title", "Lorem ipsum");
    SearchForm.appendChild(card);
  }
  else {
    cardsProperties.forEach(element => {
      const card = CreateOneSliderPanel(element[0], element[1], element[2]);
      SearchForm.appendChild(card);
    });
  }
};

/////////////////////////////////
//Execution starts here
//make button OnClick haandler which handles submiting form
