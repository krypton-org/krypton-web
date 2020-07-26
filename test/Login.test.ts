import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'user1@example.com',
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

test('Log-in success', async (done) => {
    try {
        expect(await krypton.isLoggedIn()).toBeFalsy();
        const loggedUser: any = await krypton.login(user.email, user.password);
        expect(loggedUser.email).toBe(user.email);
        expect(loggedUser._id).not.toBeUndefined();
        expect(loggedUser.email_verified).toBeFalsy();
        expect(await krypton.isLoggedIn()).toBeTruthy();
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
});
