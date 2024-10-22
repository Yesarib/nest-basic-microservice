
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { catchError, lastValueFrom, map } from 'rxjs';
import { hashPassword, isValidPassword } from 'src/utils/jtw.util';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly httpService: HttpService, private config: ConfigService) {

    }

    async login(user: any) {
        const response = this.httpService.get('http://localhost:8081/api/user/getByUserName', {
            params: { userName: user.userName }
        });

        const result = await lastValueFrom(response.pipe(map((res) => res.data), catchError(err => {
            if (err.response && err.response.status === 404) {
                throw new Error('User Not Found');
            }
            throw err;
        })));

        if (!result) {
            throw new Error('User Not Found');
        }

        const isMatch = await isValidPassword(user.password, result.password)
        if (!isMatch) {
            throw new HttpException('Username or password does not match', HttpStatus.UNAUTHORIZED);
        }

        const tokens = await this.getTokens(result._id);        
        return tokens
    }

    async register(userName: string, password: string) {
        const hashedPassword = await hashPassword(password);

        const response = this.httpService.post('http://localhost:8081/api/user', {
            userName: userName,
            password: hashedPassword
        });

        const result = await lastValueFrom(response.pipe(map((res) => res.data), catchError(err => {
            throw err;
        })));

        if (!result) {
            throw new Error('User Not Found');
        }

        const tokens = await this.getTokens(result._id);        
        return tokens
    }

    async getTokens(userId: string): Promise<Tokens> {
        const jwtPayload = {
            sub: userId
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn:'15m',
            }),
            this.jwtService.signAsync(jwtPayload,{
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn:'7d',
            })
        ])

        return {
            access_token,
            refresh_token
        }
    }
}
