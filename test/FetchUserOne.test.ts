import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const password = '@notherP@sswo0rd';

beforeAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.register('fetchoneuser.pass' + i + '@example.com', password);
        } catch (err) {
            done(err);
        }
    }
    done();
});

test('Fetch one user', async (done) => {
    try {
        let data = await krypton.fetchUserOne({ email_verified: false }, ['_id', 'email_verified']);
        expect(data._id).not.toBeUndefined();
        expect(data.email_verified).toBeFalsy();

        data = await krypton.fetchUserOne({ email_verified: true }, ['_id', 'email_verified']);
        expect(data).toBeNull();
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.login('fetchoneuser.pass' + i + '@example.com', password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }
    }
    done();
});
