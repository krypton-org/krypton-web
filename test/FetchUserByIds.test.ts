import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const password = "@notherP@sswo0rd";

beforeAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.register("fetchuserbyids."+ i +"@example.com", password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})

test('Fetch users by id', async (done) => {
    try{
        let data = await krypton.fetchUserMany({verified: false}, ["_id"], 4);
        expect(data.length).toBe(4);
        expect(data[0]._id).not.toBeUndefined();

        data = await krypton.fetchUserByIds(data.map((x: {_id: string}) => x._id), ["_id", "verified"]);
        expect(data.length).toBe(4);
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.login("fetchuserbyids."+ i +"@example.com", password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})