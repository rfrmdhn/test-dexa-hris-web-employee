import React from 'react';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { Card } from '@/components/atoms/Card';
import { LoginForm } from '../components/LoginForm';


const Login: React.FC = () => {
    useAuthRedirect();

    return (
        <AuthLayout>
            <Card>
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#111318] dark:text-white">
                        Employee Login
                    </h1>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Please sign in to manage your shifts and documents.
                    </p>
                </div>

                <LoginForm />

                {/* <SupportContact /> */}
            </Card>
        </AuthLayout>
    );
};

export default Login;
