import Krypton from '../src/Krypton';
import { refreshTokenExpiryTime, authTokenExpiryTime } from './krypton.config';

const minTimeToLive = 2000; // 2 seconds
Krypton.initialize({ endpoint: 'http://localhost:5000', minTimeToLive }, 'refreshTokenTest');
const krypton = Krypton.getInstance('refreshTokenTest');

const wait = (time: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });
const user = {
    email: 'refresh.auth.token@example.com',
    password: 'ex@mplePassword123',
};

beforeAll(async (done) => {
    try {
        await krypton.register(user.email, user.password);
    } catch (err) {
        done(err);
    }
    done();
});

test(
    'Expiry time of authentication token and refresh token',
    async (done) => {
        expect(await krypton.isLoggedIn()).toBeFalsy();

        // Auth Token valid - Refresh Token valid
        try {
            await krypton.login(user.email, user.password);
            const firstDate = krypton.getTokenExpiryDate();
            await wait(500);
            await krypton.getAuthorizationHeader();
            // Auth Token is not refreshed
            expect(krypton.getTokenExpiryDate().getTime()).toBe(firstDate.getTime());
        } catch (err) {
            done(err);
        }

        // Auth Token time to live not sufficient - Refresh Token valid
        try {
            await krypton.login(user.email, user.password);
            const firstDate = krypton.getTokenExpiryDate();
            await wait(authTokenExpiryTime - minTimeToLive + 10);
            await krypton.getAuthorizationHeader();
            // Auth Token has been refreshed
            expect(krypton.getTokenExpiryDate().getTime()).toBeGreaterThan(firstDate.getTime());
        } catch (err) {
            done(err);
        }

        // Auth Token expired - Refresh Token valid
        try {
            await krypton.login(user.email, user.password);
            const firstDate = krypton.getTokenExpiryDate();
            await wait(authTokenExpiryTime - minTimeToLive + 10);
            await krypton.getAuthorizationHeader();
            // Auth Token has been refreshed
            expect(krypton.getTokenExpiryDate().getTime()).toBeGreaterThan(firstDate.getTime());
        } catch (err) {
            done(err);
        }

        // Auth Token expired - Refresh Token expired
        await krypton.login(user.email, user.password);
        await wait(refreshTokenExpiryTime + 10);
        expect(krypton.getAuthorizationHeader()).rejects.toBeTruthy();
        done();
    },
    refreshTokenExpiryTime * 4,
);

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
});
