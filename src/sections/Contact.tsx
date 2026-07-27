import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, MessageCircle } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  message: z.string().min(10, "Message should be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactForm) => {
    const whatsappNumber = "917895757204"
    const text = encodeURIComponent(`Hi, I'm ${data.name}.\n\n${data.message}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank")
    setSent(true)
    reset()
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-32">
      <p className="text-center text-xs tracking-widest text-muted-foreground uppercase">
        Contact
      </p>
      <h2 className="mt-3 text-center text-4xl font-semibold sm:text-5xl">
        Let's Work Together
      </h2>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <p className="text-muted-foreground">
            Have an idea, project, or collaboration in mind? Send me a
            message and let's create something clean, modern, and impactful
            together.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="mailto:aniljoshi0017@gmail.com" className="rounded-full border border-border p-2 transition-colors hover:bg-secondary">
              <Mail size={18} />
            </a>
            <a href="https://wa.me/917895757204" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 transition-colors hover:bg-secondary">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-medium">Send Message</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your message opens directly in WhatsApp — no spam, just real connection.
          </p>

          <input
            {...register("name")}
            placeholder="Your Name"
            className="mt-4 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-accent"
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}

          <textarea
            {...register("message")}
            placeholder="Write your message..."
            rows={4}
            className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-accent"
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80 disabled:opacity-50"
          >
            {sent ? "Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}