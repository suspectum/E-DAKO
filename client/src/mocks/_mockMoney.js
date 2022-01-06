import faker from 'faker';

let arrGroups = ['Cash', 'Asset', 'Credit', 'Bank'];
export const GROUPS = Object.assign(...arrGroups.map((item) => ({ [item]: faker.finance.amount() })));

let arrWallets = ['User1', 'User2'];
export const WALLETS = Object.assign(...arrWallets.map((item) => ({ [item]: faker.finance.amount() })));

// for (let i = 0; i < arr.length; i++) {
//   GROUPS[arr[i]] = faker.finance.amount();
// }
