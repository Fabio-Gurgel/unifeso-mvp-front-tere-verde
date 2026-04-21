import BaseService from "./baseService";

class EventService extends BaseService {
  constructor() {
    super("/eventos");
  }
}
export default new EventService();
