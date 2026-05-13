import BaseService from "./baseService";

class EnumService extends BaseService {
  constructor() {
    super("/enums");
  }
}

export default new EnumService();