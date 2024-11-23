mod mods;

// use serde_json::Value;
use plotters::prelude::*;

#[tauri::command]
fn generate_demo_frame(_config_string: &str, gpx_filename: &str) -> String {
    // this is fucked. fix
    let prefix: &str = "/Users/walker/Downloads/";
    let activity = mods::activity::Activity::new(&format!("{}{}", prefix, gpx_filename));
    // println!("{:?}", activity);

    // let _parsed_json: Value = serde_json::from_str(config_string).expect("invalid json what is this expect for? chat gpt said?");
    let filename = "../public/generated.png";
    
    // Create a drawing area of 800x600 pixels
    let root_area = BitMapBackend::new(filename, (800, 600))
        .into_drawing_area();
    root_area.fill(&WHITE).unwrap();

    // Create a chart builder
    let mut chart = ChartBuilder::on(&root_area)
        .caption("y = x", ("sans-serif", 50))
        .margin(20)
        .x_label_area_size(40)
        .y_label_area_size(40)
        .build_cartesian_2d(-3.0..3.0, -3.0..3.0)
        .unwrap();

    chart.configure_mesh().draw().unwrap();

    // Draw the function y = x
    chart.draw_series(LineSeries::new(
        (-300..=300).map(|x| x as f64 / 100.0).map(|x| (x, x)),
        &BLUE,
    )).unwrap();

    // Save the drawing
    root_area.present().unwrap();

    filename.to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![generate_demo_frame])
        // .invoke_handler(tauri::generate_handler![greet, generate_demo_frame])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
