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




  return listaCompleta;
    
}
