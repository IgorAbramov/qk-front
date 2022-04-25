import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}
