import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
//import Providers from 'next-auth/providers';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
//import { MongoClient, ObjectId } from 'mongodb';
//import connectDB from '../../../util/database';

//const client = new MongoClient(process.env.MONGODB_URI);
//const client = () => clientPromise.db('lock');
export default async function (req, res) {
  return await NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        },
        from: process.env.EMAIL_FROM,
        maxAge: 60 * 5, //5 minutes
      }),
    ],
    //database: process.env.MONGODB_URI,
    adapter: MongoDBAdapter({
      db: (await clientPromise).db('lock'),
    }),
    secret: process.env.AUTH_SECRET,
    debug: true,
    pages: {
      verifyRequest: '/verifyrequest',
    },
  });
}
