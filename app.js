const bodyParser = require('body-parser');
const cors = require('cors');
const desertRouter = require('./router/desertRouter.js');
const personRouter = require('./router/personRouter.js');
const orderRouter = require('./router/orderRouter.js');
const tableCreationRouter = require('./router/tableCreationRouter.js');
const express = require('express');

const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(cors());

app.use('/Desert',desertRouter);
app.use('/Person', personRouter);
app.use('/Order', orderRouter);
app.use('/TableCreation', tableCreationRouter);

app.get('/',(req, res) => {
    res.json({"message": "DB3 Application WORKING"});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })





