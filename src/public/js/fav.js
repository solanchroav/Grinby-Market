const doc = document.getElementById('showFavItems');

function featuringTemplate(person) {
    return (
      `
<div class="container mt-3">
<main role="main">
    <div class="row">
        <div class="col">
            <div class="table-responsive-sm">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody id="table">
                    <th scope="col">${person.title} </th>
                    <th scope="col">${person.brand} </th>
                    <th scope="col">${person.description} </th>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
</div>

      `
    )
  }


if (localStorage.getItem("personData")){

    let  personData = JSON.parse(localStorage.getItem("personData"));
    console.log(personData);
    const HTMLString = featuringTemplate(personData);
    doc.innerHTML = HTMLString;

   
} else {
    console.log('No hay info en el localStorage');
    
}



