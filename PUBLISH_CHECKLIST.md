# Pre-Publish Checklist for MightyArchitect

Use this checklist before publishing to npm.

## Pre-Publish Tasks

### 1. Code Quality
- [ ] All tests pass (`npm test`)
- [ ] No linting errors
- [ ] Code follows project conventions
- [ ] No debugging console.log statements

### 2. Documentation
- [ ] README.md is up to date
- [ ] CHANGELOG.md updated with version changes
- [ ] All new features documented
- [ ] Command documentation complete

### 3. Version Management
- [ ] Version bumped in `package.json`
- [ ] Version follows semver (MAJOR.MINOR.PATCH)
- [ ] Git changes committed
- [ ] No uncommitted changes (`git status` clean)

### 4. Testing Installation
- [ ] Test local install: `npm install -g .`
- [ ] Verify commands work: `/architect-review`, `/forensic`, `/bootstrap`, `/memory-status`
- [ ] Verify hooks trigger correctly
- [ ] Test on Windows (if possible)
- [ ] Test on macOS/Linux (if possible)

### 5. Package Configuration
- [ ] `package.json` `files` field includes all necessary files
- [ ] `package.json` `bin` field correctly points to installer
- [ ] LICENSE file present
- [ ] README.md present
- [ ] No unnecessary files included (check with `npm pack --dry-run`)

### 6. NPM Account Setup
- [ ] NPM account created
- [ ] Logged in: `npm login`
- [ ] Package name available (search: `npm search mighty-architect`)
- [ ] Organization/scope decided (if applicable)

## Publishing Steps

### Step 1: Final Verification
```bash
# Run all tests
npm test

# Check what will be published
npm pack --dry-run

# Verify git status
git status
```

### Step 2: Version Bump
```bash
# Patch version (1.1.0 -> 1.1.1)
npm version patch

# Minor version (1.1.0 -> 1.2.0)
npm version minor

# Major version (1.1.0 -> 2.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates git commit
- Creates git tag

### Step 3: Publish to NPM
```bash
# Publish to npm
npm publish

# Or for scoped packages
npm publish --access public
```

### Step 4: Post-Publish
```bash
# Push to GitHub (with tags)
git push origin main --tags

# Verify on npm
npm view mighty-architect

# Test installation
npx create-mighty-architect
```

### Step 5: Announcements
- [ ] Update GitHub releases with changelog
- [ ] Post in relevant communities (if applicable)
- [ ] Update any related documentation sites

## Rollback Plan

If something goes wrong:

```bash
# Unpublish (only within 72 hours)
npm unpublish mighty-architect@<version>

# Deprecate (preferred over unpublish)
npm deprecate mighty-architect@<version> "Reason for deprecation"
```

## Post-Publish Verification

- [ ] Package visible on npm: https://www.npmjs.com/package/mighty-architect
- [ ] `npx create-mighty-architect` works
- [ ] Commands installed correctly
- [ ] Hooks registered correctly
- [ ] Documentation links work

## Common Issues

### Issue: Package name already taken
**Solution**: Choose different name or request transfer

### Issue: Permission denied
**Solution**: Run `npm login` and verify credentials

### Issue: Files missing from package
**Solution**: Check `package.json` `files` field

### Issue: Commands not working after install
**Solution**: Verify `bin` field in `package.json` and file permissions

## Current Status

**Version**: 1.1.0
**Last Updated**: 2025-11-12
**Ready to Publish**: ✅ (after completing checklist above)

## Quick Reference

```bash
# Test everything
npm test

# Pack and inspect
npm pack
tar -tzf mighty-architect-*.tgz

# Login to npm
npm login

# Publish
npm publish

# Push to git with tags
git push origin main --tags
```

---

**Remember**: Once published, you cannot unpublish after 72 hours. Double-check everything!
