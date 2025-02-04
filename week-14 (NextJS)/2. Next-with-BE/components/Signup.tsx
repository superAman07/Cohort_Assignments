'use client';

import { Solve } from '@/app/actions/user';
import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [darkMode, setDarkMode] = useState(false);  

  return (
    <div className={`${darkMode ? '' : 'dark'}`}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">Signup</h2>
           
          <button 
            className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
              onClick={()=>{
                  Solve(formData.username,formData.password)  // instead of using axios request from backend we use server action component 
              }}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
