
export const validateData = (email, password, name) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /^[a-z ,.'-]+$/i.test(name) || name === "";

    if(!isEmailValid) {
        return "Please enter a valid email address";
    }
    if(!isPasswordValid) {
        return "Please enter a valid password";
    }
    if (name && !isNameValid) { // Only validate name if provided
        return "Please enter a valid name";
    }
    return null;

}