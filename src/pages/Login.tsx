
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check URL parameter to determine initial mode
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      // Name validation
      if (!name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      // Phone validation
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10,15}$/.test(phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Phone must be 10-15 digits only';
      }

      // Confirm password validation
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateApiCall = (payload: any): Promise<{ success: boolean; message?: string; user?: any }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate different responses
        if (isLogin) {
          if (payload.email === 'error@test.com') {
            resolve({ success: false, message: 'Invalid credentials' });
          } else if (payload.email === 'blocked@test.com') {
            resolve({ success: false, message: 'Account has been suspended' });
          } else {
            resolve({ 
              success: true, 
              user: { id: 1, email: payload.email, name: 'John Doe' }
            });
          }
        } else {
          if (payload.email === 'existing@test.com') {
            resolve({ success: false, message: 'Email already exists' });
          } else if (payload.phone === '1234567890') {
            resolve({ success: false, message: 'Phone number already registered' });
          } else {
            resolve({ 
              success: true, 
              user: { id: 2, email: payload.email, name: payload.name }
            });
          }
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = isLogin 
        ? { email, password, isLogin }
        : { name, phone, email, password, isLogin };
      
      console.log('Form submitted:', payload);
      
      const response = await simulateApiCall(payload);
      
      if (response.success) {
        // Show success toast
        toast({
          title: isLogin ? "Login successful!" : "Account created!",
          description: isLogin 
            ? "Welcome back! Redirecting to dashboard..." 
            : "Your account has been created successfully.",
          variant: "default",
          className: "border-green-500 bg-green-50 dark:bg-green-900/20",
          action: (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          ),
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard', { 
            state: { 
              user: response.user,
              message: isLogin ? 'Successfully logged in!' : 'Account created successfully!'
            }
          });
        }, 1000);
      } else {
        // Show error toast
        toast({
          title: "Authentication Error",
          description: response.message || "An unexpected error occurred",
          variant: "destructive",
          action: (
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          ),
        });
      }
    } catch (error) {
      // Show generic error toast
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
        action: (
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        ),
      });
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits and spaces
    const value = e.target.value.replace(/[^\d\s]/g, '');
    setPhone(value);
    
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    
    // Clear error when user starts typing
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="card-gradient p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Join us to start creating amazing face swaps'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                      className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter your phone number"
                      required
                      disabled={isLoading}
                      className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: '' }));
                    }
                  }}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: '' }));
                    }
                  }}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }
                    }}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                    className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full btn-gradient text-lg py-3" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Testing section for demo purposes */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Test accounts:</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                ✅ Any email except test ones<br/>
                ❌ error@test.com (invalid credentials)<br/>
                ❌ blocked@test.com (suspended account)<br/>
                ❌ existing@test.com (signup: email exists)<br/>
                ❌ Phone: 1234567890 (signup: phone exists)
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setName('');
                    setPhone('');
                    setConfirmPassword('');
                  }}
                  className="ml-1 text-primary hover:underline font-medium"
                  disabled={isLoading}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
