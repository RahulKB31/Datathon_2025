# MCP Client Example

This project demonstrates how to authenticate with **Azure Entra ID** and interact with the **ZEISS Brand MCP Server** using a Jupyter Notebook.

## Prerequisites

* Python **3.13** (or compatible version)

## Setup

1. Extract files and open directory in terminal.

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Linux / macOS
   .venv\Scripts\activate      # Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

   **requirements.txt**

   ```
   msal
   requests
   flask
   python-dotenv
   notebook
   fastmcp
   ```

## Running the Notebook

1. Start Jupyter Notebook:

   ```bash
   jupyter notebook
   ```

2. Open the notebook file:

   ```
   MCP-Client.ipynb
   ```

3. Run the cells **from top to bottom**:

   * **Authentication**: The notebook will trigger **device code flow**. Follow the printed instructions, open [https://microsoft.com/devicelogin](https://microsoft.com/devicelogin), and enter the code.
   * **MCP Client Connection**: Verifies connectivity and lists available tools, resources, and prompts.
   * **Demo Sections**: Showcases how to call tools, render prompts, and read resources.

## Example Output

* List of available **tools** (e.g. `get_zeiss_brand_tone_of_voice`)
* Available **resources** (e.g. `resource://zeiss/brand/tone-of-voice.json`)
* Available **prompts** (e.g. `prompt_ai_charachters`)
* Example tool call returning JSON content from the MCP server
