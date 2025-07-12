import { axiosInstance } from "./axios";


export const registerUser = async (signupData) =>{
    const response = await axiosInstance.post("/auth/register", signupData);
    return response.data;
}


export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};


export const getSkill = async () => {
    const response = await axiosInstance.get("/skill/bulk");
    return response.data;
}


export const getAuthUser = async () => {
    const response =  localStorage.getItem("token");
    return response
}
