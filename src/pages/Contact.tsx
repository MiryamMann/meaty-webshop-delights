
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const FORM_ENDPOINT = "https://formsubmit.co/m0583230707@gmail.com";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-[80vh] py-12 px-2">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={FORM_ENDPOINT}
            method="POST"
            className="space-y-4"
            onSubmit={() => setIsSubmitting(true)}
            target="_blank"
          >
            {/* FormSubmit anti-spam honeypot */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.origin + "/thank-you"} />
            <div>
              <label className="font-medium" htmlFor="name">
                Name
              </label>
              <Input
                name="name"
                id="name"
                type="text"
                required
                placeholder="Your Name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <Input
                name="email"
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="message">
                Message
              </label>
              <Textarea
                name="message"
                id="message"
                required
                placeholder="Type your message here..."
                rows={5}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
          <div className="text-xs text-muted-foreground mt-3 text-center">
            Messages will be sent directly to <span className="font-semibold">m0583230707@gmail.com</span> via FormSubmit.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
