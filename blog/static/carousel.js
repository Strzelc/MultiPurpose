const ImgsRootPath = "../static/images/"
const APIurl = "http://127.0.0.1:8000/blog/API/carousel";
const Carousel = document.querySelector('.carousel');
var Slider=document.createElement("div");
var LeftArrow =document.createElement("span");
var RightArrow =document.createElement("span");
var NavigationDots =document.createElement("ul");
var SectionIndex = 0;


function CreateOneSliderPanel(cardImageSource,cardTitleText,cardTextText) {
    const card = document.createElement("div");
    card.classList.add("standard-card");  
    
    const cardImage = document.createElement("img");
    cardImage.setAttribute("src",cardImageSource);
    cardImage.classList.add("card-image"); 
    card.appendChild(cardImage);

    const  cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title"); 
    cardTitle.textContent=cardTitleText;
    card.appendChild(cardTitle);

    const  cardText = document.createElement("p");
    cardText.classList.add("card-text"); 
    cardText.textContent=cardTextText;
    card.appendChild(cardText);

    return card;

}

function createSliderPanels(cardsProperties) {
    if(cardsProperties==null) {
        const card = CreateOneSliderPanel(ImgsRootPath + "default.jpg","Title","Lorem ipsum");
        Slider.appendChild(card);
    }
    else {
        cardsProperties.forEach(element => {
            const card = CreateOneSliderPanel(element[0],element[1],element[2]);
            Slider.appendChild(card);
        });
    }
    Slider.style.width=100*(Slider.children.length)+'%';
}

function createNavigationDots(ReqDotsNum) {
    var DotsNum = (ReqDotsNum == null) ? Slider.children.length : ReqDotsNum;
    for(let i =0;i<DotsNum;i++){
        const dot = document.createElement("li");
        dot.classList.add("controls"); 
        NavigationDots.appendChild(dot);
    }
} 

function setIndex(){
    var selectedDot = document.querySelector('.controls .selected');
    if(selectedDot!=null) 
        selectedDot.classList.remove('selected');
    Slider.style.transform = 'translate(' + (SectionIndex) * - ( 100 / Slider.children.length) + '%)';
    NavigationDots.children[SectionIndex].classList.add('selected');
}

function loadCarousel() {
    Slider.classList.add("slider"); 
    Carousel.appendChild(Slider);

    const navControls=document.createElement("div");
    navControls.classList.add("controls"); 
    Carousel.appendChild(navControls);

    
    
    LeftArrow.classList.add("arrow","left");
    LeftArrow.innerHTML="Left";
    navControls.appendChild(LeftArrow);

    
    RightArrow.classList.add("arrow","right");
    RightArrow.innerHTML="Right";
    navControls.appendChild(RightArrow);


    navControls.appendChild(NavigationDots);
    
    fetch(APIurl)
    .then((response) => {
      return (response.ok) ? response.json() : null
    })
    .then((data) => {
        createSliderPanels(data);
        createNavigationDots();
        setIndex();
        [...document.getElementsByClassName("controls")[0].getElementsByTagName("li")].forEach(function(indicator,ind) {
            indicator.addEventListener('click', function() {
                SectionIndex=ind;
                setIndex();
            });
        });
    })
};

/////////////////////////////////
//Execution starts here
loadCarousel();

RightArrow.addEventListener('click',function() {
    SectionIndex = (SectionIndex < Slider.children.length-1) ? SectionIndex + 1 : 0;
    setIndex();
});

LeftArrow.addEventListener('click',function() {
    SectionIndex = (SectionIndex > 0) ? SectionIndex - 1 : Slider.children.length-1;
    setIndex();
});
