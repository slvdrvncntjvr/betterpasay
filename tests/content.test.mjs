import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { matches, normalize } from '../src/lib/search.ts';

const read = (name) =>
  JSON.parse(
    readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'),
  );
const sources = read('sources');
const services = read('services');
const resources = read('resources');
const city = read('city');
const documents = read('documents');
const categories = ['documents', 'business', 'family', 'work', 'inquiries'];

test('every content record has a unique stable ID and a valid source reference', () => {
  for (const collection of [sources, services, resources]) {
    assert.equal(
      new Set(collection.map((item) => item.id)).size,
      collection.length,
    );
    for (const item of collection) assert.match(item.id, /^[a-z0-9-]+$/);
  }
  for (const item of [...services, ...resources]) {
    assert.ok(
      sources.some((source) => source.id === item.sourceId),
      `Missing source for ${item.id}`,
    );
    if (item.provenanceId)
      assert.ok(sources.some((source) => source.id === item.provenanceId));
    assert.ok(item.title && item.description);
  }
});

test('sources have explicit dates, review scopes, formats and trusted provenance', () => {
  for (const source of sources) {
    assert.ok(source.title && source.publisher && source.note.length > 25);
    assert.ok(['reviewed', 'linked'].includes(source.verification));
    assert.ok(['PDF', 'Web page'].includes(source.format));
    assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(
      Date.parse(source.checkedAt) <= Date.now(),
      `Future check date: ${source.id}`,
    );
    if (source.publishedAt !== null) {
      assert.match(source.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(source.publishedAt <= source.checkedAt);
    }
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:');
    assert.ok(
      ['pasay.gov.ph', 'www.pasaycitysecretariat.com'].includes(url.hostname),
    );
    if (url.hostname === 'www.pasaycitysecretariat.com') {
      assert.ok(
        resources.some(
          (resource) =>
            resource.sourceId === source.id &&
            resource.provenanceId === 'transparency',
        ),
      );
    }
  }
});

test('directory categories are valid, populated and searchable in local terms', () => {
  for (const category of categories)
    assert.ok(services.some((service) => service.category === category));
  for (const service of services) {
    assert.ok(categories.includes(service.category));
    assert.ok(service.office && service.filipino && service.action);
    assert.ok(service.keywords.length > 0);
  }
  for (const [query, id] of [
    ['sedula', 'community-tax'],
    ['amilyar', 'real-property-tax'],
    ['trabaho', 'job-openings'],
  ]) {
    const service = services.find((service) => service.id === id);
    assert.ok(
      matches(
        [service.title, service.filipino, ...service.keywords].join(' '),
        query,
      ),
    );
  }
});

test('search handles all words, accents, punctuation, whitespace and literal hostile strings', () => {
  assert.ok(matches('Mayor’s clearance Pasayeño', "  MAYOR'S   PASAYENO "));
  assert.ok(matches('Senior citizen ID', 'id senior'));
  assert.ok(matches('anything', '   '));
  assert.ok(!matches('business permit', 'senior business'));
  assert.ok(!matches('clearance', '<img src=x onerror=alert(1)>'));
  assert.equal(normalize('Pasayeño'), 'pasayeno');
});

test('limited document reviews are explicitly disclosed', () => {
  for (const source of sources.filter(
    (source) => source.verification === 'linked',
  )) {
    const resource = resources.find(
      (resource) => resource.sourceId === source.id,
    );
    assert.ok(resource?.caution && resource.provenanceId);
  }
});

test('all 201 barangays preserve unique official codes and the census total', () => {
  assert.equal(city.barangays.length, 201);
  assert.equal(new Set(city.barangays.map((item) => item.psgc)).size, 201);
  assert.deepEqual(
    city.barangays.map((item) => item.number).sort((a, b) => a - b),
    Array.from({ length: 201 }, (_, i) => i + 1),
  );
  assert.equal(
    city.barangays.reduce((sum, item) => sum + item.population2024, 0),
    city.statistics.population2024,
  );
  assert.equal(city.statistics.population2024, 453186);
  for (const item of city.barangays) {
    assert.match(item.psgc, /^\d{10}$/);
    assert.equal(new URL(item.sourceUrl).hostname, 'psa.gov.ph');
  }
});

test('the document library and expanded service guides have traceable official sources', () => {
  assert.equal(
    new Set(documents.map((item) => item.id)).size,
    documents.length,
  );
  for (const item of documents) {
    assert.ok(
      sources.some((source) => source.id === item.sourceId),
      `Unknown document source: ${item.id}`,
    );
    if (item.serviceId)
      assert.ok(services.some((service) => service.id === item.serviceId));
  }
  for (const item of services.filter((service) => service.edition)) {
    assert.ok(
      item.requirements.length && item.steps.length && item.pages && item.scope,
    );
    const source = sources.find((source) => source.id === item.sourceId);
    assert.match(source.url, /pasay-city-citizens-charter-2026\.pdf#page=\d+/);
    assert.equal(source.verification, 'reviewed');
  }
});

test(
  'built pages have working internal links and local assets',
  { skip: !existsSync('dist/index.html') },
  () => {
    function walk(dir) {
      return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
          ? walk(`${dir}/${entry.name}`)
          : [`${dir}/${entry.name}`],
      );
    }
    for (const file of walk('dist').filter((file) => file.endsWith('.html'))) {
      const html = readFileSync(file, 'utf8');
      for (const [, href] of html.matchAll(
        /(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g,
      )) {
        if (href.startsWith('//')) continue;
        const local = `dist${href}`;
        assert.ok(
          existsSync(href.endsWith('/') ? `${local}index.html` : local),
          `Broken ${href} in ${file}`,
        );
      }
    }
  },
);
