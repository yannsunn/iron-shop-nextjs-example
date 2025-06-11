#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load performance configuration
const perfConfig = require('../performance.config.js');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkBundleSizes() {
  log('\n📦 Checking bundle sizes...', 'blue');
  
  const buildDir = path.join(__dirname, '../.next');
  if (!fs.existsSync(buildDir)) {
    log('❌ Build directory not found. Run "npm run build" first.', 'red');
    process.exit(1);
  }

  let totalViolations = 0;
  
  // Check static chunks
  const staticDir = path.join(buildDir, 'static/chunks');
  if (fs.existsSync(staticDir)) {
    const files = fs.readdirSync(staticDir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(staticDir, file);
        const stats = fs.statSync(filePath);
        const size = stats.size;
        
        // Check against budgets
        const budget = getBudgetForFile(file, perfConfig.budgets);
        if (budget && size > budget) {
          totalViolations++;
          log(`❌ ${file}: ${formatBytes(size)} (exceeds budget of ${formatBytes(budget)})`, 'red');
        } else if (budget) {
          const percentage = ((size / budget) * 100).toFixed(1);
          const color = percentage > 80 ? 'yellow' : 'green';
          log(`✅ ${file}: ${formatBytes(size)} (${percentage}% of budget)`, color);
        }
      }
    });
  }

  return totalViolations;
}

function getBudgetForFile(filename, budgets) {
  // Check specific file budgets
  if (budgets[filename]) {
    return budgets[filename];
  }
  
  // Check pattern budgets
  for (const [pattern, budget] of Object.entries(budgets)) {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      if (regex.test(filename)) {
        return budget;
      }
    }
  }
  
  return null;
}

function checkLighthouseReport() {
  log('\n🔍 Checking Lighthouse performance...', 'blue');
  
  const reportPath = path.join(__dirname, '../lighthouse-report.json');
  if (!fs.existsSync(reportPath)) {
    log('⚠️ Lighthouse report not found. Run "npm run perf:audit" first.', 'yellow');
    return 0;
  }

  try {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const scores = {
      performance: Math.round(report.lhr.categories.performance.score * 100),
      accessibility: Math.round(report.lhr.categories.accessibility.score * 100),
      'best-practices': Math.round(report.lhr.categories['best-practices'].score * 100),
      seo: Math.round(report.lhr.categories.seo.score * 100),
    };

    let violations = 0;
    
    Object.entries(scores).forEach(([category, score]) => {
      const threshold = perfConfig.lighthouse[category] || 90;
      if (score < threshold) {
        violations++;
        log(`❌ ${category}: ${score} (below threshold of ${threshold})`, 'red');
      } else {
        log(`✅ ${category}: ${score}`, 'green');
      }
    });

    // Check Core Web Vitals
    const audits = report.lhr.audits;
    const coreWebVitals = {
      LCP: audits['largest-contentful-paint']?.numericValue / 1000,
      FID: audits['max-potential-fid']?.numericValue / 1000,
      CLS: audits['cumulative-layout-shift']?.numericValue,
    };

    log('\n🎯 Core Web Vitals:', 'blue');
    Object.entries(coreWebVitals).forEach(([metric, value]) => {
      const threshold = perfConfig.metrics[metric];
      if (value > threshold) {
        violations++;
        log(`❌ ${metric}: ${value.toFixed(3)} (exceeds ${threshold})`, 'red');
      } else {
        log(`✅ ${metric}: ${value.toFixed(3)}`, 'green');
      }
    });

    return violations;
  } catch (error) {
    log(`❌ Error reading Lighthouse report: ${error.message}`, 'red');
    return 1;
  }
}

function generateReport(bundleViolations, lighthouseViolations) {
  const totalViolations = bundleViolations + lighthouseViolations;
  
  log('\n📊 Performance Budget Report', 'blue');
  log('═'.repeat(50), 'blue');
  
  if (totalViolations === 0) {
    log('🎉 All performance budgets are within limits!', 'green');
  } else {
    log(`⚠️ Found ${totalViolations} performance budget violations`, 'yellow');
  }
  
  log(`\n📦 Bundle size violations: ${bundleViolations}`, bundleViolations > 0 ? 'red' : 'green');
  log(`🔍 Lighthouse violations: ${lighthouseViolations}`, lighthouseViolations > 0 ? 'red' : 'green');
  
  // Generate recommendations
  if (totalViolations > 0) {
    log('\n💡 Recommendations:', 'yellow');
    if (bundleViolations > 0) {
      log('  • Consider code splitting to reduce bundle sizes', 'yellow');
      log('  • Remove unused dependencies', 'yellow');
      log('  • Use dynamic imports for non-critical code', 'yellow');
    }
    if (lighthouseViolations > 0) {
      log('  • Optimize images and use modern formats (WebP, AVIF)', 'yellow');
      log('  • Implement proper caching strategies', 'yellow');
      log('  • Minimize render-blocking resources', 'yellow');
    }
  }
  
  return totalViolations;
}

function main() {
  log('🚀 Starting performance budget check...', 'blue');
  
  const bundleViolations = checkBundleSizes();
  const lighthouseViolations = checkLighthouseReport();
  const totalViolations = generateReport(bundleViolations, lighthouseViolations);
  
  if (totalViolations > 0) {
    log('\n❌ Performance budget check failed', 'red');
    process.exit(1);
  } else {
    log('\n✅ Performance budget check passed', 'green');
    process.exit(0);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  checkBundleSizes,
  checkLighthouseReport,
  generateReport,
};