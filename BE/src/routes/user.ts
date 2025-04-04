import express from "express"
import { addConstructionSiteController, addLabourController, getAllLaboursByIdController, getAllLaboursController, getAllSitesController, userLoginController, userRgisterController } from "../controller/user"
import { userMiddleware } from "../middleware/user"
import { upload } from "../config/multer"
export const router = express.Router()

router.post('/register', userRgisterController)
router.post('/login', userLoginController)
router.post('/addConstructionSite', userMiddleware, addConstructionSiteController)
router.post('/addLabourToSite/:siteId', userMiddleware, upload.single('adhar'), addLabourController)

router.get('/getAllSites', userMiddleware, getAllSitesController)
router.get('/getAllSites/:siteId', userMiddleware, getAllLaboursByIdController)
router.get('/getAllSiteLabours/:siteId', userMiddleware, getAllLaboursController)
router.get('/getAllLabours/:labourId', userMiddleware, getAllLaboursByIdController)
