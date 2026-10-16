import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FormField } from '@/components/ui/FormField';
import { TextareaField } from '@/components/ui/TextareaField';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_EMAIL } from '@/data/media';
import { sendByEmail } from '@/lib/mailto';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-ink pt-24">
      {/* Opening */}
      <section className="py-16 lg:py-24">
        <div className="container-editorial">
          <Reveal>
            <Eyebrow className="mb-6">
              Contact
            </Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-cream text-balance tracking-[-0.01em] mb-6 max-w-4xl">
              Get in touch.
            </h1>
            <p className="text-lg text-ash leading-relaxed max-w-xl text-pretty">
              For general enquiries, partnerships, or media requests.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact info + form — split layout */}
      <section className="py-12 lg:py-20">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact info */}
            <div className="lg:col-span-4">
              <Reveal>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-eyebrow font-sans uppercase tracking-widest text-ash">
                        Email
                      </span>
                    </div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-cream transition-colors duration-300 hover:text-accent">{CONTACT_EMAIL}</a>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-eyebrow font-sans uppercase tracking-widest text-ash">
                        Phone
                      </span>
                    </div>
                    <p className="text-cream">+234 800 000 0000</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-eyebrow font-sans uppercase tracking-widest text-ash">
                        Address
                      </span>
                    </div>
                    <p className="text-cream leading-relaxed">
                      Celebration Church International<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={100}>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    sendByEmail(String(data.get('subject') || 'Message from the website'), [
                      ['Name', data.get('name')],
                      ['Email', data.get('email')],
                      ['Message', data.get('message')],
                    ]);
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField name="name" label="Name" placeholder="Your name" autoComplete="name" required />
                    <FormField name="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" required />
                  </div>
                  <FormField name="subject" label="Subject" placeholder="What is this about?" />
                  <TextareaField
                    name="message"
                    label="Message"
                    placeholder="Your message…"
                    rows={5}
                    required
                  />
                  <div className="flex flex-col gap-3">
                    <Button type="submit" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                      Send Message
                    </Button>
                    <p className="text-meta text-ash">Sending opens your email app, addressed to {CONTACT_EMAIL}.</p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
