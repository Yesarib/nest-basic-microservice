
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly httpService: HttpService) {

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

        const payload = { sub: result._id }
        //logic 
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
