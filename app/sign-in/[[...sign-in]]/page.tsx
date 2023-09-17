import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return <SignIn  redirectUrl={'/journal'}/>
}

export default SignInPage