import {Client} from 'pg';

const client = new Client({
  user: 'michaelcuellar',
  host: 'localhost',
  database: 'bioverse',
  port: 5432,
})

client.connect()
  .then(() => {
    console.log(`Connected to database`)
  })
  .catch((err: Error) => {
    console.log(`Error connecting to database`, err)
  });

  export default client;
