import BaseService from "./baseService";

class EventoService extends BaseService {
  constructor() {
    super("/eventos");
  }
}
export default new EventoService();
