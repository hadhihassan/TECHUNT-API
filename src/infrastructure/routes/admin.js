import { Router } from 'express';
import { Acontroller } from '../../providers/controller.js';

const admin_Router = Router();

admin_Router.post("/admin-login/", (req, res) => Acontroller.verifyLogin(req, res))
            .get("/get-all-users/", (req, res) => Acontroller.getAllUsers(req, res))
            .post("/block-user/", (req, res) => Acontroller.blockUser(req, res))


export default admin_Router;
