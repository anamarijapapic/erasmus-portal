const app = require('./app');
const mongoose = require('mongoose');

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`connected to db & Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.error(error.message));
