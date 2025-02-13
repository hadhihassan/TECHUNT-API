import { Router } from 'express';
import 'dotenv/config';
import { Vcontoller } from '../../providers/controller.js';
import { catchAsync } from '../../utils/catchAsync.js';

const verification = Router();

//Authentication routes
verification.post('/login/',catchAsync((req, res) => Vcontoller.login(req, res)))

//Profile routes
verification.post("/checkValidNumber/", catchAsync((req, res) => Vcontoller.checkNumberisValid(req, res)))
verification.patch("/update-number-verified/", catchAsync((req, res) => Vcontoller.setNumberVerified(req, res)))
verification.post("/add-bank-details/", catchAsync((req, res) => Vcontoller.addBankDetails(req, res)))
verification.patch("/update-bank-details/", catchAsync((req, res) => Vcontoller.updateBankDetails(req, res)))
verification.post("/calculate-progress/", catchAsync((req, res) => Vcontoller.progressCaluculate(req, res)))

//forgetPassword
verification.post("/forget-password/email/", catchAsync((req, res) => Vcontoller.forGetPasswordEmail(req, res)))
verification.post("/forget-password/otp/resend/", catchAsync((req, res) => Vcontoller.forGetPasswordEmail(req, res)))
verification.post("/forget-password/otp/send/", catchAsync((req, res) => Vcontoller.checkOtpIsValid(req, res)))
verification.post("/forget-password/set-new-Password/", catchAsync((req, res) => Vcontoller.updatedPassword(req, res)))

export default verification;
