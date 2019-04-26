const fs = require("fs"),
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  port = process.env.PORT || 3000,
  axios = require('axios'), 
  convert = require('xml-js'),
  child_process = require('child_process'),
  path = require('path'),
  forge = require('node-forge'),
  decode = require('unescape'),
  xadesjs = require("xadesjs"),
  qs = require('qs');
  
const postedData =
  `<?xml version='1.0' encoding='UTF-8'?>
  <SolicitaTokenRequest>
    <usuario>47250763</usuario>
    <apikey>2CjGSRYDfrkXOcW2xQbOEVV</apikey>
  </SolicitaTokenRequest>`;
let { Crypto } = require("@peculiar/webcrypto");
let xml;
let key;
let llave;
let fact;
let keyFile = fs.readFileSync('key/llave.pfx');
let keyBase64 = keyFile.toString('base64');
let p12Der = forge.util.decode64(keyBase64);
let p12Asn1 = forge.asn1.fromDer(p12Der);
let p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'E/2019/Fcs');

console.log(p12);
server.listen(port, '0.0.0.0');

io.sockets.on('connect', socket => {
  io.sockets.emit('key', key);
  socket.on('body', body => {
    xml = body;
    console.log(xml);
    sign();
  });
  socket.on('solicitud', (res) => {
    axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=USD_GTQ&compact=ultra&apiKey=157e0765190fd121de41').then(res => {
      socket.emit('cambio', res.data);
    });
  });
  socket.on('conservasa', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('cotesa', (res) => {
    let result = parseInt(res, 10) + 1;
    console.log(result);
    socket.emit('correlativo', result);
  });
  socket.on('provisa', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', err.data);
    console.log(result);
  });
  socket.on('asciende', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('ceibalia', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('brickel', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('fucorsa', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('rensersa', (res) => {
    let result = parseInt(res, 10) + 1;
    socket.emit('correlativo', result);
    console.log(result);
  });
  socket.on('factura', factura => {
    axios.post('https://dev.api.soluciones-mega.com/api/solicitaFirma', factura, {
      headers: {
        'Content-Type': 'application/xml', 
        Authorization: 'Bearer ' + llave 
      }
    }).then(res => {
        let r;
        r = decode(res.data.replace( /\<\?xml.+\?\>|<FirmaDocumentoResponse>|<\/FirmaDocumentoResponse>/g, '')
            .replace(/<xml_dte>|<\/xml_dte>|<listado_errores\/>|<tipo_respuesta>|<\/tipo_respuesta>/g, '')
            .replace(/<uuid>|<\/uuid>/g, ''));
        fact = '<?xml version="1.0" encoding="UTF-8"?><RegistraDocumentoXMLRequest id="866437D6-0BE3-467C-947C-EC8018DB0AE9"><xml_dte><![CDATA[' + 
                r.substring(0, r.length - 37) + ']]></xml_dte></RegistraDocumentoXMLRequest>';
        console.log(fact);
        axios.post('https://dev.api.ifacere-fel.com/fel-dte-services/api/registrarDocumentoXML', fact, {
          headers: {
            'Content-Type': 'application/xml', 
            Authorization: 'Bearer ' + llave 
          }
        }).then(res => {
          let r;
          r = decode(res.data);
          let respuesta = convert.xml2js(r, {compact: true, spaces: 2});
          socket.emit('respuesta', respuesta);
          console.log('si firmo');
          console.log(respuesta);
        }).catch(err => {
          error = convert.xml2js(err.response.data, {compact: true, spaces: 2});
          console.log('Post Firma: ' + error.FirmaDocumentoResponse.listado_errores.error);
          socket.emit('satError', error);
        });
        socket.emit('respuesta', respuesta);  
      }).catch(err => {
        error = convert.xml2js(err.response.data, {compact: true, spaces: 2});
        socket.emit('serError', error);
        console.log(error.FirmaDocumentoResponse.listado_errores.error);
      });
  });
});

axios.post('https://dev.api.ifacere-fel.com/fel-dte-services/api/solicitarToken', postedData, {
  headers: {
    'content-type': 'application/xml'
  }
})
  .then(res => {
    key = convert.xml2js(res.data, {compact: true, spaces: 2});
    llave = key.SolicitaTokenResponse.token._text;
  })
  .catch(error => {
    console.log('Error en token ' + error);
  });



function sign() {
  xadesjs.Application.setEngine("NodeJS", new Crypto());
  
  xadesjs.Application.crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 1024, //can be 1024, 2048, or 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign", "verify"] //can be any combination of "sign" and "verify""verify" for public key import, "sign" for private key imports
  )
  .then(function(keyPair){
    privateKey = keyPair.privateKey;
    publicKey = keyPair.publicKey;
    console.log(xml);
    return SignXml(xml, keyPair, { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } });
  })
  .then(function (signedDocument) {
    console.log("Signed document:\n\n", signedDocument);
  })
  .catch(function(err){
    console.error(err);
  });
  
  function SignXml(xmlString, keys, algorithm) {
    return Promise.resolve()
      .then(() => {
        let xmlDoc = xadesjs.Parse(xmlString);
        let signedXml = new xadesjs.SignedXml();
  
        return signedXml.Sign(               // Signing document
          algorithm,                              // algorithm
          keys.privateKey,                        // key
          xmlDoc,                                 // document
          {                                       // options
            keyValue: keys.publicKey,
            references: [
              { hash: "SHA-256", transforms: ["enveloped"] }
            ],
            productionPlace: {
              country: "Country",
              state: "State",
              city: "City",
              code: "Code",
            },
            signingCertificate: "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"
          });
        })
      .then(signature => signature.toString());
  }
}

// let password = 'E/2019/Fcs';
// function get(path, password) {
//   let pemPath = path.join('key/', 'pem.pem');
//   let cerPath = path.join('key/', 'cer.cer');
//   let info = {};
//   return exec(`openssl pkcs12 -in ${escape(path)} -passin pass:${escape(password)} -out ${escape(pemPath)}  -nodes`)
//         // to cer
//     .then(() => {
//       return exec(`openssl x509 -outform der -in ${escape(pemPath)} -out ${escape(cerPath)}`);
//     });
// }

// function exec(cmd, opt) {
//   opt = Object.assign({
//     cwd: __dirname
//   }, opt);
//   return new Promise((resolve, reject) => {
//     child_process.exec(cmd, opt, (err, stdout, stderr) => {
//       if(err) {
//         reject(stderr);
//       } else {
//         resolve(stdout);
//       }
//     });
//   });
// }