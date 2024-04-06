# Grayjay YouTube source with DeArrow

Fork of <https://gitlab.futo.org/videostreaming/plugins/youtube> with DeArrow support.

Requires my version of Grayjay with alternative metadata support, which you can get from here: <https://github.com/netux/grayjay-android/releases>

![Scan to add source](qr.png)

## Known Issues

- Due to the way the Grayjay plugin API works, and limitations with the DeArrow API, this source will significantly slow down the time it takes to load videos. The subscriptions feed will take the biggest hit, with up to 30 API requests per channel subscribed.

## Contributing

Thanks in taking interest on contributing to Grayjay YouTube source with DeArrow!

Please note that there are two main branches:

- `feature/dearrow` is purely functional. It contains the logic to fetch data from DeArrow and set the alternative metadata compatible with [my fork of Grayjay](https://github.com/netux/grayjay-android).
  - This is meant to be as similar as possible with Grayjay's YouTube plugin to facilitate merging upstream changes.
- `with-dearrow` is the true "main" branch. It integrates `feature/dearrow`, while having some dev QoL features, CI/CD, etc.
  - It is the branch from which releases are based off.

If you wish to do changes to the DeArrow functionality (new features, bug fixes), please target the `feature/dearrow` branch.
If you wish to do cosmetic/dev-centric changes (change source's logo, update GitHub workflow), please target the `with-dearrow` branch.
