import Client, { Config } from './Client';

export default class Krypton {
    private static defaultInstance: Client | undefined;
    private static otherInstances: Map<string, Client> = new Map<string, Client>();

    public static initialize = (config: Config, instanceName?: string): void => {
        if (instanceName !== undefined) {
            Krypton.otherInstances.set(instanceName, new Client(config));
        } else {
            Krypton.defaultInstance = new Client(config);
        }
    };

    public static getInstance = (instanceName?: string): Client => {
        if (instanceName === undefined) {
            if (Krypton.defaultInstance !== undefined) {
                return Krypton.defaultInstance;
            }
            throw new Error(
                "Please initialize Krypton first: Krypton.initialize({endpoint:'https://krypton.address.example.com'})",
            );
        } else {
            if (Krypton.otherInstances.has(instanceName)) {
                return Krypton.otherInstances.get(instanceName) as Client;
            }
            throw new Error(
                "Please initialize Krypton first: Krypton.initialize({endpoint:'https://krypton.address.example.com'}, " +
                    instanceName +
                    ')',
            );
        }
    };

    public static removeInstance = (instanceName?: string): void => {
        if (instanceName !== undefined) {
            Krypton.otherInstances.delete(instanceName);
        } else {
            delete Krypton.defaultInstance;
        }
    };
}
