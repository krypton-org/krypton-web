import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "refreshtoken@example.com",
    password: "ex@mplePassword123"
}

const wait = (time: number) => new Promise((resolve) => { setTimeout(resolve, time) });

beforeAll(async (done) => {
    await krypton.register(user.email, user.password);
    done();
})

it('Refresh token', async (done) => {
    const loggedUser: any = await krypton.login(user.email, user.password);
    expect(loggedUser.email).toBe(user.email);
    const beforeUpdateDate = krypton.getTokenExpiryDate();

    await wait(1000);
    await krypton.refreshToken();
    expect(krypton.getTokenExpiryDate().getTime()).toBeGreaterThan(beforeUpdateDate.getTime());
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
})