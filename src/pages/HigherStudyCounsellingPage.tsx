import { ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import HigherStudyCounsellingForm from '@/components/HigherStudyCounsellingForm';

export default function HigherStudyCounsellingPage() {
  return (
    <main
      className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      style={{ marginTop: '56px' }}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/computer-academy"
          className="btn-secondary inline-flex w-fit items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>
        <a
          href="tel:9007673274"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-white"
        >
          <Phone className="h-4 w-4" />
          Call for counselling
        </a>
      </div>
      <HigherStudyCounsellingForm />
    </main>
  );
}
