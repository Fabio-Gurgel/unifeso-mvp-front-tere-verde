import BaseService from "./baseService";

class WaterfallService extends BaseService {
  constructor() {
    super("/cachoeiras");
  }
}
export default new WaterfallService();
