import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Numtema Studio</h1>
          <p className="mt-2 text-gray-600">Créez votre compte pour commencer</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
