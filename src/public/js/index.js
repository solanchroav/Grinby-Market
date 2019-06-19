const getId = document.querySelector('[data-id]');
const idStore = getId.dataset.id;
const inputStore = document.querySelector("input.brands");
const idInput = inputStore.dataset.id;





getId.addEventListener('click', () => {
    if (idStore === idInput) {
    
    const inputStores = document.querySelectorAll("input.brands");
    
    var brands = [];

    for (let index = 0; index < inputStores.length ; index++) {
        brands.push(inputStores[index])

    }
   
    var  person = new Object();

    for (let brand in brands) {
        console.log(brands[brand].value);
        person.title = (brands[0].value);
        person.description = (brands[1].value);
        person.price = (brands[2].value);
        person.brand = (brands[3].value);
   
    }
    console.log(person);
    
   
    localStorage.setItem("personData", JSON.stringify(person));
   
    

    } else {
        console.log('Prueba con otro producto favorito');
    }

});
