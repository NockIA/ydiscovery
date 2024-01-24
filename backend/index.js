const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port} at http://localhost:${port}/`);
});