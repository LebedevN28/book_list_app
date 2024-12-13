// Middleware для валидации ID
const validateId = (req, res, next) => {
  const { id } = req.params;

  // Проверка, что id можно преобразовать в число
  if (Number.isNaN(parseInt(id, 10))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  // Если id корректный, продолжаем выполнение
  next();
};

module.exports = { validateId };
