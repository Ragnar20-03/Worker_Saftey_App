import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"
import { DB_URL } from "../config/dotenv";
mongoose.connect(DB_URL).then((res) => {
    console.log("connection to mongoose succesfull !");

}).catch((err) => {
    console.log("connection to mongoose failed !");
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    sites: [{ type: mongoose.Types.ObjectId, ref: "Site" }]
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if not modified

    const salt = await bcrypt.genSalt(10); // Generate salt
    //@ts-ignore
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
});

const siteSchema = new mongoose.Schema({
    siteName: String,
    address: String,
    labours: [{ type: mongoose.Types.ObjectId, ref: "Labour" }]
})
const labourSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    insuranceNo: { type: String, default: null },
    adhar: String // image link
})
export const User = mongoose.model('User', userSchema)
export const Labour = mongoose.model('Labour', labourSchema)
export const Site = mongoose.model('Site', siteSchema)
