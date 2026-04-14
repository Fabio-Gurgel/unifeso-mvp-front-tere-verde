import BaseService from "./baseService";

class TrilhaService extends BaseService {
  constructor() {
    super("/trilhas");
  }

  async getByParque(parqueId) {
    return this.getAll({ parque_id: parqueId });
  }
}
export default new TrilhaService();
