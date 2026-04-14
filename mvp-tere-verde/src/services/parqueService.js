import BaseService from "./baseService";

class ParqueService extends BaseService {
  constructor() {
    super("/parques");
  }

  async getByBioma(bioma) {
    return this.getAll({ bioma });
  }
}
export default new ParqueService();
