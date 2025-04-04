import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt"
import { Labour, Site, User } from "../db/schema";
import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "../config/dotenv";


export const userRgisterController: RequestHandler | any = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let user = new User({ username, password, sites: [] })
    await user.save()
    return res.status(200).json({
        status: "success",
        msg: "user created Succesfully !"
    })
}
export const userLoginController: RequestHandler | any = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(200).json({
            status: "failed",
            msg: "All Feilds are necessary !"
        })
    }

    let user = await User.findOne({ username })
    if (!user) {
        return res.status(200).json({
            status: "failed",
            msg: "user not found "

        })
    }
    else {
        //@ts-ignore
        if (bcrypt.compare(password, user.password)) {
            let token = jwt.sign({ uid: user._id }, JWT_SECRETE)
            // res.cookie('token', token)
            return res.status(200).json({
                status: "success",
                msg: "Login Succesfull !",
                token
            })
        }
        else {
            return res.status(501).json({
                status: "failed",
                msg: "Password Mismatch !"
            })
        }
    }
}

export const addConstructionSiteController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let uid = req.uid
        const { siteName, address } = req.body;
        let site = await Site.create({ siteName, address, labours: [] });
        if (site) {
            let user = await User.findByIdAndUpdate(uid, { $addToSet: { sites: site._id } })
            if (user) {
                return res.status(200).json({
                    status: "success",
                    msg: "Construction site added !"
                })
            }
            else {
                return res.status(501).json({
                    status: "success",
                    msg: "unable to add labour to construction site !"
                })
            }
        }
        else {
            return res.status(501).json({
                status: "failed",
                msg: "unable to add Construction site !"
            })
        }
    } catch (err) {
        return res.status(501).json({
            status: "failed",
            msg: "something went Wrong !"
        })
    }
}

export const addLabourController: RequestHandler | any = async (req: Request, res: Response) => {
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
        const adharImageUrl = (req.file as any).path;

        // Create a new Labour entry
        let labour = await Labour.create({
            firstname,
            lastname,
            address,
            phone,
            adhar: adharImageUrl, // Store Cloudinary image URL
            insuranceNo: insuranceNo ? insuranceNo : null
        });

        if (labour) {
            let site = await Site.findByIdAndUpdate(siteId, { $addToSet: { labours: labour._id } });
            if (site) {
                return res.status(200).json({
                    status: "success",
                    msg: "Labour added to the respective site successfully!",
                    labour,
                });
            } else {
                return res.status(500).json({
                    status: "failed",
                    msg: "Unable to add labour to the respective site",
                });
            }
        } else {
            return res.status(500).json({
                status: "failed",
                msg: "Unable to create labour",
            });
        }
    } catch (error) {
        console.log("something went wrong");

        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong!",

        });
    }
};

export const getAllSitesController: RequestHandler | any = async (req: Request, res: Response) => {
    let uid = req.uid;
    let sites = await Site.find({})
    return res.status(200).json({
        status: "success",
        sites
    })
}

export const getAllSitesByIdController: RequestHandler | any = async (req: Request, res: Response) => {
    let uid = req.uid;
    let siteId = req.params.siteId
    let site = await Site.find({ _id: siteId })
    return res.status(200).json({
        status: "success",
        site
    })
}

export const getAllLaboursController: RequestHandler | any = async (req: Request, res: Response) => {
    let uid = req.uid;
    let labours = await Labour.find()
    return res.status(200).json({
        status: "success",
        labours
    })
}

export const getAllLaboursByIdController: RequestHandler | any = async (req: Request, res: Response) => {
    let uid = req.uid;
    let labourId = req.params.labourId
    let labours = await Labour.findById(labourId)
    return res.status(200).json({
        status: "success",
        labours
    })
}