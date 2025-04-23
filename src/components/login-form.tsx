import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Entrer votre email ci-dessous pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemple.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                  <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" variant={"default"} className="w-full">
                  Se connecter
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous voulez consulter le status de votre candidature?{" "}
              <Button variant={"link"} className="underline underline-offset-4">
                <a href="/VoirCandidat">
                  Cliquez ici
                </a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
