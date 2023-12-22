require('dotenv');

export class Auth {
    static secret = `${process.env.APP_SECRET}`;
    static expiresIn = '1d';
}