export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidty = (value, rules) => {
    let valid = true;
    if (rules.required) {
        valid = value.trim() !== ''
    }
    if (valid && rules.minLength) {
        valid = value.length >= rules.minLength;
    }
    if (valid && rules.maxLength) {
        valid = value.length <= rules.maxLength;
    }
    return valid;
}