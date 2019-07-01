const miBusqueda = document.getElementById('search');

console.log('hola mundo');

 function getData(url) { 
    return  window.location = url ;
  }

  function renderPage (url, method) {

    const xhttp = new XMLHttpRequest();
    // MAKE THE PETITION. THIRD PARARM IS A BOOLEN. IS IS AN ASYNC FUNCTION OR NOT?
    xhttp.open(method, url, true);

    xhttp.send(getData(url));
  


}

miBusqueda.addEventListener ('submit', async (event) => {
    event.preventDefault();
    const search = new FormData(miBusqueda);
   try {
      //const storeSelected = await getData(`http://localhost:3000/storeView/${search.get('name')}`);
    const stored = `http://localhost:3000/storeView/${search.get('name')}`;
    
      renderPage(stored, 'GET');
    
    } catch (error) {
      debugger
    }
});

