use std::io::BufReader;
use std::fs::File;
// use std::io::Read;
use gpx::read;
// use gpx::{Gpx, Track, TrackSegment};
use gpx::{Gpx};

#[derive(Debug)] 
pub struct Activity {
    pub gpx: Gpx,
}

impl Activity {
    pub fn new(filename: &str) -> Result<Self, Box<dyn std::error::Error>> {
        // YOOO this is reading from src-tauri directory
        let file = File::open(filename)?;
        let reader = BufReader::new(file);
        let gpx: Gpx = read(reader)?;
        Ok(Activity { gpx })
    }
}