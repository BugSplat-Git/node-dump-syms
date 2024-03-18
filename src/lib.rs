// lib.rs

// Assuming all necessary dependencies are in your Cargo.toml
use dump_syms::common::{self, EXTRA_INFO};
use dump_syms::dumper::{self, Config, Output};
use once_cell::sync::Lazy;
use regex::Regex;
use std::collections::HashMap;
use std::path::PathBuf;

mod action;
use action::Action;

static INFO_LINE_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^[A-Z_]+ .*").unwrap());

/// Initializes and executes the Action::Dump with the provided configuration.
///
/// # Arguments
/// * `filenames` - A vector of filenames to dump symbols from.
/// * `output_path` - Optional path to output the symbols to. If None, stdout is used.
/// * `store_directory` - Optional directory to store output files, following the FILENAME.pdb/DEBUG_ID/FILENAME.sym structure.
/// * `config_options` - Additional configuration options as key-value pairs.
///
/// # Returns
/// * Result<(), String> - Ok(()) if successful, Err with an error message otherwise.
pub fn dump_symbols(
    filenames: Vec<String>,
    output_path: Option<String>,
    store_directory: Option<String>,
    config_options: HashMap<String, String>,
) -> Result<(), String> {
    let output = match (output_path, store_directory) {
        (Some(out), Some(store)) => Output::FileAndStore {
            file: dumper::FileOutput::from(&out[..]), // TODO BG wut
            store_directory: PathBuf::from(store), // TODO BG wut
        },
        (Some(out), None) => Output::File(dumper::FileOutput::from(&out[..])), // TODO BG wut
        (None, Some(store)) => Output::Store(PathBuf::from(store)),            // TODO BG wut
        (None, None) => Output::File(dumper::FileOutput::Stdout),
    };

    let arch = config_options
        .get("arch")
        .unwrap_or(&common::get_compile_time_arch().to_string())
        .to_string();
    let num_jobs = config_options
        .get("num_jobs")
        .and_then(|n| n.parse::<usize>().ok())
        .unwrap_or_else(num_cpus::get);

    // Setup EXTRA_INFO based on `config_options` if needed
    // This is a simplified example. You might want to handle errors and edge cases more robustly.
    if let Some(extra_info) = config_options.get("extra_info") {
        if !INFO_LINE_RE.is_match(extra_info) {
            return Err("Invalid format for extra_info".to_string());
        }
        EXTRA_INFO.set(vec![extra_info.clone()]).unwrap();
    }

    let config = Config {
        output,
        symbol_server: config_options.get("symbol_server").map(String::as_str),
        debug_id: config_options.get("debug_id").map(String::as_str),
        code_id: config_options.get("code_id").map(String::as_str),
        arch: &arch,
        num_jobs,
        check_cfi: config_options
            .get("check_cfi")
            .map_or(false, |v| v == "true"),
        emit_inlines: config_options
            .get("emit_inlines")
            .map_or(false, |v| v == "true"),
        mapping_var: None,  // Handle mappings if necessary
        mapping_src: None,  // Handle mappings if necessary
        mapping_dest: None, // Handle mappings if necessary
        mapping_file: config_options.get("mapping_file").map(String::as_str),
    };

    let action = Action::Dump(config);

    match action.action(&filenames.iter().map(AsRef::as_ref).collect::<Vec<&str>>()) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

use neon::prelude::*;

fn dump_symbols_wrapper(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let filenames_js_array = cx.argument::<JsArray>(0)?.to_vec(&mut cx)?;
    let filenames: Vec<String> = filenames_js_array
        .into_iter()
        .map(|val| {
            val.downcast::<JsString, FunctionContext>(&mut cx)
                .unwrap()
                .value(&mut cx)
        })
        .collect();

    let output_path = cx
        .argument_opt(1)
        .and_then(|val| val.downcast::<JsString, FunctionContext>(&mut cx).ok())
        .map(|js_string| js_string.value(&mut cx));

    let store_directory = cx
        .argument_opt(2)
        .and_then(|val| val.downcast::<JsString, FunctionContext>(&mut cx).ok())
        .map(|js_string| js_string.value(&mut cx));

    // Example: converting a simple JS object of options into a Rust HashMap.
    // Adjust this based on how complex your `config_options` need to be.
    let config_options = HashMap::new(); // You might want to populate this based on additional function arguments.

    // Call the original Rust library function
    match dump_symbols(filenames, output_path, store_directory, config_options) {
        Ok(_) => Ok(cx.undefined()),
        Err(e) => cx.throw_error(e),
    }
}

// A Neon module exporting the wrapper function
#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    simple_logger::init().unwrap();
    log::info!("This is an info message");
    cx.export_function("dumpSymbols", dump_symbols_wrapper)?;
    Ok(())
}
