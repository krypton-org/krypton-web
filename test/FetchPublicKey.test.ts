import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

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
