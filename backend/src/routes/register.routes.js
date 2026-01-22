import {Router} from "express";

import {userRegister} from "../controller/employee.controller.js/registration.controller.js";

const router = Router();

router.route("/register").post(userRegister);


export default router;
