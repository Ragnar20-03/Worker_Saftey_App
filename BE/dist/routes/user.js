"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const user_2 = require("../middleware/user");
const multer_1 = require("../config/multer");
exports.router = express_1.default.Router();
exports.router.post('/register', user_1.userRgisterController);
exports.router.post('/login', user_1.userLoginController);
exports.router.post('/addConstructionSite', user_2.userMiddleware, user_1.addConstructionSiteController);
exports.router.post('/addLabourToSite/:siteId', user_2.userMiddleware, multer_1.upload.single('adhar'), user_1.addLabourController);
exports.router.get('/getAllSites', user_2.userMiddleware, user_1.getAllSitesController);
exports.router.get('/getAllSites/:siteId', user_2.userMiddleware, user_1.getAllLaboursByIdController);
exports.router.get('/getAllSiteLabours/:siteId', user_2.userMiddleware, user_1.getAllLaboursController);
exports.router.get('/getAllLabours/:labourId', user_2.userMiddleware, user_1.getAllLaboursByIdController);
