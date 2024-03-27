const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./swagger4.yaml');
 
const app = express();
 
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 

app.use('/api/v1', require('./routes/yourRoutes4'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  alert("From app4.js");
  console.log(`Server running on port ${PORT}`);
}); 
