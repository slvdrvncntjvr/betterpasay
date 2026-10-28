import sourceData from '../data/sources.json';
import serviceData from '../data/services.json';
import resourceData from '../data/resources.json';

export const sources = sourceData;
export const services = serviceData;
export const resources = resourceData;
export type Service = (typeof services)[number];
export const categories = [
  {
    id: 'documents',
    title: 'Documents & clearances',
    short: 'Documents',
    filipino: 'Mga dokumento',
    icon: 'document',
  },
  {
    id: 'business',
    title: 'Business & property',
    short: 'Business & property',
    filipino: 'Negosyo at ari-arian',
    icon: 'building',
  },
  {
    id: 'family',
    title: 'Family & support',
    short: 'Family & support',
    filipino: 'Pamilya at suporta',
    icon: 'heart',
  },
  {
    id: 'work',
    title: 'Work & livelihood',
    short: 'Work & livelihood',
    filipino: 'Trabaho at kabuhayan',
    icon: 'work',
  },
  {
    id: 'inquiries',
    title: 'City inquiries',
    short: 'City inquiries',
    filipino: 'Makipag-ugnayan',
    icon: 'message',
  },
];

export function sourceFor(id: string) {
  const source = sources.find((item) => item.id === id);
  if (!source) throw new Error(`Missing source: ${id}`);
  return source;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-PH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export const project = {
  repository: 'https://github.com/slvdrvncntjvr/betterpasay',
  issues: 'https://github.com/slvdrvncntjvr/betterpasay/issues',
  maintainer: 'https://github.com/slvdrvncntjvr',
  checkedAt: '2026-10-28',
};

export function correctionUrl(title: string) {
  const url = new URL(`${project.issues}/new`);
  url.searchParams.set('template', 'content-correction.yml');
  url.searchParams.set('title', `Content correction: ${title}`);
  return url.toString();
}
