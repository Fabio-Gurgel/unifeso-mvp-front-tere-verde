import api from "./api";

class BaseService {
  constructor(endpoint) {
    if (this.constructor === BaseService) {
      throw new Error(
        "BaseService é uma classe abstrata e não pode ser instanciada."
      );
    }
    this.endpoint = endpoint;
  }

  async getAll(params = {}) {
    const response = await api.get(this.endpoint, { params });
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await api.post(this.endpoint, data);
    return response.data;
  }

  async update(id, data) {
    const response = await api.patch(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`${this.endpoint}/${id}`);
    return response.data;
  }
}

export default BaseService;
