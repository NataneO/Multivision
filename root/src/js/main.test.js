import Letter from "./main";

describe('Letter class', () => {
    let letter;

    beforeEach(() => {
        letter = new Letter();
    })

     test('initializes with empty users and posts arrays', () => {
        expect(letter.users).toEqual([]);
        expect(letter.posts).toEqual([]);
    });

})

describe('get', () => {
    test('should return data', async () => {
        const letter = new Letter();
        const data = await letter.get();
        expect(data).toBeTruthy();
    });
});

describe('address', () => {
    test('should return the address', () => {
        const letter = new Letter();
        const address = letter.address({
            street: 'test',
            suite: 'test',
            zipcode: 'test',
            city: 'test'
        });
        expect(address).toBe('test, test-test, test');
    });
});