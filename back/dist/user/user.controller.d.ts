export declare class UserController {
    constructor();
    sayHello(req: any): string;
    getProfile(req: any): any;
    logout(req: any): Promise<{
        message: string;
    }>;
}
