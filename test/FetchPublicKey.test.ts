import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

test('Fetch public key', async (done) => {
    try {
        const publicKey = await krypton.fetchPublicKey();
        expect(typeof publicKey).toBe('string');
        expect(publicKey.includes('BEGIN PUBLIC KEY')).toBeTruthy();
    } catch (err) {
        done(err);
    }
    done();
});
