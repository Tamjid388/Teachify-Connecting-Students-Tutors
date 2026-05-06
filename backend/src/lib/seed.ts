import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { Role } from "../../prisma/generated/prisma/enums";
import { prisma } from "./prisma";

export type SeedUserInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export const users: SeedUserInput[] = [
  {
    name: "Arif Hassan",
    email: "arif.hassan92@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Nabila Rahman",
    email: "nabila.rahman.dev@outlook.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed88@yahoo.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Sadia Karim",
    email: "sadia.karim.work@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },  {
    name: "Mahmudul Islam",
    email: "mahmudul.islam93@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Farhan Chowdhury",
    email: "farhan.chowdhury.dev@outlook.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Jannatul Ferdous",
    email: "jannatul.ferdous88@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Rakib Hasan",
    email: "rakib.hasan.dev@yahoo.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Shamima Akter",
    email: "shamima.akter.work@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Nazmul Hossain",
    email: "nazmul.hossain92@protonmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Tanjim Rahman",
    email: "tanjim.rahman.dev@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Morshed Alam",
    email: "morshed.alam88@outlook.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Sharmin Sultana",
    email: "sharmin.sultana.dev@gmail.com",
    password: "password",
    role: Role.TUTOR,
  },
  {
    name: "Imran Hossain",
    email: "imran.hossain.work@yahoo.com",
    password: "password",
    role: Role.TUTOR,
  },
];

const CREDENTIAL_PROVIDER = "credential";

async function ensureTutorProfile(userId: string) {
  const existing = await prisma.tutor.findUnique({ where: { userId } });
  if (existing) return false;
  await prisma.tutor.create({
    data: {
      userId,
      education: "Seeded profile — update in the app.",
      bio: "Seeded tutor for local development.",
    },
  });
  return true;
}

export type SeedUsersResult = {
  usersCreated: number;
  usersSkipped: number;
  tutorsCreated: number;
};

/**
 * Inserts seed users with email/password (Better Auth credential accounts).
 * Skips any row whose email already exists — no duplicate users.
 */
export async function seedUsers(
  entries: SeedUserInput[] = users,
): Promise<SeedUsersResult> {
  const result: SeedUsersResult = {
    usersCreated: 0,
    usersSkipped: 0,
    tutorsCreated: 0,
  };

  for (const entry of entries) {
    const email = entry.email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      result.usersSkipped += 1;
      if (existing.role === Role.TUTOR) {
        if (await ensureTutorProfile(existing.id)) {
          result.tutorsCreated += 1;
        }
      }
      continue;
    }

    const userId = randomUUID();
    const passwordHash = await hashPassword(entry.password);

    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          id: userId,
          name: entry.name,
          email,
          role: entry.role,
          emailVerified: false,
        },
      });

      await tx.account.create({
        data: {
          id: randomUUID(),
          accountId: userId,
          providerId: CREDENTIAL_PROVIDER,
          userId,
          password: passwordHash,
        },
      });

      if (entry.role === Role.TUTOR) {
        await tx.tutor.create({
          data: {
            userId,
            education: "Seeded profile — update in the app.",
            bio: "Seeded tutor for local development.",
          },
        });
      }
    });

    result.usersCreated += 1;
    if (entry.role === Role.TUTOR) {
      result.tutorsCreated += 1;
    }
  }

  return result;
}
seedUsers()
  .then((res) => {
    console.log("✅ Seeding completed:", res);
  })
  .catch((err) => {
    console.error("❌ Seed error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });