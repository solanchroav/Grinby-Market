const miBusqueda = document.getElementById('search');

console.log('hola mundo');

async function getData(url) {
    const response = await fetch(url);
    console.log(response);
    
    return response;
  }

  function renderPage (url, method) {

    const xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = toDo;
    // MAKE THE PETITION. THIRD PARARM IS A BOOLEN. IS IS AN ASYNC FUNCTION OR NOT?
    xhttp.open(method, url, true);
    xhttp.onload(
            window.location = url 
    )
    xhttp.send()
  


}

miBusqueda.addEventListener ('submit', async (event) => {
    event.preventDefault();
    const search = new FormData(miBusqueda);
    console.log(search);
    //const storeSelected = await getData(`http://localhost:3000/storeView/${search.get('name')}`);
    const stored = `http://localhost:3000/storeView/${search.get('name')}`;
    //console.log(storeSelected);
    
    console.log( search.get('name'));

    renderPage(stored, 'GET');

});

