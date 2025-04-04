"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLaboursByIdController = exports.getAllLaboursController = exports.getAllSitesByIdController = exports.getAllSitesController = exports.addLabourController = exports.addConstructionSiteController = exports.userLoginController = exports.userRgisterController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = require("../db/schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("../config/dotenv");
const userRgisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    let user = new schema_1.User({ username, password, sites: [] });
    yield user.save();
    return res.status(200).json({
        status: "success",
        msg: "user created Succesfully !"
    });
});
exports.userRgisterController = userRgisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(200).json({
            status: "failed",
            msg: "All Feilds are necessary !"
        });
    }
    let user = yield schema_1.User.findOne({ username });
    if (!user) {
        return res.status(200).json({
            status: "failed",
            msg: "user not found "
        });
    }
    else {
        //@ts-ignore
        if (bcrypt_1.default.compare(password, user.password)) {
            let token = jsonwebtoken_1.default.sign({ uid: user._id }, dotenv_1.JWT_SECRETE);
            // res.cookie('token', token)
            return res.status(200).json({
                status: "success",
                msg: "Login Succesfull !",
                token
            });
        }
        else {
            return res.status(501).json({
                status: "failed",
                msg: "Password Mismatch !"
            });
        }
    }
});
exports.userLoginController = userLoginController;
const addConstructionSiteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uid = req.uid;
        const { siteName, address } = req.body;
        let site = yield schema_1.Site.create({ siteName, address, labours: [] });
        if (site) {
            let user = yield schema_1.User.findByIdAndUpdate(uid, { $addToSet: { sites: site._id } });
            if (user) {
                return res.status(200).json({
                    status: "success",
                    msg: "Construction site added !"
                });
            }
            else {
                return res.status(501).json({
                    status: "success",
                    msg: "unable to add labour to construction site !"
                });
            }
        }
        else {
            return res.status(501).json({
                status: "failed",
                msg: "unable to add Construction site !"
            });
        }
    }
    catch (err) {
        return res.status(501).json({
            status: "failed",
            msg: "something went Wrong !"
        });
    }
});
exports.addConstructionSiteController = addConstructionSiteController;
const addLabourController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let siteId = req.params.siteId;
        const { firstname, lastname, address, phone, insuranceNo } = req.body;
        console.log("asdadfirstname, lastname, address, phone, insuranceNo: ", firstname, lastname, address, phone, insuranceNo);
        // Check if all required fields are provided
        if (!firstname || !lastname || !address || !phone || !req.file) {
            return res.status(400).json({
                status: "failed",
                msg: "All fields including Aadhar image are required",
            });
        }
        // Get the Cloudinary URL for the uploaded Aadhar image
        const adharImageUrl = req.file.path;
        // Create a new Labour entry
        let labour = yield schema_1.Labour.create({
            firstname,
            lastname,
            address,
            phone,
            adhar: adharImageUrl, // Store Cloudinary image URL
            insuranceNo: insuranceNo ? insuranceNo : null
        });
        if (labour) {
            let site = yield schema_1.Site.findByIdAndUpdate(siteId, { $addToSet: { labours: labour._id } });
            if (site) {
                return res.status(200).json({
                    status: "success",
                    msg: "Labour added to the respective site successfully!",
                    labour,
                });
            }
            else {
                return res.status(500).json({
                    status: "failed",
                    msg: "Unable to add labour to the respective site",
                });
            }
        }
        else {
            return res.status(500).json({
                status: "failed",
                msg: "Unable to create labour",
            });
        }
    }
    catch (error) {
        console.log("something went wrong");
        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong!",
        });
    }
});
exports.addLabourController = addLabourController;
const getAllSitesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.uid;
    let sites = yield schema_1.Site.find({});
    return res.status(200).json({
        status: "success",
        sites
    });
});
exports.getAllSitesController = getAllSitesController;
const getAllSitesByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.uid;
    let siteId = req.params.siteId;
    let site = yield schema_1.Site.find({ _id: siteId });
    return res.status(200).json({
        status: "success",
        site
    });
});
exports.getAllSitesByIdController = getAllSitesByIdController;
const getAllLaboursController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.uid;
    let labours = yield schema_1.Labour.find();
    return res.status(200).json({
        status: "success",
        labours
    });
});
exports.getAllLaboursController = getAllLaboursController;
const getAllLaboursByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.uid;
    let labourId = req.params.labourId;
    let labours = yield schema_1.Labour.findById(labourId);
    return res.status(200).json({
        status: "success",
        labours
    });
});
exports.getAllLaboursByIdController = getAllLaboursByIdController;
