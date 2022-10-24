import { registerService } from '../services';

export const registerController = {
  async register(req, res) {
    try {
      const data = await registerService.registerUser(req);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
