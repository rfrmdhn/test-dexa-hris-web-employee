import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login API call
        // Mock login for now
        if (email && password) {
            login('mock-token', {
                id: '1',
                name: 'Test Employee',
                email: email,
                role: 'EMPLOYEE'
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
