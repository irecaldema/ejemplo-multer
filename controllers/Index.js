var fs = require('fs');
var path = require('path');
    
exports.index = function(req, res) {
    return res.render('pages/index.ejs');
};

exports.lista_pdfs = function(req, res) {
    var contador=0;
    function busqueda(currentDirPath, callback) {
        fs.readdir(currentDirPath, function (err, files) {
            if (err) {
                callback(err, null);
            }
            var lista=[];
            files.forEach(function (name) {
                var filePath = path.join(currentDirPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    lista.push('/'+currentDirPath+name);
                    contador++;
                    if(contador==files.length){
                        callback(err, lista);
                    }
                }
            });
        });
    }
    busqueda('./public/pdfs/uploads/', function(err, lista) {
        if(err){
            console.log("error");
        }
        //console.log("lista: "+lista);
        return res.render('pages/lista_pdfs.ejs',{
            lista: lista
        });
    });
};

exports.muestra_pdfs = function(req, res) {
    var contador=0;
    function busqueda(currentDirPath, callback) {
        fs.readdir(currentDirPath, function (err, files) {
            if (err) {
                callback(err, null);
            }
            var lista=[];
            files.forEach(function (name) {
                var filePath = path.join(currentDirPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    lista.push(filePath.substr(6));
                    contador++;
                    if(contador==files.length){
                        callback(err, lista);
                    }
                }
            });
        });
    }
    busqueda('./public/pdfs/uploads/', function(err, lista) {
        if(err){
            console.log("error");
        }
        //console.log("lista: "+lista);
        return res.render('pages/muestra_pdfs.ejs',{
            lista: lista
        });
    });
};