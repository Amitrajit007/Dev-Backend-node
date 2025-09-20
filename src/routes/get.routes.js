import express from "express";
import controller from "../controllers/getsimple.controller.js";
const router = express.Router();
import { USER_ROLE } from "../config/userRole.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
router
  .route("/")
  .get(controller.getController)
  .post(
    verifyRoles(USER_ROLE.editor, USER_ROLE.devoloper, USER_ROLE.admin),
    controller.postController
  )
  .put(
    verifyRoles(USER_ROLE.admin, USER_ROLE.devoloper),
    controller.putController
  )
  .delete(verifyRoles(USER_ROLE.devoloper), controller.deleteController);

export default router;
