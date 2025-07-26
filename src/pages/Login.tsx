import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to access your account and continue shopping
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;