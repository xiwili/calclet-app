// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(
            Menu::new()
                .add_submenu(Submenu::new(
                    "File",
                    Menu::new()
                        .add_item(CustomMenuItem::new("new", "New").accelerator("cmdOrControl+N"))
                        .add_item(CustomMenuItem::new("open", "Open").accelerator("cmdOrControl+O"))
                        .add_item(
                            CustomMenuItem::new("saveAs", "Save As...")
                                .accelerator("cmdOrControl+Shift+S"),
                        )
                        .add_item(CustomMenuItem::new("save", "Save").accelerator("cmdOrControl+S"))
                        .add_item(
                            CustomMenuItem::new("close", "Close").accelerator("cmdOrControl+Q"),
                        ),
                ))
                .add_submenu(Submenu::new(
                    "Develop",
                    Menu::new()
                        .add_item(CustomMenuItem::new("run", "Run").accelerator("cmdOrControl+R"))
                        .add_item(
                            CustomMenuItem::new("clear", "Clear").accelerator("cmdOrControl+C"),
                        ),
                ))
                .add_submenu(Submenu::new(
                    "Help",
                    Menu::new()
                        .add_item(
                            CustomMenuItem::new("about", "About").accelerator("cmdOrControl+A"),
                        )
                        .add_item(
                            CustomMenuItem::new("docs", "Docs").accelerator("cmdOrControl+D"),
                        ),
                )),
        )
        .on_menu_event(|event| match event.menu_item_id() {
            "new" => {
                let _ = event.window().emit("menu-event", "new-event").unwrap();
            }
            "open" => {
                let _ = event.window().emit("menu-event", "open-event").unwrap();
            }
            "saveAs" => {
                let _ = event.window().emit("menu-event", "saveAs-event").unwrap();
            }
            "save" => {
                let _ = event.window().emit("menu-event", "save-event").unwrap();
            }
            "close" => {
                event.window().close().unwrap();
            }
            "run" => {
                let _ = event.window().emit("menu-event", "run-event").unwrap();
            }
            "clear" => {
                let _ = event.window().emit("menu-event", "clear-event").unwrap();
            }
            "about" => {
                let _ = event.window().emit("menu-event", "about-event").unwrap();
            }
            "docs" => {
                let _ = event.window().emit("menu-event", "docs-event").unwrap();
            }
            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}
