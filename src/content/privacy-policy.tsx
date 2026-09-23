import Link from 'next/link';

import type { LegalSection } from '@/components/legal/legal-document';
import { localizePath, type Lang } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

/**
 * Salah360 Privacy Policy, in English and Urdu. Written from what the app, backend and
 * database actually do (see ../salah360, ../backend, ../supabase). Update both languages
 * whenever data handling changes, and bump PRIVACY_LAST_UPDATED.
 */
export const PRIVACY_LAST_UPDATED: Record<Lang, string> = {
  en: 'September 23, 2026',
  ur: '23 ستمبر 2026',
};

export function getPrivacySections(lang: Lang): readonly LegalSection[] {
  const email = <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>;
  const contactHref = localizePath('/contact', lang);

  if (lang === 'ur') {
    return [
      {
        id: 'overview',
        title: 'خلاصہ',
        body: (
          <>
            <p>
              Salah360 مسلمانوں کو قریبی مساجد تلاش کرنے، ان کے نماز کے اوقات دیکھنے اور ان سے جڑے رہنے میں مدد دیتا ہے۔
              یہ پالیسی بتاتی ہے کہ Salah360 موبائل ایپ اور یہ ویب سائٹ کیا معلومات جمع کرتی ہیں، کیوں، یہ کن کے ساتھ
              شیئر ہوتی ہیں، اور آپ کے پاس کیا اختیارات ہیں۔
            </p>
            <p>مختصراً:</p>
            <ul>
              <li>ہم صرف وہی معلومات جمع کرتے ہیں جو Salah360 چلانے کے لیے ضروری ہیں۔</li>
              <li>
                <strong>ہم آپ کی معلومات کبھی نہیں بیچتے</strong>، اور Salah360 میں کوئی اشتہارات یا ایڈورٹائزنگ ٹریکرز
                موجود نہیں۔
              </li>
              <li>
                لوکیشن اختیاری ہے، صرف ایپ استعمال کرتے وقت لی جاتی ہے، اور آپ کہاں کہاں گئے اس کی کوئی تاریخ محفوظ نہیں
                کی جاتی۔
              </li>
              <li>آپ کسی بھی وقت ایپ کے اندر سے اپنا اکاؤنٹ حذف کر سکتے ہیں۔</li>
            </ul>
          </>
        ),
      },
      {
        id: 'information-we-collect',
        title: 'ہم کیا معلومات جمع کرتے ہیں',
        body: (
          <>
            <h3>جب آپ اکاؤنٹ بناتے ہیں</h3>
            <ul>
              <li>
                <strong>نام اور ای میل ایڈریس۔</strong> اگر آپ گوگل سے سائن اِن کرتے ہیں تو ہمیں آپ کا نام اور ای میل
                ایڈریس آپ کے گوگل اکاؤنٹ سے ملتا ہے۔
              </li>
              <li>
                <strong>پاس ورڈ</strong>، اگر آپ ای میل سے سائن اپ کرتے ہیں۔ یہ ہمارے آتھینٹیکیشن پرووائیڈر کے پاس محفوظ
                طریقے سے رکھا جاتا ہے، اور ہم اسے کبھی نہیں دیکھ سکتے۔
              </li>
              <li>
                <strong>پتہ</strong> جو آپ سائن اپ کے وقت منتخب کرتے ہیں (پتہ، شہر، ملک، پوسٹل کوڈ اور اس کے نقشے کے
                کوآرڈینیٹس)۔
              </li>
              <li>
                <strong>ای میل تصدیقی کوڈز۔</strong> ہم انہیں صرف محفوظ (hashed) شکل میں رکھتے ہیں، اور یہ تھوڑی دیر بعد
                ختم ہو جاتے ہیں۔
              </li>
            </ul>
            <p>
              آپ بغیر اکاؤنٹ کے بطور مہمان بھی Salah360 استعمال کر سکتے ہیں۔ مہمان صارفین ہمیں کوئی اکاؤنٹ معلومات نہیں
              دیتے۔
            </p>

            <h3>جب آپ ایپ استعمال کرتے ہیں</h3>
            <ul>
              <li>
                <strong>لوکیشن</strong>، صرف اگر آپ اجازت دیں اور صرف جب ایپ کھلی ہو۔ ہم اسے نقشہ مرکز میں لانے، آپ کے
                قریب مساجد اور پروگرامز تلاش کرنے، اور آپ کی جگہ کے آج کے نماز کے اوقات کا حساب لگانے کے لیے استعمال
                کرتے ہیں۔
              </li>
              <li>
                <strong>وہ مساجد جو آپ فالو کرتے ہیں</strong>، تاکہ ہم انہیں My Masjids میں دکھا سکیں اور آپ کو ان کی
                اپڈیٹس بھیج سکیں۔
              </li>
              <li>
                <strong>ترجیحات</strong>، جیسے آپ کی زبان، تھیم اور نماز کے حساب کی ترتیب۔ ان میں سے زیادہ تر آپ کی
                ڈیوائس پر ہی رہتی ہیں۔ اگر آپ سائن اِن ہیں، تو آپ کی زبان کا انتخاب آپ کے اکاؤنٹ میں بھی محفوظ ہوتا ہے
                تاکہ یہ آپ کے ساتھ دوسری ڈیوائسز تک جائے۔
              </li>
              <li>
                <strong>اطلاعات کی تفصیلات</strong>، اگر آپ اطلاعات آن کرتے ہیں: ایک پش ٹوکن، ایپ انسٹال ہوتے وقت بننے
                والا ایک رینڈم آئی ڈی، اور یہ کہ ڈیوائس Android ہے یا iOS۔ ہم بھیجی گئی اطلاعات کا ریکارڈ بھی رکھتے ہیں،
                تاکہ یہ یقینی بنایا جا سکے کہ وہ پہنچ گئیں۔
              </li>
            </ul>

            <h3>اگر آپ مسجد ایڈمن ہیں</h3>
            <ul>
              <li>آپ کا نام، ای میل، اور آپ کی مسجد کا نام اور پتہ۔</li>
              <li>
                <strong>مسجد کی ایک تصویر اور فون نمبر</strong>، جو آپ مسجد کی تصدیق کے لیے بھیجتے ہیں۔ یہ صرف درخواست
                کا جائزہ لینے والی Salah360 ٹیم دیکھتی ہے، اور ایپ میں کبھی نہیں دکھائی جاتیں۔
              </li>
              <li>
                وہ سب کچھ جو آپ اپنی مسجد کے لیے شائع کرتے ہیں: نماز کے اوقات، کھلی یا بند حالت، پروگرامز (بشمول تصاویر
                اور مقررین کے نام و تصاویر)، اور نمازِ جنازہ کی اطلاعات۔
              </li>
            </ul>

            <h3>جب آپ یہ ویب سائٹ دیکھتے ہیں</h3>
            <p>
              یہ ویب سائٹ کوئی اینالیٹکس، ایڈورٹائزنگ کوکیز یا ٹریکنگ استعمال نہیں کرتی۔ یہ آپ کی تھیم اور زبان کا
              انتخاب صرف آپ کے اپنے براؤزر کے اسٹوریج میں یاد رکھتی ہے، اور یہ معلومات آپ کی ڈیوائس سے باہر کبھی نہیں
              جاتیں۔
            </p>
          </>
        ),
      },
      {
        id: 'how-we-use-it',
        title: 'ہم آپ کی معلومات کیسے استعمال کرتے ہیں',
        body: (
          <>
            <p>ہم آپ کی معلومات مندرجہ ذیل کاموں کے لیے استعمال کرتے ہیں:</p>
            <ul>
              <li>آپ کا اکاؤنٹ بنانا اور محفوظ رکھنا، اور آپ کا ای میل تصدیق کرنا؛</li>
              <li>
                آپ کے قریب مساجد، نماز کے اوقات اور پروگرامز دکھانا، اور آپ کی جگہ کے لیے نماز کے اوقات کا حساب لگانا؛
              </li>
              <li>
                آپ کی منتخب کردہ اطلاعات بھیجنا: نماز کے اوقات میں تبدیلی، پروگرامز، یاد دہانیاں اور نمازِ جنازہ کی
                اطلاعات؛
              </li>
              <li>مسجد کی تصدیقی درخواستوں کا جائزہ لینا، تاکہ لوگ تصدیق شدہ مساجد پر بھروسہ کر سکیں؛</li>
              <li>ضروری ای میلز بھیجنا، جیسے تصدیقی کوڈز اور اکاؤنٹ حذف ہونے کی تصدیق؛</li>
              <li>Salah360 کو چلتا، محفوظ اور بدسلوکی سے پاک رکھنا۔</li>
            </ul>
            <p>ہم آپ کی معلومات اشتہارات کے لیے استعمال نہیں کرتے، اور نہ ہی کوئی مارکیٹنگ پروفائل بناتے ہیں۔</p>
          </>
        ),
      },
      {
        id: 'what-others-can-see',
        title: 'دوسرے لوگ کیا دیکھ سکتے ہیں',
        body: (
          <ul>
            <li>
              <strong>آپ کا اکاؤنٹ نجی ہے۔</strong> دوسرے صارفین آپ کا نام، ای میل، پتہ، یا آپ کن مساجد کو فالو کرتے ہیں
              یہ نہیں دیکھ سکتے۔
            </li>
            <li>
              ایپ مسجد ایڈمن کو صرف اتنا دکھاتی ہے کہ ان کی مسجد کے <strong>کتنے</strong> فالورز ہیں، وہ کون ہیں یہ
              نہیں۔
            </li>
            <li>
              <strong>مسجد کی معلومات عوامی ہیں</strong>، Salah360 استعمال کرنے والے ہر شخص کے لیے: مسجد کا نام، پتہ،
              نماز کے اوقات، کھلی حالت، پروگرامز اور نمازِ جنازہ کی اطلاعات۔ نمازِ جنازہ کی اطلاع میں میت کا نام، کسی
              رشتہ دار کا نام، تصویر، اور نمازِ جنازہ کا وقت و مقام شامل ہو سکتا ہے۔ مسجد ایڈمنز کو یہ صرف خاندان کی
              اجازت سے شائع کرنی چاہیے۔
            </li>
          </ul>
        ),
      },
      {
        id: 'sharing',
        title: 'وہ سروسز جن کے ساتھ ہم معلومات شیئر کرتے ہیں',
        body: (
          <>
            <p>
              <strong>ہم آپ کی معلومات نہ بیچتے ہیں نہ کرائے پر دیتے ہیں۔</strong> ہم انہیں صرف ان سروسز کے ساتھ شیئر
              کرتے ہیں جو Salah360 چلانے میں مدد دیتی ہیں، اور صرف اتنی جتنی انہیں ضرورت ہو:
            </p>
            <ul>
              <li>
                <strong>Supabase</strong>: ہمارا ڈیٹا بیس، سائن اِن اور فائل اسٹوریج فراہم کنندہ۔
              </li>
              <li>
                <strong>Google</strong>: گوگل سائن اِن (اگر آپ استعمال کریں)، نقشے کے لیے Google Maps، پتہ تلاش کرنے کے
                لیے Google Places، اور ای میلز بھیجنے کے لیے Gmail۔
              </li>
              <li>
                <strong>Expo، Google اور Apple کی پش سروسز</strong>: آپ کے فون تک اطلاعات پہنچانے کے لیے۔
              </li>
              <li>
                <strong>AlAdhan</strong>: ایک اسلامی نماز اوقات سروس۔ ہم آپ کی جگہ کے لیے آج کے نماز کے اوقات کا حساب
                لگانے کے لیے اسے آپ کے کوآرڈینیٹس بھیجتے ہیں۔
              </li>
            </ul>
            <p>ہم قانون کی ضرورت پر، یا Salah360 کے صارفین یا عوام کی حفاظت کے لیے بھی معلومات شیئر کر سکتے ہیں۔</p>
          </>
        ),
      },
      {
        id: 'retention-and-deletion',
        title: 'ہم معلومات کب تک رکھتے ہیں، اور اکاؤنٹ حذف کرنا',
        body: (
          <>
            <p>
              جب تک آپ کا اکاؤنٹ موجود ہے، یا جب تک ہمیں Salah360 فراہم کرنے کے لیے ضرورت ہو، ہم آپ کی معلومات رکھتے
              ہیں۔
            </p>
            <p>
              <strong>آپ ایپ میں، سیٹنگز کے تحت، اپنا اکاؤنٹ حذف کر سکتے ہیں۔</strong> ہم درخواست کی تصدیق کے لیے آپ کو
              ای میل کرتے ہیں، اور اس کے بعد آپ کے پاس ارادہ بدلنے کے لیے 48 گھنٹے ہوتے ہیں۔ اس کے بعد، آپ کی پروفائل،
              فالوز اور محفوظ کردہ ترتیبات مستقل طور پر حذف کر دی جاتی ہیں۔
            </p>
            <p>
              اگر آپ کسی مسجد کے تصدیق شدہ ایڈمن ہیں، تو اپنا اکاؤنٹ حذف کرنے سے وہ مسجد، اس کے نماز کے اوقات، پروگرامز
              اور نمازِ جنازہ کی اطلاعات، اور ہر فالور کا اس سے تعلق بھی مستقل طور پر حذف ہو جاتا ہے۔
            </p>
            <p>تلاش یا نماز کے وقت کے حساب کے لیے استعمال ہونے والی لوکیشن درخواست کے بعد محفوظ نہیں رکھی جاتی۔</p>
          </>
        ),
      },
      {
        id: 'your-choices',
        title: 'آپ کے اختیارات اور حقوق',
        body: (
          <ul>
            <li>لوکیشن اور اطلاعات اختیاری ہیں۔ آپ انہیں کسی بھی وقت اپنے فون کی سیٹنگز میں بند کر سکتے ہیں۔</li>
            <li>آپ کسی بھی وقت کسی مسجد کو اَن فالو کر سکتے ہیں۔</li>
            <li>آپ بغیر اکاؤنٹ کے بطور مہمان Salah360 استعمال کر سکتے ہیں۔</li>
            <li>
              آپ ہم سے اپنی معلومات کی کاپی، ان کی تصحیح، یا انہیں حذف کرنے کی درخواست {email} پر لکھ کر کر سکتے ہیں۔
            </li>
          </ul>
        ),
      },
      {
        id: 'security',
        title: 'سیکیورٹی',
        body: (
          <p>
            ہم انکرپٹڈ کنکشنز، اپنے ڈیٹا بیس میں ایسے رسائی قوانین جو لوگوں کو صرف وہی دیکھنے دیں جس کی انہیں اجازت ہے،
            اور محفوظ (hashed) پاس ورڈز و کوڈز استعمال کرتے ہیں۔ کوئی نظام مکمل طور پر محفوظ نہیں ہوتا، لیکن ہم آپ کی
            معلومات کی حفاظت کے لیے پوری کوشش کرتے ہیں، اور اگر کوئی مسئلہ آپ کو متاثر کرے تو ہم آپ کو بتائیں گے۔
          </p>
        ),
      },
      {
        id: 'children',
        title: 'بچے',
        body: (
          <p>
            Salah360 13 سال سے کم عمر بچوں کے لیے نہیں بنایا گیا، اور ہم جان بوجھ کر ان کی ذاتی معلومات جمع نہیں کرتے۔
            اگر آپ سمجھتے ہیں کہ کسی بچے نے ہمیں ذاتی معلومات دی ہیں، تو براہِ کرم ہم سے رابطہ کریں اور ہم انہیں حذف کر
            دیں گے۔
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'اس پالیسی میں تبدیلیاں',
        body: (
          <p>
            Salah360 کے بڑھنے کے ساتھ ہم اس پالیسی کو اپڈیٹ کر سکتے ہیں۔ ایسا کرنے پر، ہم اس صفحے کے اوپر دی گئی تاریخ
            تبدیل کر دیں گے۔ اگر تبدیلی اہم ہو، تو ہم آپ کو دوسرے طریقے سے بھی بتائیں گے، مثلاً ایپ میں یا ای میل کے
            ذریعے۔
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'ہم سے رابطہ کریں',
        body: (
          <p>
            اپنی رازداری کے بارے میں سوال ہے؟ {email} پر لکھیں، یا <Link href={contactHref}>رابطہ کے صفحے</Link> کا
            استعمال کریں۔ Salah360 کی بنیاد {siteConfig.founder} نے رکھی اور وہی اسے چلاتے ہیں۔
          </p>
        ),
      },
    ];
  }

  return [
    {
      id: 'overview',
      title: 'Overview',
      body: (
        <>
          <p>
            Salah360 helps Muslims find nearby Masjids, see their prayer times and stay connected with them. This policy
            explains what information the Salah360 mobile app and this website collect, why, who it is shared with, and
            the choices you have.
          </p>
          <p>In short:</p>
          <ul>
            <li>We only collect what we need to run Salah360.</li>
            <li>
              <strong>We never sell your information</strong>, and there are no ads or advertising trackers in Salah360.
            </li>
            <li>
              Location is optional, used only while you use the app, and not stored as a history of where you have been.
            </li>
            <li>You can delete your account from inside the app at any time.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      body: (
        <>
          <h3>When you create an account</h3>
          <ul>
            <li>
              <strong>Name and email address.</strong> If you sign in with Google, we receive your name and email
              address from your Google account.
            </li>
            <li>
              <strong>Password</strong>, if you sign up with email. It is stored securely by our authentication
              provider, and we can never see it.
            </li>
            <li>
              <strong>Address</strong> you choose at sign-up (the address, city, country, postal code and its map
              coordinates).
            </li>
            <li>
              <strong>Email verification codes.</strong> We store these only in a protected (hashed) form, and they
              expire after a short time.
            </li>
          </ul>
          <p>
            You can also browse Salah360 as a guest, without an account. Guests don’t give us any account information.
          </p>

          <h3>When you use the app</h3>
          <ul>
            <li>
              <strong>Location</strong>, only if you allow it and only while the app is open. We use it to centre the
              map, find Masjids and events near you, and calculate today’s prayer times for where you are.
            </li>
            <li>
              <strong>Masjids you follow</strong>, so we can show them in My Masjids and send you their updates.
            </li>
            <li>
              <strong>Preferences</strong>, such as your language, theme and prayer calculation setting. Most of these
              stay on your device. If you are signed in, your language choice is also saved to your account so it
              follows you to other devices.
            </li>
            <li>
              <strong>Notification details</strong>, if you turn notifications on: a push token, a random ID created
              when the app is installed, and whether the device is Android or iOS. We also keep a record of the
              notifications we send, so we can make sure they are delivered.
            </li>
          </ul>

          <h3>If you are a Masjid Admin</h3>
          <ul>
            <li>Your name, email, and your Masjid’s name and address.</li>
            <li>
              <strong>A photo of the Masjid and a phone number</strong>, which you send to verify the Masjid. These are
              seen only by the Salah360 team reviewing the request, and are never shown in the app.
            </li>
            <li>
              Everything you publish for your Masjid: prayer times, open or closed status, events (including images and
              speaker names and photos), and Janazah alerts.
            </li>
          </ul>

          <h3>When you visit this website</h3>
          <p>
            This website does not use analytics, advertising cookies or tracking. It remembers your theme and language
            choice in your own browser’s storage, and that information never leaves your device.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use-it',
      title: 'How we use your information',
      body: (
        <>
          <p>We use your information to:</p>
          <ul>
            <li>create and secure your account, and verify your email address;</li>
            <li>show Masjids, prayer times and events near you, and calculate prayer times for your location;</li>
            <li>send the notifications you choose: prayer time changes, events, reminders and Janazah alerts;</li>
            <li>review Masjid verification requests, so people can trust verified Masjids;</li>
            <li>send important emails, such as verification codes and account deletion confirmations;</li>
            <li>keep Salah360 working, secure and free of abuse.</li>
          </ul>
          <p>We do not use your information for advertising, and we do not build marketing profiles.</p>
        </>
      ),
    },
    {
      id: 'what-others-can-see',
      title: 'What other people can see',
      body: (
        <ul>
          <li>
            <strong>Your account is private.</strong> Other users can’t see your name, email, address or which Masjids
            you follow.
          </li>
          <li>
            The app shows a Masjid Admin only <strong>how many</strong> followers their Masjid has, not who they are.
          </li>
          <li>
            <strong>Masjid information is public</strong> to anyone using Salah360: the Masjid’s name, address, prayer
            times, open status, events and Janazah alerts. A Janazah alert can include the name of the deceased, a
            family member’s name, a photo, and the time and place of the Janazah. Masjid Admins should publish these
            only with the family’s permission.
          </li>
        </ul>
      ),
    },
    {
      id: 'sharing',
      title: 'Services we share information with',
      body: (
        <>
          <p>
            <strong>We do not sell or rent your information.</strong> We share it only with the services that help us
            run Salah360, and only what they need:
          </p>
          <ul>
            <li>
              <strong>Supabase</strong>: our database, sign-in and file storage provider.
            </li>
            <li>
              <strong>Google</strong>: Google Sign-In (if you use it), Google Maps for the map, Google Places for
              address search, and Gmail for sending our emails.
            </li>
            <li>
              <strong>Expo, Google and Apple push services</strong>: to deliver notifications to your phone.
            </li>
            <li>
              <strong>AlAdhan</strong>: an Islamic prayer-times service. We send it your coordinates to calculate
              today’s prayer times for your location.
            </li>
          </ul>
          <p>
            We may also share information if the law requires it, or to protect the safety of Salah360’s users or the
            public.
          </p>
        </>
      ),
    },
    {
      id: 'retention-and-deletion',
      title: 'How long we keep it, and deleting your account',
      body: (
        <>
          <p>We keep your information while you have an account, or for as long as we need it to provide Salah360.</p>
          <p>
            <strong>You can delete your account in the app</strong>, under Settings. We email you to confirm the
            request, and you then have 48 hours to change your mind. After that, your profile, follows and saved
            settings are permanently deleted.
          </p>
          <p>
            If you are the verified admin of a Masjid, deleting your account also permanently deletes that Masjid, its
            prayer times, events and Janazah alerts, and every follower’s connection to it.
          </p>
          <p>Location used for a search or a prayer time calculation is not kept after the request.</p>
        </>
      ),
    },
    {
      id: 'your-choices',
      title: 'Your choices and rights',
      body: (
        <ul>
          <li>Location and notifications are optional. You can turn them off at any time in your phone’s settings.</li>
          <li>You can unfollow a Masjid at any time.</li>
          <li>You can use Salah360 as a guest, without an account.</li>
          <li>
            You can ask us for a copy of your information, ask us to correct it, or ask us to delete it, by writing to{' '}
            {email}.
          </li>
        </ul>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      body: (
        <p>
          We use encrypted connections, access rules in our database that only let people see what they are allowed to
          see, and hashed passwords and codes. No system is perfectly secure, but we work hard to protect your
          information, and we will tell you if a problem affects you.
        </p>
      ),
    },
    {
      id: 'children',
      title: 'Children',
      body: (
        <p>
          Salah360 is not directed at children under 13, and we do not knowingly collect their personal information. If
          you think a child has given us personal information, please contact us and we will delete it.
        </p>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <p>
          We may update this policy as Salah360 grows. When we do, we will change the date at the top of this page. If a
          change is significant, we will also let you know, for example in the app or by email.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <p>
          Questions about your privacy? Write to {email}, or use the <Link href={contactHref}>contact page</Link>.
          Salah360 was founded and is run by {siteConfig.founder}.
        </p>
      ),
    },
  ];
}
