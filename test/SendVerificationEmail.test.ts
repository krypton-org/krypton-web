import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'send.verification.email@example.com',
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

test('Send verification email', async (done) => {
    try {
        await krypton.login(user.email, user.password);
        await krypton.sendVerificationEmail();
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
