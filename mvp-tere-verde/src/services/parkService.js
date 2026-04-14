import BaseService from "./baseService";

class ParkService extends BaseService {
  constructor() {
    super("/parques");
  }

  async getByBioma(bioma) {
    return this.getAll({ bioma });
  }
}
export default new ParkService();
