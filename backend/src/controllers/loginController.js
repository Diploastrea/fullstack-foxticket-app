import { loginService } from '../services';

export const loginController = {
  async loginUser(req, res) {
    try {
      const data = await loginService.loginUser(req);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
