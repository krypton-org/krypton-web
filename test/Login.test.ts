import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "user1@example.com",
    password: "ex@mplePassword123"
}

beforeAll(async (done) => {
    const isRegistered = await krypton.register(user.email, user.password);
    if (!isRegistered) {
        done(new Error('Can\'t register user'));
    }
    done();
})

test('Log-in success', async (done) => {
    expect(await krypton.isLoggedIn()).toBeFalsy();
    const loggedUser: any = await krypton.login(user.email, user.password);
    expect(loggedUser.email).toBe(user.email);
    expect(loggedUser._id).not.toBeUndefined();
    expect(loggedUser.verified).toBeFalsy();
    expect(await krypton.isLoggedIn()).toBeTruthy();
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
})