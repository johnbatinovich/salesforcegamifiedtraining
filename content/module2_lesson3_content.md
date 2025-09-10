# Creating and Saving Personal Views

## Objective
Show users how to create new personal views based on specific criteria for broadcast ad sales workflows.

## Introduction

Personal views in Dynamics 365 allow you to create customized lists that show exactly the records you need to see. For broadcast ad sales professionals, this means you can create views for hot prospects, campaigns by market, or opportunities closing this quarter.

## Understanding Personal vs System Views

### System Views
- Created by administrators
- Available to all users
- Cannot be modified by individual users
- Examples: "Active Leads", "Open Opportunities"

### Personal Views
- Created by individual users
- Only visible to the creator
- Fully customizable
- Perfect for your specific workflow needs

## Creating a New Personal View

To create a personal view:

1. Navigate to the entity you want to create a view for (Leads, Opportunities, etc.)
2. Click the view dropdown (usually shows "Active Leads" or similar)
3. Select **Create new view**
4. Choose **Personal view**
5. Give your view a descriptive name

## Setting Up View Criteria

### Filtering Records

Use filters to show only the records you need:

- **Date filters**: "Opportunities closing this month"
- **Status filters**: "Hot leads only"
- **Assignment filters**: "My accounts in the Chicago market"
- **Value filters**: "Opportunities over $50,000"

### Common Broadcast Ad Sales Filters

#### For Lead Views
- Lead source = "Trade show" or "Referral"
- Rating = "Hot" or "Warm"
- Industry = "Broadcasting" or "Media"
- Created date = "Last 30 days"

#### For Opportunity Views
- Sales stage = "Proposal" or "Negotiation"
- Estimated value >= $25,000
- Estimated close date = "Next 90 days"
- Account type = "Key account"

#### For Account Views
- Account type = "Customer" or "Prospect"
- Annual revenue >= $1,000,000
- Primary market = Your assigned markets
- Relationship = "Active"

## Useful Personal Views for Broadcast Ad Sales

### "My Hot Prospects This Week"
- Entity: Leads
- Filters: Rating = Hot, Owner = Me, Created this week
- Columns: Name, Company, Phone, Rating, Source

### "Closing This Quarter"
- Entity: Opportunities
- Filters: Est. close date = This quarter, Owner = Me
- Columns: Name, Account, Value, Close date, Probability

### "Key Accounts Needing Attention"
- Entity: Accounts
- Filters: Last activity > 30 days ago, Account type = Key
- Columns: Name, Contact, Last activity, Revenue, Market

### "New Leads to Follow Up"
- Entity: Leads
- Filters: Created this week, Status = New, Owner = Me
- Columns: Name, Company, Source, Phone, Created date

## Sorting Your View

Set up default sorting to see the most important records first:

- **For leads**: Sort by rating (Hot first), then by created date
- **For opportunities**: Sort by estimated value (highest first)
- **For accounts**: Sort by last activity date (oldest first)

## Saving and Managing Personal Views

### Saving Your View
1. After setting up filters and columns, click **Save**
2. Give your view a clear, descriptive name
3. The view will appear in your view dropdown

### Editing Existing Views
1. Select the personal view from the dropdown
2. Click **Edit current view**
3. Make your changes and save

### Deleting Views You No Longer Need
1. Select the view from the dropdown
2. Click **Delete view**
3. Confirm the deletion

## Best Practices for Personal Views

### Naming Conventions
- Use descriptive names: "Hot Leads - Chicago Market"
- Include timeframes: "Opportunities - Q4 2024"
- Specify ownership: "My Active Campaigns"

### Keep Views Focused
- Don't try to show everything in one view
- Create specific views for specific tasks
- Limit to 8-10 columns for readability

### Regular Maintenance
- Review and update views quarterly
- Delete views you no longer use
- Adjust filters as your territory or role changes

## Interactive Simulation

Practice creating personal views:

**Interactive Simulation**: simulations/m2l3_simulation.tsx

*This would be an interactive simulation component in a full implementation.*

## Tips for Success

1. **Start simple**: Create basic views first, then add complexity
2. **Think workflow**: Create views that match your daily tasks
3. **Use consistently**: Make personal views part of your routine
4. **Share ideas**: Discuss useful view ideas with colleagues

## Next Steps

With personal views mastered, you're ready to move on to lead management. In the next module, you'll learn how to effectively work with leads in Dynamics 365.

Your customized workspace will make you more efficient and help you focus on the most important opportunities and prospects.

