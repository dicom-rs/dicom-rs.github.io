use dicom_core::dictionary::DataDictionary;
use dicom_core::VR;
use dicom_dictionary_std::tags;
use dicom_dictionary_std::StandardDataDictionary;
use dicom_object::file::ReadPreamble;
use dicom_object::OpenFileOptions;
use dicom_object::{mem::InMemElement, FileMetaTable, InMemDicomObject};
use serde::Deserialize;
use serde::Serialize;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[derive(Debug, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct El {
    tag: String,
    alias: &'static str,
    vr: &'static str,
    value: String,
}

type Result<T, E = JsError> = std::result::Result<T, E>;

#[wasm_bindgen]
pub fn dump_to_json(raw_dicom_data: &[u8]) -> Result<JsValue> {
    let options = OpenFileOptions::new()
        .read_until(tags::PIXEL_DATA)
        .read_preamble(ReadPreamble::Always);
    let obj = options.from_reader(raw_dicom_data)?;

    let mut out = Vec::new();
    meta_to_json(obj.meta(), &mut out)?;
    obj_to_json(&obj, &mut out)?;

    Ok(serde_wasm_bindgen::to_value(&out)?)
}

fn meta_to_json(obj: &FileMetaTable, out: &mut Vec<El>) -> Result<()> {
    out.reserve(4);

    let ts = obj.transfer_syntax();
    out.push(El {
        tag: tags::TRANSFER_SYNTAX_UID.to_string(),
        alias: "Transfer Syntax UID",
        vr: VR::UI.to_string(),
        value: ts.to_string(),
    });

    let sop_class_uid = obj.media_storage_sop_class_uid();
    out.push(El {
        tag: tags::MEDIA_STORAGE_SOP_CLASS_UID.to_string(),
        alias: "Media Storage SOP Class UID",
        vr: VR::UI.to_string(),
        value: sop_class_uid.to_string(),
    });

    let sop_instance_uid = obj.media_storage_sop_instance_uid();
    out.push(El {
        tag: tags::MEDIA_STORAGE_SOP_INSTANCE_UID.to_string(),
        alias: "Media Storage SOP Instance UID",
        vr: VR::UI.to_string(),
        value: sop_instance_uid.to_string(),
    });

    let impl_class_uid = obj.implementation_class_uid();
    out.push(El {
        tag: tags::IMPLEMENTATION_CLASS_UID.to_string(),
        alias: "Implementation Class UID",
        vr: VR::UI.to_string(),
        value: impl_class_uid.to_string(),
    });

    Ok(())
}

fn obj_to_json(obj: &InMemDicomObject, out: &mut Vec<El>) -> Result<()> {
    out.extend(
        obj.iter()
            // remove sequence items
            .filter(|e| !e.header().is_non_primitive())
            .map(to_el)
            .collect::<Result<Vec<_>>>()?,
    );
    Ok(())
}

fn to_el(e: &InMemElement) -> Result<El> {
    let tag = e.header().tag;
    Ok(El {
        tag: tag.to_string(),
        alias: StandardDataDictionary
            .by_tag(tag)
            .map(|entry| entry.alias)
            .unwrap_or("«unknown attribute»"),
        vr: e.header().vr().to_string(),
        value: e.value().to_str()?.to_string(),
    })
}
