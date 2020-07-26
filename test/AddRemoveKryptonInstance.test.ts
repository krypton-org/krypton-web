import Krypton from '../src/Krypton';

const minTimeToLive = 2000; // 2 seconds

const user = {
    email: 'add.remove.instance@example.com',
    password: 'ex@mplePassword123',
};
let kryptonDefault, kryptonOtherInstance;
test(
    'Add and remove krypton instance',
    async (done) => {
        Krypton.initialize({ endpoint: 'http://localhost:5000' });
        kryptonDefault = Krypton.getInstance();

        Krypton.initialize({ endpoint: 'http://localhost:5000', minTimeToLive }, 'addRemoveTest');
        kryptonOtherInstance = Krypton.getInstance();
        
        expect(kryptonDefault).toBeDefined();
        expect(kryptonOtherInstance).toBeDefined();

        expect(await kryptonDefault.isLoggedIn()).toBeFalsy();
        expect(await kryptonOtherInstance.isLoggedIn()).toBeFalsy();
        try {
            await kryptonDefault.register(user.email, user.password);
            await kryptonDefault.login(user.email, user.password);
        } catch (err) {
            done(err);
        }
        expect(await kryptonDefault.isLoggedIn()).toBeTruthy();

        Krypton.removeInstance();
        try {
            Krypton.getInstance();
            done(new Error('Should have raised an error'));
        } catch (err) {
            expect(err).toBeDefined();
        }

        Krypton.removeInstance("addRemoveTest");
        try {
            Krypton.getInstance("addRemoveTest");
            done(new Error('Should have raised an error'));
        } catch (err) {
            expect(err).toBeDefined();
        }
        done();
    }
);

afterAll(async (done) => {
    Krypton.initialize({ endpoint: 'http://localhost:5000' });
    kryptonDefault = Krypton.getInstance();
    await kryptonDefault.login(user.email, user.password);
    await kryptonDefault.delete(user.password);
    done();
});
