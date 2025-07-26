import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Join ShopEZ</h1>
              <p className="text-muted-foreground">
                Create your account and start your shopping journey
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;