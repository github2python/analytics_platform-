import { keyMetrics, revenueData, usersData, conversionData, analyticsOverTime } from "@/lib/data";
import { Campaign } from "../components/data-table/columns";

// Generate realistic but random fluctuations to simulate real-time updates
function generateRandomFluctuation(baseValue: number, percentageRange: number = 5): number {
  const fluctuationPercentage = (Math.random() * percentageRange * 2) - percentageRange;
  return baseValue * (1 + fluctuationPercentage / 100);
}

export function getUpdatedMetrics() {
  return {
    ...keyMetrics,
    totalRevenue: Math.round(generateRandomFluctuation(keyMetrics.totalRevenue, 1)),
    totalUsers: Math.round(generateRandomFluctuation(keyMetrics.totalUsers, 0.5)),
    totalConversions: Math.round(generateRandomFluctuation(keyMetrics.totalConversions, 0.8)),
    averageOrderValue: Math.round(generateRandomFluctuation(keyMetrics.averageOrderValue, 2)),
    // Adjust growth values based on the new totals
    revenueGrowth: parseFloat((keyMetrics.revenueGrowth + (Math.random() * 0.6 - 0.3)).toFixed(2)),
    userGrowth: parseFloat((keyMetrics.userGrowth + (Math.random() * 0.4 - 0.2)).toFixed(2)),
    conversionGrowth: parseFloat((keyMetrics.conversionGrowth + (Math.random() * 0.3 - 0.15)).toFixed(2)),
    aovGrowth: parseFloat((keyMetrics.aovGrowth + (Math.random() * 0.5 - 0.25)).toFixed(2)),
  };
}

export function getUpdatedRevenueData() {
  return revenueData.map(item => ({
    ...item,
    revenue: Math.round(generateRandomFluctuation(item.revenue, 3))
  }));
}

export function getUpdatedUsersData() {
  return usersData.map(item => ({
    ...item,
    users: Math.round(generateRandomFluctuation(item.users, 2))
  }));
}

export function getUpdatedConversionData() {
  return conversionData.map(item => ({
    ...item,
    rate: parseFloat((generateRandomFluctuation(item.rate, 4)).toFixed(1))
  }));
}

export function getUpdatedAnalyticsData() {
  return analyticsOverTime.map(item => ({
    ...item,
    users: Math.round(generateRandomFluctuation(item.users, 3)),
    conversions: Math.round(generateRandomFluctuation(item.conversions, 4)),
    revenue: Math.round(generateRandomFluctuation(item.revenue, 3))
  }));
}

// Add a random new campaign or update existing campaign data
export function getUpdatedCampaignMetrics(currentCampaigns: Campaign[]): Campaign[] {
  return currentCampaigns.map(campaign => {
    // Only update active campaigns
    if (campaign.status === "Active") {
      const updatedSpent = Math.min(
        campaign.budget, 
        campaign.spent + (Math.random() * (campaign.budget * 0.05))
      );
      
      return {
        ...campaign,
        spent: parseFloat(updatedSpent.toFixed(2)),
        roi: parseFloat((campaign.roi + (Math.random() * 0.2 - 0.1)).toFixed(1))
      };
    }
    return campaign;
  });
}

// Live traffic simulation - returns current active users count
export function simulateLiveUserCount(baseCount: number = 42) {
  const time = new Date();
  const hour = time.getHours();
  
  // Traffic pattern: low at night, increases during day, peaks at noon and evening
  const hourMultiplier = 
    hour < 6 ? 0.3 : // Night (12am-6am)
    hour < 9 ? 0.7 : // Early morning (6am-9am)
    hour < 12 ? 1.0 : // Morning (9am-12pm)
    hour < 15 ? 1.2 : // Afternoon (12pm-3pm)
    hour < 18 ? 1.0 : // Late afternoon (3pm-6pm)
    hour < 21 ? 1.1 : // Evening (6pm-9pm)
    0.5;              // Night (9pm-12am)
    
  // Random fluctuation around the base pattern
  const randomFactor = 0.85 + (Math.random() * 0.3);
  
  return Math.round(baseCount * hourMultiplier * randomFactor);
} 