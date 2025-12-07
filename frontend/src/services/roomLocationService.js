import apiCall from "../utils/api";
import {Location} from "../models/Location";
import { Room } from "../models/Room";

export const roomLocationService = {
    getAllLocations: async () => {
        const respone = await apiCall('/locations', {
            method: 'GET',
        })
        return respone.data
    },

    getRoomsByLocationId: async (locationId) => {
        const respone = await apiCall(`/locations/${locationId}/rooms`, {
            method: 'GET',
        })
        return respone.data;
    }
}