# Changelog

## v1.3.2

- Fix: Better IE support dates should build out properly now (specifically IE 10 and 11)
   - These would use past years when only given a XX/XX string so `1/19` brokedown to `Janurary of 1919`
- Changed: Switched out testing suite to ava
- Added: Seperate tests for internals
- Added: Support for more date seperators instead of just `/`
- Readded: Automatic uglify of the module

## v1.3.1

- Fix: Expiration should no longer mark the current month & year as expired
- Fix: Validating a CVN should no longer trigger a card number error when it exceeds 4 digits
- Changed: How validation works as a whole making the system more simple overall on my end
- Changed: You can now validate a cardtype and cvn when just using those two.
- Changed: Npm ignore so src files are no longer packed

## v1.3.0

- Improved the card type functionality, to go through a list of digit arrays to find the card type
- Allowed me to clean up the validation functionality a bit

## v1.2.1

- Numbers passed in will now be sanatized to an ugly string before validation
- CVNs passed in will now be sanatized to an ugly string before validation
- Each validation method now has a default param to help avoid bad feedback
- Debug mode has been removed as it is no longer needed
- Updated some dev dependencies

## v1.2.0

- Added validation for if the cvn entered does not match the card type, send back a falsey value
  - Note: This will only work if you send in the full object, validating a single cvn string will not trigger it to validate against a card type
- Some code tweaks for flow control

## v1.1.0

- Added a Debug mode to allow for dev development along side the module

## v1.0.0

- Initial Release
