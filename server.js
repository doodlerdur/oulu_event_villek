const express = require('express');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Mount event routes
app.use('/api', eventRoutes);

// Other middleware and server setup...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});