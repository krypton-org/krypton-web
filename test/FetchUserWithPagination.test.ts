import Krypton from '../src/Krypton';

Krypton.initialize({ endpoint: 'http://localhost:5000' });
const krypton = Krypton.getInstance();

const password = '@notherP@sswo0rd';

beforeAll(async (done) => {
    for (let i = 0; i < 20; i++) {
        try {
            await krypton.register('fetchuserwithpagination.' + i + '@example.com', password);
        } catch (err) {
            done(err);
        }
    }
    done();
});

test('Fetch users with pagination', async (done) => {
    try {
        let data = await krypton.fetchUserWithPagination({ email_verified: false }, ['_id', 'email_verified'], 1, 5);
        expect(data.items.length).toBe(5);
        expect(data.items[0]._id).not.toBeUndefined();
        expect(data.items[0].email_verified).toBeFalsy();
        expect(data.pageInfo.currentPage).toBe(1);
        expect(data.pageInfo.perPage).toBe(5);
        expect(data.pageInfo.pageCount).toBeGreaterThanOrEqual(4);
        expect(data.pageInfo.itemCount).toBeGreaterThanOrEqual(20);
        expect(data.pageInfo.hasNextPage).toBeTruthy();
        expect(data.pageInfo.hasPreviousPage).toBeFalsy();

        data = await krypton.fetchUserWithPagination({ email_verified: true }, ['_id', 'email_verified'], 1, 5);
        expect(data.items.length).toBe(0);
        expect(data.pageInfo.itemCount).toBe(0);
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 20; i++) {
        try {
            await krypton.login('fetchuserwithpagination.' + i + '@example.com', password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }
    }
    done();
});
