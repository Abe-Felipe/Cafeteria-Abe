require('dotenv').config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.get('X-API-Key');
  const serverApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== serverApiKey) {
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }

  next();
};

module.exports = apiKeyAuth;