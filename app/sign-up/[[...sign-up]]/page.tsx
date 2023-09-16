import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return <SignUp afterSignUpUrl={'/new-user'} afterSignInUrl={'/new-user'}  redirectUrl={'/new-user'}/>
}

export default SignUpPage