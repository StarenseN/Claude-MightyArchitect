// Analytics Model
// Data layer for analytics

const fs = require('fs');
const path = require('path');

class AnalyticsModel {
  constructor() {
    this.dataPath = path.join(process.cwd(), '.claude', 'memory', 'analytics');
    this.ensureDataPath();
  }

  ensureDataPath() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  async save(eventName, data) {
    const timestamp = Date.now();
    const filename = `${eventName}_${timestamp}.json`;
    const filepath = path.join(this.dataPath, filename);

    const record = {
      id: `${eventName}_${timestamp}`,
      eventName,
      data,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(filepath, JSON.stringify(record, null, 2));
    return record;
  }

  async aggregate(period) {
    const files = fs.readdirSync(this.dataPath);
    const now = Date.now();
    const periodMs = this.parsePeriod(period);

    const events = files
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const content = fs.readFileSync(path.join(this.dataPath, f), 'utf8');
        return JSON.parse(content);
      })
      .filter(event => {
        const eventTime = new Date(event.createdAt).getTime();
        return (now - eventTime) <= periodMs;
      });

    // Group by event name
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.eventName]) {
        acc[event.eventName] = [];
      }
      acc[event.eventName].push(event);
      return acc;
    }, {});

    // Calculate metrics
    const metrics = Object.keys(grouped).map(eventName => ({
      eventName,
      count: grouped[eventName].length,
      lastOccurrence: grouped[eventName]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
        .createdAt
    }));

    return {
      totalEvents: events.length,
      uniqueEvents: metrics.length,
      events: metrics,
      period
    };
  }

  parsePeriod(period) {
    const units = {
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
      w: 7 * 24 * 60 * 60 * 1000
    };

    const match = period.match(/(\d+)([hdw])/);
    if (!match) {
      return 24 * 60 * 60 * 1000; // Default 24h
    }

    const [, value, unit] = match;
    return parseInt(value) * (units[unit] || units.h);
  }

  async cleanup(olderThan = '30d') {
    const files = fs.readdirSync(this.dataPath);
    const now = Date.now();
    const threshold = this.parsePeriod(olderThan);

    let deleted = 0;
    files.forEach(f => {
      if (!f.endsWith('.json')) return;

      const filepath = path.join(this.dataPath, f);
      const content = fs.readFileSync(filepath, 'utf8');
      const event = JSON.parse(content);
      const eventTime = new Date(event.createdAt).getTime();

      if ((now - eventTime) > threshold) {
        fs.unlinkSync(filepath);
        deleted++;
      }
    });

    return { deleted, remaining: files.length - deleted };
  }
}

module.exports = AnalyticsModel;