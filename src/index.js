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

const options = { encoding: "866"   }

const printer = new escpos.Printer(device, options);
 
var urlencodedParser = bodyParser.json({})

const app = express();
app.use(cors({
	origin: (origin, callback) => {
		
		  callback(null, true)
		   
	  }
}));

 


    app.get('/check', urlencodedParser, function (request, response) { 
    
 
      response.statusCode = 200;
      response.send("POS server: OK")

 

    });
    
    
    app.get('/testprint', urlencodedParser, function (request, response) { 
   
    try { 
           device.open(function(err){
        
         //  device.write(Buffer.from([27,116,17]))  //раскоментировать для переключения  кодовой  страницы  в  принтере
           
           
       
           printer.align("lt")
           printer.size(1,1)
           printer.text("Printer test")       
             
 
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


	app.get('/testprintlabel', urlencodedParser, function (request, response) { 
   
	try { 
		   device.open(function(err){
	    
	    
           printer.text("CLS")       
           printer.text("DIRECTION 1")       
           printer.text("TEXT 10,10,\"2\",0,1,1,\"Test printer\"")       
		   printer.text("RINT 1,1")	   
 		     
			
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
   
    app.post('/print', urlencodedParser, function (request, response) { 
	
		//var res = JSON.parse( request.body)
 var res= request.body
  try { 
		 device.open(function(err){
	 
		 device.write(Buffer.from(res))  
  
		  
	   printer.close();
	   response.statusCode = 200;
	   response.send("")
 
	
 }); 
 
 } catch (ex) {
	 response.statusCode = 400;
 
	 response.send(ex.message)
	 console.log(ex.message)
   }  
 
	 });

	 

	app.get('/scale', urlencodedParser, function (request, response) { 
	
	 

	    //	var reqdata = JSON.parse( request.body)
            
      try { 
		     //todo весы 
            var resp= 
		    {
			    "weight":0,
			    "success":true
		    }
		    
		      
	     
	       response.statusCode = 200;
	       response.send(JSON.stringify(resp))
     
	    
      
     
     } catch (ex) {
	     console.log(ex.message)
	    
	     response.statusCode = 400;
	     var resp= 
	     {
		     "success":false,
		     "error":ex.message
	     }
	      
	     response.send(JSON.stringify(resp))
	    
       }  
 
	 });
 


    app.listen(port, host, function () {
        console.log(`Server listens http://${host}:${port}`)
      })