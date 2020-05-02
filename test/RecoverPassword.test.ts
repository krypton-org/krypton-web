import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "recover.password@example.com",
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

test('Recover password', async (done) => {
    try {
        expect(krypton.recoverPassword(user.email)).resolves.toBeTruthy();
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