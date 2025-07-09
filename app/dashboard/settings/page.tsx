import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-nasalization gradient-text">Account</h1>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and timezone.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-1">
          <div className="flex h-10 w-full items-center rounded-md border bg-muted px-4 font-normal">Account</div>
          <div className="flex h-10 w-full items-center rounded-md px-4 font-normal hover:bg-muted">Billing</div>
          <div className="flex h-10 w-full items-center rounded-md px-4 font-normal hover:bg-muted">Organizations</div>
          <div className="flex h-10 w-full items-center rounded-md px-4 font-normal hover:bg-muted">
            Projects & API Keys
          </div>
        </div>
        <div className="col-span-3 space-y-6">
          <div>
            <h2 className="text-xl font-nasalization">Account Details</h2>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred language and timezone.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-normal">
                Username
              </label>
              <Input id="username" defaultValue="Lionel Numtema" className="max-w-md font-normal" />
            </div>
            <Button className="bg-muted text-foreground hover:bg-muted/80 font-normal">Update Account</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
