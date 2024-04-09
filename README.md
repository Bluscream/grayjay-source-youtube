<!-- markdownlint-disable MD033 no-inline-html -->

# Grayjay YouTube source with DeArrow

Fork of <https://gitlab.futo.org/videostreaming/plugins/youtube> with DeArrow support.

## Versions

<table>
  <tr>
    <th align="center">Version</th>
    <th align="center">Features</th>
    <th align="center">QR Code</th>
  </tr>
  <tr>
    <td align="center">Standard</td>
    <td>
      <ul style="list-style: none; padding-left: 0;">
        <li>✔ Replaces titles and thumbnails with crowdsourced ones from DeArrow</li>
        <li>✔ Works with FUTO's original Grayjay app</li>
        <li>❌ Cannot individually toggle DeArrow metadata per-video</li>
      <ul>
    </td>
    <td>
      <img alt="Scan to add source: standard release" src="qr_standard.png" />
    </td>
  </tr>
  <tr>
    <td align="center">Uses alternative metadata</td>
    <td>
      <ul style="list-style: none; padding-left: 0;">
        <li>✔ Adds alternative titles and thumbnails from DeArrow</li>
        <li>✔ Can individually toggle alternative metadata per-video
          <img alt="GIF showcasing how to toggle alternative metadata in the app" src="alternative-metadata-toggle.gif" />
        </li>
        <li>❌ Requires installing my fork of Grayjay, which can be found at <a href="https://github.com/netux/grayjay-android/releases">https://github.com/netux/grayjay-android/releases</a></li>
      <ul>
    </td>
    <td>
      <img alt="Scan to add source: uses-alternative-metadata release" src="qr_uses-alternative-metadata.png" />
    </td>
  </tr>
</table>

## Known Issues

- Due to the way the Grayjay plugin API works, and limitations with the DeArrow API, this source will significantly slow down the time it takes to load videos. The subscriptions feed will take the biggest hit, with up to 30 API requests per channel subscribed.

## Contributing

Thanks in taking interest on contributing to Grayjay YouTube source with DeArrow!

Please note that there are two main branches:

- `feature/dearrow` is purely functional. It contains the logic to fetch data from DeArrow and replace video title and thumbnail accordingly.
  - This is meant to be as similar as possible with Grayjay's YouTube plugin to facilitate merging upstream changes.
- `with-dearrow` is the true "main" branch. It integrates `feature/dearrow`, implements the split release type (`standard` and `uses-alternative-metadata` with Rollup builder), and has some other DX QoL features, CI/CD, etc.
  - It is the branch from which releases are based off.

If you wish to do changes to the DeArrow functionality for the `standard` release (new features, bug fixes), please target the `feature/dearrow` branch.
If you wish to do changes to the DeArrow functionality for the `uses-alternative-metadata` release, or cosmetic/dev-centric changes (change source's logo, update GitHub workflow), please target the `with-dearrow` branch.

### Commit messages

For both branches, we try to stick to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary):

```txt
<type>[optional scope]: <description>

[optional body]
```

`type` can be: `feat`, `fix`, `chore`, `docs`, `test`, etc.
