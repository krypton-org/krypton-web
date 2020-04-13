import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "registertest@example.com",
    password: "ex@mplePassword123"
}

test('Register a user', async (done) => {
    const isRegistered = await krypton.register(user.email, user.password);
    expect(isRegistered).toBe(true);
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
})