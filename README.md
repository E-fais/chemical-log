
# Chemical Manager Electron App

This Electron application allows you to manage a list of chemicals, including adding new chemicals with their expiry dates and deleting existing chemicals. The list of chemicals is persisted in a JSON file in the user's data directory.

## Features

- Add new chemicals with a name and expiry date.
- Display the list of chemicals in a table.
- Delete chemicals from the list.
- The list of chemicals is saved and loaded from a JSON file.

## Prerequisites

- Node.js and npm installed on your machine.
- Electron installed globally or as a dev dependency in your project.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/chemical-manager-electron.git
   cd chemical-manager-electron
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the Electron app:
   ```sh
   npm start
   ```

2. The app window will open, showing a form to add new chemicals and a table displaying the existing chemicals.

## Project Structure

- `main.js`: Main process script that creates the application window and handles IPC communication.
- `preload.js`: Preload script that exposes IPC methods to the renderer process.
- `renderer.js`: Renderer process script that handles the form submission, loading, and deleting of chemicals.
- `index.html`: HTML file defining the user interface.
- `styles.css`: CSS file for styling the user interface.
- `package.json`: Project configuration and dependencies.

## IPC Communication

- `save-chemical`: Sent from the renderer process to the main process to save a new chemical.
- `load-chemicals`: Sent from the main process to the renderer process to load and display the list of chemicals.
- `request-chemicals`: Sent from the renderer process to the main process to request the list of chemicals when the page loads.
- `delete-chemical`: Sent from the renderer process to the main process to delete a chemical.

## License

This project is licensed under the MIT License
## Additional Information

### Dependencies

- Electron: The framework for building cross-platform desktop applications using web technologies.
