#!/usr/bin/env node
const path = require('path');
const express = require('express');
const escpos = require('escpos');
const usb = require('usb');
var cors = require('cors')
const bodyParser = require("body-parser");

const config = require('./config.json');

var port = config.port
var host = config.host

 

const device  = new escpos.USB();

const options = { encoding: "866" /* default */ }

const printer = new escpos.Printer(device, options);

var urlencodedParser = bodyParser.text({})

const app = express();
app.use(cors({
	origin: (origin, callback) => {
		
		  callback(null, true)
		   
	  }
}));

 


app.post('/print', urlencodedParser, function (request, response) { 
	
       var res = JSON.parse( request.body)

 try { 
		device.open(function(err){
    
        device.write(Buffer.from(res))  
 
		 
	  printer.close();
	  response.statusCode = 200;
	  response.send("")

   
}); 

} catch (ex) {
	console.log(ex.message)
    response.statusCode = 400;

	response.send(ex.message)
	
  }  

	});


	app.get('/testprint', urlencodedParser, function (request, response) { 
   
	try { 
		   device.open(function(err){
	    
	       device.write(Buffer.from([27,116,17]))  //раскоментировать для переключения  кодовой  страницы  в  принтере
		   
		   
		   printer.encode('866')
		   printer.align("lt")
		   printer.size(1,1)
		   printer.text("Printer test")	   
		   printer.text("Тест принтера")	   
 
		   printer.feed()	   
			
   	 	  printer.close();
          console.log("Test printer")
		  response.statusCode = 200;
		  response.send("Тест принтера") 
   
	  
   }); 
   
   } catch (ex) {
       console.log(ex.message)
	   response.statusCode = 400;
   
	   response.send(ex.message)
	   
	 }  
   
	   });

    app.listen(port, host, function () {
        console.log(`Server listens http://${host}:${port}`)
      })