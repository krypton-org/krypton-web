import KryptonClient from '../src/KryptonClient';

const krypton = new KryptonClient("http://localhost:5000");

const password = "@notherP@sswo0rd";

beforeAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.register("fetchoneuser.pass"+ i +"@example.com", password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})

test('Fetch one user', async (done) => {
    try{
        let data = await krypton.fetchUserOne({verified: false}, ["_id", "verified"]);
        expect(data._id).not.toBeUndefined();
        expect(data.verified).toBeFalsy();

        data = await krypton.fetchUserOne({verified: true}, ["_id", "verified"]);
        expect(data).toBeNull();
    } catch (err) {
        done(err);
    }
    done();
});

afterAll(async (done) => {
    for (let i = 0; i < 5; i++) {
        try {
            await krypton.login("fetchoneuser.pass"+ i +"@example.com", password);
            await krypton.delete(password);
        } catch (err) {
            done(err);
        }  
    }
    done();
})