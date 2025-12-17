/**
 * Validation Helper Functions
 * Provides reusable validation logic following SRP.
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address format.
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 * Time Complexity: O(n) where n is email length
 */
export const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

/**
 * Validates that a string is not empty.
 * @param value - The string to validate
 * @returns true if not empty, false otherwise
 * Time Complexity: O(1)
 */
export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validation result type for form fields.
 */
export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

/**
 * Validates login form fields.
 * @param email - User email
 * @param password - User password
 * @returns ValidationResult with isValid flag and error messages
 */
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
