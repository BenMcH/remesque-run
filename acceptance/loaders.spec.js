const frisby = require('frisby');

const localLoaderServerUrl = 'http://localhost:8080'
describe('Loaders', () => {
    it('should return not found', () => {
        return frisby.get(`${localLoaderServerUrl}/blah`).expect('status', 404);
    });

    it('should return a complex object', () => {
        return frisby.get(`${localLoaderServerUrl}/example`).expect('status', 200).expect('json', {
            complex: 'Objects'
        });
    });

    it('should return a gist by id', async () => {
        const response = await frisby.get(`${localLoaderServerUrl}/gists/176e185918600066e95fa18fe86b838b`)
            .expect('status', 200);

        expect(response.body).toStrictEqual('This file was pulled from github using my gist');
    });

    it('should return a 200 when given a route where the folder is a wildcard', async () => {
        const response = await frisby.get(`${localLoaderServerUrl}/test/bob/params`)
            .expect('status', 200);

        expect(response.body).toStrictEqual('With params! {"testId":"bob"} - /test/bob/params');
    });

    it('should return a 200 when given a nested route without a param', async () => {
        const response = await frisby.get(`${localLoaderServerUrl}/nested/example`)
            .expect('status', 200);

        expect(response.body).toStrictEqual('Hello world!');
    });
});
