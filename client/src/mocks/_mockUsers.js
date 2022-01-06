import faker from 'faker';

export const MOCK_USERS = [],
  ROLES = ['ADMIN', 'USER'],
  STATUS = ['ACTIVE', 'BANNED'];

for (let i = 0; i < 14; i++) {
  MOCK_USERS[i] = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    created: faker.date.past().toLocaleDateString('en-US'),
    updated: faker.date.past().toLocaleDateString('en-US'),
    isVerified: true,
    status: STATUS[Math.floor(Math.random() * STATUS.length)],
  };
}
