/** 
 * Launching Krypton Authentication along with a MongoDB instance 
 * in Docker
*/
const execSync = require('child_process').exec;
const { promisify } = require('util');
const exec = promisify(execSync);

(async () => {
    try{
        await exec('docker rm -f krypton-auth-db-test');
    } catch (err){ }


    try{
        await exec('docker rm -f krypton-auth-test');

    } catch (err){ }


    try{
        await exec('docker network rm krypton-auth-net-test');
    } catch (err){ }

    console.log("Docker cleaned up");

    // Launch network
    await exec("docker network create krypton-auth-net-test");

    // Launch MongoDB
    await exec(`docker run \
        --detach \
        --name krypton-auth-db-test \
        --network krypton-auth-net-test \
        mongo
    `);

    // Launch Krypton
    await exec(`docker run \
        --detach \
        --name krypton-auth-test \
        --network krypton-auth-net-test \
        --env MONGODB_URI="mongodb://krypton-auth-db-test:27017/users" \
        --publish 5000:5000 \
        -v `+__dirname+`:/krypton-vol \
        kryptonorg/krypton-auth
    `);
})();

