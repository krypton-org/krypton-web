import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const password = "@notherP@sswo0rd";

beforeAll(async (done) => {
    for (let i = 0; i < 20; i++) {
        try {
            await krypton.register("fetchuserwithpagination."+ i +"@example.com", password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})

test('Fetch users with pagination', async (done) => {
    try{
        let data = await krypton.fetchUserWithPagination({ verified: false}, ["_id", "verified"], 1, 5);
        expect(data.items.length).toBe(5);
        expect(data.items[0]._id).not.toBeUndefined();
        expect(data.items[0].verified).toBeFalsy();
        expect(data.pageInfo.currentPage).toBe(1);
        expect(data.pageInfo.perPage).toBe(5);
        expect(data.pageInfo.pageCount).toBeGreaterThanOrEqual(4);
        expect(data.pageInfo.itemCount).toBeGreaterThanOrEqual(20);
        expect(data.pageInfo.hasNextPage).toBeTruthy();
        expect(data.pageInfo.hasPreviousPage).toBeFalsy();

        data = await krypton.fetchUserWithPagination({ verified: true}, ["_id", "verified"], 1, 5);
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
            await krypton.login("fetchuserwithpagination."+ i +"@example.com", password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})