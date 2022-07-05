"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
let ActionRepository = class ActionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(id) {
        const action = await this.prisma.userActions.findUnique({ where: { id: id } });
        if (!action)
            throw new exception_1.ActionNotFoundException(id);
        return action;
    }
    async getUserActions(user) {
        return await this.prisma.userActions.findMany({
            where: {
                userUuid: user.uuid,
                status: client_1.UserActionStatus.ACTIVE,
            },
            orderBy: { id: "desc" },
        });
    }
};
ActionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActionRepository);
exports.ActionRepository = ActionRepository;
//# sourceMappingURL=action.repository.js.map