import BaseService from "./baseService";

class CachoeiraService extends BaseService {
  constructor() {
    super("/cachoeiras");
  }
}
export default new CachoeiraService();
