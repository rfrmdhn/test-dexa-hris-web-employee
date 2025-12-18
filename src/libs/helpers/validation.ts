const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateLoginForm = (email: string, password: string): ValidationResult => {
    const errors: Record<string, string> = {};

    if (!isNotEmpty(email)) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!isNotEmpty(password)) {
        errors.password = 'Password is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
