import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const password = '@notherP@sswo0rd';

beforeAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.register('fetchusercount.pass' + i + '@example.com', password);
        } catch (err) {
            done(err);
        }
    }
    done();
});

test('Fetch many counts', async (done) => {
    try {
        expect(await krypton.fetchUserCount()).toBeGreaterThanOrEqual(5);
        expect(await krypton.fetchUserCount({ email_verified: false })).toBeGreaterThanOrEqual(5);
        expect(await krypton.fetchUserCount({ email_verified: true })).toBeGreaterThanOrEqual(0);
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.login('fetchusercount.pass' + i + '@example.com', password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }
    }
    done();
});
