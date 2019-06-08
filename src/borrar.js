//Model for testers

ctrl.index =  (req, res) => {
    const client = new MongoClient(database.URI);
     client.connect(function (err, client) {
       const db = client.db(database.dbName);
       const coleccion = db.collection(database.collectionName);
       coleccion.find().toArray(async function (err, productos) {
         
         client.close();
 
          let listaPorLetra = armarListaPorLetra(productos);
 
          //if you want to bring the complete data, use: { tu_coleccion: productos, selected: { tu_coleccion: true } }
           res.render('products', { lista: listaPorLetra});
     
       });
     });
 };
 
 module.exports = ctrl;
 
 // Function that from a list alphabetically ordered by a field ".Nombre" generates a list grouped by initial letter.
 function armarListaPorLetra(arrayOrdenado) {
 
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
   console.log(listaPorLetra);
 
   // Return the result
   return listaPorLetra;
 
 }