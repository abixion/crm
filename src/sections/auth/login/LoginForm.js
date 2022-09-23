import * as Yup from 'yup';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Link, Stack, IconButton, InputAdornment} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField, RHFCheckbox} from '../../../components/hook-form';
import {useAuth} from "../../../hooks/auth/useAuth";


// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const {login,authToken,setAuthToken} = useAuth();


    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
        remember: true,
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (data) => {
        if (data.email !== "" && data.password !== "") {
            axios
              .post(`http://localhost:5000/api/auth/login`, {
                email: data.email,
                password: data.password,
              })
              .then((response) => {
                if (response.data.error === true) {
                  toast.error('Invalid Email Or Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                  
                } else {
                  toast.success('User Successfully Logged In....', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });   
                    setAuthToken(response?.data?.token)
                //   setCurrentUser(response?.data?.user);
                //   setAuthToken(response?.data?.token);
                login(response)
                navigate('/admin', {replace: true});
    
                }
    
              })
              .catch((error) => {
                 
              });
          }
        login(data);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <Stack spacing={3}>
                <RHFTextField name="email" label="Email address"/>

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <RHFCheckbox name="remember" label="Remember me"/>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Login
            </LoadingButton>
        </FormProvider>
    );
}
