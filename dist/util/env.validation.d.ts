declare enum Environment {
    Dev = "dev",
    Prod = "prod"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
