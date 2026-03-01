import LoginForm from "../auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-300/20 dark:bg-pink-900/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="w-full relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
