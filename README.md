# Grayjay YouTube source with DeArrow support

Fork of <https://gitlab.futo.org/videostreaming/plugins/youtube> with DeArrow support.

Requires my version of Grayjay with alternative metadata support, which you can get from here: <https://github.com/netux/grayjay-android/releases>

![Scan to add source](qr.png)

## Known Issues

- Due to the way the Grayjay plugin API works, and limitations with the DeArrow API, this source will significantly slow down the time it takes to load videos. The subscriptions feed will take the biggest hit, with up to 30 API requests per channel subscribed.