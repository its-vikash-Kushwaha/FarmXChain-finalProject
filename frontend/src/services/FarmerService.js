  import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class FarmerService {
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  async getFarmerProfile() {
    try {
      const response = await axios.get(`${API_BASE_URL}/farmer/profile`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createFarmerProfile(profileData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/farmer/profile`, profileData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateFarmerProfile(profileData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/farmer/profile`, profileData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getAllFarmers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/farmer/all`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getFarmersByCrop(cropType) {
    try {
      const response = await axios.get(`${API_BASE_URL}/farmer/crop/${cropType}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

const farmerService = new FarmerService();
export default farmerService;
