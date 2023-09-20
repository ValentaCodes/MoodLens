import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <SignUp afterSignUpUrl="/new-user" />
    </div>
  )
}

export default SignUpPage
