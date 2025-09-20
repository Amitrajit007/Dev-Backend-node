// import { USER_ROLE } from "../config/userRole.js";

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log("Got from the verifyRoles.js " + rolesArray);
    console.log("Got from the verifyRoles.js " + req.roles);
    const allowed = req.roles.some((role) => rolesArray.includes(role));

    // const post = rolesArray.map((id) => {
    //   if (id === 1001) {
    //     return "User";
    //   } else if (id === 2001) {
    //     return "Editor";
    //   } else if (id === 3001) {
    //     return "Admin";
    //   } else {
    //     return "Devoloper";
    //   }
    // });
    const roleNames = {
      1001: "User",
      2001: "Editor",
      3001: "Admin",
      4001: "Developer",
    };
    const post = rolesArray.map((id) => roleNames[id] || "Unknown");
    if (!allowed)
      return res
        .status(401)
        .send(`Access denied. Requires one of: ${post.join(", ")}`);
    next();
  };
};
