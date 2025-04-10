import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export function SigninForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/dashboard');
      } catch (error: any) {
        toast({
          title: "Login failed",
          description: error.response?.data?.message || "Invalid credentials",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-3xl font-semibold text-[#0D0D0C] mb-2">Sign in to Beam.</h1>
        <p className="text-gray-600">
          Please sign in with your assigned login details
        </p>
      </div>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
            
              type="email"
              placeholder="your.email@example.com"
              className={`w-full rounded-md border ${
                formik.touched.email && formik.errors.email 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              } p-2`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
           
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-md border ${
                  formik.touched.password && formik.errors.password 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } p-2 pr-10`}
                {...formik.getFieldProps('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>
          
          <div className="flex items-end justify-end space-x-2">
            <p>Forgot Password?</p>
          </div>
          
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-black text-white font-medium py-3 rounded-lg disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
