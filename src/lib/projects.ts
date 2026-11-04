import type { Locale } from '@/i18n/config';
export type ProjectType = 'identity' | 'campaign' | 'content';
export type Mood = 'minimal' | 'bold' | 'organic';
export interface Project {
  id: string;
  name: string;
  brief: string;
  audience: string;
  type: ProjectType;
  mood: Mood;
  createdAt: string;
  sample?: boolean;
  locale: Locale;
}
export const projectTypes: ProjectType[] = ['identity', 'campaign', 'content'];
export const moods: Mood[] = ['minimal', 'bold', 'organic'];
export const palettes: Record<Mood, string[]> = {
  minimal: ['#e8e6df', '#b6b6a7', '#363d34', '#f9f8f2'],
  bold: ['#d9fc68', '#252821', '#a291d0', '#f2eee6'],
  organic: ['#df8f59', '#f3dfc8', '#687c53', '#352c26'],
};
export function sampleProjects(locale: Locale): Project[] {
  return [
    {
      id: 'sample-form',
      name: 'FORM',
      brief:
        locale === 'fa'
          ? 'اشیای روزمره با نگاهی تازه؛ یک برند طراحی برای زندگی آگاهانه.'
          : 'Everyday objects, thoughtfully reimagined. A design brand for intentional living.',
      audience: locale === 'fa' ? 'علاقه‌مندان به طراحی' : 'Design-conscious people',
      type: 'identity',
      mood: 'minimal',
    },
    {
      id: 'sample-offbeat',
      name: 'OFFBEAT',
      brief:
        locale === 'fa'
          ? 'یک جشنواره موسیقی مستقل برای کسانی که ریتم خودشان را دارند.'
          : 'An independent music festival for people who move to their own rhythm.',
      audience: locale === 'fa' ? 'نسل خلاق' : 'The creative generation',
      type: 'campaign',
      mood: 'bold',
    },
    {
      id: 'sample-sol',
      name: 'SOL',
      brief:
        locale === 'fa'
          ? 'یک برند مراقبت طبیعی؛ آیینی کوچک برای روزهای روشن‌تر.'
          : 'Natural skincare. A small daily ritual for a brighter, slower kind of life.',
      audience: locale === 'fa' ? 'دوست‌داران طبیعت' : 'Mindful everyday explorers',
      type: 'content',
      mood: 'organic',
    },
  ].map((p) => ({
    ...p,
    type: p.type as ProjectType,
    mood: p.mood as Mood,
    locale,
    createdAt: '2026-10-28T12:00:00Z',
    sample: true,
  }));
}
export function direction(project: Project, locale: Locale) {
  const fa = locale === 'fa';
  const voices = {
    minimal: fa
      ? 'آرام، دقیق و مطمئن. کلمات کمتر، معنای بیشتر.'
      : 'Quiet, considered, and confident. Fewer words. More meaning.',
    bold: fa
      ? 'پرانرژی، جسور و بی‌پرده. صدایی که در ذهن می‌ماند.'
      : 'Energetic, unapologetic, and direct. A voice that stays with you.',
    organic: fa
      ? 'صمیمی، حسی و ریشه‌دار. درست مثل یک گفت‌وگوی خوب.'
      : 'Warm, sensory, and grounded. Just like a good conversation.',
  };
  const strategies = {
    identity: fa
      ? 'یک هویت منسجم بساز: نشانه‌ای ساده، رنگ‌هایی به‌یادماندنی و یک وعده روشن.'
      : 'Build a coherent identity: a simple mark, a memorable color story, and one clear promise.',
    campaign: fa
      ? 'یک پیام مرکزی انتخاب کن و آن را در سه لحظه روایت کن: کنجکاوی، کشف و دعوت.'
      : 'Choose one central message and tell it in three moments: curiosity, discovery, and invitation.',
    content: fa
      ? 'سه ستون محتوایی بساز: الهام، آموزش و پشت صحنه. تداوم را به امضای خودت تبدیل کن.'
      : 'Create three editorial pillars: inspiration, education, and behind the scenes. Make consistency your signature.',
  };
  return {
    strategy: `${project.brief}\n\n${strategies[project.type]}${project.audience ? (fa ? `\nمخاطب اصلی: ${project.audience}` : `\nMade for: ${project.audience}`) : ''}`,
    voice: voices[project.mood],
    steps: fa
      ? [
          'یک مودبورد با ۵ مرجع بصری بساز.',
          'پیام اصلی را در یک جمله بنویس.',
          'اولین طرح را با مخاطبت به اشتراک بگذار.',
        ]
      : [
          'Build a moodboard with five visual references.',
          'Write the core message in a single sentence.',
          'Share your first exploration with your audience.',
        ],
    colors: palettes[project.mood],
  };
}
export function exportText(project: Project, locale: Locale): string {
  const d = direction(project, locale);
  return `${project.name}\n${'—'.repeat(24)}\n\n${d.strategy}\n\n${d.voice}\n\n${d.colors.join(' / ')}\n\n${d.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nBoor · ${locale === 'fa' ? 'کانسپت نمایشی' : 'Demo concept'}`;
}
export function downloadProject(project: Project, locale: Locale) {
  const url = URL.createObjectURL(
    new Blob([exportText(project, locale)], { type: 'text/plain;charset=utf-8' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = `boor-${project.name.replace(/[^\p{L}\p{N}-]/gu, '-').slice(0, 60)}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
