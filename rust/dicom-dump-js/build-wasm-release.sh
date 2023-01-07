#!/usr/bin/env sh
set -eu
cargo build --release --target wasm32-unknown-unknown

mkdir -p ../../static/wasm
wasm-bindgen --out-name dicom-dump \
    --out-dir ../../static/wasm \
    --target web target/wasm32-unknown-unknown/release/dicom_dump_js.wasm
