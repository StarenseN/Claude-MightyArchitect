// Analytics Controller
// Handles HTTP requests for analytics

const AnalyticsService = require('../services/analyticsService');
const AnalyticsModel = require('../models/analyticsModel');

class AnalyticsController {
  constructor() {
    this.model = new AnalyticsModel();
    this.service = new AnalyticsService(this.model);
  }

  async trackEvent(req, res) {
    try {
      const { eventName, data } = req.body;

      if (!eventName) {
        return res.status(400).json({
          error: 'Event name is required'
        });
      }

      const result = await this.service.trackEvent(eventName, data);

      res.status(201).json({
        success: true,
        event: result
      });
    } catch (error) {
      console.error('Track event error:', error);
      res.status(500).json({
        error: 'Failed to track event'
      });
    }
  }

  async getMetrics(req, res) {
    try {
      const { period = '24h' } = req.query;
      const metrics = await this.service.getMetrics(period);

      res.json({
        success: true,
        period,
        metrics
      });
    } catch (error) {
      console.error('Get metrics error:', error);
      res.status(500).json({
        error: 'Failed to retrieve metrics'
      });
    }
  }

  async getReport(req, res) {
    try {
      const report = await this.service.generateReport();

      res.json({
        success: true,
        report
      });
    } catch (error) {
      console.error('Generate report error:', error);
      res.status(500).json({
        error: 'Failed to generate report'
      });
    }
  }
}

module.exports = AnalyticsController;