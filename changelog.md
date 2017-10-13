# Changelog

## v1.2.1

> - Numbers passed in will now be sanatized to an ugly string before validation
> - CVNs passed in will now be sanatized to an ugly string before validation
> - Each validation method now has a default param to help avoid bad feedback
> - Debug mode has been removed as it is no longer needed
> - Updated some dev dependencies

## v1.2.0

> - Added validation for if the cvn entered does not match the card type, send back a falsey value
>   - Note: This will only work if you send in the full object, validating a single cvn string will not trigger it to validate against a card type
> - Some code tweaks for flow control

## v1.1.0

> - Added a Debug mode to allow for dev development along side the module

## v1.0.0

>- Initial Release
