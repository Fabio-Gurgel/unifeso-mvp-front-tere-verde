import BaseService from "./baseService";

class UserService extends BaseService {
  constructor() {
    super("/usuarios");
  }
}
export default new UserService();
