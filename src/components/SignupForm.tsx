
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Apple from "../assets/Logo.svg.svg"
import Google from "../assets/google_symbol.svg.svg"

const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  agreeTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      agreeTerms: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await signup(values.email, values.password, values.fullName);
        toast({
          title: "Account created",
          description: "Registration successful! Redirecting to signin...",
        });
        navigate('/signin');
      } catch (error: any) {
        toast({
          title: "Registration failed",
          description: error.response?.data?.message || "An error occurred during registration.",
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
        <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
        <p className="text-gray-600">
          Already have an account? <a href="/signin" className="text-gray-900 underline">Login</a>
        </p>
      </div>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-gray-700">
              Full name
            </label>
            <Input
              id="fullName"
              {...formik.getFieldProps('fullName')}
              className={`w-full rounded-md border ${
                formik.touched.fullName && formik.errors.fullName 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              } p-2`}
              placeholder="Enter full name"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-full rounded-md border ${
                formik.touched.email && formik.errors.email 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              } p-2`}
              placeholder="your.email@example.com"
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
                {...formik.getFieldProps('password')}
                className={`w-full rounded-md border ${
                  formik.touched.password && formik.errors.password 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } p-2 pr-10`}
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
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formik.values.agreeTerms}
              onCheckedChange={(checked) => formik.setFieldValue('agreeTerms', checked)}
              className={`mt-1 ${
                formik.touched.agreeTerms && formik.errors.agreeTerms 
                  ? 'border-red-500' 
                  : ''
              }`}
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
              I agree to BeamMarkets <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
          {formik.touched.agreeTerms && formik.errors.agreeTerms && (
            <div className="text-red-500 text-sm">{formik.errors.agreeTerms}</div>
          )}
          
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-black text-white font-medium py-3 rounded-lg disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
          
          {/* Rest of the social login buttons remain unchanged */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or sign in with
            </div>
          </div>

          <div className="flex flex-row justify-center gap-2">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 border rounded-full hover:bg-gray-50"
            >
              <img src={Apple} alt="Apple" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 border rounded-full hover:bg-gray-50"
            >
              <img src={Google} alt="Google" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
