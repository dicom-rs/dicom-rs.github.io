# DICOM dump webapp

This is the source code for the sample web application
as seen on the [DICOM-rs website](https://dicom-rs.github.io/website).

## Building

First, install Rust with the `wasm32-unknown-unknown` target
and the `wasm-bindgen` CLI tool.

```sh
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli
```

Then, run `build-wasm-release.sh`.
This will update the website's assets in `static/wasm`.
