'use client';

import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import { getContactTopics } from '@/content/contact';
import { sendContactMessage, type ContactResult } from '@/lib/contact-api';
import type { Lang } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

import { CONTACT_FORM_COPY } from './contact-form-copy';

const FIELD =
  'mt-2 block w-full rounded-2xl border border-border-strong bg-surface px-4 py-3 text-[15px] text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-[var(--glow)] disabled:opacity-60';

const CARD = 'rounded-[28px] border border-border bg-surface p-6 card-shadow-lg sm:p-8';

const PRIMARY_BUTTON =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow),inset_0_1px_0_rgb(255_255_255/0.18)] transition-[background-color,transform] hover:bg-primary-strong active:scale-[0.98] disabled:cursor-default disabled:opacity-70 disabled:hover:bg-primary disabled:active:scale-100';

/** Maps deep-link query values (e.g. from the Play Console) to a topic id. */
const TOPIC_PARAM_ALIASES: Record<string, string> = {
  'privacy-account': 'privacy',
};

/** What the form is doing: being filled in, being sent, sent, or refused (and why). */
type Status = 'idle' | 'sending' | ContactResult;

/**
 * The "Write to us" form. Pressing Send posts the message to the backend, which emails it
 * to the support inbox (see lib/contact-api.ts); the visitor never leaves the page and no
 * email app opens. The team replies to the address typed here.
 *
 * `initialTopic` is the page's `?topic=` value. It can change while the form is open: the
 * topic cards beside the form are links to this same page with another topic.
 */
export function ContactForm({ lang, initialTopic }: { lang: Lang; initialTopic?: string }) {
  const id = useId();
  const copy = CONTACT_FORM_COPY[lang];
  const topics = getContactTopics(lang);
  const requestedTopicId = initialTopic ? (TOPIC_PARAM_ALIASES[initialTopic] ?? initialTopic) : undefined;
  const requestedTopic = topics.find((topic) => topic.id === requestedTopicId) ?? topics[0];

  const [topicId, setTopicId] = useState(requestedTopic.id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(requestedTopic.messageTemplate ?? '');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const sentRef = useRef<HTMLDivElement>(null);

  // A topic card was pressed: the page's ?topic= changed under an already-open form.
  const [appliedTopicId, setAppliedTopicId] = useState(requestedTopic.id);
  if (appliedTopicId !== requestedTopic.id) {
    setAppliedTopicId(requestedTopic.id);
    setTopicId(requestedTopic.id);
    if (requestedTopic.messageTemplate && !message.trim()) setMessage(requestedTopic.messageTemplate);
    if (status === 'sent') setStatus('idle');
  }

  // The form is replaced by the confirmation, so keyboard and screen-reader focus go with it.
  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const sending = status === 'sending';
  const error = status === 'invalid' || status === 'busy' || status === 'failed' ? copy.errors[status] : null;

  const onTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextTopicId = event.target.value;
    setTopicId(nextTopicId);
    const nextTopic = topics.find((topic) => topic.id === nextTopicId);
    if (nextTopic?.messageTemplate && !message.trim()) {
      setMessage(nextTopic.messageTemplate);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setStatus('sending');
    setStatus(await sendContactMessage({ name, email, topic: topicId, message, language: lang, website }));
  };

  const writeAnother = () => {
    setMessage(topics.find((topic) => topic.id === topicId)?.messageTemplate ?? '');
    setStatus('idle');
  };

  if (status === 'sent') {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className={`${CARD} text-center focus:outline-none`}>
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{copy.sentTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-muted">
          {copy.sentBody(
            <bdi dir="ltr" className="font-medium text-foreground">
              {email.trim()}
            </bdi>,
          )}
        </p>
        <button
          type="button"
          onClick={writeAnother}
          className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={CARD}>
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{copy.heading}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{copy.intro}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className="block text-sm font-medium">
          {copy.nameLabel} <span className="font-normal text-subtle">{copy.nameOptional}</span>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.namePlaceholder}
            disabled={sending}
            className={FIELD}
          />
        </label>
        <label htmlFor={`${id}-email`} className="block text-sm font-medium">
          {copy.emailLabel}
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            // An email address reads left-to-right in Urdu too.
            dir="ltr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            disabled={sending}
            className={`${FIELD} rtl:text-right`}
          />
        </label>
      </div>

      {/* Not for people: hidden from sight, the keyboard and screen readers. Bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <label htmlFor={`${id}-topic`} className="mt-5 block text-sm font-medium">
        {copy.topicLabel}
        <select
          id={`${id}-topic`}
          name="topic"
          value={topicId}
          onChange={onTopicChange}
          disabled={sending}
          className={`${FIELD} appearance-none bg-[length:18px] bg-no-repeat pe-10 ltr:bg-[position:right_14px_center] rtl:bg-[position:left_14px_center] bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%236f7c75'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")]`}
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor={`${id}-message`} className="mt-5 block text-sm font-medium">
        {copy.messageLabel}
        <textarea
          id={`${id}-message`}
          name="message"
          required
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePlaceholder}
          disabled={sending}
          className={`${FIELD} resize-y leading-relaxed`}
        />
      </label>

      {error ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-[#b42318]/25 bg-[#b42318]/[0.06] p-4 text-sm leading-relaxed text-foreground"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#b42318] dark:text-[#f97066]" aria-hidden="true" />
          <p>
            {error} {copy.emailFallback}{' '}
            <bdi dir="ltr" className="select-all font-medium">
              {siteConfig.supportEmail}
            </bdi>
            {lang === 'en' ? '.' : null}
          </p>
        </div>
      ) : null}

      <div className="mt-7">
        <button type="submit" disabled={sending} className={PRIMARY_BUTTON}>
          {sending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          )}
          {sending ? copy.sending : copy.submit}
        </button>
      </div>
    </form>
  );
}
