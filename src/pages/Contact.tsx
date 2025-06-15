import { useForm, ValidationError } from "@formspree/react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function Contact() {
  const [state, handleSubmit] = useForm("xpwrdwln");

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "✅ Message Sent!",
        description: "We'll get back to you shortly.",
      });
    }
  }, [state.succeeded]);

  return (
    <main className="flex items-center justify-center min-h-[80vh] py-12 px-2">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          {state.succeeded ? (
            <div className="text-green-600 font-semibold text-center text-lg">
              ✅ Thank you! Your message was sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium" htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label className="font-medium" htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Type your message here..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <Button type="submit" disabled={state.submitting} className="w-full">
                {state.submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
          <div className="text-xs text-muted-foreground mt-3 text-center">
            Messages will be sent via <span className="font-semibold">Formspree</span>.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
