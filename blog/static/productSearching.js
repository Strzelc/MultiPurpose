const APIurlProductSearch = "../API/product-search";
const HTML_SearchFormElement = document.querySelector('.searching-result');

function searchForProduct(form) {
  const loadingCircle = document.createElement("div");
  loadingCircle.classList.add("loading-circle-animated");
  HTML_SearchFormElement.appendChild(loadingCircle);
  
  var formData=new FormData(form);
  fetch(url=APIurlProductSearch, {
    
    body:JSON.stringify(Object.fromEntries(formData.entries())),
    headers: {
    'Content-type':  'application/json'
    
    },
    method: "POST"
  })
    .then((response) => {
      return (response.ok) ? response.json() : null
    })
    .then((data) => {
      createProductsCards(data);
    })
    
};

function createProductsCards(cardsProperties) {
  if (cardsProperties == null) {
    const card = CreateOneSliderPanel(ImgsRootPath + "default.jpg", "Title", "Lorem ipsum");
    HTML_SearchFormElement.appendChild(card);
  }
  else {
    if(HTML_SearchFormElement.childElementCount>0)
      HTML_SearchFormElement.replaceChildren();
    for(var i =0; i<cardsProperties["name"].length;i++ ){
      const card = createOneProductCard(cardsProperties["name"][i],cardsProperties["description"][i],cardsProperties["image_source"][i]); 
      HTML_SearchFormElement.appendChild(card);
    }
  }
};

function createOneProductCard(cardTitleText, cardTextText,cardImageSource) {
  
  const card = document.createElement("div");
  card.classList.add("product-card");

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", cardImageSource);
  cardImage.classList.add("card--image");
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

