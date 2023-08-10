APIurl=

function searchForProduct() {
    fetch(APIurl)
    .then((response) => {
      return (response.ok) ? response.json() : null
    })
    .then((data) => {
        
    })
}

function createOneProductCard() {
    
}
