import { CreateDoctorInput } from "../../../src/modules/doctor/doctor.types";
import { ApiError } from "../../../src/common/utils/ApiError";

const mockFindByEmail = jest.fn();
const mockCreate = jest.fn();

jest.mock("../../../src/modules/doctor/doctor.repo", () => ({
  DoctorRepository: jest.fn().mockImplementation(() => ({
    findByEmail: mockFindByEmail,
    create: mockCreate,
  })),
}));

import { DoctorService } from "../../../src/modules/doctor/doctor.service";

describe("DoctorService - addDoctor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validDoctorData: CreateDoctorInput = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@hospital.com",
    phone: "+1234567890",
    department: "CARDIOLOGY",
    gender: "MALE",
    bio: "Experienced cardiologist with 15 years",
  };

  it("should create a new doctor successfully", async () => {
    const createdDoctor = { id: "test-id-123" };
    mockFindByEmail.mockResolvedValue(null);
    mockCreate.mockResolvedValue(createdDoctor);

    const result = await DoctorService.addDoctor(validDoctorData);

    expect(mockFindByEmail).toHaveBeenCalledWith(validDoctorData.email);
    expect(mockCreate).toHaveBeenCalledWith(validDoctorData);
    expect(result).toEqual(createdDoctor);
  });

  it("should throw ApiError when doctor email already exists", async () => {
    const existingDoctor = { id: "existing-id" };
    mockFindByEmail.mockResolvedValue(existingDoctor);

    await expect(DoctorService.addDoctor(validDoctorData)).rejects.toThrow(ApiError);
    await expect(DoctorService.addDoctor(validDoctorData)).rejects.toThrow("Doctor already exists");

    expect(mockFindByEmail).toHaveBeenCalledWith(validDoctorData.email);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("should propagate repository errors", async () => {
    const dbError = new Error("Database connection failed");
    mockFindByEmail.mockRejectedValue(dbError);

    await expect(DoctorService.addDoctor(validDoctorData)).rejects.toThrow("Database connection failed");
  });
});
