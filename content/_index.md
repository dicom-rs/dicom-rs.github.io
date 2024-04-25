+++
title = "DICOM-rs"
sort_by = "weight"
weight = 9999
+++

## Overview

**DICOM-rs** is an ecosystem of libraries and tools
for working with DICOM systems.

<div class="keypoints">

- Work with DICOM meta-data and pixel data with ease.
- Communicate with existing DICOM systems.
- Built in the [Rust programming language][rust] for performance and reliability.
- Portable and prepared for all modern environments.
- Free to use and extend, for life.

</div>

[rust]: https://rust-lang.org

## Using as a library

Get started quickly by adding the [`dicom`] crate to your Rust project.

[`dicom`]: https://crates.io/crates/dicom

```toml
[dependencies]
dicom = "0.7"
```

Or pick exactly what you need
from the [various crates] in the DICOM-rs umbrella.

[various crates]: https://github.com/Enet4/dicom-rs#library

<script defer src="js/in-viewport.js"></script>
<div class="crates">

- dicom-object
- dicom-dump
- dicom-json
- dicom-pixeldata
- dicom-ul
- dicom-dictionary-std
- dicom-transfer-syntax-registry
- dicom-parser
- dicom-encoding
- dicom-core

</div>

### Example

Fetch a DICOM file and read its contents as a dictionary of data set elements.

```rust
use dicom::object::open_file;
use dicom::dictionary_std::tags;

let obj = open_file("path/to/IMAGES/0001.dcm")?;
let patient_name = obj.element(tags::PATIENT_NAME)?
    .to_patient_name()?;
let modality = obj.element(tags::MODALITY)?
    .to_str()?;

println!("{} case of patient {}", modality, patient_name);
```

## Bring it to the Web

Rich DICOM applications can be delivered to the browser
using [WebAssembly](https://webassembly.org).

<div id="dicom-dump-container">
    DICOM dump app not loaded
</div>
<script defer type="module" src="./js/dicom-dump-app.js"></script>

See also a [simple proof-of-concept DICOM viewer][viewer]
made with DICOM-rs.

[viewer]: https://enet4.github.io/simple-dicom-viewer/

## Tools

DICOM-rs gives you cross-compatible command line tools
for various operational needs.

- `dicom-dump` to inspect the contents of DICOM files;
- `dicom-toimage` to turn DICOM files into general image files;
- `dicom-storescu` to send DICOM files to a DICOM device;
- `dicom-findscu` to query a DICOM device;
- [and more]!

These tools are standalone and can be downloaded [here][releases].
Windows and linux binaries are available.

[and more]: https://github.com/Enet4/dicom-rs#tools
[releases]: https://github.com/Enet4/dicom-rs/releases

## Free and open

DICOM-rs embraces the open source software model
with a permissive license
(dual license Apache 2.0 OR MIT),
enabling its use in academia and professional software.

## Community{community}

- See the official [GitHub repository]
  to follow the development process,
  report issues,
  and open [discussion].
- For real time chatting about DICOM-rs,
  see the [DICOM-rs Zulip].
- All interactions must abide to the community [Code of Conduct].

[GitHub repository]: https://github.com/Enet4/dicom-rs
[discussion]: https://github.com/Enet4/dicom-rs/discussions
[DICOM-rs Zulip]: https://dicom-rs.zulipchat.com
[Code of Conduct]: https://github.com/Enet4/dicom-rs/blob/master/CODE_OF_CONDUCT.md
