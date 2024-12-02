"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const googleapis_1 = require("googleapis");
const rxjs_1 = require("rxjs");
const sendEmail = (accessToken, refreshToken, email, clientId, clientSecret) => {
    const oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth: oauth2Client });
    const sendEmailRequest = () => {
        const request = {
            userId: 'me',
            resource: {
                raw: email,
            },
        };
        return (0, rxjs_1.from)(gmail.users.messages.send(request));
    };
    const refreshTokenFunction = () => {
        console.log('refresh token', refreshToken);
        return (0, rxjs_1.from)(oauth2Client.refreshAccessToken().then(tokens => {
            oauth2Client.setCredentials(tokens.credentials);
            return tokens.credentials.access_token;
        })).pipe((0, rxjs_1.catchError)(err => {
            console.log('fail refreshing token');
            console.error(err);
            return (0, rxjs_1.throwError)(() => err);
        }));
    };
    let tokenRefreshed = false;
    return sendEmailRequest().pipe((0, rxjs_1.catchError)(err => {
        console.log('fail sending email');
        console.error(err);
        if (!tokenRefreshed) {
            tokenRefreshed = true;
            return refreshTokenFunction().pipe((0, rxjs_1.tap)(() => console.log('token refreshed')), (0, rxjs_1.switchMap)(() => sendEmailRequest()));
        }
        return (0, rxjs_1.throwError)(() => err);
    }));
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=emails.buisness.js.map