import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BookCover } from '@/components/media/BookCover';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { BOOK_STORE_URL, books } from '@/data/media';

export function BooksPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="The Books."
        accent="Faith, made practical."
        intro="Six books by Emmanuel Iren on leadership, purpose, grace, love, discernment and prayer — each written to make the life of faith clear and livable."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-16">
            {books.map((book, index) => (
              <Reveal key={book.title} variant="up" delay={(index % 3) * 120}>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <BookCover
                    book={book}
                    className="w-full max-w-[20rem] transition-transform duration-500 ease-out-quart group-hover:-translate-y-1.5"
                  />
                  <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.16em] text-accent sm:mt-6 sm:text-eyebrow">
                    {book.theme}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight text-cream transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {book.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 max-w-sm text-sm leading-relaxed text-ash sm:line-clamp-none">
                    {book.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-cream">
                    Get the book{' '}
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal
            variant="left"
            className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-lg text-ash">
              All six books are in the online store. For bulk orders for churches and groups, or interviews about the
              books, get in touch.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={BOOK_STORE_URL} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
                <Button variant="brand" size="lg" withArrow className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                  Visit the store
                </Button>
              </a>
              <Link to="/contact" className="block w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                  Bulk orders
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <MoreFromMedia current="/media/books" />
    </div>
  );
}
