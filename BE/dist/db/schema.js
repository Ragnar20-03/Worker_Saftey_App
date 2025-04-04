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
exports.Site = exports.Labour = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("../config/dotenv");
mongoose_1.default.connect(dotenv_1.DB_URL).then((res) => {
    console.log("connection to mongoose succesfull !");
}).catch((err) => {
    console.log("connection to mongoose failed !");
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    sites: [{ type: mongoose_1.default.Types.ObjectId, ref: "Site" }]
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next(); // Skip if not modified
        const salt = yield bcrypt_1.default.genSalt(10); // Generate salt
        //@ts-ignore
        this.password = yield bcrypt_1.default.hash(this.password, salt); // Hash password
        next();
    });
});
const siteSchema = new mongoose_1.default.Schema({
    siteName: String,
    address: String,
    labours: [{ type: mongoose_1.default.Types.ObjectId, ref: "Labour" }]
});
const labourSchema = new mongoose_1.default.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    insuranceNo: { type: String, default: null },
    adhar: String // image link
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Labour = mongoose_1.default.model('Labour', labourSchema);
exports.Site = mongoose_1.default.model('Site', siteSchema);
