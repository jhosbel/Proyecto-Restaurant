const User = require('../models/User');

const saveSearchHistory = async (req, res) => {
  try {
    const { query } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.searchHistory.push({ query });
    await user.save();

    res.status(200).json({ message: 'Búsqueda guardada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la búsqueda' });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user.searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de búsqueda' });
  }
};

module.exports = { saveSearchHistory, getSearchHistory };
