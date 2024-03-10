let roles = ["TALENT", "CLIENT", 'ADMIN', "NOTHING"];
export const getAllRoles = () => {
    return [...roles];
};
export const isValidRole = (role) => {
    return roles.includes(role.toUpperCase());
};
export const addNewRole = (role) => {
    if (!isValidRole(role)) {
        roles.push(role.toUpperCase());
        return true;
    } else {
        return false;
    }
};
