# Publishing @uhyo/sorena-mcp

This document provides step-by-step instructions for publishing the `@uhyo/sorena-mcp` package to npm.

## Prerequisites

Before publishing, ensure you have:

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **npm CLI**: Installed and logged in (`npm login`)
3. **Package built**: Run `npm run build` to ensure dist/ is up to date
4. **Tests passing**: Verify all functionality works as expected
5. **Version updated**: Update version in package.json if needed

## Pre-Publication Checklist

### 1. Verify Package Configuration

Check that `package.json` has the correct configuration:

```bash
# Verify package name and details
cat package.json | grep -E "(name|version|description|main|bin)"
```

Ensure these fields are correct:
- ✅ `"name": "@uhyo/sorena-mcp"`
- ✅ `"main": "dist/index.js"`
- ✅ `"bin": "dist/index.js"`
- ✅ `"files"` includes `"dist/**/*"` and `"README.md"`

### 2. Build and Test

```bash
# Clean and rebuild
npm run rebuild

# Test the server
npm start &
# Test with MCP Inspector
npm run inspect
# Kill the server process
```

### 3. Verify Binary Executable

Test that the binary works:

```bash
# Test the compiled binary
node dist/index.js &
# Should start without errors
# Kill the process
```

### 4. Check File Inclusion

Preview what files will be included in the package:

```bash
npm pack --dry-run
```

This shows exactly what files will be published.

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Version Management

Update the version if this is not the first release:

```bash
# For patch releases (bug fixes)
npm version patch

# For minor releases (new features)
npm version minor

# For major releases (breaking changes)
npm version major

# Or set version manually in package.json
```

### 3. Publish to npm

#### First-time Publication

For the initial release:

```bash
# Publish as public package (scoped packages are private by default)
npm publish --access public
```

#### Subsequent Publications

For updates:

```bash
npm publish
```

### 4. Verify Publication

Check that the package was published successfully:

```bash
# Check package info
npm info @uhyo/sorena-mcp

# Test installation
npm install -g @uhyo/sorena-mcp@latest
sorena-mcp --help
```

## Post-Publication

### 1. Create Git Tag

After successful publication, tag the release:

```bash
git tag v$(node -p "require('./package.json').version")
git push origin --tags
```

### 2. Update Documentation

- Update any installation instructions that reference version numbers
- Consider creating a CHANGELOG.md for future releases

### 3. Test Installation

Test that users can install and use the package:

```bash
# Test global installation
npm install -g @uhyo/sorena-mcp
which sorena-mcp
sorena-mcp &

# Test local installation
mkdir test-install
cd test-install
npm init -y
npm install @uhyo/sorena-mcp
npx @uhyo/sorena-mcp &
cd ..
rm -rf test-install
```

## Troubleshooting

### Common Issues

1. **"Package already exists"**: The package name is taken. Choose a different name.

2. **"You do not have permission to publish"**: 
   - Verify you're logged in: `npm whoami`
   - For scoped packages, use `--access public`

3. **"File not found" errors**: 
   - Ensure `npm run build` was run
   - Check that `"files"` in package.json includes necessary files

4. **Binary not executable**: 
   - Verify `"bin"` field in package.json points to correct file
   - Ensure the file has proper shebang (`#!/usr/bin/env node`)

### Unpublishing (Emergency Only)

⚠️ **Warning**: Unpublishing can break dependents. Only use in emergencies.

```bash
# Unpublish specific version (within 72 hours)
npm unpublish @uhyo/sorena-mcp@1.0.0

# Unpublish entire package (discouraged)
npm unpublish @uhyo/sorena-mcp --force
```

## Release Strategy

### Semantic Versioning

Follow [semver](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes to API
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Pre-release Versions

For beta/alpha releases:

```bash
npm version prerelease --preid=beta
npm publish --tag beta
```

Users can install with:
```bash
npm install @uhyo/sorena-mcp@beta
```

## Maintenance

### Regular Tasks

1. **Monitor Issues**: Check GitHub issues regularly
2. **Update Dependencies**: Keep dependencies current
3. **Security Audits**: Run `npm audit` and fix vulnerabilities
4. **Documentation**: Keep README and examples up to date

### Deprecation

If you need to deprecate versions:

```bash
npm deprecate @uhyo/sorena-mcp@1.0.0 "This version has security vulnerabilities"
```

---

## Quick Reference

```bash
# Complete publication workflow
npm run rebuild                    # Build
npm pack --dry-run                # Preview files
npm version patch                 # Update version
npm publish --access public       # Publish
git tag v$(node -p "require('./package.json').version")  # Tag
git push origin --tags           # Push tags
```