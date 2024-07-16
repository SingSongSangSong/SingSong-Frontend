// import {useMutation, useQuery} from '@tanstack/react-query';
// import {postLogin, postSignUp} from '../api/auth';
// import {UseMutationCustomOptions} from '../types/common';
// import axiosInstance from '../api/axios';
// import {removeHeader, setHeader} from '../utils/header';
// import {useEffect} from 'react';
// import queryClient from '../api/queryClient';

// function useSignup(mutationOptions?: UseMutationCustomOptions) {
//   return useMutation({
//     mutationFn: postSignUp,
//     ...mutationOptions,
//   });
// }

// function useLogin(mutationOptions?: UseMutationCustomOptions) {
//   return useMutation({
//     mutationFn: postLogin,
//     onSuccess: ({accessToken, refreshToken}) => {
//       //   setEncryptStorage('refreshToken', refreshToken);
//       setHeader('Authorization', `Bearer ${accessToken}`);
//     },
//     onSettled: () => {
//       queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
//     },
//     ...mutationOptions,
//   });
// }

// function useGetRefreshToken() {
//   const {isSuccess, isError} = useQuery({
//     queryKey: ['auth', 'getAcessToken'],
//     queryFn: getAccessToken,
//     staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
//     refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
//     refetchOnReconnect: true,
//     refetchIntervalInBackground: true,
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       setHeader('Authorization', `Bearer ${data.accessToken}`);
//       // setEncryptStorage('refreshToken', data.refreshToken);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (isError) {
//       removeHeader('Authorization');
//       // removeEncryptStorage('refreshToken');
//     }
//   }, [isError]);

//   return {isSuccess, isError};
// }

// function useGetProfile() {
//   return useQuery({
//     queryKey: ['auth', 'getProfile'],
//     queryFn: GetProfile,
//   });
// }

// function useAuth() {
//   const signupMutation = useSignup();
//   const refreshTokenQuery = useGetRefreshToken();
//   const getProfileQuery = useGetProfile({
//     enabled: refreshTokenQuery.isSuccess,
//   });
//   const isLogin = getProfileQuery.isSuccess;
//   const loginMutation = useLogin();

//   return {signupMutation, loginMutation, refreshTokenQuery, getProfileQuery, isLogin};
// }
