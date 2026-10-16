import { Link } from 'react-router-dom';
import { BookCover } from '@/components/media/BookCover';
import { IrensAlbum } from '@/components/media/IrensAlbum';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/TextLink';
import { books } from '@/data/media';

export function IrensPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="The Irens."
        accent="A home before a platform."
        intro="Emmanuel and Laju Iren, and the family that sits quietly beneath the public work."
      />
      <MediaSubnav />
      <section className="pt-14 md:pt-16 lg:pt-24">
        <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="left">
              <DisplayHeading
                number="01"
                eyebrow="Family"
                title="Emmanuel"
                accent="& Laju Iren."
                size="sm"
                className="mb-6"
              />
            </Reveal>
            <div className="space-y-5 leading-relaxed text-ash">
              <Reveal variant="left" delay={150} as="p">
                Emmanuel Iren married Laju Iren (née Arenyeka) in November 2014. Together they are parents to three
                daughters and one son.
              </Reveal>
              <Reveal variant="left" delay={300} as="p">
                The family remains a quiet foundation beneath the public work — a reminder that the ministry, for all
                its reach, is carried by a man who is also a husband and a father.
              </Reveal>
            </div>
          </div>
          <Reveal
            variant="right"
            delay={450}
            className="grid grid-cols-3 self-end border-t border-line pt-6 lg:col-span-5 lg:col-start-8"
          >
            {[
              ['2014', 'Married'],
              ['4', 'Children'],
              ['1', 'Home, first'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-brand">{value}</p>
                <p className="mt-1 text-eyebrow uppercase tracking-[0.16em] text-ash">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <IrensAlbum />
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-7">
            <DisplayHeading number="02" eyebrow="On love & family" title="Love, as" accent="God designed it." />
            <p className="mt-5 max-w-xl leading-relaxed text-ash">
              Much of what Emmanuel Iren teaches on friendship, courtship and marriage is gathered in LoveCode — written
              for relationships built to last.
            </p>
            <Link to="/media/books" className="mt-8 inline-block">
              <TextLink>See the books</TextLink>
            </Link>
          </Reveal>
          <Reveal variant="right" delay={150} className="lg:col-span-4 lg:col-start-9">
            <BookCover book={books.find((b) => b.title === 'LoveCode') ?? books[0]} className="mx-auto max-w-[16rem]" />
          </Reveal>
        </div>
      </section>
      <MoreFromMedia current="/media/the-irens" />
    </div>
  );
}
