import BaseService from "./baseService";

class FaunaService extends BaseService {
  constructor() {
    super("/fauna");
  }
}
export default new FaunaService();
