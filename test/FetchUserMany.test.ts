import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const password = '@notherP@sswo0rd';

beforeAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.register('fetchusermany.pass' + i + '@example.com', password);
        } catch (err) {
            done(err);
        }
    }
    done();
});

test('Fetch many users', async (done) => {
    try {
        let data = await krypton.fetchUserMany({ email_verified: false }, ['_id', 'email_verified'], 4);
        expect(data.length).toBe(4);
        expect(data[0]._id).not.toBeUndefined();
        expect(data[0].email_verified).toBeFalsy();

        data = await krypton.fetchUserMany({ email_verified: true }, ['_id', 'email_verified']);
        expect(data.length).toBe(0);
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.login('fetchusermany.pass' + i + '@example.com', password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }
    }
    done();
});
