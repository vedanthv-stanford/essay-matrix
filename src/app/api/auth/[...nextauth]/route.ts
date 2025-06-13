import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    // Add your authentication providers here
  ],
  // Add additional configuration as needed
};

export default NextAuth(authOptions); 