import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FormField } from '@/components/ui/FormField';
import { SelectField } from '@/components/ui/SelectField';
import { TextareaField } from '@/components/ui/TextareaField';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/data/media';
import { sendByEmail } from '@/lib/mailto';

export function InvitePage() {
  return (
    <div className="min-h-screen bg-ink pt-24">
      {/* Opening */}
      <section className="py-16 lg:py-24">
        <div className="container-editorial">
          <Reveal>
            <Eyebrow className="mb-6">
              Invite
            </Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-cream text-balance tracking-[-0.01em] mb-6 max-w-4xl">
              Bring the word to your city, your church, your event.
            </h1>
            <p className="text-lg text-ash leading-relaxed max-w-xl text-pretty">
              Submit an invitation for a speaking engagement, conference, or
              interview. Every enquiry is prayerfully reviewed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-20">
        <div className="container-standard">
          <Reveal>
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const type = event.currentTarget.querySelector<HTMLSelectElement>('select[name="type"]');
              sendByEmail(`Invitation: ${type?.selectedOptions[0]?.text ?? 'Enquiry'} — ${data.get('name')}`, [
                ['Full name', data.get('name')],
                ['Email', data.get('email')],
                ['Phone', data.get('phone')],
                ['Organization', data.get('organization')],
                ['Invitation type', type?.selectedOptions[0]?.text ?? null],
                ['Event date', data.get('date')],
                ['Expected attendance', data.get('attendance')],
                ['Message', data.get('message')],
              ]);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField name="name" label="Full Name" placeholder="Your name" autoComplete="name" required />
              <FormField name="email" label="Email Address" type="email" placeholder="you@example.com" autoComplete="email" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField name="phone" label="Phone Number" type="tel" placeholder="+234..." autoComplete="tel" />
              <FormField name="organization" label="Organization" placeholder="Church, company, or group" hint="Optional" />
            </div>
            <SelectField
              name="type"
              label="Invitation Type"
              required
              options={[
                { value: 'speaking', label: 'Speaking Engagement' },
                { value: 'conference', label: 'Conference / Event' },
                { value: 'interview', label: 'Interview / Media' },
                { value: 'other', label: 'Other' },
              ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField name="date" label="Event Date" type="date" />
              <FormField name="attendance" label="Expected Attendance" type="number" min={1} placeholder="500" />
            </div>
            <TextareaField
              name="message"
              label="Message"
              placeholder="Tell us about the invitation — the vision, the audience, and what you're hoping for."
              rows={6}
              required
            />
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Button type="submit" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                Submit Enquiry
              </Button>
              <Link to="/" className="block w-full sm:w-auto">
                <Button type="button" variant="ghost" size="lg" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </Link>
            </div>
            <p className="text-meta text-ash">
              Submitting opens your email app with the enquiry written out, addressed to {CONTACT_EMAIL}. Attach any supporting document there.
            </p>
          </form>
          </Reveal>
        </div>
      </section>

      {/* Process info */}
      <section className="py-16 lg:py-24 bg-navy">
        <div className="container-editorial">
          <SectionHeader
            surface="light"
            numbered="01"
            eyebrow="The Process"
           
            title="What to expect after you submit."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {[
              { num: '01', title: 'Review', desc: 'Your invitation is prayerfully reviewed by the team within one week.' },
              { num: '02', title: 'Response', desc: 'You will receive a response with availability and next steps.' },
              { num: '03', title: 'Confirmation', desc: 'Once confirmed, the team works with you to prepare for the engagement.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-8 rounded-soft border-t-2 border-brand bg-navy-2">
                  <span className="font-display text-2xl text-brand tabular-nums">{step.num}</span>
                  <h3 className="font-display text-lg mt-3 mb-2 text-cream">{step.title}</h3>
                  <p className="text-sm text-mist leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
