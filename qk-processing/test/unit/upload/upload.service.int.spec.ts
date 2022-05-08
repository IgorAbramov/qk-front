// import { EventEmitter2 } from "@nestjs/event-emitter";
// import { Test } from "@nestjs/testing";
// import { User } from "@prisma/client";
//
// import { AppModule } from "../../../src/app.module";
// import { PrismaService } from "../../../src/prisma/prisma.service";
// import { UploadSucceededEvent } from "../../../src/upload/event";
// import { UploadService } from "../../../src/upload/upload.service";
//
// type Upload = {
//   filename: string
//   mapping: string
//   uploadedBy: User
// }
//
// const user: User = {
//   uuid: "4728859d-622b-4ec0-8f60-75caa0d17c13",
//   email: "",
//   password: "",
//   role: "INSTITUTION_REPRESENTATIVE",
//   createdAt: new Date(1651188244),
//   updatedAt: new Date(1651188244),
//   firstName: "",
//   lastName: "",
//   institutionUuid: "mismatch",
// };
//
// const upload: Upload = {
//   filename: "file.csv",
//   mapping: "awardLevel,expiresAt,graduatedName,gpaFinalGrade,graduatedAt,studyEndedAt,,,,,studyStartedAt,,,qualificationName,qualificationLevel,",
//   uploadedBy: user,
// };
//
// describe("UploadService Int", () => {
//   let prisma: PrismaService;
//   let uploadService: UploadService;
//   let eventEmitter: EventEmitter2;
//
//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
//
//     prisma = moduleRef.get<PrismaService>(PrismaService);
//     uploadService = moduleRef.get<UploadService>(UploadService);
//     eventEmitter = moduleRef.get<EventEmitter2>(EventEmitter2);
//   });
//
//   describe("Upload processing", () => {
//     it("Should fire success event", () => {
//       expect(async () => await uploadService.processUpload(upload.filename, upload.mapping, upload.uploadedBy)).toThrowError();
//     });
//   });
// });