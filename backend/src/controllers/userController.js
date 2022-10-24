import { modifyData } from '../services';

export const userController = {
  async modifyUser(req, res) {
    try {
      const modifiedData = await modifyData.modifyUser(req);
      res.status(200).json(modifiedData);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
