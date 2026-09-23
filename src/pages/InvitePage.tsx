import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FormField } from '@/components/ui/FormField';
import { SelectField } from '@/components/ui/SelectField';
import { TextareaField } from '@/components/ui/TextareaField';
import { UploadArea } from '@/components/ui/UploadArea';
import { Button } from '@/components/ui/Button';

export function InvitePage() {
  return (
    <div className="min-h-screen bg-ivory pt-24">
      {/* Opening */}
      <section className="py-16 lg:py-24">
        <div className="container-editorial">
          <Reveal>
            <Eyebrow tone="burgundy" className="mb-6">
              Invite
            </Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-charcoal text-balance tracking-tight mb-6 max-w-3xl">
              Bring the word to your city, your church, your event.
            </h1>
            <p className="text-lg text-charcoal/70 leading-relaxed max-w-xl text-pretty">
              Submit an invitation for a speaking engagement, conference, or
              interview. Every enquiry is prayerfully reviewed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-20">
        <div className="container-standard">
          <Reveal className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Full Name" placeholder="Your name" required />
              <FormField label="Email Address" type="email" placeholder="you@example.com" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Phone Number" placeholder="+234..." />
              <FormField label="Organization" placeholder="Church, company, or group" hint="Optional" />
            </div>
            <SelectField
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
              <FormField label="Event Date" type="date" />
              <FormField label="Expected Attendance" type="number" placeholder="500" />
            </div>
            <TextareaField
              label="Message"
              placeholder="Tell us about the invitation — the vision, the audience, and what you're hoping for."
              rows={6}
              required
            />
            <UploadArea label="Supporting Document" accept=".pdf,.doc,.docx" />
            <div className="flex items-center gap-4 pt-2">
              <Button variant="primary" size="lg" withArrow>
                Submit Enquiry
              </Button>
              <Button variant="ghost" size="lg">
                Cancel
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process info */}
      <section className="py-16 lg:py-24 bg-soft-white">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="The Process"
            tone="burgundy"
            title="What to expect after you submit."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {[
              { num: '01', title: 'Review', desc: 'Your invitation is prayerfully reviewed by the team within one week.' },
              { num: '02', title: 'Response', desc: 'You will receive a response with availability and next steps.' },
              { num: '03', title: 'Confirmation', desc: 'Once confirmed, the team works with you to prepare for the engagement.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-8 rounded-soft border border-stone/25 bg-ivory">
                  <span className="font-display text-2xl text-gold tabular-nums">{step.num}</span>
                  <h3 className="font-display text-lg mt-3 mb-2 text-charcoal">{step.title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
