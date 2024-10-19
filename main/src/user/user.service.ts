import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async all(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async getByUserName(userName: string): Promise<User> {
        return await this.userModel.findOne({ userName: userName });
    }

    async create(user: any): Promise<User> {
        console.log(user);

        return new this.userModel({
            userName: user.username,
            password: user.password
        }).save();
    }

    async update(id: string, user: User): Promise<any> {
        return this.userModel.findByIdAndUpdate(id, user);
    }

    async delete(id: string): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }
}
