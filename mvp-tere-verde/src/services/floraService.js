import BaseService from "./baseService";

class FloraService extends BaseService {
  constructor() {
    super("/flora");
  }
}
export default new FloraService();
