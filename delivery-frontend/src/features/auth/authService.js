import api from "../../services/api";


export const registerService = async (data) => {
  try {
    console.log(data)
    const response = await api.post("/api/auth/register", data);
    console.log("Response:", response);
    return response.data;
  } catch (err) {
    console.log("Axios error:", err.response?.data || err.message);
    throw err;
  }


};

export const loginService = async (data) => {
  try {
    console.log(data);
    const response = await api.post("/api/auth/login", data);
    console.log("Response:", response);
    return response.data;

  } catch (err) {
    console.log("Axios error:", err.response?.data || err.message);
    throw err;
  }

};





export const getProfileService = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};