'use client';

import { useState, useEffect } from 'react';

interface User {
  name: string;
  number: string;
  countryCode: string;
  isRegistered: boolean;
}

interface CountryCode {
  code: string;
  flag: string;
  name: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const countryCodes: CountryCode[] = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
];

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; number?: string}>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Name can only contain letters and spaces';
    return undefined;
  };

  const validateNumber = (number: string): string | undefined => {
    if (!number.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(number.trim())) return 'Phone number must be exactly 10 digits';
    return undefined;
  };

  const validateForm = (): boolean => {
    const nameError = isSignup ? validateName(name) : undefined;
    const numberError = validateNumber(number);
    
    setErrors({
      name: nameError,
      number: numberError
    });

    return !nameError && !numberError;
  };

  // Real-time validation
  useEffect(() => {
    if (name && isSignup) {
      const nameError = validateName(name);
      setErrors(prev => ({ ...prev, name: nameError }));
    }
  }, [name, isSignup]);

  useEffect(() => {
    if (number) {
      const numberError = validateNumber(number);
      setErrors(prev => ({ ...prev, number: numberError }));
    }
  }, [number]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element;
        if (!target.closest('.country-dropdown')) {
          setShowCountryDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCountryDropdown]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setNumber(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fullNumber = countryCode + number;
    
    // Check if user exists (simulate database check)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = existingUsers.find((user: User) => user.number === fullNumber);

    if (isSignup) {
      // Signup logic
      if (existingUser) {
        setMessage('❌ User already exists with this number. Please try logging in instead.');
      } else {
        const newUser: User = {
          name: name.trim(),
          number: fullNumber,
          countryCode,
          isRegistered: true
        };
        
        // Save to localStorage (simulate database)
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        setMessage('✅ Registration successful! Welcome to Market Scanner.');
        onLogin(newUser);
        
        // Close modal after successful registration
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } else {
      // Login logic
      if (existingUser) {
        setMessage('✅ Login successful! Welcome back.');
        onLogin(existingUser);
        
        // Close modal after successful login
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setMessage('❌ User not found. Please sign up first.');
      }
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    setName('');
    setNumber('');
    setCountryCode('+91');
    setMessage('');
    setErrors({});
    setIsSignup(false);
    setShowCountryDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white text-center">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-center mt-2">
            {isSignup 
              ? 'Join Market Scanner to access advanced features' 
              : 'Sign in to continue to your personalized dashboard'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-4">
            {/* Name Field - Only for Signup */}
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your full name (letters only)"
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="flex space-x-2">
                {/* Country Code Dropdown */}
                <div className="relative country-dropdown">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center space-x-2 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
                  >
                    <span className="text-lg">{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                    <span className="text-sm">{countryCode}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setCountryCode(country.code);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-700 text-left"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm">{country.code}</span>
                          <span className="text-xs text-gray-400">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  value={number}
                  onChange={handleNumberChange}
                  className={`flex-1 bg-gray-800 border rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${
                    errors.number 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="10-digit number"
                  maxLength={10}
                  required
                />
              </div>
              {errors.number && (
                <p className="text-red-400 text-xs mt-1">{errors.number}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                Enter exactly 10 digits (numbers only)
              </p>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes('✅') 
                  ? 'bg-green-900 text-green-300 border border-green-700' 
                  : 'bg-red-900 text-red-300 border border-red-700'
              }`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (isSignup && !name.trim()) || !number.trim() || errors.name || errors.number}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                isSignup ? 'Sign Up' : 'Sign In'
              )}
            </button>

            {/* Toggle between Login and Signup */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setMessage('');
                  // Clear name field when switching to login
                  if (!isSignup) {
                    setName('');
                    setErrors(prev => ({ ...prev, name: undefined }));
                  }
                }}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                {isSignup 
                  ? 'Already have an account? Sign In' 
                  : "Don't have an account? Sign Up"
                }
              </button>
            </div>
          </div>
        </form>

        {/* Features Info */}
        <div className="px-6 py-4 bg-gray-800 rounded-b-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">What you get:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Advanced filter combinations</li>
            <li>• Personalized watchlists</li>
            <li>• Real-time alerts</li>
            <li>• Premium scanner access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
