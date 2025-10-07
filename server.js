// server.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const feedbackRouter = require('./routes/feedback'); // Novo endpoint

const app = express();
app.use(express.json());

// Rotas da API
app.use('/api/feedback', feedbackRouter);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz com formulário HTML
app.get('/', (req, res) => {
  res.send(`
    <h1>Formulário de Feedback</h1>
    <form id="feedbackForm">
      Diga o que achou da Apresentacao: <input type="text" name="fname" id="fname">
      <input type="submit" value="Enviar">
    </form>
    <script>
      const form = document.getElementById('feedbackForm');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('fname').value;
        if (!message) {
          alert("O campo deve ser preenchido!");
          return;
        }
        // Envia o feedback para a API
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        alert("Feedback enviado: " + data.message);
      });
    </script>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
