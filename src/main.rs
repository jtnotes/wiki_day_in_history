use serde_derive::{Deserialize, Serialize};
// use warp::{http::Response, Filter};
use actix_files;
use actix_files::NamedFile;
use actix_web::http::{header, Method, StatusCode};
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder, Result};
use yaml_rust::{YamlEmitter, YamlLoader};

use std::fs;
use std::net::{IpAddr, SocketAddr, ToSocketAddrs};
use std::path::Path;
use std::path::PathBuf;
use std::process;

const DEFAULT_HOST: &str = "localhost";
const DEFAULT_PORT: u16 = 5050;
const APP_NAME: &str = "wdih";
const PID_FILE_NAME: &str = "wdih.pid";
const STATIC_FOLDER: &str = "./static";
const INDEX_FILE: &str = "index.html";

#[derive(Deserialize, Serialize)]
struct WikiGetResponse {
    markup: String,
}

#[derive(Deserialize)]
struct WikiDate {
    month: u32,
    day: u32,
}

async fn index(_req: HttpRequest) -> Result<NamedFile> {
    let path: PathBuf = format!("{}/{}", STATIC_FOLDER, INDEX_FILE).parse().unwrap();
    Ok(NamedFile::open(path)?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    //save pid
    fs::write("./".to_string() + PID_FILE_NAME, process::id().to_string())
        .expect("Unable to write pid file");

    //load config
    let fn_config = "./config.yml";
    let port: u16;
    let s_host: &str;
    let docs;
    if Path::new(fn_config).exists() {
        let s_config =
            fs::read_to_string(fn_config).expect("Something went wrong reading the file");
        docs = YamlLoader::load_from_str(s_config.as_str()).unwrap();
        let doc = &docs[0];

        if doc["host"].as_str().is_some() {
            s_host = doc["host"].as_str().unwrap();
        } else {
            s_host = DEFAULT_HOST;
        }
        if doc["port"].as_i64().is_some() {
            port = doc["port"].as_i64().unwrap() as u16;
        } else {
            port = DEFAULT_PORT;
        }
    } else {
        s_host = DEFAULT_HOST;
        port = DEFAULT_PORT;
    }

    //start
    println!("Server is running: http://{}:{}", s_host, port);

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .service(actix_files::Files::new("/", STATIC_FOLDER))
    })
    .bind(format!("{}:{}", s_host, port))?
    .run()
    .await
}
