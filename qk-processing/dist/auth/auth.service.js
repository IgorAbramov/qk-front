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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
const provider_1 = require("./provider");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma, jwt, config, routeProvider) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.routeProvider = routeProvider;
    }
    async register(dto) {
        const hash = this.hashData(dto.password);
        try {
            return await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    role: client_1.Role.STUDENT,
                },
                select: {
                    uuid: true,
                    email: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("User with email " + dto.email + " already exists");
                }
            }
            throw error;
        }
    }
    async login(dto, response) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.ForbiddenException("Invalid credentials");
        const pwMatches = await bcrypt.compareSync(dto.password, user.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException("Invalid credentials");
        const frontendDomain = this.config.get("FRONTEND_DOMAIN");
        const jwtToken = await this.signToken(user.uuid, user.email, user.role, dto.rememberMe);
        response.cookie("jwt", jwtToken, { httpOnly: true, domain: frontendDomain });
        return this.routeProvider.onLogin(user);
    }
    async signToken(userId, email, role, rememberMe) {
        const payload = {
            sub: userId,
            email,
            role,
        };
        const secret = this.config.get("JWT_SECRET");
        const jwtShort = this.config.get("JWT_EXPIRATION_SHORT");
        const jwtLong = this.config.get("JWT_EXPIRATION_LONG");
        return this.jwt.signAsync(payload, {
            expiresIn: !rememberMe ? jwtShort : jwtLong,
            secret: secret,
        });
    }
    hashData(data) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data, salt);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        provider_1.RouteProvider])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map