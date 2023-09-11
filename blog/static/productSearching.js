const APIurlProductSearch = "../API/product-search";
const SearchForm = document.querySelector('.searching-result');

function searchForProduct(form) {
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
    SearchForm.appendChild(card);
  }
  else {
    console.log(cardsProperties);
    for(var i =0; i<cardsProperties["name"].length;i++ ){
      const card = createOneProductCard(cardsProperties["name"][i],cardsProperties["description"][i],cardsProperties["image_source"][i]); 
      SearchForm.appendChild(card);
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

