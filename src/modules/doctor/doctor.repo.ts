import { PrismaClient } from "@prisma/client";
import { CreateDoctorInput } from "./doctor.types";
import { IDoctorRepository } from "./interfaces/doctor.repository.interface";

const prisma = new PrismaClient();

export class DoctorRepository implements IDoctorRepository {
  async findByEmail(email: string): Promise<{ id: string } | null> {
    const doc = await prisma.doctor.findUnique({
      where: { email },
      select: { id: true },
    });
    return doc;
  }

  async create(data: CreateDoctorInput): Promise<{ id: string }> {
    // Create Doctor first
    const { specialties = [], images = [], socialLinks, ...doctorData } = data;
    const created = await prisma.doctor.create({
      data: {
        ...doctorData,
        images,
        socialLinks: socialLinks as any, // Json
      },
      select: { id: true },
    });

    // Upsert specialties by name and create join rows
    if (specialties.length > 0) {
      // Ensure specialties exist
      const upserts = specialties.map((name) =>
        prisma.specialty.upsert({
          where: { name },
          create: { name },
          update: {},
          select: { id: true },
        })
      );
      const specIds: Array<{ id: string }> = await prisma.$transaction(upserts);

      // Create join documents
      const joins = specIds.map((s: { id: string }) =>
        prisma.doctorSpecialty.create({
          data: {
            doctorId: created.id,
            specialtyId: s.id,
          },
        })
      );
      await prisma.$transaction(joins);
    }

    return created;
  }
}
