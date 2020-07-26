import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'changePassword@example.com',
    password: 'ex@mplePassword123',
};

const newPassword = '0therPassword123';

const wait = (time: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

beforeAll(async (done) => {
    await krypton.register(user.email, user.password);
    done();
});

test('Change password', async (done) => {
    await krypton.login(user.email, user.password);
    expect(await krypton.isLoggedIn()).toBeTruthy();

    await wait(1000);
    expect(krypton.changePassword(user.password, newPassword)).resolves.toBeTruthy();
    expect(krypton.login(user.email, user.password)).rejects.toBeTruthy();
    expect(krypton.login(user.email, newPassword)).resolves.toBeTruthy();
    done();
});

afterAll(async (done) => {
    try {
        await krypton.login(user.email, user.password);
        await krypton.delete(user.password);
    } catch (err) {}
    try {
        await krypton.login(user.email, newPassword);
        await krypton.delete(newPassword);
    } catch (err) {}
    done();
});
