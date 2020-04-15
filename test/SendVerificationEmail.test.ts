import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "send.verification.email@example.com",
    password: "ex@mplePassword123"
}

beforeAll(async (done) => {
    try {
        await krypton.register(user.email, user.password);
    } catch (err) {
        done(err);
    }
    done();
})

test('Send verification email', async (done) => {
    try {
        await krypton.login(user.email, user.password);
        expect(await krypton.sendVerificationEmail()).toBeTruthy();
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
})