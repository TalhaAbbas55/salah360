import Link from 'next/link';

import type { LegalSection } from '@/components/legal/legal-document';
import { localizePath, type Lang } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

/**
 * Salah360 Terms of Service, in English and Urdu: what the app's sign-up screens ask
 * people to accept ("Terms of Service" there, so the same name here). Written from what
 * the app actually does. Update both languages together and bump TERMS_LAST_UPDATED.
 *
 * Deliberately has no governing-law clause: which country's law applies is for the owner
 * to decide. Add it as its own section when that is settled.
 */
export const TERMS_LAST_UPDATED: Record<Lang, string> = {
  en: 'October 3, 2026',
  ur: '3 اکتوبر 2026',
};

export function getTermsSections(lang: Lang): readonly LegalSection[] {
  const email = <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>;
  const contactHref = localizePath('/contact', lang);
  const privacyHref = localizePath('/privacy', lang);
  const deleteAccountHref = localizePath('/delete-account', lang);

  if (lang === 'ur') {
    return [
      {
        id: 'agreement',
        title: 'یہ شرائط',
        body: (
          <>
            <p>
              یہ شرائط آپ اور Salah360 کے درمیان Salah360 موبائل ایپ اور اس ویب سائٹ کے استعمال کا معاہدہ ہیں۔ Salah360
              کے بانی اور منتظم {siteConfig.founder} ہیں۔
            </p>
            <p>
              اکاؤنٹ بنا کر، یا ایپ یا ویب سائٹ استعمال کر کے، آپ ان شرائط اور ہماری{' '}
              <Link href={privacyHref}>رازداری کی پالیسی</Link> سے اتفاق کرتے ہیں۔ اگر آپ متفق نہیں تو براہِ کرم
              Salah360 استعمال نہ کریں۔
            </p>
          </>
        ),
      },
      {
        id: 'the-service',
        title: 'Salah360 کیا ہے',
        body: (
          <>
            <p>
              Salah360 آپ کو قریبی مساجد تلاش کرنے، ان کے اذان اور جماعت کے اوقات دیکھنے، انہیں فالو کرنے، اور اوقات کی
              تبدیلی، پروگرامز اور نمازِ جنازہ کی اطلاعات پانے میں مدد دیتا ہے۔ مسجد ایڈمنز اسی ایپ سے اپنی مسجد کی
              معلومات شائع کرتے ہیں۔
            </p>
            <ul>
              <li>Salah360 مفت ہے۔ ہم اکاؤنٹ کے لیے کوئی رقم نہیں لیتے۔</li>
              <li>Salah360 کسی قسم کے عطیات یا ادائیگیاں وصول نہیں کرتا۔</li>
              <li>
                آپ بغیر اکاؤنٹ کے بطور مہمان براؤز کر سکتے ہیں۔ مسجد فالو کرنے اور اطلاعات پانے کے لیے اکاؤنٹ ضروری ہے۔
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'prayer-times',
        title: 'نماز کے اوقات اور ان کی درستگی',
        body: (
          <>
            <p>
              <strong>براہِ کرم یہ حصہ غور سے پڑھیں۔</strong> Salah360 ایک مددگار ذریعہ ہے، آپ کی مسجد کا متبادل نہیں۔
            </p>
            <ul>
              <li>
                <strong>اذان اور جماعت کے اوقات</strong> ہر مسجد کا ایڈمن خود شائع کرتا ہے۔ Salah360 انہیں جوں کا توں
                دکھاتا ہے اور ان کی جانچ نہیں کرتا۔ ایڈمن دیر سے اپڈیٹ کر سکتا ہے یا اس سے غلطی ہو سکتی ہے۔
              </li>
              <li>
                <strong>حساب سے نکالے گئے نماز کے اوقات</strong> آپ کی لوکیشن اور آپ کی منتخب کردہ حساب کی ترتیبات پر
                منحصر ہیں۔ یہ اندازے ہیں اور آپ کے علاقے میں رائج اوقات سے چند منٹ مختلف ہو سکتے ہیں۔
              </li>
              <li>
                <strong>قبلے کی سمت</strong> آپ کے فون کے سینسرز پر منحصر ہے، جو قریبی دھات یا برقی آلات سے متاثر ہو
                سکتے ہیں۔
              </li>
            </ul>
            <p>جہاں وقت اہم ہو، وہاں اپنی مسجد سے تصدیق کر لیں۔</p>
          </>
        ),
      },
      {
        id: 'your-account',
        title: 'آپ کا اکاؤنٹ',
        body: (
          <ul>
            <li>Salah360 استعمال کرنے کے لیے آپ کی عمر کم از کم 13 سال ہونی چاہیے۔</li>
            <li>درست معلومات دیں، اور ایسا ای میل ایڈریس استعمال کریں جو آپ کا اپنا ہو۔</li>
            <li>اپنا پاس ورڈ محفوظ رکھیں۔ آپ کے اکاؤنٹ سے ہونے والی ہر سرگرمی کے ذمہ دار آپ ہیں۔</li>
            <li>اگر آپ کو لگے کہ کسی اور نے آپ کا اکاؤنٹ استعمال کیا ہے تو ہمیں فوراً {email} پر بتائیں۔</li>
          </ul>
        ),
      },
      {
        id: 'masjid-admins',
        title: 'مسجد ایڈمنز',
        body: (
          <>
            <p>اگر آپ بطور مسجد ایڈمن سائن اپ کرتے ہیں تو آپ ان باتوں سے بھی اتفاق کرتے ہیں:</p>
            <ul>
              <li>
                <strong>آپ کو مسجد کی نمائندگی کا اختیار حاصل ہے۔</strong> صرف اسی مسجد کے لیے رجسٹر کریں جس کی انتظامیہ
                نے آپ کو یہ ذمہ داری دی ہو۔
              </li>
              <li>
                <strong>تصدیق۔</strong> کچھ بھی شائع کرنے سے پہلے آپ کی تصدیق ضروری ہے: واٹس ایپ کے ذریعے، مسجد کی گوگل
                میپس لسٹنگ پر درج نمبر پر، یا ایک تصویر اور فون نمبر بھیج کر جس کا Salah360 ٹیم جائزہ لیتی ہے۔ ہر مسجد
                کا ایک ہی تصدیق شدہ ایڈمن ہو سکتا ہے۔ ہم تصدیق سے انکار کر سکتے ہیں یا اسے واپس لے سکتے ہیں۔
              </li>
              <li>
                <strong>جو آپ شائع کرتے ہیں اس کے ذمہ دار آپ ہیں۔</strong> نماز کے اوقات درست رکھیں اور تبدیلی پر فوراً
                اپڈیٹ کریں، کیونکہ لوگ اپنی نماز کا وقت انہی کے مطابق طے کرتے ہیں۔
              </li>
              <li>
                <strong>تصاویر اور نام۔</strong> صرف وہی تصاویر شائع کریں جنہیں استعمال کرنے کا حق آپ کے پاس ہو، اور
                مقررین کے نام اور تصاویر ان کی اجازت سے۔
              </li>
              <li>
                <strong>نمازِ جنازہ کی اطلاعات</strong> صرف اہلِ خانہ کی اجازت سے شائع کریں، خصوصاً مرحوم کا نام، کسی
                رشتہ دار کا نام یا تصویر۔
              </li>
              <li>مسجد کی پروفائل کو غیر متعلقہ اشتہارات یا تجارتی تشہیر کے لیے استعمال نہ کریں۔</li>
            </ul>
          </>
        ),
      },
      {
        id: 'your-content',
        title: 'آپ کا مواد',
        body: (
          <>
            <p>
              جو کچھ آپ Salah360 پر شائع کرتے ہیں، جیسے نماز کے اوقات، پروگرامز، تصاویر اور اطلاعات، وہ آپ ہی کا رہتا
              ہے۔
            </p>
            <p>
              اسے شائع کر کے آپ Salah360 کو اجازت دیتے ہیں کہ ہم اسے محفوظ کریں، ایپ اور اس ویب سائٹ پر دکھائیں، اطلاعات
              میں بھیجیں اور شیئر کیے گئے لنکس میں دکھائیں، صرف اس حد تک جتنا Salah360 چلانے کے لیے ضروری ہو۔ یہ اجازت
              اس وقت ختم ہو جاتی ہے جب آپ وہ مواد یا اپنا اکاؤنٹ حذف کر دیں۔
            </p>
            <p>مسجد کی شائع کردہ معلومات Salah360 استعمال کرنے والے ہر شخص کو نظر آتی ہیں۔</p>
          </>
        ),
      },
      {
        id: 'acceptable-use',
        title: 'قابلِ قبول استعمال',
        body: (
          <>
            <p>Salah360 استعمال کرتے ہوئے آپ یہ نہیں کریں گے:</p>
            <ul>
              <li>
                غلط یا گمراہ کن معلومات شائع کرنا، یا کسی ایسی مسجد یا شخص کا روپ دھارنا جس کی آپ نمائندگی نہیں کرتے؛
              </li>
              <li>غیر قانونی، نفرت انگیز، ہراساں کرنے والا یا فحش مواد شائع کرنا؛</li>
              <li>کسی کی نجی معلومات اس کی اجازت کے بغیر شائع کرنا؛</li>
              <li>رپورٹ کرنے کی سہولت کا غلط استعمال، جیسے جان بوجھ کر جھوٹی رپورٹس بھیجنا؛</li>
              <li>ایپ یا ویب سائٹ سے خودکار طریقے سے بڑی مقدار میں ڈیٹا نکالنا؛</li>
              <li>Salah360 کے کام میں خلل ڈالنا، اس کی سیکیورٹی کو توڑنے کی کوشش کرنا، یا اسپیم بھیجنا۔</li>
            </ul>
          </>
        ),
      },
      {
        id: 'reports-and-removal',
        title: 'رپورٹ کرنا اور مواد ہٹانا',
        body: (
          <>
            <p>
              اگر آپ کو کوئی پروگرام، نمازِ جنازہ کی اطلاع یا مسجد غلط یا نامناسب لگے تو ایپ میں “رپورٹ” استعمال کریں۔
              Salah360 ٹیم ہر رپورٹ کا جائزہ لیتی ہے۔
            </p>
            <p>
              ہم ایسا مواد ہٹا سکتے ہیں جو ان شرائط کے خلاف ہو، اور ایسے اکاؤنٹ یا مسجد کی تصدیق معطل یا ختم کر سکتے ہیں
              جو بار بار یا سنگین خلاف ورزی کرے۔
            </p>
          </>
        ),
      },
      {
        id: 'notifications',
        title: 'اطلاعات',
        body: (
          <p>
            Salah360 وہی اطلاعات بھیجتا ہے جو آپ منتخب کرتے ہیں۔ ان کا پہنچنا آپ کے فون، اس کی ترتیبات اور آپ کے نیٹ ورک
            پر منحصر ہے، اس لیے کوئی اطلاع دیر سے آ سکتی ہے یا بالکل نہ آئے۔ صرف اطلاعات پر انحصار نہ کریں۔
          </p>
        ),
      },
      {
        id: 'third-party-services',
        title: 'دیگر سروسز',
        body: (
          <p>
            Salah360 دیگر کمپنیوں کی سروسز استعمال کرتا ہے، جیسے Google Maps، Google سائن اِن اور Google Play۔ جب آپ
            انہیں استعمال کرتے ہیں تو ان کی اپنی شرائط بھی لاگو ہوتی ہیں۔ ایپ آپ کو دوسری ایپس میں بھی لے جا سکتی ہے،
            مثلاً راستے کے لیے Google Maps یا پروگرام محفوظ کرنے کے لیے Google Calendar؛ وہ ہمارے اختیار میں نہیں۔
          </p>
        ),
      },
      {
        id: 'ownership',
        title: 'Salah360 کی ملکیت',
        body: (
          <p>
            Salah360 ایپ، یہ ویب سائٹ، Salah360 کا نام اور لوگو Salah360 کی ملکیت ہیں۔ ہم آپ کو انہیں ذاتی، غیر تجارتی
            استعمال کی اجازت دیتے ہیں۔ آپ انہیں کاپی، فروخت یا تبدیل نہیں کر سکتے، سوائے اس کے جس کی قانون اجازت دے۔
          </p>
        ),
      },
      {
        id: 'ending',
        title: 'استعمال ختم کرنا',
        body: (
          <>
            <p>
              آپ کسی بھی وقت Salah360 استعمال کرنا چھوڑ سکتے ہیں اور ایپ میں، سیٹنگز کے تحت، اپنا اکاؤنٹ حذف کر سکتے
              ہیں۔ حذف کرنے سے پہلے آپ کے پاس ارادہ بدلنے کے لیے 48 گھنٹے ہوتے ہیں۔ ایپ آپ کے پاس نہیں تو{' '}
              <Link href={deleteAccountHref}>اپنا اکاؤنٹ ڈیلیٹ کریں</Link> دیکھیں۔
            </p>
            <p>
              اگر آپ کسی مسجد کے تصدیق شدہ ایڈمن ہیں تو اپنا اکاؤنٹ حذف کرنے سے وہ مسجد، اس کے نماز کے اوقات، پروگرامز
              اور اطلاعات بھی مستقل طور پر حذف ہو جاتی ہیں۔
            </p>
            <p>اگر آپ ان شرائط کی خلاف ورزی کریں تو ہم آپ کا اکاؤنٹ معطل یا ختم کر سکتے ہیں۔</p>
          </>
        ),
      },
      {
        id: 'disclaimers',
        title: 'کوئی ضمانت نہیں',
        body: (
          <p>
            Salah360 “جیسا ہے” کی بنیاد پر فراہم کیا جاتا ہے۔ ہم اسے درست اور دستیاب رکھنے کی پوری کوشش کرتے ہیں، لیکن
            یہ ضمانت نہیں دیتے کہ یہ ہمیشہ دستیاب رہے گا، غلطیوں سے پاک ہوگا، یا اس میں دکھائی گئی ہر معلومات درست اور
            تازہ ہوگی۔
          </p>
        ),
      },
      {
        id: 'liability',
        title: 'ذمہ داری کی حد',
        body: (
          <>
            <p>
              قانون جس حد تک اجازت دیتا ہے، Salah360 اور اس کے بانی Salah360 کے استعمال سے، یا اسے استعمال نہ کر پانے سے
              ہونے والے کسی نقصان کے ذمہ دار نہیں۔ اس میں وہ صورتیں بھی شامل ہیں جہاں کوئی وقت غلط دکھایا گیا، کوئی
              اطلاع نہ پہنچی، یا کسی مسجد ایڈمن نے کوئی غلط بات شائع کی۔
            </p>
            <p>ان شرائط کی کوئی بات ایسی ذمہ داری کو ختم نہیں کرتی جسے قانون کے تحت ختم نہیں کیا جا سکتا۔</p>
          </>
        ),
      },
      {
        id: 'changes',
        title: 'ان شرائط میں تبدیلی',
        body: (
          <p>
            Salah360 کے بڑھنے کے ساتھ ہم ان شرائط کو اپڈیٹ کر سکتے ہیں۔ ایسا ہونے پر ہم اس صفحے کے اوپر کی تاریخ بدل دیں
            گے۔ اگر کوئی تبدیلی اہم ہو تو ہم آپ کو بھی بتائیں گے، مثلاً ایپ میں یا ای میل کے ذریعے۔ تبدیلی کے بعد
            Salah360 استعمال کرتے رہنے کا مطلب ہے کہ آپ نئی شرائط سے متفق ہیں۔
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'ہم سے رابطہ کریں',
        body: (
          <p>
            ان شرائط کے بارے میں سوال ہے؟ {email} پر لکھیں، یا <Link href={contactHref}>رابطہ کے صفحے</Link> کا استعمال
            کریں۔
          </p>
        ),
      },
    ];
  }

  return [
    {
      id: 'agreement',
      title: 'These terms',
      body: (
        <>
          <p>
            These terms are the agreement between you and Salah360 for using the Salah360 mobile app and this website.
            Salah360 was founded and is run by {siteConfig.founder}.
          </p>
          <p>
            By creating an account, or by using the app or the website, you agree to these terms and to our{' '}
            <Link href={privacyHref}>Privacy Policy</Link>. If you don’t agree, please don’t use Salah360.
          </p>
        </>
      ),
    },
    {
      id: 'the-service',
      title: 'What Salah360 is',
      body: (
        <>
          <p>
            Salah360 helps you find nearby Masjids, see their Azan and Jamaat times, follow them, and get alerts for
            time changes, events and Janazah. Masjid Admins use the same app to publish their Masjid’s information.
          </p>
          <ul>
            <li>Salah360 is free. We don’t charge for an account.</li>
            <li>Salah360 does not collect donations or payments of any kind.</li>
            <li>
              You can browse as a guest, without an account. Following a Masjid and getting its alerts needs an account.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'prayer-times',
      title: 'Prayer times and their accuracy',
      body: (
        <>
          <p>
            <strong>Please read this part carefully.</strong> Salah360 is an aid, not a replacement for your Masjid.
          </p>
          <ul>
            <li>
              <strong>Azan and Jamaat times</strong> are published by each Masjid’s own admin. Salah360 shows them as
              published and does not check them. An admin may update late, or make a mistake.
            </li>
            <li>
              <strong>Calculated prayer times</strong> depend on your location and the calculation settings you choose.
              They are estimates, and can differ by a few minutes from the times followed in your area.
            </li>
            <li>
              <strong>The Qibla direction</strong> depends on your phone’s sensors, which nearby metal or electronics
              can throw off.
            </li>
          </ul>
          <p>Where the time matters, confirm it with your Masjid.</p>
        </>
      ),
    },
    {
      id: 'your-account',
      title: 'Your account',
      body: (
        <ul>
          <li>You must be at least 13 years old to use Salah360.</li>
          <li>Give accurate information, and use an email address that is yours.</li>
          <li>Keep your password safe. You are responsible for what is done from your account.</li>
          <li>If you think someone else has used your account, tell us straight away at {email}.</li>
        </ul>
      ),
    },
    {
      id: 'masjid-admins',
      title: 'Masjid Admins',
      body: (
        <>
          <p>If you sign up as a Masjid Admin, you also agree to the following:</p>
          <ul>
            <li>
              <strong>You are authorised to represent the Masjid.</strong> Register only for a Masjid whose management
              has given you that responsibility.
            </li>
            <li>
              <strong>Verification.</strong> You must be verified before you can publish anything: over WhatsApp, on the
              number shown on the Masjid’s Google Maps listing, or by sending a photo and phone number that the Salah360
              team reviews. A Masjid can have only one verified admin. We may refuse verification, or withdraw it.
            </li>
            <li>
              <strong>You are responsible for what you publish.</strong> Keep prayer times accurate and update them as
              soon as they change, because people plan their Salah around them.
            </li>
            <li>
              <strong>Images and names.</strong> Publish only images you have the right to use, and speakers’ names and
              photos only with their permission.
            </li>
            <li>
              <strong>Janazah alerts.</strong> Publish them only with the family’s permission, especially the name of
              the deceased, a relative’s name or a photo.
            </li>
            <li>Don’t use a Masjid’s profile for unrelated advertising or commercial promotion.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'your-content',
      title: 'Your content',
      body: (
        <>
          <p>What you publish on Salah360, such as prayer times, events, images and alerts, stays yours.</p>
          <p>
            By publishing it, you give Salah360 permission to store it, show it in the app and on this website, send it
            in notifications and show it on shared links, only as far as is needed to run Salah360. That permission ends
            when you delete the content or your account.
          </p>
          <p>Information a Masjid publishes is visible to anyone using Salah360.</p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: (
        <>
          <p>When you use Salah360, you will not:</p>
          <ul>
            <li>publish false or misleading information, or pretend to be a Masjid or a person you don’t represent;</li>
            <li>publish anything unlawful, hateful, harassing or obscene;</li>
            <li>publish someone’s private information without their permission;</li>
            <li>misuse the report feature, for example by sending reports you know to be false;</li>
            <li>collect data from the app or website in bulk by automated means;</li>
            <li>disrupt Salah360, try to break its security, or send spam.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'reports-and-removal',
      title: 'Reporting and removing content',
      body: (
        <>
          <p>
            If an event, a Janazah alert or a Masjid looks wrong or inappropriate, use “Report” in the app. The Salah360
            team reviews every report.
          </p>
          <p>
            We may remove content that breaks these terms, and suspend or end an account, or a Masjid’s verification,
            for repeated or serious breaches.
          </p>
        </>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      body: (
        <p>
          Salah360 sends the notifications you choose. Whether they arrive depends on your phone, its settings and your
          network, so a notification can be late or not arrive at all. Don’t rely on notifications alone.
        </p>
      ),
    },
    {
      id: 'third-party-services',
      title: 'Other services',
      body: (
        <p>
          Salah360 uses services from other companies, such as Google Maps, Google Sign-In and Google Play. When you use
          them, their own terms apply too. The app can also take you to other apps, for example Google Maps for
          directions or Google Calendar to save an event; we don’t control those.
        </p>
      ),
    },
    {
      id: 'ownership',
      title: 'What belongs to Salah360',
      body: (
        <p>
          The Salah360 app, this website, and the Salah360 name and logo belong to Salah360. We give you permission to
          use them for personal, non-commercial purposes. You may not copy, sell or modify them, except where the law
          allows it.
        </p>
      ),
    },
    {
      id: 'ending',
      title: 'Ending your use',
      body: (
        <>
          <p>
            You can stop using Salah360 at any time, and delete your account in the app, under Settings. You have 48
            hours to change your mind before it is deleted. No longer have the app? See{' '}
            <Link href={deleteAccountHref}>Delete your account</Link>.
          </p>
          <p>
            If you are the verified admin of a Masjid, deleting your account also permanently deletes that Masjid, its
            prayer times, events and alerts.
          </p>
          <p>We may suspend or end your account if you break these terms.</p>
        </>
      ),
    },
    {
      id: 'disclaimers',
      title: 'No guarantees',
      body: (
        <p>
          Salah360 is provided “as is”. We work hard to keep it accurate and available, but we don’t guarantee that it
          will always be available, free of errors, or that every piece of information shown in it is correct and up to
          date.
        </p>
      ),
    },
    {
      id: 'liability',
      title: 'Limits on our responsibility',
      body: (
        <>
          <p>
            As far as the law allows, Salah360 and its founder are not responsible for any loss that comes from using
            Salah360, or from not being able to use it. That includes cases where a time shown was wrong, a notification
            did not arrive, or a Masjid Admin published something incorrect.
          </p>
          <p>Nothing in these terms removes a responsibility that the law does not allow to be removed.</p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: (
        <p>
          We may update these terms as Salah360 grows. When we do, we will change the date at the top of this page. If a
          change is significant, we will also let you know, for example in the app or by email. Continuing to use
          Salah360 after a change means you accept the new terms.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <p>
          Questions about these terms? Write to {email}, or use the <Link href={contactHref}>contact page</Link>.
        </p>
      ),
    },
  ];
}
