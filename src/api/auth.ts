// import axiosInstance from './axios';

// type RequestUser = {
//   email: string;
//   password: string;
// };

// const postSignUp = async ({email, password}: RequestUser): Promise<void> => {
//   const {data} = await axiosInstance.post('', {email, password});

//   return data;
// };

// type ResponseToken = {
//   accessToken: string;
//   refreshToken: string;
// };

// const postLogin = async ({
//   email,
//   password,
// }: RequestUser): Promise<ResponseToken> => {
//   const {data} = await axiosInstance.post('', {email, password});

//   return data;
// };

// type ResponseProfile = {
//   email: string;
//   name: string;
// };

// const getProfile = async (): Promise<ResponseProfile> => {
//   const {data} = await axiosInstance.get('');
//   return data;
// };

// const getAccessToken = async ():Promise<ResponseToken> =>
//     const refreshToken
//     const {data} = await axiosInstance.get('', {
//         headers: {
//             Authorization: `Bearer ${refreshToken}`,
//         }
//     });

// const logout = async () => {
//   await axiosInstance.post('');
// };

// export {postSignUp, postLogin, getProfile, logout};
