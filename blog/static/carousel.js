const ImgsRootPath = "../static/images/"
const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
var indicatorParents = document.querySelector('.controls ul') ; 
var SectionIndex = 0;


function CreateOneSliderPanel(cardImageSource,cardTitleText,cardTextText) {
    const card = document.createElement("div");
    card.classList.add("card"); 
    
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

function CreateSliderPanels(cardsProperties) {
    if(cardsProperties==null) {
        const card = CreateOneSliderPanel(ImgsRootPath + "default.jpg","Title","Lorem ipsum");
        slider.appendChild(card);
    }
    else {
        cardsProperties.forEach(element => {
            const card = CreateOneSliderPanel(element[0],element[1],element[2]);
            slider.appendChild(card);
        });
    }
}

function CreateNavigationDots(ReqDotsNum) {
    var DotsNum = (ReqDotsNum == null) ? slider.children.length : ReqDotsNum;
    console.log(DotsNum);
    for(let i =0;i<DotsNum;i++){
        const Dot = document.createElement("li");
        indicatorParents.appendChild(Dot);
    }
} 

function setIndex(){
    var selectedDot = document.querySelector('.controls .selected');
    if(selectedDot!=null) 
        selectedDot.classList.remove('selected');
    slider.style.transform = 'translate(' + (SectionIndex) * - ( 100 / slider.children.length) + '%)';
    indicatorParents.children[SectionIndex].classList.add('selected');
}

let testSliderCardsRequest = [
    [ImgsRootPath+"pizza.jpg", "Pizza Margarrito", "Magda Gessler poleca"],
    [ImgsRootPath+"cookie.jpg", "Ciasteczko", "Pyszne ciasteczko. Prosto z pieca"],
    [ImgsRootPath+"apple.jpg", "Jabłko", "Owoc pełen witamin"]
];
CreateSliderPanels(testSliderCardsRequest);
slider.style.width=100*(slider.children.length)+'%';
CreateNavigationDots();
setIndex();

rightArrow.addEventListener('click',function() {
    SectionIndex = (SectionIndex < slider.children.length-1) ? SectionIndex + 1 : 0;
    setIndex();
});

leftArrow.addEventListener('click',function() {
    SectionIndex = (SectionIndex > 0) ? SectionIndex - 1 : slider.children.length-1;
    setIndex();
});

document.querySelectorAll('.controls li').forEach(function(indicator,ind) {
    indicator.addEventListener('click', function() {
        SectionIndex=ind;
        setIndex();
    });
})
