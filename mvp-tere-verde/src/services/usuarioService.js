import BaseService from "./baseService";

class UsuarioService extends BaseService {
  constructor() {
    super("/usuarios");
  }
}
export default new UsuarioService();
