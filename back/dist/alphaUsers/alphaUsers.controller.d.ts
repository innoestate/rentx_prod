import { AlphaUsersService } from './alphaUsers.service';
export declare class AlphaUsersController {
    private readonly alphaUsersService;
    constructor(alphaUsersService: AlphaUsersService);
    addUser(email: string): Promise<import("./alphaUser.entity").AlphaUser>;
}
