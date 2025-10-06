const express = require('express');
const router = express.Router();

// Array em memória para armazenar feedbacks
const feedbacks = [];

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Recebe feedback do formulário
 */

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Recebe feedback do formulário
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Texto do feedback
 *     responses:
 *       200:
 *         description: Feedback recebido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "O campo message é obrigatório" });
  }
  const newFeedback = { id: feedbacks.length + 1, message, date: new Date().toISOString() };
  feedbacks.push(newFeedback);
  console.log("Feedback recebido:", message);
  res.json({ status: "ok", message: newFeedback.message });
});

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Lista todos os feedbacks recebidos
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Lista de feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.get('/', (req, res) => {
  res.json(feedbacks);
});

/**
 * @swagger
 * /api/feedback/{id}:
 *   get:
 *     summary: Busca um feedback pelo ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedback encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Feedback não encontrado
 */
router.get('/:id', (req, res) => {
  const feedback = feedbacks.find(f => f.id === parseInt(req.params.id));
  if (!feedback) return res.status(404).json({ error: "Feedback não encontrado" });
  res.json(feedback);
});

/**
 * @swagger
 * /api/feedback/{id}:
 *   put:
 *     summary: Atualiza um feedback pelo ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Feedback atualizado
 *       404:
 *         description: Feedback não encontrado
 */
router.put('/:id', (req, res) => {
  const feedback = feedbacks.find(f => f.id === parseInt(req.params.id));
  if (!feedback) return res.status(404).json({ error: "Feedback não encontrado" });

  const { message } = req.body;
  if (message) feedback.message = message;
  res.json({ status: "ok", feedback });
});

/**
 * @swagger
 * /api/feedback/{id}:
 *   delete:
 *     summary: Remove um feedback pelo ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedback removido
 *       404:
 *         description: Feedback não encontrado
 */
router.delete('/:id', (req, res) => {
  const index = feedbacks.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Feedback não encontrado" });

  const deleted = feedbacks.splice(index, 1);
  res.json({ status: "ok", deleted });
});

module.exports = router;
