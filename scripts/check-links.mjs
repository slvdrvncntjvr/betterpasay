import { readFile, mkdir, writeFile } from 'node:fs/promises';

// An explicit maintenance command, not a live-site or deterministic CI dependency.
const sources = JSON.parse(
  await readFile(new URL('../src/data/sources.json', import.meta.url), 'utf8'),
);
const results = [];
for (const source of sources) {
  try {
    const response = await fetch(source.url, {
      method: 'GET',
      headers: {
        Range: 'bytes=0-1023',
        'User-Agent': 'BetterPasay-source-check/0.1',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
    });
    await response.body?.cancel();
    const result = {
      id: source.id,
      url: source.url,
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get('content-type'),
      ok: response.ok,
      checkedAt: new Date().toISOString(),
    };
    results.push(result);
    console.log(
      `${result.ok ? 'OK' : 'REVIEW'} ${source.id}: ${response.status}`,
    );
  } catch (error) {
    results.push({
      id: source.id,
      url: source.url,
      ok: false,
      error: String(error),
      checkedAt: new Date().toISOString(),
    });
    console.log(`REVIEW ${source.id}: ${String(error)}`);
  }
}
await mkdir('.local', { recursive: true });
await writeFile('.local/link-report.json', JSON.stringify(results, null, 2));
if (results.some((result) => !result.ok)) process.exitCode = 1;
console.log(
  'Report: .local/link-report.json. HTTP success does not verify content; review pages before changing verification dates.',
);
