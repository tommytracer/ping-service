This is an app for monitoring uptime for an application that uses a CDN, API Proxy and Backend Api's. It hits endpoints that go directly to AWS, through API Proxy to AWS and through the CDN to API Proxy to AWS. It will single out the troubled service.

These API's are called by pingdom https://www.pingdom.com/ and then routed to pagerduty in cases where the API response is not 200.

You must create a file named apigee_credentials.js in the root dir.
Add these credentials:
process.env.PARAM1 = 'Get this apigee key from your team';
process.env.PARAM2 = 'Get this apigee secret from your team';

Monitored endpoints:
API directly to AWS: xxxxxxxxx
API directly to AWS: xxxxxxxxx
API Proxy: xxxxxxxxx
CDN: xxxxxxxxx
