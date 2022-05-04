"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModule = void 0;
const common_1 = require("@nestjs/common");
const credentials_controller_1 = require("./credentials.controller");
const credentials_repository_1 = require("./credentials.repository");
const credentials_service_1 = require("./credentials.service");
let CredentialsModule = class CredentialsModule {
};
CredentialsModule = __decorate([
    (0, common_1.Module)({
        controllers: [credentials_controller_1.CredentialsController],
        providers: [credentials_service_1.CredentialsService, credentials_repository_1.CredentialsRepository],
    })
], CredentialsModule);
exports.CredentialsModule = CredentialsModule;
//# sourceMappingURL=credentials.module.js.map