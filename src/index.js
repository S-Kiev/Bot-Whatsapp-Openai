const express = require('express');
const apiRouter = require('./routes/routes.js');
const apiRouterCode = require('./routes/routesCode.js');
const apiRouterNotify = require('./routes/routesNotify.js');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/whatsapp', apiRouter);
app.use('/sendCode', apiRouterCode);
app.use('/sendNotify', apiRouterNotify);

app.listen(PORT, ()=>{
    console.log(`aplición corriendo en el puerto ${PORT}`)
});