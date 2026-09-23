'use client';

import { Check, Copy, Send } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

import { getContactTopics } from '@/content/contact';
import type { Lang } from '@/lib/i18n/lang';
import { supportMailto } from '@/lib/mailto';
import { siteConfig } from '@/lib/site-config';

const FIELD =
  'mt-2 block w-full rounded-2xl border border-border-strong bg-surface px-4 py-3 text-[15px] text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-[var(--glow)]';

const COPY: Record<
  Lang,
  {
    heading: string;
    intro: string;
    nameLabel: string;
    nameOptional: string;
    namePlaceholder: string;
    topicLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    copyEmail: string;
    copied: string;
    copiedStatus: string;
    signOff: (name: string) => string;
  }
> = {
  en: {
    heading: 'Write to us',
    intro: 'This opens your email app with your message ready to send. Nothing is sent from this website.',
    nameLabel: 'Your name',
    nameOptional: '(optional)',
    namePlaceholder: 'Your name',
    topicLabel: 'Topic',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help? If it’s about a Masjid, please include its name and city.',
    submit: 'Open in email app',
    copyEmail: 'Copy email address',
    copied: 'Copied',
    copiedStatus: 'Email address copied',
    signOff: (name) => `— ${name}`,
  },
  ur: {
    heading: 'ہمیں لکھیں',
    intro: 'یہ آپ کا ای میل ایپ کھولتا ہے، آپ کا پیغام بھیجنے کے لیے تیار۔ اس ویب سائٹ سے کچھ نہیں بھیجا جاتا۔',
    nameLabel: 'آپ کا نام',
    nameOptional: '(اختیاری)',
    namePlaceholder: 'آپ کا نام',
    topicLabel: 'موضوع',
    messageLabel: 'پیغام',
    messagePlaceholder: 'ہم کیسے مدد کر سکتے ہیں؟ اگر بات کسی مسجد کی ہے، تو براہِ کرم اس کا نام اور شہر شامل کریں۔',
    submit: 'ای میل ایپ میں کھولیں',
    copyEmail: 'ای میل ایڈریس کاپی کریں',
    copied: 'کاپی ہو گیا',
    copiedStatus: 'ای میل ایڈریس کاپی ہو گیا',
    signOff: (name) => `— ${name}`,
  },
};

/**
 * The site has no backend, so this form writes the email for the visitor: it opens their
 * email app with the topic, message and name already filled in, ready to send.
 */
export function ContactForm({ lang }: { lang: Lang }) {
  const id = useId();
  const copy = COPY[lang];
  const topics = getContactTopics(lang);
  const [topicId, setTopicId] = useState(topics[0].id);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = topics.find((item) => item.id === topicId) ?? topics[0];
    const body = name.trim() ? `${message.trim()}\n\n${copy.signOff(name.trim())}` : message.trim();
    // Navigating via assign() rather than a `window.location.href = …` assignment sidesteps
    // a false-positive from the immutability lint (it treats that assignment as mutating an
    // external value, though `window.location` is exactly the browser API meant for this).
    window.location.assign(supportMailto(topic.subject, body));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.supportEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is visible on the page anyway.
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-border bg-surface p-6 card-shadow-lg sm:p-8">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{copy.heading}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{copy.intro}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className="block text-sm font-medium">
          {copy.nameLabel} <span className="font-normal text-subtle">{copy.nameOptional}</span>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.namePlaceholder}
            className={FIELD}
          />
        </label>
        <label htmlFor={`${id}-topic`} className="block text-sm font-medium">
          {copy.topicLabel}
          <select
            id={`${id}-topic`}
            name="topic"
            value={topicId}
            onChange={(event) => setTopicId(event.target.value)}
            className={`${FIELD} appearance-none bg-[length:18px] bg-no-repeat pe-10 ltr:bg-[position:right_14px_center] rtl:bg-[position:left_14px_center] bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%236f7c75'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")]`}
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label htmlFor={`${id}-message`} className="mt-5 block text-sm font-medium">
        {copy.messageLabel}
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePlaceholder}
          className={`${FIELD} resize-y leading-relaxed`}
        />
      </label>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow),inset_0_1px_0_rgb(255_255_255/0.18)] transition-[background-color,transform] hover:bg-primary-strong active:scale-[0.98]"
        >
          <Send className="size-4" aria-hidden="true" />
          {copy.submit}
        </button>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          {copied ? (
            <Check className="size-4 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? copy.copied : copy.copyEmail}
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? copy.copiedStatus : ''}
        </span>
      </div>
    </form>
  );
}
