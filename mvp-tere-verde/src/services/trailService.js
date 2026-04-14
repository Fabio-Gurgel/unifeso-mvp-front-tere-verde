import BaseService from "./baseService";

class Trail extends BaseService {
  constructor() {
    super("/trilhas");
  }

  async getByPark(parkId) {
    return this.getAll({ parque_id: parkId });
  }
}
export default new Trail();
