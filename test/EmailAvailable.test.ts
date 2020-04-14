import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "emailavailable@example.com",
    password: "ex@mplePassword123"
}

test('Email available', async (done) => {
    try {
        expect(await krypton.isEmailAvailable(user.email)).toBeTruthy();
        const isRegistered = await krypton.register(user.email, user.password);
        expect(isRegistered).toBe(true);
        expect(await krypton.isEmailAvailable(user.email)).toBeFalsy();
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