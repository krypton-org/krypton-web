import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'delete@example.com',
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

test('Delete user', async (done) => {
    try {
        await krypton.login(user.email, user.password);
        expect(await krypton.isLoggedIn()).toBeTruthy();
        await krypton.delete(user.password);
        expect(krypton.login(user.email, user.password)).rejects.toBeTruthy();
    } catch (err) {
        done(err);
    }
    done();
});
