import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const user = {
    email: 'registertest@example.com',
    password: 'ex@mplePassword123',
};

test('Register a user', async (done) => {
    expect(krypton.register(user.email, user.password)).resolves.toBeTruthy();
    done();
});

afterAll(async (done) => {
    await krypton.login(user.email, user.password);
    await krypton.delete(user.password);
    done();
});
