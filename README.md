# LinkShieldAI Documentation

Source for the LinkShieldAI API documentation at https://docs.linkshieldai.com.

LinkShieldAI scans URLs for phishing, malware, scam pages and NSFW content. These docs cover the public API and the official SDKs.

## What the docs cover

- Creating a developer account and getting an API key
- The Python, JavaScript, PHP and Rust SDKs and their command line tool
- Authentication and rate limits
- `POST /v1/scan`, screenshots, the NSFW check and Chimera
- Error handling and security notes

## SDKs

- Python: https://pypi.org/project/linkshieldai/
- JavaScript and TypeScript: https://www.npmjs.com/package/linkshieldai
- PHP: https://packagist.org/packages/linkshieldai/linkshieldai
- Rust: https://crates.io/crates/linkshieldai

## Run the docs locally

The site is plain HTML, CSS and JavaScript. To preview it with Node.js:

```bash
node server.js
```

Then open http://127.0.0.1:4173.

## Links

- Website: https://linkshieldai.com
- Developer portal: https://developer.linkshieldai.com/portal.php
- Service status: https://status.linkshieldai.com
- Privacy policy: https://linkshieldai.com/privacy-policy.html
- Terms of service: https://linkshieldai.com/terms-of-service.html
- Refund policy: https://linkshieldai.com/refund-policy.html
- Support: support@linkshieldai.com

## Contributing

Fixes that make the docs clearer or more accurate are welcome. Please don't add claims about pricing, uptime, data retention or detection accuracy unless they are officially confirmed.
