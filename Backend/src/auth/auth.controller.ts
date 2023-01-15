import { Body, Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FortyTwoGuard, JwtGuard } from "src/auth/guard";
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger';
class Update2faDto{
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	twofasecret: string;
}
@ApiTags('auth')
@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(FortyTwoGuard)
    @Get('login')
    login(@Req() req, @Res() res) {
        return this.authService.login(req, res);
    }

    @UseGuards(JwtGuard)
    @Get('login/2fa/enable')
    async generate_qr_code(@Req() req, @Res() res) {
        const { otpauthUrl } = await this.authService.generate_2fa_secret(req.user_obj, res);
        return (this.authService.pipeQrCodeStream(res, otpauthUrl));
    }

    @UseGuards(JwtGuard)
    @Post('login/2fa/disable')
    disable_2fa(@Req() req, @Res() res) {
        return this.authService.disable_2fa(req.user_obj, res);
    }
    // @Get('logout')
    
    @UseGuards(JwtGuard)
    @Post("login/2fa/:two_fa_code")
    verify_2fa(@Req() req, @Res() res, @Param() param) {
        
        return this.authService.verify_2fa(req, res, param);
    }

}
