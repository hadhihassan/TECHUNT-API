import { Router } from 'express';
import 'dotenv/config';
import { Vcontoller } from '../../providers/controller.js';

const verification = Router();

verification.post('/login/', (req, res) => Vcontoller.login(req, res))
verification.post("/checkValidNumber/", (req, res) => Vcontoller.checkNumberisValid(req, res))
verification.patch("/update-number-verified/", (req, res) => Vcontoller.setNumberVerified(req, res))
verification.post("/add-bank-details/", (req, res) => Vcontoller.addBankDetails(req, res))
verification.patch("/update-bank-details/", (req, res) => Vcontoller.updateBankDetails(req, res))
export default verification;
