# LinkShieldAI Documentation

Official documentation repository for **LinkShieldAI**, a URL analysis and threat intelligence platform for developers building Discord bots, moderation tools, browser extensions, and security-focused applications.

LinkShieldAI helps developers analyze URLs for risks such as phishing, scam links, crypto-scam campaigns, suspicious redirects, and unsafe content before users interact with them.

## Official Links

- Website: https://linkshieldai.com/
- Documentation: https://docs.linkshieldai.com/
- Developer Portal: https://developer.linkshieldai.com/portal.php
- GitHub Organization: https://github.com/LinkShieldAI
- Privacy Policy: https://linkshieldai.com/privacy-policy.html
- Terms of Service: https://linkshieldai.com/terms-of-service.html
- Refund & Cancellation Policy: https://linkshieldai.com/refund-policy.html

## What This Documentation Covers

This documentation is intended to help developers understand, test, and integrate LinkShieldAI into their applications.

Common topics include:

- Getting started with the LinkShieldAI API
- Creating and using a developer API key
- URL analysis workflows
- API request and response behavior
- Error handling guidance
- Rate limit and usage considerations
- SDK-based integrations
- Direct API integration
- Discord bot moderation use cases
- Safe testing in development environments
- False positive handling and allowlist strategies

## SDKs

LinkShieldAI provides SDKs and integration options for multiple languages:

- Python: https://pypi.org/project/linkshieldai/0.2.2/
- JavaScript: https://www.npmjs.com/package/linkshieldai
- PHP: https://packagist.org/packages/linkshieldai/linkshieldai
- Rust https://crates.io/crates/linkshieldai

Developers can also integrate LinkShieldAI through direct API requests where supported by the documentation.

## Recommended Integration Approach

For production bots and moderation tools, start with a controlled test before enabling automatic enforcement.

Recommended flow:

1. Create a developer API key.
2. Send test URLs or historical moderation samples to the API.
3. Log the analysis results privately.
4. Compare LinkShieldAI results against the existing detection stack.
5. Decide whether to use the results for mod alerts, warnings, message deletion, or other moderation actions.

This approach lets developers evaluate detection quality without changing user-facing bot behavior immediately.

## Discord Bot Use Cases

LinkShieldAI can be useful for Discord bots that handle:

- Real-time link scanning
- Phishing detection
- Scam and fake giveaway detection
- Crypto-scam and wallet-drainer link detection
- Suspicious redirect analysis
- NSFW or adult-content URL checks, where supported
- Moderator logging and review workflows
- Secondary detection signals alongside existing providers

LinkShieldAI does not need to replace an existing protection system. It can be used as an additional signal or fallback scanner.

## Safety Notes for Developers

When integrating any security API:

- Treat API keys as secrets.
- Do not expose keys in public repositories, client-side code, screenshots, or logs.
- Test in a development environment before production use.
- Avoid relying on one signal for irreversible moderation actions.
- Keep existing allowlists and moderator review workflows where appropriate.
- Review the Privacy Policy and Terms of Service before sending production traffic.

## Useful Evaluation Questions

Before integrating LinkShieldAI into production, developers may want to review:
https://docs.linkshieldai.com/integration_faq.html
- What request volume does the bot expect?
- Should every URL be scanned, or only suspicious URLs?
- How should false positives be handled?
- What happens if the API is unavailable?
- Should results be logged first before automatic action?
- Which SDK or direct API approach fits the bot best?
- Are there commercial, privacy, or reliability requirements to confirm first?

## Contributing

Contributions that improve documentation clarity are welcome.

Useful documentation contributions may include:

- Clearer setup instructions
- More request and response examples
- SDK examples
- Error handling examples
- Discord bot integration examples
- Troubleshooting notes
- Developer FAQ improvements

When contributing, avoid adding unsupported claims about pricing, uptime guarantees, data retention, or detection accuracy unless those details are officially confirmed.

## Support

For API access, use the developer portal:

https://developer.linkshieldai.com/portal.php

For product information, visit:

https://linkshieldai.com/

For documentation, visit:

https://docs.linkshieldai.com/

