import api from "../../services/api";


export const registerService = async (data) => {
  console.log(data)
  const response = await api.post("/auth/register", data);
     console.log("Response:", response);
  return response.data;
};


export const loginService = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};





export const getProfileService = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};