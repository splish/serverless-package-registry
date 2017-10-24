import * as expect from 'unexpected';

import PackageFileRequest from './PackageFileRequest';

describe('getScope', () => {
  it('returns the package name and version range for a valid request', () => {
    const req = new PackageFileRequest('foo@1.2.3/bar.json');

    expect(req.getScope(), 'to equal', 'foo@1.2.3');
  });
});

describe('getFile', () => {
  it('returns the file name for a valid request', () => {
    const req = new PackageFileRequest('foo@1.2.3/bar.json');

    expect(req.getFile(), 'to equal', 'bar.json');
  });

  it('returns a falsy value if the request does not contain a file name', () => {
    const req = new PackageFileRequest('foo@1.2.3');

    expect(req.getFile(), 'to be falsy');
  });
});

describe('getPackage', () => {
  it('returns the name of the package for a valid request', () => {
    const req = new PackageFileRequest('foo@1.2.3/bar.json');

    expect(req.getPackage(), 'to equal', 'foo');
  });
});

describe('getVersionRange', () => {
  it('returns the version if an exact version is requested', () => {
    const req = new PackageFileRequest('foo@1.2.3/bar.json');

    expect(req.getVersionRange(), 'to equal', '1.2.3');
  });

  it('returns the normalized version range if a version range is requested', () => {
    const req = new PackageFileRequest('foo@^1.2.3/bar.json');

    expect(req.getVersionRange(), 'to equal', '>=1.2.3 <2.0.0');
  });

  it('returns `*` if the request does not contain a version range', () => {
    const req = new PackageFileRequest('foo/bar.json');

    expect(req.getVersionRange(), 'to equal', '*');
  });

  it('returns a falsy value if the requested version range is invalid', () => {
    const req = new PackageFileRequest('foo@a.0.0');

    expect(req.getVersionRange(), 'to be falsy');
  });
});
