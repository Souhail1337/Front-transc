import { Body, HttpException, Injectable, Param, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { authenticator } from "otplib";
import { PrismaService } from "src/prisma/prisma.service";
import { UserStatus } from "@prisma/client";

import { toDataURL } from 'qrcode';
import { toFileStream } from 'qrcode';
import { throwError } from "rxjs";
import { UserDto } from "src/user/dto";
import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty, ApiTags } from '@nestjs/swagger';
class Update2faDto{
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	twofasecret: string;
}
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
    }
    
    async login(@Req() req, @Res() res){
        try{
            
            const payload = {
                id: req.user.id,
            };
            console.log("zabiiii" + this.prisma.user.count({
                where:{
                    id: req.user.id,
                }
            }));
            const nb_user : number = await this.prisma.user.count({
                where:{
                    id: req.user.id,
                }
            });
            const zero : number = 0;
            
            if (nb_user === 0){
                const user = await this.prisma.user.create({
                    data : {
                        id: req.user.id,
                        full_name: req.user.full_name,
                        username: req.user.username,
                        avatar: req.user.avatar,
                        is_two_fa_enable: false,
                        email: req.user.email,
                        status: UserStatus.ON,
                        win : 0,
                        lose: 0,
                        score: 0,
                        win_streak: 0,
                    }
                });
                const secret = this.config.get('JWT_SECRET');
                const access_token = await this.jwt.sign(payload, {
                    expiresIn : '1d',
                    secret : secret,
                });
                res.cookie('access_token', access_token, { httpOnly: true }).status(200);
                res.json({message :"success!"});
            }
            else if (nb_user === 1){
                  const secret = this.config.get('JWT_SECRET');
                  const access_token = await this.jwt.sign(payload, {
                      expiresIn : '1d',
                      secret : secret,
                  });
                req.res.cookie('access_token', access_token, {
                    httpOnly: true,
                    path: '/',
                });
                req.res.redirect(`http://localhost:3000/`);
            }
        }
        catch(error){
            console.log("my error uis "+error);
            throw new HttpException("Login failed!", 400);
        }
    }

    async generate_2fa_secret(user: UserDto, @Res() res)
    {
        if (await this.prisma.user.findUnique({
            where:{
                id : user.id,
            }
        })){
            this.enable_2fa(user, res);
            const secret = authenticator.generateSecret();            
            const otpauthUrl : string = authenticator.keyuri(user.email, this.config.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
            this.save_secret_db(user, secret);
            return ({
                secret,
                otpauthUrl
            })
        }
        else{
            throw new HttpException("User not found!", 400);
        }
    }
    async save_secret_db(user: UserDto, secret : string) {
        const updated_user = await this.prisma.user.update({
            where: {id: user.id },
            data: {
                two_fa_code: secret,
            }
          });
    }
    async pipeQrCodeStream(@Res() res, otpauthUrl: string) {
        return toFileStream(res, otpauthUrl);
    }

    async enable_2fa(user: UserDto, @Res() res){
        try{
            if (user.is_two_fa_enable === true)
                res.json({message :"2fa is already enabled!"});
            else{
                const updated_user = await this.prisma.user.update({
                    where: {id: user.id },
                    data: {
                        is_two_fa_enable: true,
                    }
                  });
            }
        }
        catch{
            throw new HttpException("Failed to enable 2fa!", 400);
        }
    }
    async disable_2fa(user: UserDto, @Res() res){
        try{
            if (user.is_two_fa_enable === false)
                res.json({message :"2fa is already disabled!"});
            else{
                const updated_user = await this.prisma.user.update({
                    where: {id: user.id },
                        data: {
                        is_two_fa_enable: false,
                    }
                  });
                  res.json({message :"success!"});
            }
        }
        catch{
            throw new HttpException("Failed to disable 2fa!", 400);
        }
    }
    async verify_2fa(@Req() req, @Res() res,@Param() param){
        console.log("3fa dkhl");
        const user = await this.get_user(req.user_obj.id);
        if (user.is_two_fa_enable === false){
            throw new HttpException("2fa is not enable!", 400);
        }
        const is_2fa_code_valid =  authenticator.verify({
            token: param.two_fa_code ,
            secret: user.two_fa_code,
        });
        console.log("zabi  ="+ param.two_fa_code);
        console.log("zebi 2 = " + user.two_fa_code);
        if (!is_2fa_code_valid)
        {
            console.log("code ghalet");
            throw new HttpException("Invalid 2fa code!", 400);
          
        }else
          console.log("code sa7i7 " + user.two_fa_code);
        res.json({message :"2fa code is valid!"});
    }
    async get_user(req_id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id : req_id,
            }
        });
        return user;
    }
}