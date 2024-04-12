// "use client"
// import { signIn, signOut, useSession } from "next-auth/react";
// import { Appbar } from "@repo/ui/appbar";

// export default function Page(): JSX.Element {
//   const session = useSession();
//   return (
//    <div>
//       <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
//    </div>
//   );
// }

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}

// Here, you're passing three props to the Appbar:

// onSignin: The signIn function from next-auth, which is a method to trigger the sign-in flow.
// onSignout: The signOut function from next-auth, which is a method to log the user out.
// user: This is set to session.data?.user. The ? is optional chaining, meaning it'll try to access user on data if data exists; otherwise, it evaluates to undefined. Essentially, if there's a logged-in session, this prop will pass the user's information to the Appbar. If there's no session, user will be undefined, indicating no user is logged in.