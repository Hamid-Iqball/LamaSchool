import { auth } from "@clerk/nextjs/server"

  const {sessionClaims} = await auth()
  const role =  (sessionClaims?.publiMetadata as {role:string} | undefined)?.role
