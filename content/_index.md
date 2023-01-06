+++
title = "DICOM-rs"
sort_by = "weight"
weight = 9999
+++

**DICOM-rs** is an ecosystem of libraries and tools
for working with DICOM systems.

- Built in the Rust programming language for performance and reliability
- Work with DICOM meta-data and pixel data with ease
- Communicate with existing DICOM systems
- Prepared for all environments
- Free to use and extend, for any purpose

## Using as a library

Start using it right now by adding the [`dicom`] crate to your project,
or by picking exactly what you need
from the [various crates] in the DICOM-rs umbrella.

[`dicom`]: https://crates.io/crates/dicom
[various crates]: https://github.com/Enet4/dicom-rs#library

```toml
[dependencies]
dicom = "0.5"
```

Fetch a DICOM file and read its contents as a dictionary of elements.

```rust
use dicom::object::open_file;
use dicom::dictionary_std::tags;

let obj = open_file("path/to/IMAGES/0001.dcm")?;
let patient_name = obj.element(tags::PATIENT_NAME)?.to_patient_name()?;
let modality = obj.element(tags::MODALITY)?.to_str()?;

println!("{} case of patient {}", modality, patient_name);
```

Rich DICOM applications can be delivered to a browser
using WebAssembly.

## Tools

DICOM-rs also gives you cross-compatible command line tools
for various operational needs.

- `dicom-dump` to inspect the contents of DICOM files;
- `dicom-toimage` to turn DICOM files into general image files;
- `dicom-storescu` to send DICOM files to a storage device;
- [and more]!

These tools are standalone and can be downloaded [here][releases].
Windows and linux builds are available.

[and more]: https://github.com/Enet4/dicom-rs#tools
[releases]: https://github.com/Enet4/dicom-rs/releases

## Free and open

DICOM-rs embraces the open source software model
with a permissive license
(dual license Apache 2.0 OR MIT),
enabling its use both in academia and as part of professional software.

## Community

Follow the development process
and report issues
in the official [GitHub repository].
For real time chatting about DICOM-rs,
see the [DICOM-rs Zulip].
Check also the community [Code of Conduct].

[GitHub repository]: https://github.com/Enet4/dicom-rs
[DICOM-rs Zulip]: https://dicom-rs.zulipchat.com
[Code of Conduct]: https://github.com/Enet4/dicom-rs/blob/master/CODE_OF_CONDUCT.md
