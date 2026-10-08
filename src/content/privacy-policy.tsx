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
  en: 'October 3, 2026',
  ur: '3 اکتوبر 2026',
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
                قریب مساجد اور پروگرامز تلاش کرنے، اور آپ کی جگہ کے آج کے نماز کے اوقات اور قبلے کی سمت معلوم کرنے کے
                لیے استعمال کرتے ہیں۔
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
                <strong>آف لائن استعمال کے لیے ایک نقل۔</strong> تاکہ ایپ انٹرنیٹ کے بغیر بھی کھل سکے، یہ آپ کے فون پر
                اس کی ایک نقل رکھتی ہے جو آپ نے آخری بار دیکھا: آپ کی پروفائل، وہ مساجد جو آپ فالو کرتے ہیں، قریبی مساجد
                اور پروگرامز، اور وہ جگہ جہاں سے آپ نے آخری بار تلاش کی۔ یہ نقل آپ کی ڈیوائس سے باہر کبھی نہیں جاتی، اور
                اس کا وہ حصہ جو آپ کے اکاؤنٹ سے متعلق ہے سائن آؤٹ کرنے پر ہٹا دیا جاتا ہے۔
              </li>
              <li>
                <strong>اطلاعات کی تفصیلات</strong>، اگر آپ اطلاعات آن کرتے ہیں: ایک پش ٹوکن، ایپ انسٹال ہوتے وقت بننے
                والا ایک رینڈم آئی ڈی، اور یہ کہ ڈیوائس Android ہے یا iOS۔ ہم بھیجی گئی اطلاعات کا ریکارڈ بھی رکھتے ہیں،
                تاکہ یہ یقینی بنایا جا سکے کہ وہ پہنچ گئیں۔
              </li>
              <li>
                <strong>کریش رپورٹس۔</strong> اگر ایپ کی کوئی اسکرین خراب ہو جائے تو ایپ خرابی کی تکنیکی تفصیل، ایپ کا
                ورژن اور فون کا سسٹم ورژن ہمارے اپنے سرور پر بھیجتی ہے (سائن اِن ہوں تو اکاؤنٹ کے ساتھ)، تاکہ ہم مسئلہ
                ٹھیک کر سکیں۔ یہ 90 دن بعد خود بخود حذف ہو جاتی ہیں۔
              </li>
              <li>
                <strong>آپ کی بھیجی گئی رپورٹس</strong>، جب آپ کسی پروگرام، جنازہ اطلاع یا مسجد کو رپورٹ کرتے ہیں: وجہ
                اور آپ کی لکھی تفصیل۔ یہ صرف Salah360 ٹیم دیکھتی ہے؛ مسجد کو معلوم نہیں ہوتا کہ کس نے رپورٹ کی۔
              </li>
              <li>
                <strong>شرائط کی منظوری کا وقت</strong>، جب آپ سائن اَپ پر شرائطِ استعمال اور رازداری کی پالیسی قبول
                کرتے ہیں۔
              </li>
            </ul>

            <h3>اگر آپ مسجد ایڈمن ہیں</h3>
            <ul>
              <li>آپ کا نام، ای میل، اور آپ کی مسجد کا نام اور پتہ۔</li>
              <li>
                <strong>واٹس ایپ سے تصدیق۔</strong> یہ طریقہ پیش کرنے کے لیے ہم آپ کی مسجد کی عوامی گوگل میپس لسٹنگ سے
                اس کی قسم اور فون نمبر دیکھتے ہیں۔ اگر آپ یہ طریقہ منتخب کریں تو اس نمبر پر ایک واٹس ایپ پیغام بھیجا
                جاتا ہے جس میں آپ کی مسجد کا نام اور ایک بار استعمال ہونے والا تصدیقی لنک ہوتا ہے۔ لنک کے پیچھے کا صفحہ
                اس فون پر اسے کھولنے والے کو آپ کا نام اور مسجد کا نام دکھاتا ہے۔ ہم اس بات کا ریکارڈ رکھتے ہیں کہ پیغام
                کس نمبر پر گیا اور اس کی تصدیق ہوئی یا نہیں۔
              </li>
              <li>
                <strong>دستی تصدیق۔</strong> مسجد میں لی گئی ایک تصویر اور ایک فون نمبر، جو آپ اس کے بجائے بھیجتے ہیں۔
                یہ صرف درخواست کا جائزہ لینے والی Salah360 ٹیم دیکھتی ہے، اور ایپ میں کبھی نہیں دکھائے جاتے۔
              </li>
              <li>
                <strong>تصاویر۔</strong> ایپ صرف وہی تصاویر دیکھتی ہے جو آپ خود منتخب کرتے ہیں، تصدیق کی درخواست یا کسی
                پروگرام کے لیے۔ یہ آپ کی مسجد کے کیو آر کوڈ کی تصویر آپ کی گیلری میں محفوظ کر سکتی ہے، لیکن آپ کی گیلری
                پڑھ نہیں سکتی۔
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
            <ul>
              <li>
                <strong>رابطہ فارم۔</strong> جب آپ رابطہ کے صفحے سے ہمیں پیغام بھیجتے ہیں تو آپ کا نام (اگر آپ دیں)، ای
                میل ایڈریس، موضوع اور پیغام ہمارے سپورٹ اِن باکس میں ای میل کیے جاتے ہیں تاکہ ہم جواب دے سکیں۔ یہ ایپ کے
                ڈیٹا بیس میں شامل نہیں کیے جاتے۔
              </li>
              <li>
                <strong>شیئر کیے گئے لنکس اور کیو آر کوڈز۔</strong> جب آپ کسی مسجد، پروگرام یا نمازِ جنازہ کا شیئر کیا
                گیا لنک کھولتے ہیں، یا کسی مسجد کا کیو آر کوڈ اسکین کرتے ہیں، تو ویب سائٹ صرف آپ کو درست جگہ بھیجنے کے
                لیے دیکھتی ہے کہ آپ کی ڈیوائس اینڈرائیڈ فون ہے یا آئی فون۔ یہ اسے محفوظ نہیں کرتی۔ اس ویب سائٹ پر Google
                Play کا بٹن Google Play کو بتاتا ہے کہ آپ ہماری ویب سائٹ سے آئے ہیں اور، شیئر کیے گئے لنک کی صورت میں،
                وہ لنک کس مسجد، پروگرام یا اطلاع کا تھا، تاکہ ہم انسٹالز گن سکیں۔
              </li>
              <li>
                <strong>تکنیکی لاگز۔</strong> ہر ویب سائٹ اور ایپ کی طرح، ہمارے سرورز کو ہر درخواست کے ساتھ آپ کا آئی پی
                ایڈریس اور براؤزر یا ایپ کی تفصیلات ملتی ہیں، اور سروس کو محفوظ رکھنے کے لیے یہ تھوڑے وقت تک تکنیکی لاگز
                میں رکھی جاتی ہیں۔
              </li>
            </ul>
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
              <li>
                مسجد ایڈمنز کی تصدیق کرنا، واٹس ایپ کے ذریعے یا ان کی درخواست کا جائزہ لے کر، تاکہ لوگ تصدیق شدہ مساجد
                پر بھروسہ کر سکیں؛
              </li>
              <li>ضروری ای میلز بھیجنا، جیسے تصدیقی کوڈز اور اکاؤنٹ حذف ہونے کی تصدیق؛</li>
              <li>آپ کے بھیجے گئے پیغامات کا جواب دینا؛</li>
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
                <strong>Google</strong>: گوگل سائن اِن (اگر آپ استعمال کریں)، نقشے کے لیے Google Maps، اور پتہ تلاش کرنے
                اور مسجد کی عوامی لسٹنگ پڑھنے کے لیے Google Places۔
              </li>
              <li>
                <strong>Meta (WhatsApp)</strong>: مسجد کے فون نمبر پر تصدیقی پیغام بھیجنے کے لیے، جب کوئی مسجد ایڈمن
                واٹس ایپ سے تصدیق کا انتخاب کرے۔
              </li>
              <li>
                <strong>GoDaddy</strong>: وہ ای میل سروس جس پر ہمارا سپورٹ میل باکس چلتا ہے۔ یہ ہماری ای میلز بھیجتی ہے،
                جیسے تصدیقی کوڈز، اور رابطہ فارم سے بھیجے گئے پیغامات وصول کرتی ہے۔
              </li>
              <li>
                <strong>Expo، Google اور Apple کی پش سروسز</strong>: آپ کے فون تک اطلاعات پہنچانے کے لیے۔
              </li>
              <li>
                <strong>AlAdhan</strong>: ایک اسلامی نماز اوقات سروس۔ آپ کے نماز کے اوقات کا حساب عام طور پر آپ کے فون
                پر ہی لگایا جاتا ہے۔ صرف جب یہ ممکن نہ ہو تو ایپ AlAdhan سے پوچھتی ہے اور اسے آپ کے کوآرڈینیٹس بھیجتی
                ہے۔
              </li>
              <li>
                <strong>Vercel اور Oracle Cloud</strong>: یہ ویب سائٹ اور ہمارا سرور انہی پر چلتے ہیں۔
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
            <p>
              تلاش یا نماز کے وقت کے حساب کے لیے استعمال ہونے والی لوکیشن درخواست کے بعد ہمارے سرورز پر محفوظ نہیں رکھی
              جاتی۔
            </p>
            <p>
              واٹس ایپ کا تصدیقی لنک 10 منٹ بعد کام کرنا بند کر دیتا ہے۔ رابطہ فارم سے بھیجے گئے پیغامات ہمارے سپورٹ میل
              باکس میں تب تک رہتے ہیں جب تک آپ کی مدد کے لیے ان کی ضرورت ہو؛ ہمیں کہیں تو ہم انہیں حذف کر دیں گے۔
            </p>
            <p>
              ایپ آپ کے پاس نہیں؟ ای میل کے ذریعے درخواست کے لیے{' '}
              <Link href={localizePath('/delete-account', lang)}>اپنا اکاؤنٹ ڈیلیٹ کریں</Link> دیکھیں۔ کریش رپورٹس 90 دن
              بعد حذف ہو جاتی ہیں؛ آپ کی بھیجی گئی رپورٹس اکاؤنٹ حذف ہونے کے بعد آپ کے نام کے بغیر رہتی ہیں۔
            </p>
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
              Location is optional. Apart from prayer reminders (if you choose), it is used only while you use the app,
              and it is never stored as a history of where you have been.
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
              map, find Masjids and events near you, and work out today’s prayer times and the Qibla direction for where
              you are.
            </li>
            <li>
              <strong>Prayer reminders</strong>, if you turn them on: your location from when you last used the app,
              your device’s time zone and language, your reminder settings and the prayer times calculated for you. Our
              server uses them to send each reminder with the Jamaat time at the Masjid nearest to you. If you also allow
              location “all the time”, the app reads your location once when each prayer time starts, even if it is
              closed, so the reminder names the Masjid nearest to where you are then. It is never tracked in between. We
              keep only the latest location, never a history, and delete it when you turn reminders off or uninstall the
              app.
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
              <strong>A copy for offline use.</strong> So the app opens without a connection, it keeps a copy of what
              you last saw on your phone: your profile, the Masjids you follow, nearby Masjids and events, and the place
              you last searched from. This copy never leaves your device, and the part that belongs to your account is
              removed when you sign out.
            </li>
            <li>
              <strong>Notification details</strong>, if you turn notifications on: a push token, a random ID created
              when the app is installed, and whether the device is Android or iOS. We also keep a record of the
              notifications we send, so we can make sure they are delivered.
            </li>
            <li>
              <strong>Crash reports.</strong> If a screen in the app crashes, the app sends the technical details of the
              error, the app version and your phone’s system version to our own server (linked to your account if you
              are signed in), so we can fix it. They are deleted automatically after 90 days.
            </li>
            <li>
              <strong>Reports you send</strong> when you report an event, Janazah alert or Masjid: the reason and any
              details you write. Only the Salah360 team sees them; the Masjid is never told who reported it.
            </li>
            <li>
              <strong>When you accepted our terms</strong>: the time you agreed to the Terms of Service and this Privacy
              Policy at sign-up.
            </li>
          </ul>

          <h3>If you are a Masjid Admin</h3>
          <ul>
            <li>Your name, email, and your Masjid’s name and address.</li>
            <li>
              <strong>Verification over WhatsApp.</strong> To offer it, we look up your Masjid’s public Google Maps
              listing for its type and phone number. If you choose it, a WhatsApp message with your Masjid’s name and a
              one-time confirmation link is sent to that number. The page behind the link shows your name and the
              Masjid’s name to whoever opens it on that phone. We keep a record of the number the message went to and
              whether it was confirmed.
            </li>
            <li>
              <strong>Manual verification.</strong> A photo taken at the Masjid and a phone number, which you send
              instead. These are seen only by the Salah360 team reviewing the request, and are never shown in the app.
            </li>
            <li>
              <strong>Photos.</strong> The app sees only the photos you pick yourself, for a verification request or an
              event. It can save your Masjid’s QR code image to your gallery, but it cannot read your gallery.
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
          <ul>
            <li>
              <strong>The contact form.</strong> When you send us a message from the contact page, your name (if you
              give it), email address, topic and message are emailed to our support inbox so we can reply. They are not
              added to the app’s database.
            </li>
            <li>
              <strong>Shared links and QR codes.</strong> When you open a shared Masjid, event or Janazah link, or scan
              a Masjid’s QR code, the website checks whether your device is an Android phone or an iPhone, only to send
              you to the right place. It does not store this. A Google Play button on this website tells Google Play
              that you came from our website and, for a shared link, which Masjid, event or alert the link was for, so
              we can count installs.
            </li>
            <li>
              <strong>Technical logs.</strong> Like every website and app, our servers receive your IP address and
              browser or app details with each request, and keep them for a short time in technical logs, to keep the
              service secure.
            </li>
          </ul>
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
            <li>
              verify Masjid Admins, over WhatsApp or by reviewing their request, so people can trust verified Masjids;
            </li>
            <li>send important emails, such as verification codes and account deletion confirmations;</li>
            <li>reply to the messages you send us;</li>
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
              <strong>Google</strong>: Google Sign-In (if you use it), Google Maps for the map, and Google Places for
              address search and for reading a Masjid’s public listing.
            </li>
            <li>
              <strong>Meta (WhatsApp)</strong>: to send the verification message to a Masjid’s phone number, when a
              Masjid Admin chooses to verify over WhatsApp.
            </li>
            <li>
              <strong>GoDaddy</strong>: the email service our support mailbox runs on. It sends our emails, such as
              verification codes, and receives the messages sent from the contact form.
            </li>
            <li>
              <strong>Expo, Google and Apple push services</strong>: to deliver notifications to your phone.
            </li>
            <li>
              <strong>AlAdhan</strong>: an Islamic prayer-times service. Your prayer times are normally calculated on
              your phone itself. Only if that isn’t possible does the app ask AlAdhan, sending it your coordinates.
            </li>
            <li>
              <strong>Vercel and Oracle Cloud</strong>: host this website and our server.
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
          <p>
            Location used for a search or a prayer time calculation is not kept on our servers after the request. For
            prayer reminders, only your latest location is kept, until you turn reminders off or uninstall the app.
          </p>
          <p>
            A WhatsApp verification link stops working after 10 minutes. Messages you send through the contact form stay
            in our support mailbox for as long as we need them to help you; ask us and we will delete them.
          </p>
          <p>
            No longer have the app? See <Link href={localizePath('/delete-account', lang)}>Delete your account</Link> to
            request deletion by email. Crash reports are deleted after 90 days; reports you sent are kept without your
            name once your account is deleted.
          </p>
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
