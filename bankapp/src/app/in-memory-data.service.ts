import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users = [
            { 
                id: 11,
                username: 'user1',
                first_name: 'Name1',
                last_name: 'Surname1',
                password: 'xyz1',
                iban: '1234-1234-12-1234123456',
            },
            { 
                id: 12,
                username: 'user2',
                first_name: 'Name2',
                last_name: 'Surname2',
                password: 'xyz2',
                iban: '4444-3334-22-1211212456',
            },
            { 
                id: 13,
                username: 'user3',
                first_name: 'Name3',
                last_name: 'Surname3',
                password: 'xyz3',
                iban: '4321-4314-11-1234343456',
            },
        ];
        return {users};
    }
}
