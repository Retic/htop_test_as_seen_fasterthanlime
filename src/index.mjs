import { h, render } from "https://unpkg.com/preact?module";
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

function App(props) {
    return html`
    ${props.cpus.map((cpu) => {
        return html` <div class="bar">
        <div class="bar-inner" style="width: ${cpu}%"></div>
        <label>${cpu.toFixed(2)}%</label>
        </div>`;
    })}
    `;
}

// setInterval(async () => {
//     let response = await fetch('/api/cpus');
//     if (response.status !== 200) {
//         throw new Error(`HTTP error! status: {response.status}`);
//     }

//     let json = await response.json();
//     render(html`<${App} cpus=${json}></${App}>`, document.body);

// }, 200);

let ws_url = new URL("/realtime/cpus", window.location.href);
ws_url.protocol = ws_url.protocol.replace("http", "ws");
let ws = new WebSocket(ws_url.href);
ws.onmessage = (ev) => {
    let json = JSON.parse(ev.data);
    console.log(json);
    render(html`<${App} cpus=${json}></${App}>`, document.body);
}
