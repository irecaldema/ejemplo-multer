var multer = require('multer');
var fs = require('fs');

//comprobar si existen carpetas para subir, si no existen las crea IMPORTANTE tienen que estar creadas las carpetas public/images 
/*****************************************/
fs.stat('./public/images', function(err, stats){
    if(err){
        console.log(err);
        fs.mkdir('./public/images', function(error,info){
        	if (error) {
        		console.log(error);
        	} 
            fs.stat('./public/images/uploads', function(err, stats){
                if(err){
                    console.log(err);
                    fs.mkdir('./public/images/uploads', function(error,info){
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            });//fin images
        });//fin mkdir uploads
    }
});
//pdfs
fs.stat('./public/pdfs', function(err, stats){
    if(err){
        console.log(err);
        fs.mkdir('./public/pdfs', function(error,info){
        	if (error) {
        		console.log(error);
        	} 
            fs.stat('./public/pdfs/uploads', function(err, stats){
                if(err){
                    console.log(err);
                    fs.mkdir('./public/pdfs/uploads', function(error,info){
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            });//fin uploads
        });//fin mkdir pdfs
    }
});//fin pdfs

//Archivos
fs.stat('./public/zips', function(err, stats){
    if(err){
        console.log(err);
        fs.mkdir('./public/zips', function(error,info){
        	if (error) {
        		console.log(error);
        	} 
            fs.stat('./public/zips/uploads', function(err, stats){
                if(err){
                    console.log(err);
                    fs.mkdir('./public/zips/uploads', function(error,info){
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            });//fin uploads
        });//fin mkdir zips
    }
});//fin zips

/*****************************************/
			//FIN comprobaciones
/*****************************************/

/***************************************/
/* filtro imagenes */
function fileFilterImage (req, file, cb){
  	var type = file.mimetype;
  	if (type == "image/jpg" || type == "image/jpeg" || type == "image/png") {
    	cb(null, true);
  	} else {
    	cb(null, false);
  	}
}
/* filtro de pdf */
function fileFilterPdf (req, file, cb){
    var type = file.mimetype;
    if (type == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
}
/* filtro de zips */
function fileFilterZip (req, file, cb){
    var type = file.mimetype;
    if (type == "application/zip" || type == "application/x-compressed-zip") {
      cb(null, true);
    } else {
      cb(null, false);
    }
}
/******************************************/




/*  Para guardar una foto en /public/images/uploads/   */
/***************************************************************/
exports.guardarImagen = function(req,res) {
    console.log('Guardado de imagen');
    var path,nombreImagen;
    //creamos un objeto de almacenamiento
	var storageImage = multer.diskStorage({
    	//Creamos el destino de la imagen
    	destination: function (req,file,cb) {
            path = "./public/images/uploads/";
            console.log("prueba extra "+path);
            cb(null, path);
		},//destination
        //creamos el nombre de la imagen
	    filename: function (req,file,cb) {
            var fecha = new Date();
		    var extensionArray = file.mimetype.split('/');
            //creo el nombre con la fecha+extension
		    nombreImagen = fecha.getDate().toString()+fecha.getMonth().toString()+fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString()+'.'+extensionArray[1];
		    console.log("prueba "+nombreImagen);
		    cb(null,nombreImagen);
		}//filename
	});//storageImage

    //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
    var uploadImage = multer({ storage: storageImage, fileFilter: fileFilterImage, limits: {fileSize: 1512000}});

    //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
    uploadImage.single('imagen')(req, res, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Exito: "+path+nombreImagen);
            //responde con la URL relativa de la imagen (aquí puedes añadir el DNS del servidor para crear la URL completa para usarla en el src de una imagen)
            res.send(path+nombreImagen);
        }
    });//uploadImage
};
/***************************************************************/

/*  Para guardar una foto en /public/pdfs/uploads/   */
/***************************************************************/
exports.guardarPdf = function(req,res) {
    console.log('Guardado de pdf');
    var path,nombrePdf;
    //creamos un objeto de almacenamiento
	var storagePdf = multer.diskStorage({
		//Creamos el destino de la imagen
		destination: function (req,file,cb) {
            path = "./public/pdfs/uploads/";
            cb(null, path);
		},//destination
        //creamos el nombre de la imagen
		filename: function (req,file,cb) {
            var fecha = new Date();
            var extensionArray = file.mimetype.split('/');
            //creo el nombre con la fecha+extension
    		nombrePdf = fecha.getDate().toString()+fecha.getMonth().toString()+fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString()+'.'+extensionArray[1];
    		cb(null,nombrePdf);
		}//filename
	});//storageImage

    //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
	var uploadPdf = multer({ storage: storagePdf, fileFilter: fileFilterPdf, limits: {fileSize: 1512000}});

    //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
    uploadPdf.single('pdf')(req, res, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Exito: "+path+nombrePdf);
            //responde con la URL relativa de la imagen (aquí puedes añadir el DNS del servidor para crear la URL completa para usarla en el src de una imagen)
            res.send(path+nombrePdf);
        }
    });//uploadPdf
};
/***************************************************************/

/*  Para guardar una foto en /public/files/uploads/  */
/***************************************************************/
exports.guardarZip = function(req,res) {
    console.log('Guardado de zip');
    var path,nombreZip;
    //creamos un objeto de almacenamiento
	var storageArchivo = multer.diskStorage({
		//Creamos el destino de la imagen
		destination: function (req,file,cb) {
            path = "./public/zips/uploads/";
            cb(null, path);
		},//destination
        //creamos el nombre de la imagen
        filename: function (req,file,cb) {
            var fecha = new Date();
            var extensionArray = file.mimetype.split('/');
            //creo el nombre con la fecha+extension
			nombreZip = fecha.getDate().toString()+fecha.getMonth().toString()+fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString()+'.'+extensionArray[1];
			cb(null,nombreZip);
		}//filename
	});//storageImage

    //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
    var uploadArchivo = multer({ storage: storageArchivo, fileFilter: fileFilterZip, limits: {fileSize: 1512000}});

    //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
    uploadArchivo.single('zip')(req, res, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Exito: "+path+nombreZip);
            //responde con la URL relativa de la imagen (aquí puedes añadir el DNS del servidor para crear la URL completa para usarla en el src de una imagen)
            res.send(path+nombreZip);
        }
    }); //uploadZip
};
/***************************************************************/