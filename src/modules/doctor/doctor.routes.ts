import { Router } from "express";
import { addDoctor } from "./controllers";
import { validate } from "../../common/middlewares/validate.middleware";
import { createDoctorSchema } from "./doctor.validation";

export const doctorRoutes = Router();

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Register a new doctor in the system with profile details, specialties, and images
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - department
 *               - gender
 *               - bio
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@hospital.com"
 *               phone:
 *                 type: string
 *                 pattern: '^\+?[0-9\s\-()]+$'
 *                 example: "+1234567890"
 *               department:
 *                 type: string
 *                 enum: [CARDIOLOGY, NEUROLOGY, PEDIATRICS, ORTHOPEDICS, RADIOLOGY, DERMATOLOGY, GENERAL_MEDICINE, GYNECOLOGY, ONCOLOGY, UROLOGY]
 *                 example: "CARDIOLOGY"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: "MALE"
 *               bio:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *                 example: "Experienced cardiologist with 15+ years in the field"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: ["https://example.com/image1.jpg"]
 *               socialLinks:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   format: uri
 *                 example:
 *                   linkedin: "https://linkedin.com/in/johndoe"
 *                   twitter: "https://twitter.com/johndoe"
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Heart Surgery", "Interventional Cardiology"]
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Doctor created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "68f35efb19a91588eaf6f859"
 *       400:
 *         description: Validation error or doctor already exists
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Doctor already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
doctorRoutes.post("/", validate(createDoctorSchema), addDoctor);
