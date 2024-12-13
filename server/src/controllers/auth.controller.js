const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookiesConfig');
const userService = require('../services/auth.service');

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  // Регистрация нового пользователя
  signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Проверяем, существует ли пользователь
      const existingUser = await this.#service.getUser(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаём пользователя
      const user = await this.#service.createUser({
        name,
        email,
        password: hashedPassword,
      });

      // Генерируем токены
      const { accessToken, refreshToken } = generateTokens({ user });

      // Убираем пароль из объекта пользователя перед отправкой
      delete user.password;

      // Возвращаем токены и данные пользователя
      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .status(201)
        .json({ user, accessToken });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // userService
    const user = await this.#service.getUser(email);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Не верный логин или пароль' });
    }

    try {
      delete user.password;

      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  logout = (req, res) => {
    res.clearCookie('refreshToken').sendStatus(200);
  };
}

module.exports = new AuthController(userService);
