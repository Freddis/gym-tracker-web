import {FullResult, Reporter, TestCase, TestResult} from '@playwright/test/reporter';
import {Logger} from './src/backend/utils/Logger/Logger';
import {Coverage} from 'playwright/test';
import {readdirSync, readFileSync, statSync} from 'fs';
import libCoverage, {CoverageMap} from 'istanbul-lib-coverage';
import reports from 'istanbul-reports';
import {createContext} from 'istanbul-lib-report';
import v8toIstanbul from 'v8-to-istanbul';
import {join, resolve} from 'path';

class E2eTestReporter implements Reporter {
  protected logger = new Logger('E2E');
  protected exclusions = ['@fs', 'src/backend'];

  onTestBegin(test: TestCase): void {
    this.logger.info(`[starting] ${test.title}`);
  }
  onTestEnd(test: TestCase, result: TestResult): void {
    this.logger.info(`[${result.status}] ${test.title}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onEnd(result: FullResult): Promise<void> {
    console.log('All done, time to collect coverage');
    const coverageMap = libCoverage.createCoverageMap({});
    this.addFilesToCoverage(resolve('src'), coverageMap);

    const files = this.findFilesByNameSync('test-results', 'v8-coverage.json');
    for (const file of files) {
      const content = readFileSync(file);
      const coverage : {result: Awaited<ReturnType<Coverage['stopJSCoverage']>>} = JSON.parse(content.toString());
      for (const entry of coverage.result) {
        if (!entry.url.includes('/src/') || this.exclusions.some((x) => entry.url.includes(x))) {
          continue;
        }
        const localPath = entry.url
        .replace('http://localhost:3000/src/', 'src/') // map served URL → local file
        .split('?')[0]!; // strip cache-busting query params

        const converter = v8toIstanbul(resolve(localPath), 0, {source: entry.source!});
        await converter.load();
        converter.applyCoverage(entry.functions);
        coverageMap.merge(converter.toIstanbul());
      }
    }
    const ctx = createContext({
      dir: 'coverage-e2e',
      defaultSummarizer: 'nested',
      watermarks: {},
      coverageMap: coverageMap,
    });
    reports.create('html-spa', {}).execute(ctx);
    reports.create('text').execute(ctx);
  }

  protected findFilesByNameSync(
  dir: string,
  targetFileName: string,
  results: string[] = []
): string[] {
    const entries = readdirSync(dir, {withFileTypes: true});

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        this.findFilesByNameSync(fullPath, targetFileName, results);
      } else if (entry.isFile() && entry.name === targetFileName) {
        results.push(fullPath);
      }
    }

    return results;
  }

  protected addFilesToCoverage(dir: string, coverageMap: CoverageMap) {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        this.addFilesToCoverage(fullPath, coverageMap);
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
        if (!coverageMap.data[fullPath] && !this.exclusions.some((x) => fullPath.includes(x))) {
        // Add a “dummy” empty coverage object
          coverageMap.addFileCoverage({
            path: fullPath,
            statementMap: {},
            fnMap: {},
            branchMap: {},
            s: {},
            f: {},
            b: {},
          });
        }
      }
    }
  }

};

export default E2eTestReporter;
