

 module.exports =  function arrayBrands  ()  {

    const allProducts = document.querySelectorAll('[data-brand]');

    let arrayNameBrand = [];

    for (let index = 0; index < allProducts.length; index++) {
        let productNameBrand = allProducts[index].dataset.brand;
        arrayNameBrand.push(productNameBrand);
        
        
    }
    
    return arrayNameBrand;

}
