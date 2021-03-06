import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'emailavailable@example.com',
    password: 'ex@mplePassword123',
};

test('Email available', async (done) => {
    expect(await krypton.isEmailAvailable(user.email)).toBeTruthy();
    await krypton.register(user.email, user.password);
    expect(await krypton.isEmailAvailable(user.email)).toBeFalsy();
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
});
