import { useState } from 'react';

const careerOptions = [
  'Engineer',
  'Doctor',
  'Software Developer',
  'Data Scientist',
  'Teacher',
  'Lawyer',
  'Chartered Accountant',
  'Entrepreneur',
  'Government Officer',
  'Researcher',
  'Designer',
  'Journalist',
  'Other',
];

const inputClassName =
  'w-full rounded-xl border border-dark-border bg-dark-light px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

function isUnderEighteen(dateOfBirth: string) {
  if (!dateOfBirth) return false;

  const [year, month, day] = dateOfBirth.split('-').map(Number);
  if (!year || !month || !day) return false;

  const today = new Date();
  let age = today.getFullYear() - year;
  const birthdayHasNotPassed =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);

  if (birthdayHasNotPassed) age -= 1;
  return age >= 0 && age < 18;
}

function getLocalDateString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export default function HigherStudyCounsellingForm() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const isMinor = isUnderEighteen(dateOfBirth);
  const selectedOther = selectedCareers.includes('Other');

  function toggleCareer(career: string) {
    setSelectedCareers((current) =>
      current.includes(career)
        ? current.filter((selected) => selected !== career)
        : [...current, career],
    );
  }

  return (
    <section className="rounded-2xl border border-dark-border bg-dark-card/80 p-6 sm:p-8">
      <header className="mb-8">
        <p className="section-kicker">Bharat Computer Academy</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
          Free Counselling for Higher Study
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
          Tell us about your education and interests so our counsellors can guide you on courses, colleges, and career options.
        </p>
        <p className="mt-3 text-sm text-slate-300/70">
          Fields marked <span className="text-accent">*</span> are required. Your answers are not sent or saved yet; form submission will be enabled later.
        </p>
      </header>

      <form onSubmit={(event) => event.preventDefault()} className="space-y-8">
              <fieldset className="min-w-0 border-0 p-0">
                <legend className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Student details
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Student Name <span className="text-accent">*</span>
                    <input
                      className={inputClassName}
                      name="studentName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter the student's name"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Date of Birth <span className="text-accent">*</span>
                    <input
                      className={inputClassName}
                      name="dateOfBirth"
                      type="date"
                      max={getLocalDateString()}
                      value={dateOfBirth}
                      onChange={(event) => setDateOfBirth(event.target.value)}
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Gender <span className="text-accent">*</span>
                    <select className={inputClassName} name="gender" defaultValue="" required>
                      <option value="" disabled>Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Student Mobile Number <span className="text-accent">*</span>
                    <input
                      className={inputClassName}
                      name="studentPhone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="e.g., +91 98765 43210"
                      required
                    />
                  </label>

                  {isMinor && (
                    <label className="grid gap-2 text-sm font-medium text-slate-200">
                      Parent/Guardian Mobile Number <span className="text-accent">*</span>
                      <input
                        className={inputClassName}
                        name="guardianPhone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Enter a parent or guardian's number"
                        required
                      />
                    </label>
                  )}

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Email Address <span className="font-normal text-slate-400">(optional)</span>
                    <input
                      className={inputClassName}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200 sm:col-span-2">
                    Student Photo <span className="font-normal text-slate-400">(optional)</span>
                    <input
                      className={`${inputClassName} file:mr-3 file:rounded-lg file:border-0 file:bg-primary/15 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-light`}
                      name="studentPhoto"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      aria-describedby="student-photo-note"
                    />
                    <span id="student-photo-note" className="text-xs font-normal text-slate-400">
                      JPG, PNG, or WebP. The photo stays on this device; it is not uploaded.
                    </span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="min-w-0 border-0 p-0">
                <legend className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Education
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    School Name <span className="text-accent">*</span>
                    <input className={inputClassName} name="schoolName" type="text" required />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Higher Secondary Board <span className="text-accent">*</span>
                    <input
                      className={inputClassName}
                      name="higherSecondaryBoard"
                      type="text"
                      placeholder="e.g., WBCHSE, CBSE, ISC"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200 sm:col-span-2">
                    Percentage / Grade <span className="text-accent">*</span>
                    <input
                      className={inputClassName}
                      name="percentageOrGrade"
                      type="text"
                      placeholder="e.g., 85% or A"
                      required
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="min-w-0 border-0 p-0">
                <legend className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Interests and preferences
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Which subject did you score the highest marks in? <span className="text-accent">*</span>
                    <input className={inputClassName} name="highestScoringSubject" type="text" required />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Which subject do you enjoy studying the most? <span className="text-accent">*</span>
                    <input className={inputClassName} name="favoriteSubject" type="text" required />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    What hobbies do you have? <span className="text-accent">*</span>
                    <textarea className={`${inputClassName} min-h-24 resize-y`} name="hobbies" required />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    If given a free day, how would you spend it? <span className="text-accent">*</span>
                    <textarea className={`${inputClassName} min-h-24 resize-y`} name="freeDayPlan" required />
                  </label>

                  <fieldset className="min-w-0 border-0 p-0 sm:col-span-2" aria-required="true">
                    <legend className="mb-3 text-sm font-medium text-slate-200">
                      Do you enjoy working? <span className="text-accent">*</span>
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {['Alone', 'In a Team', 'Both'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-light/50 px-4 py-3 text-sm text-slate-200"
                        >
                          <input
                            className="h-4 w-4 accent-primary"
                            name="workPreference"
                            type="radio"
                            value={option}
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="min-w-0 border-0 p-0 sm:col-span-2" aria-required="true">
                    <legend className="mb-3 text-sm font-medium text-slate-200">
                      Which careers interest you most? <span className="text-accent">*</span>
                    </legend>
                    <p className="mb-3 text-xs text-slate-400">Choose one or more.</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {careerOptions.map((career, index) => (
                        <label
                          key={career}
                          className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-light/50 px-4 py-3 text-sm text-slate-200"
                        >
                          <input
                            className="h-4 w-4 accent-primary"
                            name="careerInterests"
                            type="checkbox"
                            value={career}
                            checked={selectedCareers.includes(career)}
                            onChange={() => toggleCareer(career)}
                            required={index === 0 && selectedCareers.length === 0}
                          />
                          {career}
                        </label>
                      ))}
                    </div>

                    {selectedOther && (
                      <label className="mt-4 grid gap-2 text-sm font-medium text-slate-200">
                        Please specify another career <span className="text-accent">*</span>
                        <input className={inputClassName} name="otherCareer" type="text" required />
                      </label>
                    )}
                  </fieldset>
                </div>
              </fieldset>

              <div className="flex flex-col gap-4 border-t border-dark-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p id="counselling-form-submit-note" className="max-w-xl text-xs leading-relaxed text-slate-400">
                  Online submission is not connected yet, so no details are sent or stored. Please call us if you need counselling now.
                </p>
                <button
                  type="submit"
                  disabled
                  aria-describedby="counselling-form-submit-note"
                  className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-xl border border-dark-border bg-dark-light px-6 py-3 text-sm font-semibold text-slate-500 opacity-70"
                >
                  Submit for Free Counselling
                </button>
              </div>
      </form>
    </section>
  );
}
