import api from "./ApiClient";

export const ParksService = {
    listParks: async () => {
        const { data } = await api.get("/parques");
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/parques/${id}`)
        return data;
    }
}