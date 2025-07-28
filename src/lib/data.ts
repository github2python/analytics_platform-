// Mock data for ADmyBRAND Insights Analytics Dashboard

// Revenue Data
export const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 78000 },
  { month: 'Sep', revenue: 69000 },
  { month: 'Oct', revenue: 74000 },
  { month: 'Nov', revenue: 79000 },
  { month: 'Dec', revenue: 89000 },
];

// Users Data
export const usersData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1350 },
  { month: 'Mar', users: 1450 },
  { month: 'Apr', users: 1600 },
  { month: 'May', users: 1750 },
  { month: 'Jun', users: 1900 },
  { month: 'Jul', users: 2050 },
  { month: 'Aug', users: 2200 },
  { month: 'Sep', users: 2350 },
  { month: 'Oct', users: 2500 },
  { month: 'Nov', users: 2650 },
  { month: 'Dec', users: 2800 },
];

// Conversion Rate Data
export const conversionData = [
  { month: 'Jan', rate: 2.4 },
  { month: 'Feb', rate: 2.7 },
  { month: 'Mar', rate: 2.9 },
  { month: 'Apr', rate: 3.2 },
  { month: 'May', rate: 3.1 },
  { month: 'Jun', rate: 3.5 },
  { month: 'Jul', rate: 3.8 },
  { month: 'Aug', rate: 3.7 },
  { month: 'Sep', rate: 3.9 },
  { month: 'Oct', rate: 4.0 },
  { month: 'Nov', rate: 4.1 },
  { month: 'Dec', rate: 4.3 },
];

// Marketing Channel Distribution
export const channelDistribution = [
  { name: 'Organic Search', value: 35 },
  { name: 'Paid Search', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Email', value: 12 },
  { name: 'Direct', value: 8 },
];

// Campaign Performance
export const campaignPerformance = [
  { name: 'Summer Sale', impressions: 125000, clicks: 42500, conversions: 3800 },
  { name: 'New Product', impressions: 95000, clicks: 28500, conversions: 2100 },
  { name: 'Brand Awareness', impressions: 185000, clicks: 37000, conversions: 1500 },
  { name: 'Retargeting', impressions: 65000, clicks: 22750, conversions: 3250 },
  { name: 'Holiday Special', impressions: 145000, clicks: 50750, conversions: 4550 },
];

// Recent Campaigns Table Data
export const recentCampaigns = [
  { 
    id: '1', 
    name: 'Black Friday Sale', 
    status: 'Active', 
    budget: 12000, 
    spent: 8750, 
    roi: 3.2, 
    startDate: '2023-11-20',
    endDate: '2023-11-30',
  },
  { 
    id: '2', 
    name: 'Winter Collection Launch', 
    status: 'Active', 
    budget: 8500, 
    spent: 4200, 
    roi: 2.8, 
    startDate: '2023-11-15',
    endDate: '2023-12-15',
  },
  { 
    id: '3', 
    name: 'End of Year Sale', 
    status: 'Scheduled', 
    budget: 15000, 
    spent: 0, 
    roi: 0, 
    startDate: '2023-12-20',
    endDate: '2023-12-31',
  },
  { 
    id: '4', 
    name: 'Customer Loyalty Program', 
    status: 'Active', 
    budget: 5000, 
    spent: 3200, 
    roi: 4.1, 
    startDate: '2023-10-01',
    endDate: '2023-12-31',
  },
  { 
    id: '5', 
    name: 'Product Retargeting', 
    status: 'Paused', 
    budget: 3500, 
    spent: 1700, 
    roi: 2.5, 
    startDate: '2023-09-15',
    endDate: '2023-12-15',
  },
  { 
    id: '6', 
    name: 'Social Media Promotion', 
    status: 'Completed', 
    budget: 7500, 
    spent: 7500, 
    roi: 3.7, 
    startDate: '2023-08-01',
    endDate: '2023-10-31',
  },
  { 
    id: '7', 
    name: 'Email Newsletter Campaign', 
    status: 'Active', 
    budget: 2000, 
    spent: 1200, 
    roi: 5.2, 
    startDate: '2023-11-01',
    endDate: '2023-12-31',
  },
  { 
    id: '8', 
    name: 'Influencer Partnership', 
    status: 'Active', 
    budget: 10000, 
    spent: 6500, 
    roi: 3.9, 
    startDate: '2023-10-15',
    endDate: '2023-12-15',
  },
  { 
    id: '9', 
    name: 'Website Redesign Promotion', 
    status: 'Scheduled', 
    budget: 5500, 
    spent: 0, 
    roi: 0, 
    startDate: '2024-01-10',
    endDate: '2024-01-31',
  },
  { 
    id: '10', 
    name: 'Mobile App Launch', 
    status: 'Draft', 
    budget: 20000, 
    spent: 0, 
    roi: 0, 
    startDate: '2024-02-01',
    endDate: '2024-03-15',
  },
];

// Key Metrics for Overview Cards
export const keyMetrics = {
  totalRevenue: 789000,
  revenueGrowth: 14.5,
  totalUsers: 24850,
  userGrowth: 18.2,
  totalConversions: 45600,
  conversionGrowth: 7.8,
  averageOrderValue: 178,
  aovGrowth: 5.3,
};

// Analytics Over Time
export const analyticsOverTime = [
  { date: '2023-06-01', users: 980, conversions: 67, revenue: 11940 },
  { date: '2023-07-01', users: 1040, conversions: 72, revenue: 12760 },
  { date: '2023-08-01', users: 1150, conversions: 83, revenue: 14500 },
  { date: '2023-09-01', users: 1280, conversions: 96, revenue: 16850 },
  { date: '2023-10-01', users: 1490, conversions: 115, revenue: 20100 },
  { date: '2023-11-01', users: 1720, conversions: 132, revenue: 23400 },
  { date: '2023-12-01', users: 2050, conversions: 159, revenue: 28250 },
];

// Audience Demographics
export const audienceDemographics = {
  ageGroups: [
    { group: '18-24', percentage: 15 },
    { group: '25-34', percentage: 32 },
    { group: '35-44', percentage: 28 },
    { group: '45-54', percentage: 15 },
    { group: '55-64', percentage: 7 },
    { group: '65+', percentage: 3 },
  ],
  gender: [
    { type: 'Male', percentage: 48 },
    { type: 'Female', percentage: 51 },
    { type: 'Other', percentage: 1 },
  ],
  devices: [
    { type: 'Mobile', percentage: 68 },
    { type: 'Desktop', percentage: 27 },
    { type: 'Tablet', percentage: 5 },
  ],
}; 