import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FormField } from '@/components/ui/FormField';
import { TextareaField } from '@/components/ui/TextareaField';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';

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
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-cream text-balance tracking-tight mb-6 max-w-3xl">
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
                    <p className="text-cream">hello@emmanueliren.com</p>
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
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Name" placeholder="Your name" required />
                    <FormField label="Email" type="email" placeholder="you@example.com" required />
                  </div>
                  <FormField label="Subject" placeholder="What is this about?" />
                  <TextareaField
                    label="Message"
                    placeholder="Your message…"
                    rows={5}
                    required
                  />
                  <div>
                    <Button variant="primary" size="lg" withArrow>
                      Send Message
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
