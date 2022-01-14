const {
  MongoClient
} = require('mongodb');
const UserRepo = require('../Repo/UserRepo');
let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
  });
  db = await connection.db(global.__MONGO_DB_NAME__);
  const colletion = db.collection('users');
  await colletion.insertMany(require('./fixtures/users'));
});

afterAll(async () => {
  await connection.close();
});

describe('find', () => {
  it('should find 1', async () => {
    const repo = new UserRepo(db);
    const result = await repo.find("55c30ff62cfa09af198b465b");
    expect(result.name).toEqual('alex');
  });

  it('should find 2', async () => {
    const repo = new UserRepo(db);
    const result = await repo.find("5fbe7fc96d7a98500a624362");
    expect(result.name).toEqual('bob');
  });
});