
import { useForm, ValidationError } from "@formspree/react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useI18n } from "@/i18n";

export default function Contact() {
  const [state, handleSubmit] = useForm("xpwrdwln");
  const { t, lang } = useI18n();

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: t("messageSent"),
        description: t("messageSoon"),
      });
    }
  }, [state.succeeded, t]);

  return (
    <main className="flex items-center justify-center min-h-[80vh] py-12 px-2" dir={lang === "he" ? "rtl" : "ltr"}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("contactUs")}</CardTitle>
        </CardHeader>
        <CardContent>
          {state.succeeded ? (
            <div className="text-green-600 font-semibold text-center text-lg">
              {t("thankYou")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium" htmlFor="email">{t("email")}</label>
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
                <label className="font-medium" htmlFor="message">{t("message")}</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder={t("message")}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <Button type="submit" disabled={state.submitting} className="w-full">
                {state.submitting ? t("sending") : t("sendMessage")}
              </Button>
            </form>
          )}
          <div className="text-xs text-muted-foreground mt-3 text-center">
            {t("viaFormspree")}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
