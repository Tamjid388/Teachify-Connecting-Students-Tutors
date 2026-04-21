// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// prisma/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Blog {\n  id         String   @id @default(uuid())\n  title      String\n  slug       String   @unique\n  content    String\n  excerpt    String?\n  thumbnail  String?\n  authorId   String\n  authorRole Role\n  status     String\n  tags       String[]\n  readTime   Int?\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n}\n\nenum BookingStatus {\n  PENDING\n  ACCEPTED\n  REJECTED\n  COMPLETED\n  CANCELLED\n}\n\nenum TuitionMode {\n  ONLINE\n  OFFLINE\n  BOTH\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n}\n\nmodel Booking {\n  booking_id    String        @id @default(uuid())\n  bookingStatus BookingStatus @default(PENDING)\n\n  startTime     DateTime\n  endTime       DateTime\n  duration      Int              @default(60)\n  tutionMode    TuitionMode      @default(ONLINE)\n  paymentStatus PaymentStatus    @default(UNPAID)\n  studentId     String\n  tutor_id      String\n  isReviewed    Boolean          @default(false)\n  slotId        String\n  review        Review?\n  createdAt     DateTime         @default(now())\n  updatedAt     DateTime         @updatedAt\n  // relations\n  tutor         Tutor            @relation(fields: [tutor_id], references: [tutor_id])\n  student       User             @relation(fields: [studentId], references: [id])\n  slot          AvailabilitySlot @relation(fields: [slotId], references: [id])\n\n  @@index([studentId])\n  @@index([tutor_id])\n  @@map("bookings")\n}\n\nmodel AvailabilitySlot {\n  id        String    @id @default(uuid())\n  tutorId   String\n  day       DayOfWeek\n  startTime String\n  endTime   String\n  isBooked  Boolean   @default(false)\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n\n  tutor Tutor @relation(fields: [tutorId], references: [tutor_id])\n\n  bookings Booking[]\n\n  @@unique([tutorId, day, startTime, endTime])\n  @@index([tutorId])\n  @@map("availability_slots")\n}\n\nenum DayOfWeek {\n  SUN\n  MON\n  TUE\n  WED\n  THU\n  FRI\n  SAT\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  subject     String  @unique\n  description String?\n  thumbnail   String?\n  slug        String? @unique\n\n  tutorCategory TutorCategory[]\n\n  @@map("categories")\n}\n\nmodel Review {\n  id     String @id @default(uuid())\n  rating Int    @default(0)\n\n  comment   String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // relations\n  user       User    @relation(fields: [userId], references: [id])\n  userId     String\n  tutor      Tutor   @relation(fields: [tutorId], references: [tutor_id])\n  tutorId    String\n  booking    Booking @relation(fields: [booking_id], references: [booking_id])\n  booking_id String  @unique\n\n  // @@unique([userId, tutorId])\n  @@index([tutorId])\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Availability {\n  MORNING\n  EVENING\n  FULLDAY\n  NOT_AVAILABLE\n}\n\nenum UserStatus {\n  ACTIVE\n  DEACTIVE\n  BAN\n}\n\nmodel Tutor {\n  tutor_id         String       @id @default(uuid())\n  image            String?\n  bio              String?\n  avilability_slot Availability @default(FULLDAY)\n  phone_number     String?\n  is_verified      Boolean      @default(false)\n  experience       Int          @default(0)\n  education        String\n  user             User         @relation(fields: [userId], references: [id])\n  userId           String       @unique\n  averageRating    Float        @default(0)\n  reviewCount      Int          @default(0)\n\n  bookings     Booking[]\n  reviews      Review[]\n  categories   TutorCategory[]\n  availability AvailabilitySlot[]\n\n  @@map("tutors")\n}\n\nmodel TutorCategory {\n  tutorId    String\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n  tutor      Tutor    @relation(fields: [tutorId], references: [tutor_id])\n\n  @@id([tutorId, categoryId])\n  @@map("tutor_categories")\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nmodel User {\n  id            String   @id\n  name          String\n  email         String\n  emailVerified Boolean  @default(false)\n  role          Role     @default(STUDENT)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  isBanned      Boolean  @default(false)\n  banReason     String?\n\n  status   UserStatus @default(ACTIVE)\n  sessions Session[]\n  accounts Account[]\n  tutor    Tutor?\n  bookings Booking[]\n  reviews  Review[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Blog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"authorRole","kind":"enum","type":"Role"},{"name":"status","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"readTime","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Booking":{"fields":[{"name":"booking_id","kind":"scalar","type":"String"},{"name":"bookingStatus","kind":"enum","type":"BookingStatus"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"tutionMode","kind":"enum","type":"TuitionMode"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"isReviewed","kind":"scalar","type":"Boolean"},{"name":"slotId","kind":"scalar","type":"String"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"BookingToTutor"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"slot","kind":"object","type":"AvailabilitySlot","relationName":"AvailabilitySlotToBooking"}],"dbName":"bookings"},"AvailabilitySlot":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"day","kind":"enum","type":"DayOfWeek"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"AvailabilitySlotToTutor"},{"name":"bookings","kind":"object","type":"Booking","relationName":"AvailabilitySlotToBooking"}],"dbName":"availability_slots"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"tutorCategory","kind":"object","type":"TutorCategory","relationName":"CategoryToTutorCategory"}],"dbName":"categories"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"ReviewToTutor"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"booking_id","kind":"scalar","type":"String"}],"dbName":"reviews"},"Tutor":{"fields":[{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"avilability_slot","kind":"enum","type":"Availability"},{"name":"phone_number","kind":"scalar","type":"String"},{"name":"is_verified","kind":"scalar","type":"Boolean"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"education","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TutorToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutor"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutor"},{"name":"categories","kind":"object","type":"TutorCategory","relationName":"TutorToTutorCategory"},{"name":"availability","kind":"object","type":"AvailabilitySlot","relationName":"AvailabilitySlotToTutor"}],"dbName":"tutors"},"TutorCategory":{"fields":[{"name":"tutorId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorCategory"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorToTutorCategory"}],"dbName":"tutor_categories"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"banReason","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// prisma/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// prisma/generated/prisma/enums.ts
var BookingStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
var Role = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN"
};

// prisma/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var isProd = process.env.NODE_ENV === "production";
var auth = betterAuth({
  // baseURL: process.env.BETTER_AUTH_URL || "https://teachify-server.vercel.app",
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: process.env.App_URL,
  trustedOrigins: [process.env.App_URL],
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      },
      state: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.STUDENT,
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/modules/tutors/tutor.routes.ts
import { Router } from "express";

// src/modules/tutors/tutor.service.ts
var createTutor = async (body, user) => {
  const result = await prisma.tutor.create({
    data: {
      ...body,
      userId: user.id
    }
  });
  return result;
};
var myProfile = async (user) => {
  return await prisma.tutor.findUnique({
    where: {
      userId: user.id
    },
    include: {
      user: true,
      categories: {
        include: {
          category: true
        }
      }
    }
  });
};
var getAllTutors = async ({
  search,
  rating
}) => {
  const numericRating = rating ? Number(rating) : void 0;
  const whereConditions = [];
  if (search) {
    whereConditions.push({
      OR: [
        {
          user: {
            name: {
              contains: search,
              // search with tutor name
              mode: "insensitive"
            }
          }
        },
        {
          categories: {
            some: {
              category: {
                subject: {
                  contains: search,
                  // search with subject name
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (rating !== void 0) {
    whereConditions.push({
      averageRating: { gte: Number(rating) }
    });
  }
  const tutors = await prisma.tutor.findMany({
    where: {
      AND: whereConditions
    },
    include: {
      user: {
        select: { name: true }
      },
      categories: {
        include: { category: true }
      }
    }
  });
  return tutors;
};
var updateTutor = async (body, user) => {
  return await prisma.tutor.update({
    where: {
      userId: user.id
    },
    data: body
  });
};
var updateAvailability = async (slot, user) => {
  const result = await prisma.tutor.update({
    where: { userId: user.id },
    data: { avilability_slot: slot },
    select: {
      avilability_slot: true
    }
  });
  return result;
};
var createSlots = async (slots, userId) => {
  const tutor = await prisma.tutor.findUnique({
    where: { userId }
  });
  if (!tutor) {
    throw new Error("Tutor profile not found for this user");
  }
  const tutorId = tutor.tutor_id;
  const createdSlots = [];
  await prisma.$transaction(async (tx) => {
    for (const slot of slots) {
      const { day, startTime, endTime } = slot;
      const existing = await tx.availabilitySlot.findFirst({
        where: {
          tutorId,
          day,
          startTime,
          endTime
        }
      });
      if (existing) continue;
      const newSlot = await tx.availabilitySlot.create({
        data: {
          tutorId,
          day,
          startTime,
          endTime
        }
      });
      createdSlots.push(newSlot);
    }
  });
  return createdSlots;
};
var getSlots = async (id) => {
  const slots = await prisma.availabilitySlot.findMany({
    where: {
      tutorId: id
    },
    include: {
      bookings: true
    },
    orderBy: {
      day: "asc"
    }
  });
  if (slots.length === 0) {
    throw new Error("Tutor Doesnt Have Any Available Slots");
  }
  return slots;
};
var getTutorById = async (tutorId) => {
  const tutor = await prisma.tutor.findUnique({
    where: {
      tutor_id: tutorId
    },
    include: {
      categories: {
        include: {
          category: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  });
  return tutor;
};
var getTutorStats = async (userId) => {
  const tutor = await prisma.tutor.findUnique({
    where: { userId },
    select: {
      tutor_id: true,
      averageRating: true,
      reviewCount: true
    }
  });
  if (!tutor) {
    throw new Error("Tutor profile not found");
  }
  const bookings = await prisma.booking.groupBy({
    by: ["bookingStatus"],
    where: {
      tutor_id: tutor.tutor_id
    },
    _count: {
      booking_id: true
    }
  });
  const stats = {
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalStudents: 0,
    averageRating: tutor.averageRating,
    totalReviews: tutor.reviewCount
  };
  bookings.forEach((b) => {
    const count = b._count.booking_id;
    stats.totalBookings += count;
    if (b.bookingStatus === "PENDING") stats.pendingBookings = count;
    if (b.bookingStatus === "ACCEPTED") stats.acceptedBookings = count;
    if (b.bookingStatus === "COMPLETED") stats.completedBookings = count;
    if (b.bookingStatus === "CANCELLED") stats.cancelledBookings = count;
  });
  const studentsCount = await prisma.booking.findMany({
    where: { tutor_id: tutor.tutor_id },
    distinct: ["studentId"],
    select: { studentId: true }
  });
  stats.totalStudents = studentsCount.length;
  return stats;
};
var tutorServices = {
  createTutor,
  getAllTutors,
  updateTutor,
  updateAvailability,
  createSlots,
  getSlots,
  getTutorById,
  getTutorStats,
  myProfile
};

// src/modules/tutors/tutor.controller.ts
var createTutorProfile = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false
      });
    }
    const result = await tutorServices.createTutor(body, user);
    res.status(200).json({
      success: true,
      message: "tutor info added successfully",
      result
    });
  } catch (error) {
    console.error("CREATE TUTOR ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      message: "Failed to add tutor"
    });
  }
};
var myProfile2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await tutorServices.myProfile(user);
    res.status(200).json({
      success: true,
      message: "Tutor profile retrieved successfully",
      result
    });
  } catch (error) {
    console.error("MY PROFILE ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutor profile"
    });
  }
};
var getAllTutors2 = async (req, res) => {
  try {
    const { rating } = req.query;
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const ratingString = typeof rating === "string" ? rating : void 0;
    const result = await tutorServices.getAllTutors({
      search: searchString,
      rating: ratingString
    });
    res.status(200).json({
      success: true,
      message: "tutors retrieved successfully",
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutors",
      error
    });
  }
};
var updateTutor2 = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false
      });
    }
    const result = await tutorServices.updateTutor(body, user);
    res.status(200).json({
      success: true,
      message: "Tutor Profile Updated Successfully",
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutors",
      error
    });
  }
};
var updateAvailability2 = async (req, res) => {
  try {
    const { avilability_slot } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!avilability_slot) {
      return res.status(400).json({
        success: false,
        message: "Availability slot is required"
      });
    }
    const result = await tutorServices.updateAvailability(
      avilability_slot,
      user
    );
    res.status(200).json({
      success: true,
      message: "Availability Updated Successfully",
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error
    });
  }
};
var addAvailabilitySlots = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log(req.body);
    const slots = req.body.slots;
    if (!userId) return res.status(401).json({ message: "User ID required" });
    if (!slots || !Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: "Slots are required" });
    }
    const createSlots2 = await tutorServices.createSlots(slots, userId);
    return res.status(201).json({
      success: true,
      message: "Slots created successfully",
      data: createSlots2
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
var getAvailabilitySlots = async (req, res) => {
  try {
    const tutorId = req.query.tutorId;
    const slots = await tutorServices.getSlots(tutorId);
    return res.status(200).json({
      success: true,
      data: slots
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch slots"
    });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const { tutorId } = req.params;
    if (!tutorId || Array.isArray(tutorId)) {
      return res.status(404).json({
        success: false,
        message: "Valid tutorId is required"
      });
    }
    const tutor = await tutorServices.getTutorById(tutorId);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found"
      });
    }
    res.status(200).json({
      success: true,
      data: tutor
    });
  } catch (error) {
    console.error("GET TUTOR ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutor info"
    });
  }
};
var getTutorStats2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await tutorServices.getTutorStats(user.id);
    res.status(200).json({
      success: true,
      message: "Tutor stats retrieved successfully",
      data: result
    });
  } catch (error) {
    console.error("GET TUTOR STATS ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get tutor stats"
    });
  }
};
var tutorController = {
  createTutorProfile,
  getAllTutors: getAllTutors2,
  updateTutor: updateTutor2,
  updateAvailability: updateAvailability2,
  addAvailabilitySlots,
  getAvailabilitySlots,
  getTutorById: getTutorById2,
  getTutorStats: getTutorStats2,
  myProfile: myProfile2
};

// src/middleware/auth.middleware.ts
var authMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log("cookie present:", Boolean(req.headers.cookie));
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Your Are Not Authorized"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      };
      console.log("User Role:", req.user.role);
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access ,You dont have permission"
        });
      }
      next();
    } catch (error) {
      console.error("Authentication midddleware failed");
    }
  };
};
var auth_middleware_default = authMiddleware;

// src/modules/tutors/tutor.routes.ts
var router = Router();
router.get("/", tutorController.getAllTutors);
router.post(
  "/",
  auth_middleware_default("TUTOR", "ADMIN"),
  tutorController.createTutorProfile
);
router.get("/my-profile", auth_middleware_default("TUTOR"), tutorController.myProfile);
router.get("/stats", auth_middleware_default("TUTOR"), tutorController.getTutorStats);
router.get("/:tutorId", tutorController.getTutorById);
router.put(
  "/update",
  auth_middleware_default("TUTOR", "ADMIN"),
  tutorController.updateTutor
);
router.put(
  "/update/availability",
  auth_middleware_default("TUTOR"),
  tutorController.updateAvailability
);
router.post("/slots", auth_middleware_default("TUTOR", "ADMIN", "STUDENT"), tutorController.addAvailabilitySlots);
router.get("/slots/:tutorId", auth_middleware_default("TUTOR", "ADMIN", "STUDENT"), tutorController.getAvailabilitySlots);
var tutorRouter = router;

// src/modules/bookings/booking.routes.ts
import { Router as Router2 } from "express";

// src/modules/bookings/booking.service.ts
var createBooking = async (data, userId) => {
  console.log("Booking Data", data);
  const { slotId, startTime, endTime } = data;
  if (!slotId) {
    throw new Error("slotId is required");
  }
  return await prisma.$transaction(async (tx) => {
    const slot = await tx.availabilitySlot.findUnique({
      where: { id: slotId }
    });
    if (!slot) {
      throw new Error("Slot not found");
    }
    const existingBooking = await tx.booking.findFirst({
      where: {
        slotId,
        startTime,
        bookingStatus: {
          not: "CANCELLED"
        }
      }
    });
    if (existingBooking) {
      throw new Error("This slot is already booked for this specific date and time");
    }
    const booking = await tx.booking.create({
      data: {
        studentId: userId,
        tutor_id: slot.tutorId,
        slotId: slot.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      }
    });
    await tx.availabilitySlot.update({
      where: { id: slot.id },
      data: {
        isBooked: true
      }
    });
    return booking;
  });
};
var getAllBookings = async (userId, role) => {
  if (role === Role.STUDENT) {
    return await prisma.booking.findMany({
      where: { studentId: userId },
      include: {
        tutor: {
          select: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
  }
  if (role === Role.TUTOR) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId }
    });
    if (!tutor) return [];
    return await prisma.booking.findMany({
      where: { tutor_id: tutor.tutor_id },
      include: {
        student: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }
};
var getBookingById = async (id, role) => {
  if (role === Role.STUDENT) {
    return await prisma.booking.findMany({
      where: {
        studentId: id
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
  if (role === Role.TUTOR) {
    return await prisma.booking.findMany({
      where: {
        tutor_id: id
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
};
var updateBookingStatus = async (id, bookingStatus) => {
  return await prisma.booking.update({
    where: { booking_id: id },
    data: { bookingStatus }
  });
};
var syncBookingStatus = async (id, bookingStatus) => {
  return await prisma.booking.updateMany({
    where: {
      OR: [
        { studentId: id },
        { tutor_id: id }
      ],
      endTime: {
        lt: /* @__PURE__ */ new Date()
      },
      bookingStatus: BookingStatus.ACCEPTED
    },
    data: { bookingStatus: BookingStatus.COMPLETED }
  });
};
var bookingServices = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  syncBookingStatus
};

// src/modules/bookings/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User Id Required" });
    }
    const booking = await bookingServices.createBooking(data, userId);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
var getBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    if (!userId) {
      return res.status(401).json({ message: "User Id Required" });
    }
    const bookings = await bookingServices.getAllBookings(userId, role);
    res.status(201).json({
      success: true,
      messgae: "Bookings Retreived Successfully",
      bookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
var getBookingById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user?.role;
    if (!id) {
      return res.status(401).json({ message: "User Id Required" });
    }
    if (!role) {
      return res.status(401).json({ message: "User role required" });
    }
    const booking = await bookingServices.getBookingById(
      id,
      role
    );
    if (!booking) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No Bookings found for this user"
      });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
var updateBookingStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user?.role;
    const { bookingStatus } = req.body;
    console.log("Booking Status", bookingStatus, id);
    if (!id) {
      return res.status(401).json({ message: "User Id Required" });
    }
    if (!role) {
      return res.status(401).json({ message: "User role required" });
    }
    const booking = await bookingServices.updateBookingStatus(
      id,
      bookingStatus
    );
    return res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Status Update Failed",
      error: err.message
    });
  }
};
var bookingController = {
  createBooking: createBooking2,
  getBookings,
  getBookingById: getBookingById2,
  updateBookingStatus: updateBookingStatus2
};

// src/modules/bookings/booking.routes.ts
var router2 = Router2();
router2.post("/", auth_middleware_default("STUDENT", "ADMIN"), bookingController.createBooking);
router2.get("/", auth_middleware_default("STUDENT", "ADMIN", "TUTOR"), bookingController.getBookings);
router2.get("/:id", auth_middleware_default("STUDENT", "TUTOR"), bookingController.getBookingById);
router2.put("/:id", auth_middleware_default("STUDENT", "TUTOR"), bookingController.updateBookingStatus);
var bookingsRouter = router2;

// src/modules/admin/admin.router.ts
import { Router as Router3 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return await prisma.user.findMany();
};
var updateBanStatus = async (userId, isBanned) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isBanned },
    select: {
      id: true,
      email: true,
      isBanned: true,
      name: true
    }
  });
};
var adminStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalTutors = await prisma.user.count({ where: { role: Role.TUTOR } });
  const totalStudents = await prisma.user.count({
    where: { role: Role.STUDENT }
  });
  const totalBookings = await prisma.booking.count();
  const totalReviews = await prisma.review.count();
  const totalCompletedBookings = await prisma.booking.count({
    where: { bookingStatus: BookingStatus.COMPLETED }
  });
  return {
    totalUsers,
    totalTutors,
    totalStudents,
    totalBookings,
    totalReviews,
    totalCompletedBookings
  };
};
var adminServices = {
  getAllUsers,
  adminStats,
  updateBanStatus
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    const users = await adminServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      result: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error
    });
  }
};
var userBanToggle = async (req, res) => {
  try {
    const { userId, isBanned } = req.body;
    if (!userId || typeof isBanned !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid input. userId and isBanned status are required."
      });
    }
    const updatedUser = await adminServices.updateBanStatus(userId, isBanned);
    return res.status(200).json({
      success: true,
      message: `User has been ${isBanned ? "banned" : "unbanned"} successfully.`,
      result: updatedUser
    });
  } catch (error) {
    console.error("Error in handleUserBanToggle:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error while updating status."
    });
  }
};
var adminStats2 = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    const stats = await adminServices.adminStats();
    res.status(200).json({
      success: true,
      message: "Admin stats retrieved successfully",
      result: stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get admin stats",
      error
    });
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  adminStats: adminStats2,
  userBanToggle
};

// src/modules/admin/admin.router.ts
var router3 = Router3();
router3.get("/users", auth_middleware_default("ADMIN"), adminController.getAllUsers);
router3.get("/stats", auth_middleware_default("ADMIN"), adminController.adminStats);
router3.patch(
  "/banUser",
  auth_middleware_default("ADMIN"),
  adminController.userBanToggle
);
var adminRouter = router3;

// src/modules/reviews/review.routes.ts
import { Router as Router4 } from "express";

// src/modules/reviews/review.service.ts
var createReview = async (userId, body) => {
  const { booking_id, rating, comment } = body;
  const booking = await prisma.booking.findUnique({
    where: { booking_id }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.studentId !== userId) {
    throw new Error("You are not allowed to review this booking");
  }
  if (booking.bookingStatus !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }
  if (booking.isReviewed) {
    throw new Error("You have already reviewed this booking");
  }
  const tutorId = booking.tutor_id;
  return prisma.$transaction(async (tx) => {
    const createReview3 = await tx.review.create({
      data: {
        booking_id,
        rating,
        comment,
        userId,
        tutorId
      }
    });
    await tx.booking.update({
      where: { booking_id },
      data: {
        isReviewed: true
      }
    });
    const stats = await tx.review.aggregate({
      where: { tutorId },
      _avg: { rating: true },
      _count: { rating: true }
    });
    await tx.tutor.update({
      where: { tutor_id: tutorId },
      data: {
        averageRating: stats._avg.rating || 0,
        reviewCount: stats._count.rating
      }
    });
    return createReview3;
  });
};
var getReview = async (id) => {
  return await prisma.review.findMany(
    {
      where: {
        tutorId: id
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true
          }
        },
        booking: {
          select: {
            booking_id: true,
            startTime: true,
            endTime: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    }
  );
};
var reviewServices = {
  createReview,
  getReview
};

// src/modules/reviews/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "User not Found",
        success: false
      });
    }
    const result = await reviewServices.createReview(userId, body);
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      result
    });
  } catch (error) {
    console.error("CREATE Review ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to Add Review"
    });
  }
};
var getReview2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewServices.getReview(id);
    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      result
    });
  } catch (error) {
    console.error("GET Review ERROR \u{1F449}", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to Retrieve Review"
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getReview: getReview2
};

// src/modules/reviews/review.routes.ts
var router4 = Router4();
router4.post("/", auth_middleware_default("STUDENT", "ADMIN"), reviewController.createReview);
router4.get("/:id", auth_middleware_default("STUDENT", "ADMIN", "TUTOR"), reviewController.getReview);
var reviewRouter = router4;

// src/modules/categories/category.routes.ts
import { Router as Router5 } from "express";

// src/modules/categories/category.service.ts
var addSubjects = async (body) => {
  const result = await prisma.category.createMany({
    data: body,
    skipDuplicates: true
  });
  return result;
};
var getAllSubjects = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var assignSubject = async (payload, tutorId) => {
  const tutorExists = await prisma.tutor.findUnique({
    where: { userId: tutorId },
    select: { tutor_id: true }
  });
  if (!tutorExists) {
    throw new Error("Tutor not found in database. Check the tutorId.");
  }
  const result = await prisma.tutorCategory.createMany({
    data: payload.subjectIds.map((subId) => ({
      tutorId: tutorExists.tutor_id,
      categoryId: subId
    })),
    skipDuplicates: true
  });
  return result;
};
var categoryServices = {
  addSubjects,
  assignSubject,
  getAllSubjects
};

// src/modules/categories/category.controller.ts
var addSubjects2 = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const result = await categoryServices.addSubjects(body);
    return res.status(201).json({
      success: true,
      messsage: "Subjects Added Successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Failed to Add Subjects"
    });
  }
};
var getAllSubjects2 = async (req, res) => {
  try {
    const result = await categoryServices.getAllSubjects();
    return res.status(201).json({
      success: true,
      messsage: "Subjects Fetched Successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Failed to Get Subjects"
    });
  }
};
var assignSubject2 = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const tutorId = req.user?.id;
    if (!tutorId) {
      return res.status(404).json({
        message: "Tutor Id Missing"
      });
    }
    const result = await categoryServices.assignSubject(body, tutorId);
    return res.status(201).json({
      success: true,
      message: "Subjects Assigned Successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: error.message || "Failed to Assign Subjects"
    });
  }
};
var categoryController = {
  addSubjects: addSubjects2,
  assignSubject: assignSubject2,
  getAllSubjects: getAllSubjects2
};

// src/modules/categories/category.routes.ts
var router5 = Router5();
router5.post(
  "/addSubjects",
  auth_middleware_default("ADMIN"),
  categoryController.addSubjects
);
router5.get(
  "/getSubjects",
  auth_middleware_default("ADMIN", "STUDENT", "TUTOR"),
  categoryController.getAllSubjects
);
router5.post(
  "/assignSubjects",
  auth_middleware_default("TUTOR"),
  categoryController.assignSubject
);
var categoryRouter = router5;

// src/middleware/not-found.ts
var notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API endpoint does not exist"
      }
    ]
  });
};
var not_found_default = notFoundHandler;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.App_URL,
    credentials: true
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/category", categoryRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(not_found_default);
var app_default = app;

// src/index.ts
var PORT = process.env.PORT || 5e3;
async function startLocal() {
  try {
    await prisma.$connect();
    console.log("\u2705 Prisma connected successfully");
    app_default.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("an error occured", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
var index_default = app_default;
if (!process.env.VERCEL) {
  startLocal();
}
export {
  index_default as default
};
