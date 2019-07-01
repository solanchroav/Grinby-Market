const MongoClient = require('mongodb').MongoClient
const {database} = require('../keys')


const ctrl = {};

ctrl.index =  (req, res) => {
   const client = new MongoClient(database.URI);
    client.connect(function (err, client) {
      const db = client.db(database.dbName);
      const coleccion = db.collection(database.collectionName);
      coleccion.find().toArray(async function (err, productos) {
        

        const productosPorLaCategoria = productos.sort(function (prev, next) {
          if (prev.Rubro == next.Rubro){
            return 0;
          }
          if (prev.Rubro > next.Rubro) {
            return 1;
          }
          if (prev.Rubro < next.Rubro) {
            return -1;
          }
        });

        client.close();
      
        
        let listaPorLetra = armarListaPorCategoriaYLetra(productosPorLaCategoria);
        
         //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
          res.render('products', { lista: listaPorLetra});
    
      });
    });
};

ctrl.energy = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Rubro == next.Rubro){
          return 0;
        }
        if (prev.Rubro > next.Rubro) {
          return 1;
        }
        if (prev.Rubro < next.Rubro) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
        
       if (organizarPorLaCategoria[i].Rubro == 'Energía' || organizarPorLaCategoria[i].Rubro == 'Construcción') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      //console.log(energy);
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/energy', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.clothes = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Indumentaria y Accesorios') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/clothes', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.cosmetic = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Cosmética e Higiene') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/cosmetic', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.recycle = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Reciclaje') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/recycle', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.garden = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Agricultura y Jardinería') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/garden', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.food = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Alimentos y Bebidas') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/food', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.home = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Mobiliario' || organizarPorLaCategoria[i].Rubro == 'Decoración' || organizarPorLaCategoria[i].Rubro == 'Artículos para el Hogar') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/home', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.recreation = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Recreación y Ocio') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/recreation', { lista: listaIndexadaPorCategoria});


  
    });
  });
};

ctrl.nonListedCategories = (req, res) => {
  const data = new MongoClient(database.URI);
  data.connect(function (err, client) {
    const db = client.db(database.dbName);
    const coleccion = db.collection(database.collectionName);
    coleccion.find().toArray(async function (err, allProducts) {
      
      const organizarPorLaCategoria = allProducts.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
    
      client.close();

      let orderProducts = [];

      for (let i = 0; i < organizarPorLaCategoria.length; i++) {
       if (organizarPorLaCategoria[i].Rubro == 'Diseño' || organizarPorLaCategoria[i].Rubro == 'Limpieza') {
         orderProducts.push(organizarPorLaCategoria[i]);
       }
      }
      
      
      let listaIndexadaPorCategoria = armarListaPorLetra(orderProducts);
      
       //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
        res.render('productByCategory/nonListedCategories', { lista: listaIndexadaPorCategoria});


  
    });
  });
};


module.exports = ctrl;

function armarListaPorCategoriaYLetra (params) {

  let listaCompleta = [];
  
  
  let categoriaActual = params[0].Rubro;
  let letraActual = params[0].Nombre.charAt(0).toUpperCase();

  let organizarPorLetras = {
    letra: letraActual,
    lista: []
  }

  let listaActualCompleta = {
    categoria : categoriaActual,
    lista: [],
    listaParcial: []
  }

  for (let i = 0; i < params.length; i++) {

    let bucleDeCategoria = params[i].Rubro;
    
    
    
    if (bucleDeCategoria == categoriaActual) {

      listaActualCompleta.lista.push(params[i]);

      listaActualCompleta.lista.sort(function (prev, next) {
        if (prev.Nombre == next.Nombre){
          return 0;
        }
        if (prev.Nombre > next.Nombre) {
          return 1;
        }
        if (prev.Nombre < next.Nombre) {
          return -1;
        }
      });
      
      
    } else {

    for (let index = 0; index < listaActualCompleta.lista.length; index++) {

        let bucleDeLetras = listaActualCompleta.lista[index].Nombre.charAt(0).toUpperCase();
        
        
  
          if (bucleDeLetras == letraActual) {
      
            organizarPorLetras.lista.push(listaActualCompleta.lista[index]);
        
            
            
          } else {
            
            listaActualCompleta.listaParcial.push(organizarPorLetras);
           
            
            letraActual = bucleDeLetras
      
            organizarPorLetras = {
              letra: letraActual,
              lista: []
            }
      
            organizarPorLetras.lista.push(listaActualCompleta.lista[index]);
            
          }
    }
    
    
    listaCompleta.push(listaActualCompleta);

    categoriaActual = bucleDeCategoria;

    listaActualCompleta = {
      categoria : categoriaActual,
      lista: [],
      listaParcial: []
    }

    listaActualCompleta.lista.push(params[i]);

  }
  }


  console.log(listaCompleta);

  return listaCompleta;
    
}

function armarListaPorLetra(arrayOrdenado) {
 
  console.log(arrayOrdenado);
  // Array to accumulate the final list
  let listaPorLetra = [];

  // Variable to save the last letter found.
  let ultimaLetra = arrayOrdenado[0].Nombre.charAt(0).toUpperCase();

  // "lista" accumulate the elements of the current letter.
  let listaLetraActual = {
    letra: ultimaLetra,
    lista: []
  };

 
  for (let i = 0; i < arrayOrdenado.length; i++) {
    
    // We got the  letter of the title of the current item.
    let letra = arrayOrdenado[i].Nombre.charAt(0).toUpperCase();
    
    if (letra == ultimaLetra) {
      
      listaLetraActual.lista.push(arrayOrdenado[i]);
    } else {

      listaPorLetra.push(listaLetraActual);
      
      // Now the last letter becomes the new ...
      ultimaLetra = letra;

      // .. and a new list for the current letter is initialized
      listaLetraActual = {
        letra: ultimaLetra,
        lista: []
      };

      listaLetraActual.lista.push(arrayOrdenado[i]);
    }
    
  }

  // We put in console for review
  // console.log(listaPorLetra);

  // Return the result
  return listaPorLetra;

}