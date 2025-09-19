export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log("Got from the verifyRoles.js " + rolesArray);
    console.log("Got from the verifyRoles.js " + req.roles);
    const allowed = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!allowed) return res.sendStatus(401);
    next();
  };
};
