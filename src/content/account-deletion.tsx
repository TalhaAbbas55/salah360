import type { LegalSection } from '@/components/legal/legal-document';
import type { Lang } from '@/lib/i18n/lang';
import { supportMailto } from '@/lib/mailto';
import { siteConfig } from '@/lib/site-config';

/**
 * How to delete a Salah360 account, with or without the app (Google Play requires a web
 * page for this). Written from what the backend actually does: a 48-hour grace period,
 * then migration 18's execute_account_deletion. Keep both languages in step.
 */
export function getAccountDeletionSections(lang: Lang): readonly LegalSection[] {
  const mailtoHref = supportMailto(
    'Delete my Salah360 account',
    'Please delete my Salah360 account.\n\nThe email address I sign in with: \n\n(Send this from that same email address.)',
  );
  const email = <a href={mailtoHref}>{siteConfig.supportEmail}</a>;

  if (lang === 'ur') {
    return [
      {
        id: 'in-the-app',
        title: 'ایپ میں اکاؤنٹ ڈیلیٹ کریں',
        body: (
          <>
            <p>سب سے تیز طریقہ ایپ کے اندر ہے:</p>
            <ol>
              <li>Salah360 کھولیں اور سائن اِن کریں۔</li>
              <li>
                <strong>پروفائل</strong> ٹیب (مسجد ایڈمن کے لیے <strong>سیٹنگز</strong>) کھولیں۔
              </li>
              <li>
                نیچے <strong>اکاؤنٹ ڈیلیٹ کریں</strong> پر ٹیپ کریں، DELETE لکھیں اور تصدیق کریں۔
              </li>
            </ol>
          </>
        ),
      },
      {
        id: 'without-the-app',
        title: 'ایپ کے بغیر درخواست',
        body: (
          <>
            <p>
              اگر ایپ آپ کے پاس نہیں، تو اُسی ای میل ایڈریس سے جس سے آپ سائن اِن کرتے ہیں، {email} پر
              &quot;Delete my Salah360 account&quot; کے عنوان سے ای میل بھیجیں۔
            </p>
            <p>ہم تصدیق کریں گے کہ ای میل اکاؤنٹ کے مالک کی ہے، اور 7 دن کے اندر اکاؤنٹ ڈیلیٹ کر کے آپ کو اطلاع دیں گے۔</p>
          </>
        ),
      },
      {
        id: 'what-is-deleted',
        title: 'کیا ڈیلیٹ ہوتا ہے',
        body: (
          <ul>
            <li>آپ کا پروفائل: نام، ای میل، پتہ اور سائن اِن کی تفصیلات۔</li>
            <li>وہ مساجد جنہیں آپ فالو کرتے ہیں، اور آپ کے نوٹیفکیشن ڈیوائسز۔</li>
            <li>
              اگر آپ کسی تصدیق شدہ مسجد کے ایڈمن ہیں تو وہ مسجد بھی، اس کے نماز کے اوقات، پروگرام، جنازہ اطلاعات اور تصاویر
              سمیت۔
            </li>
          </ul>
        ),
      },
      {
        id: 'timing',
        title: 'کب اور کیا باقی رہتا ہے',
        body: (
          <>
            <p>
              درخواست کے بعد <strong>48 گھنٹے</strong> ہوتے ہیں جن میں آپ ایپ سے ڈیلیشن منسوخ کر سکتے ہیں۔ اس کے بعد سب کچھ
              مستقل طور پر ڈیلیٹ ہو جاتا ہے۔
            </p>
            <p>
              آپ کی بھیجی گئی رپورٹس اور کریش رپورٹس آپ کے نام کے بغیر رہتی ہیں (کریش رپورٹس 90 دن میں خود ختم ہو جاتی
              ہیں)۔ سیکیورٹی لاگز قانونی تقاضوں کے مطابق محدود مدت تک رکھے جا سکتے ہیں۔
            </p>
          </>
        ),
      },
    ];
  }

  return [
    {
      id: 'in-the-app',
      title: 'Delete your account in the app',
      body: (
        <>
          <p>The quickest way is inside the app:</p>
          <ol>
            <li>Open Salah360 and sign in.</li>
            <li>
              Open the <strong>Profile</strong> tab (masjid admins: the <strong>Settings</strong> tab).
            </li>
            <li>
              Tap <strong>Delete account</strong> at the bottom, type DELETE and confirm.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'without-the-app',
      title: 'Request deletion without the app',
      body: (
        <>
          <p>
            If you no longer have the app, email {email} with the subject &quot;Delete my Salah360 account&quot;, from the
            same email address you sign in with.
          </p>
          <p>We confirm the request comes from the account&apos;s owner, delete the account within 7 days, and let you know.</p>
        </>
      ),
    },
    {
      id: 'what-is-deleted',
      title: 'What gets deleted',
      body: (
        <ul>
          <li>Your profile: name, email, address and sign-in details.</li>
          <li>The masjids you follow, and your notification devices.</li>
          <li>
            If you are the verified admin of a masjid: that masjid too, with its prayer times, events, janazah alerts and
            photos.
          </li>
        </ul>
      ),
    },
    {
      id: 'timing',
      title: 'When, and what is kept',
      body: (
        <>
          <p>
            After a request you have <strong>48 hours</strong> to cancel it from the app. After that, everything above is
            permanently deleted.
          </p>
          <p>
            Reports you sent and crash reports stay without your name attached (crash reports are removed automatically after
            90 days). Security logs may be kept for a limited time where the law requires it.
          </p>
        </>
      ),
    },
  ];
}
