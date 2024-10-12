const { invoke } = window.__TAURI__.tauri;
const { readTextFile, writeFile } = window.__TAURI__.fs;
const { save, open, message } = window.__TAURI__.dialog;
const { listen } = window.__TAURI__.event;

let filePath = "./";
let text = "//Another Calclet";

let editor = ace.edit("editor");

listen("menu-event", (e) => {
    console.log(e.payload);
    switch (e.payload) {
        case "new-event":
            NewFile();
            break;
        case "open-event":
            OpenFile();
            break;
        case "saveAs-event":
            SaveAsFile();
            break;
        case "save-event":
            SaveFile();
            break;
        case "run-event":
            RunProgram();
            break;
        case "clear-event":
            ClearOutput();
            break;
        case "about-event":
            About();
            break;
        case "docs-event":
            Docs();
            break;
        default:
            break;
    }
});

const NewFile = async () => {
    try {
        SaveFile();
    } catch (e) {
        console.log(e);
    }
};

const OpenFile = async () => {
    try {
        let newFilePath = await open();
        console.log(newFilePath);
        filePath = newFilePath;
        let content = await readTextFile(newFilePath);
        console.log("in open file", content);
        text = content;
        editor.setValue(text, -1);
        console.log("check text: ", text);
        console.log("check filePath: ", filePath);
    } catch (e) {
        console.log(e);
    }
};

const SaveAsFile = async () => {
    try {
        let newFilePath = await save();
        filePath = newFilePath;
        text = editor.getValue();
        await writeFile({ contents: text, path: newFilePath, });
    } catch (e) {
        console.log(e);
    }
};

const SaveFile = async () => {
    try {
        text = editor.getValue();
        console.log("in save file content", text);
        console.log("in save file check filePath: ", filePath);
        if (filePath !== undefined) {
            await writeFile({ contents: text, path: filePath, });
        }
    } catch (e) {
        console.log(e);
    }
};

const RunProgram = async () => {
    try {
        document.getElementById('outputWindow').innerHTML = '';
        text = editor.getValue();

        let code = "function outputText(str) {document.getElementById('outputWindow').innerHTML += str;}"
            + "OUTPUTWINDOW = document.getElementById('outputWindow');"
            + text;
        new Function(code)();
    } catch (e) {
        console.log(e);
    }
};

const ClearOutput = async (text) => {
    try {
        document.getElementById('outputWindow').innerHTML = '';
    } catch (e) {
        console.log(e);
    }
};

const About = async () => {
    try {
        console.log("about");
        await message('A compact cross-platform app for scientific computing\n version 0.1.0', 'About Calclet');
    } catch (e) {
        console.log(e);
    }
};

