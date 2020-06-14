import UserService from '../services/UsersService';

class ProfileController {
  public async changePassword(req: any, res: any) {
    try {
      const { id, password } = req.body;
      await UserService.changePassword(id, password);
      res.send('Password changed.');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async changeInfo(req: any, res: any) {
    try {
      let userInfo = await UserService.changeInfo(req.body);
      res.send(userInfo);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  public async getInfo(req: any, res: any) {
    try {
      let userInfo = await UserService.getInfo(req.params['id']);
      res.send(userInfo);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new ProfileController();
