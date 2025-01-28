export class FieldValidator {

    // Validate the input field depends on its rules
    static validateInput(value, rules, fieldName) {
        for (const rule of rules) {
            const error = rule(value);
            if (error) {
                return `${fieldName} ${error}`;
            }
        }
        return null; // No errors
    }

    // Rule: Must not be empty
    static isNotEmpty = (value) =>
        (!value.trim() ? "must not be empty." : null);

    // Rule: Must start with a letter
    static startsWithLetter = (value) =>
        /^[a-zA-Z]/.test(value) ? null : "must start with a letter.";

    // Rule: No special characters (only letters, numbers, underscores)
    static noSpecialChars = (value) =>
        /^[a-zA-Z0-9_]+$/.test(value)
            ? null
            : "must contain only letters, numbers, and underscores.";

    // Rule: Length between min and max
    static lengthBetween = (min, max) => (value) =>
        value.length >= min && value.length <= max
            ? null
            : `must be between ${min} and ${max} characters.`;

    // Rule: Must be a valid email
    static isValidEmail = (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "is not a valid email.";

}

export const { isNotEmpty, startsWithLetter, noSpecialChars, lengthBetween, isValidEmail, validateInput} = FieldValidator;