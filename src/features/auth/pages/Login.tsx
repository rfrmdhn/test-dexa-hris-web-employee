import React from 'react';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { Card } from '@/components/atoms/Card';
import { LoginForm } from '../components/LoginForm';



const Login: React.FC = () => {
    useAuthRedirect();

    return (
        <AuthLayout>
            <Card className="w-full max-w-md mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-body dark:text-body">
                        Employee Login
                    </h1>
                    <p className="text-base font-normal text-subtle dark:text-subtle">
                        Please sign in to manage your shifts and documents.
                    </p>
                </div>

                <LoginForm />
            </Card>
        </AuthLayout>
    );
};

export default Login;
