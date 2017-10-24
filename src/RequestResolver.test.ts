import * as expect from 'unexpected';

import PackageFileRequestResolver from './RequestResolver';

describe('PackageFileRequestResolver', () => {
  let resolver;

  beforeEach(() => {
    const registry = {
      getVersions(packageName: string) {
        return Promise.resolve([
          '0.0.0',
          '0.0.1',
          '0.0.2',
          '0.1.0',
          '0.1.1',
          '1.0.0'
        ]);
      }
    };
    resolver = new PackageFileRequestResolver(registry);
  });

  it('resolves the file path if an exact version is requested', () =>
    resolver
      .resolve('foo@0.0.1/bar.json')
      .then(value => expect(value, 'to equal', 'foo@0.0.1/bar.json')));

  it('returns the most recent version if no specific version is requested', () =>
    resolver
      .resolve('foo/bar.json')
      .then(value => expect(value, 'to equal', 'foo@1.0.0/bar.json')));

  it('returns the most recent minor version if only major version is given', () =>
    resolver
      .resolve('foo@0/bar.json')
      .then(value => expect(value, 'to equal', 'foo@0.1.1/bar.json')));

  it('returns the most recent patch version if major and minor version are given', () =>
    resolver
      .resolve('foo@0.0/bar.json')
      .then(value => expect(value, 'to equal', 'foo@0.0.2/bar.json')));

  it("returns a falsy value if the requested version range can't be satisfied", () =>
    resolver
      .resolve('foo@2/bar.json')
      .then(value => expect(value, 'to be falsy')));
});
