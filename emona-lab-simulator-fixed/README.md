# EMONA Telecoms-Trainer 101 — Patch Practice Simulator

A static, GitHub-Pages-ready practice app for rehearsing patch-cord connections on the **EMONA Telecoms-Trainer 101**.

The trainer photograph is used directly as the visual background. Transparent socket hotspots sit over the real sockets, and the app draws loose patch leads on top of the photograph.

## What is fixed in this version

- Round analogue sockets are patchable.
- Square digital sockets are patchable.
- `+5V`, `VDC`, `GND`, `CLK`, `FS`, `PCM DATA`, `OUTPUT 1`, `OUTPUT 2`, sequence-generator sockets, master digital signals, comparator output, and tuneable-LPF `fc×100` are mapped.
- The app does **not** impose input/output rules. Any socket may connect to any other socket, including output-to-output, because this tool is for physical connection rehearsal rather than electrical simulation.
- Patch leads can be made by dragging socket-to-socket or by clicking the two sockets.
- Click a lead itself to remove it, or use **Undo/Clear**.
- **Show sockets** displays every hotspot for quick calibration/checking.
- Practice tasks are editable in `socket-map.js`.

## Run locally in VS Code

The easiest option is the VS Code **Live Server** extension:

1. Open this folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

You can also run a simple local server from the terminal:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new GitHub repository, for example `emona-lab-simulator`.
2. Put all files in this folder at the repository root.
3. Push to the `main` branch.
4. On GitHub open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`.
7. Save. GitHub will give you a public Pages URL.

No build step, framework, backend, API key, or npm install is required.

## Terminal commands for a new repository

```bash
git init
git add .
git commit -m "Initial EMONA patch practice simulator"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/emona-lab-simulator.git
git push -u origin main
```

Then enable GitHub Pages as described above.

## Fine-tuning a socket

All socket positions are in `socket-map.js` and use the original image's pixel coordinates (`1281 × 1097`). Example:

```js
{id:'pcm_enc_data', label:'PCM ENCODER · PCM DATA', x:546, y:915, type:'square'}
```

If a hotspot is a few pixels off:

1. Press **Show sockets** in the simulator.
2. Find the socket.
3. Change its `x` or `y` in `socket-map.js`.
4. Refresh the page.

Because the coordinates are converted to percentages at runtime, they stay aligned when the photo scales on different screens.

## Add your lab-compre questions

Add a task to `EMONA_TASKS` in `socket-map.js`:

```js
{
  id:'my_question',
  name:'My practical question',
  text:'Connect A to B, then C to D.',
  hint:'Optional hint',
  connections:[
    ['socket_id_a','socket_id_b'],
    ['socket_id_c','socket_id_d']
  ]
}
```

The checker treats each connection as undirected, which is useful for cable practice.

## Important

This app checks **where patch leads are connected**. It does not calculate voltages, modulation, waveforms, or whether a physical connection is electrically safe/correct. Use the actual lab manual/instructor procedure for the real experiment.

## Interactive switch controls

The photographed board has **three functional switches**. Click their locations on the image to flip the switch handle:

- **VCO**: HI ↔ LO (near the lower VCO input/sine sockets)
- **Phase Shifter**: 0° ↔ 180° (upper part of Phase Shifter module)
- **PCM Encoder**: PCM ↔ TDM (bottom panel PCM Encoder module)

The current values appear below the board. **Reset switches** restores the initial practice state. The new VCO / Phase Shifter / PCM tasks check switch states as well as connections. Initial values are simulator defaults, not claimed positions of the real hardware.

To reposition a switch for a different board photo, edit `switchDefs` in `app.js` (coordinates are pixels in the 1281 × 1097 photo). This is a visual wiring trainer, not a circuit simulator.


## Switch controls (v3 fix)

Three switches can be changed either by clicking the controls on the photo or by the clearly labelled buttons below the photo. Choose VCO HI/LO, PHASE SHIFTER 0°/180°, PCM ENCODER PCM/TDM. The state label and the photo-overlay handle update together. If your browser still displays the prior project, use a fresh folder and force-refresh (Cmd+Shift+R).
