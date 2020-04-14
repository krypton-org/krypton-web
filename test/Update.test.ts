import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const user = {
    email: "update1@example.com",
    password: "ex@mplePassword123"
}

const emailUpdate = "update2@example.com"

const wait = (time: number) => new Promise((resolve) => { setTimeout(resolve, time) });

beforeAll(async (done) => {
    await krypton.register(user.email, user.password);
    done();
})

it('Update success', async (done) => {
    const loggedUser: any = await krypton.login(user.email, user.password);
    expect(loggedUser.email).toBe(user.email);
    const beforeUpdateDate = krypton.getTokenExpiryDate();

    await wait(1000);
    const updatedUser: any = await krypton.update({ email: emailUpdate });
    expect(updatedUser.email).toBe(emailUpdate);
    expect(krypton.getTokenExpiryDate().getTime()).toBeGreaterThan(beforeUpdateDate.getTime());
    done();
});

afterAll(async (done) => {
    try {
        await krypton.login(user.email, user.password);
        await krypton.delete(user.password);
    } catch (err) { }
    try {
        await krypton.login(emailUpdate, user.password);
        await krypton.delete(user.password);
    } catch (err) { }
    done();
})