import Button from '@/components/Button';

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const signInWithGoogle = () => {};

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    if (!email) return;

    // try {
    //   await sendSignInLinkToEmail(auth, email, {
    //     url: `${import.meta.env.VITE_HOSTING_URL}/signin/redirect`,
    //     handleCodeInApp: true,
    //   });
    //   window.localStorage.setItem('emailForSignIn', email);
    // } catch (error) {
    //   const err = error as Error;
    //   const errorMessage = err.message;
    //   console.log(errorMessage);
    // }
  };

  return (
    <>
      <div>
        <h3>Yoko welcomes you</h3>
        <p>Your events and actions tracker</p>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
        />
        <Button type="submit">Sign in with email</Button>
      </form>

      <div>
        <span>Sign in with google instead</span>
        <Button onClick={signInWithGoogle}>Google</Button>
      </div>
    </>
  );
};

export default Login;
