import request from "supertest";
import App from "../../../src/app";
import { PrismaClient } from "@prisma/client";

const app = new App().app;
const prisma = new PrismaClient();

describe("POST /api/v1/doctors", () => {
  // Clean up test data after all tests
  afterAll(async () => {
    // Delete test doctors (emails starting with test-)
    await prisma.doctor.deleteMany({
      where: {
        email: {
          startsWith: "test-",
        },
      },
    });
    await prisma.$disconnect();
  });

  describe("Success cases", () => {
    it("should create a new doctor with valid data", async () => {
      const newDoctor = {
        firstName: "Jane",
        lastName: "Smith",
        email: `test-${Date.now()}@hospital.com`,
        phone: "+1555123456",
        department: "NEUROLOGY",
        gender: "FEMALE",
        bio: "Board-certified neurologist with expertise in stroke care",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(newDoctor)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        message: "Doctor created successfully",
        data: {
          id: expect.any(String),
        },
      });
    });

    it("should create a doctor with optional fields", async () => {
      const newDoctor = {
        firstName: "Michael",
        lastName: "Johnson",
        email: `test-${Date.now()}@hospital.com`,
        phone: "+1555987654",
        department: "CARDIOLOGY",
        gender: "MALE",
        bio: "Experienced cardiologist specializing in interventional procedures",
        specialties: ["Heart Surgery", "Angioplasty"],
        images: ["https://example.com/doctor-photo.jpg"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/michaeljohnson",
          twitter: "https://twitter.com/dr_mjohnson",
        },
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(newDoctor)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
    });
  });

  describe("Validation errors", () => {
    it("should return 400 when required fields are missing", async () => {
      const incompleteDoctor = {
        firstName: "John",
        email: "john@test.com",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(incompleteDoctor)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: "Validation failed",
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: expect.any(String),
            message: expect.any(String),
          }),
        ]),
      });
    });

    it("should return 400 for invalid email format", async () => {
      const doctorWithInvalidEmail = {
        firstName: "John",
        lastName: "Doe",
        email: "not-an-email",
        phone: "+1234567890",
        department: "CARDIOLOGY",
        gender: "MALE",
        bio: "Cardiologist",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(doctorWithInvalidEmail)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "email",
            message: "Invalid email format",
          }),
        ])
      );
    });

    it("should return 400 for bio shorter than 10 characters", async () => {
      const doctorWithShortBio = {
        firstName: "John",
        lastName: "Doe",
        email: `test-${Date.now()}@test.com`,
        phone: "+1234567890",
        department: "CARDIOLOGY",
        gender: "MALE",
        bio: "Short",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(doctorWithShortBio)
        .expect(400);

      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "bio",
            message: "Bio must be at least 10 characters",
          }),
        ])
      );
    });

    it("should return 400 for invalid department enum", async () => {
      const doctorWithInvalidDept = {
        firstName: "John",
        lastName: "Doe",
        email: `test-${Date.now()}@test.com`,
        phone: "+1234567890",
        department: "INVALID_DEPT",
        gender: "MALE",
        bio: "Experienced doctor",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(doctorWithInvalidDept)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("Business logic errors", () => {
    it("should return 400 when doctor email already exists", async () => {
      const existingEmail = `test-duplicate-${Date.now()}@hospital.com`;

      // First request - should succeed
      const firstDoctor = {
        firstName: "First",
        lastName: "Doctor",
        email: existingEmail,
        phone: "+1111111111",
        department: "PEDIATRICS",
        gender: "FEMALE",
        bio: "First doctor profile",
      };

      await request(app).post("/api/v1/doctors").send(firstDoctor).expect(201);

      // Second request with same email - should fail
      const duplicateDoctor = {
        ...firstDoctor,
        firstName: "Second",
        lastName: "Doctor",
      };

      const response = await request(app)
        .post("/api/v1/doctors")
        .send(duplicateDoctor)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: "Doctor already exists",
      });
    });
  });
});
