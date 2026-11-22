
'use client';

import { useActionState } from 'react';
import type { State } from '@/lib/actions';

interface MeetingFormProps {
  action: (
    prevState: State,
    formData: FormData
  ) => Promise<State>;
  initialData?: {
    date: string;
    meetingType: string;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: { number: number; title: string };
    openingPrayer: string;
    wardBusiness: { description: string }[];
    stakeBusiness: boolean;
    sacramentHymn: { number: number; title: string };
    speakers: { name: string; topic: string; type: string }[];
    closingHymn: { number: number; title: string };
    closingPrayer: string;
  };
}

const initialState: State = {
  message: '',
};

export default function MeetingForm({
  action,
  initialData,
}: MeetingFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <section className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block font-semibold">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initialData?.date}
            aria-describedby={state.errors?.date ? 'date-error' : undefined}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          {state.errors?.date && (
            <p id="date-error" className="mt-1 text-sm text-red-600">
              {state.errors.date[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="meetingType" className="mb-2 block font-semibold">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            required
            defaultValue={initialData?.meetingType ?? 'regular'}
            aria-describedby={
              state.errors?.meetingType ? 'meetingType-error' : undefined
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          {state.errors?.meetingType && (
            <p id="meetingType-error" className="mt-1 text-sm text-red-600">
              {state.errors.meetingType[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="presiding" className="mb-2 block font-semibold">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            required
            defaultValue={initialData?.presiding}
            aria-describedby={
              state.errors?.presiding ? 'presiding-error' : undefined
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          {state.errors?.presiding && (
            <p id="presiding-error" className="mt-1 text-sm text-red-600">
              {state.errors.presiding[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="conducting" className="mb-2 block font-semibold">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            required
            defaultValue={initialData?.conducting}
            aria-describedby={
              state.errors?.conducting ? 'conducting-error' : undefined
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          {state.errors?.conducting && (
            <p id="conducting-error" className="mt-1 text-sm text-red-600">
              {state.errors.conducting[0]}
            </p>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold text-blue-950">
          Meeting Program
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-2 block font-semibold"
            >
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={initialData?.openingHymn.number}
              aria-describedby={
                state.errors?.openingHymnNumber
                  ? 'openingHymnNumber-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.openingHymnNumber && (
              <p
                id="openingHymnNumber-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.openingHymnNumber[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-2 block font-semibold"
            >
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              required
              defaultValue={initialData?.openingHymn.title}
              aria-describedby={
                state.errors?.openingHymnTitle
                  ? 'openingHymnTitle-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.openingHymnTitle && (
              <p
                id="openingHymnTitle-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.openingHymnTitle[0]}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="openingPrayer"
              className="mb-2 block font-semibold"
            >
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              required
              defaultValue={initialData?.openingPrayer}
              aria-describedby={
                state.errors?.openingPrayer
                  ? 'openingPrayer-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.openingPrayer && (
              <p
                id="openingPrayer-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.openingPrayer[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-2 block font-semibold"
            >
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={initialData?.sacramentHymn.number}
              aria-describedby={
                state.errors?.sacramentHymnNumber
                  ? 'sacramentHymnNumber-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.sacramentHymnNumber && (
              <p
                id="sacramentHymnNumber-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.sacramentHymnNumber[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-2 block font-semibold"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              required
              defaultValue={initialData?.sacramentHymn.title}
              aria-describedby={
                state.errors?.sacramentHymnTitle
                  ? 'sacramentHymnTitle-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.sacramentHymnTitle && (
              <p
                id="sacramentHymnTitle-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.sacramentHymnTitle[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-blue-950">
          Additional Program Details
        </h2>

        <div>
          <label
            htmlFor="announcements"
            className="mb-2 block font-semibold"
          >
            Announcements (one per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={initialData?.announcements?.join('\n')}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label
            htmlFor="wardBusiness"
            className="mb-2 block font-semibold"
          >
            Ward Business (one per line)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={initialData?.wardBusiness
              .map((item) => item.description)
              .join('\n')}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label className="flex items-center gap-3">
            <input
              id="stakeBusiness"
              type="checkbox"
              name="stakeBusiness"
              defaultChecked={initialData?.stakeBusiness ?? false}
              className="h-4 w-4"
            />
            <span className="font-semibold">Include stake business</span>
          </label>
        </div>

        <div>
          <label htmlFor="speakers" className="mb-2 block font-semibold">
            Speakers and Musical Numbers
          </label>
          <p className="mb-2 text-sm text-gray-500">
            Enter one item per line using: Name | Topic | speaker or
            musical-number
          </p>
          <textarea
            id="speakers"
            name="speakers"
            rows={5}
            defaultValue={initialData?.speakers
              .map(
                (item) =>
                  `${item.name} | ${item.topic} | ${item.type}`
              )
              .join('\n')}
            aria-describedby={
              state.errors?.speakers
                ? 'speakers-error'
                : 'speakers-help'
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          <p id="speakers-help" className="mt-1 text-sm text-gray-500">
            Example: John Smith | Faith in Christ | speaker
          </p>
          {state.errors?.speakers && (
            <p
              id="speakers-error"
              role="alert"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.speakers[0]}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-2 block font-semibold"
            >
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={initialData?.closingHymn.number}
              aria-describedby={
                state.errors?.closingHymnNumber
                  ? 'closingHymnNumber-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.closingHymnNumber && (
              <p
                id="closingHymnNumber-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.closingHymnNumber[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-2 block font-semibold"
            >
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              required
              defaultValue={initialData?.closingHymn.title}
              aria-describedby={
                state.errors?.closingHymnTitle
                  ? 'closingHymnTitle-error'
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />
            {state.errors?.closingHymnTitle && (
              <p
                id="closingHymnTitle-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.closingHymnTitle[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="mb-2 block font-semibold"
          >
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            required
            defaultValue={initialData?.closingPrayer}
            aria-describedby={
              state.errors?.closingPrayer
                ? 'closingPrayer-error'
                : undefined
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          {state.errors?.closingPrayer && (
            <p
              id="closingPrayer-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.closingPrayer[0]}
            </p>
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {pending
          ? 'Saving...'
          : initialData
            ? 'Update Meeting'
            : 'Create Meeting'}
      </button>
    </form>
  );
}
