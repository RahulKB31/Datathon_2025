
## About CODEX

OpenAI’s Codex is a software engineering agent launched in May 2025 that integrates with ChatGPT (for Pro, Team, and Enterprise users) and with developer workflows through an open‑source Codex CLI. It’s powered a user-specified LLM, and works best with OpenAI’s o3 model, and is trained on large amounts of real‑world code and programming workflows. Codex can interpret natural language prompts like “fix this bug” or “write tests for this function,” then run tasks in isolated environments with access to your repository. It can generate pull requests, execute tests and linters, perform static analysis, and propose structured code changes—all in parallel, effectively acting like a highly efficient AI coding assistant.


### GenAI Company Guidelines

Please use GenAI within ZEISS! to help you, we have published an ever growing and changing number of GenAI trainings on curioz, about best practices, employee guidelines, the EU AI act, and prompt engineering. We *strongly reccommend* that go there and check them out before continuing.
https://zeiss.csod.com/ui/lms-learner-search/search?query=genai



### Why is it useful CODEX

Codex is useful because it dramatically speeds up development by automating repetitive or boilerplate tasks, freeing human developers to focus on higher‑level design, architecture, and problem‑solving. It’s also a powerful educational tool, helping new programmers by explaining code, suggesting fixes, and boosting learning outcomes without undermining long‑term skill retention. Practical use cases include test generation, debugging, documentation support, code refactoring, and integration with GitHub or command‑line workflows. In essence, Codex functions as an AI teammate, handling the grunt work and letting developers concentrate on the creative and strategic aspects of software engineering.


## Contributing to this codebase

### Bi-yearly ish updates from the maintainer team
This codebase will be synched occasionally with the public github version of codex, https://github.com/openai/codex . We download it, remove some unnesssary scaffolding, host it here: https://zeiss.ghe.com/ZDP/codex-llmlite/actions
 and run it though ZEISS security checks, the outcomes of which you can see here. (if you have access).

https://zeiss.app.blackduck.com/api/projects/aa7daf42-28bb-4d02-9b30-fac90c17e023/versions/c538a989-4f0e-4a56-96d8-613416ef44d3/components?filter=bomInclusion%3Afalse&filter=bomMatchInclusion%3Afalse&filter=bomMatchReviewStatus%3Areviewed&filter=securityRisk%3Ahigh&filter=securityRisk%3Acritical&filter=securityRisk%3ACRITICAL&limit=100&offset=0
 

### user-submitted pull requests

If you want make changes, or find bugs to squish, then you can a) make a pull request on the official https://github.com/openai/codex  page, and at some point, if accepted them will be merged with this version, or b) submit a pull request. We might be slow responding to it. If it is really critical, please reach out to the maintainer team.

### Maintainer Team
Raffaella Capasso
Ben Hoyle
Reza Norouzian



## Installation Instructions

If you need debug help, use this assistant: [OpenGPT Assistant](https://www.opengpt-assistants.zeiss.com/assistant/811839d9-ef5a-42b4-86dd-c455a1499b40)


### Update Your SSL Certificates

#### Obtaining Cert Files

You might need to update your certificate files. SSL errors are the typical reason to do this. To do this follow this link
https://zeisspki.zeiss.com/cert/  and get the Carl-Zeiss-AG-Root-CA.crt file.



### Installing CODEX on Windows


1. Get nvm for Windows: [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows/releases)
2. Run the following commands:
   ```bash
   nvm install 22.10.0 --strict-ssl=false
   nvm use 22
   ```
3. Open CMD as admin
4. Navigate to the `codex/codex-cli` directory:
   ```bash
   cd codex/codex-cli
   ```
5. Enable corepack:
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

**Important Note:** If this command does not work, it is most likely related to certificate issues. Please follow this [guide to fix certificate issues](https://zeissprod.service-now.com/it4u?id=cz_kb_article&sys_id=3cbb5e43479f5a10ae9a4e3a516d4313), downloading the Zscaler root Certificate in .crt format and performing the steps described in the NPM section.

6. Install dependencies and build:
   ```bash
   pnpm install
   pnpm build
   ```

### Set Up Environment Variables (Windows)

1. Create a codex.bat file with this content:
```
@echo off
set OPENAI_BASE_URL=<YOUR_OPENAI_BASE_URL>
set OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
set OPENAI_API_TYPE=azure
set YOURPATHTOCODEX=<YOUR_CODEX_PATH>
node %YOURPATHTOCODEX%\codex\codex-cli\bin\codex.js --approval-mode suggest --model gpt-5-mini
```

**Note:** Replace `<YOUR_OPENAI_BASE_URL>` and `<YOUR_OPENAI_API_KEY>` with the actual values. If you do not have these keys, please get in touch with us to obtain them. Also replace `<YOUR_CODEX_PATH>` with your actual path to the codex folder.

2. Add the path to the folder containing `codex.bat` to your `PATH`.
- Go to **System Environment Variables** → **PATH** → **Edit** → **New**, and paste the folder path
- For example, if you created `codex.bat` in the `codex-llmlite` folder itself, use:
```
C:\Users\YOURNAME\codex-llmlite
```

You have now completed the installation steps! Skip the Mac-specific instructions below and proceed directly to [Running CODEX](#running-codex).

## Installing CODEX on Linux/Mac

1. Unzip CODEX and navigate to the `codex/` directory.
2. Follow the build instructions in the terminal.


#### Installing Cert Files 

Assuming you got the Carl-Zeiss-AG-Root-CA.crt file from above.


Run the following command to update your SSL certificates:
```bash
cat /usr/local/share/ca-certificates/Carl-Zeiss-AG-Root-CA.crt >> /etc/ssl/certs/ca-certificates.crt
```

### Start Installing CODEX -- newer and maintained Rust version

1. Navigate to the `codex/codex-rs` directory:
   ```bash
   cd codex/codex-rs
   ```
2. Install rust:

   ```bash
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup default stable
   ```


3. Install dependencies and build:
   ```bash
   cargo build --release
   ```

#### The binary should be here after build:
```bash
%> ./target/release/codex --version
```

4. Adding Ben's instruction set, and setting the config files
in ~/.codex/ copy the instructions.md file and config.toml file

then in ~/.zprofile set a environment shortcut:

-- either use short-term (hacky but fast) credentials
```bash
alias codex1='\
  ZEISS_LITELLM_GATEWAY_KEY="<Ask Ben>" \
  PATH_TO_CODEX-RS/target/release/codex --profile litellm  '
```

or if using the GenAI platform to get your API keys, which is the preferred and longer term, stable, and scalable solution.
```bash
alias codex1='\
  GENAI_PLATFORM_URL="<Ask Sladjan>" \
  GENAI_PLATFORM_API_KEY="<Ask Sladjan>" \
  PATH_TO_CODEX-RS/target/release/codex --profile genai_platform  '
```

then run codex from the command line:
```bash
%> codex1
```




#### Using a different LLM provider
You can now set your LLM provider to be a local version of OLLAMA or DeepSeek or OSS. only do this if you know what you are doing, llmlight/ directory can help you.



## Running CODEX

Navigate to any directory and in your terminal run:
```bash
codex

```

## Does and Dont's

- **Does**
  - Route everything through the company gateway (your proxy/litellm/ingress) and company-hosted models only. Block raw direct calls to public endpoints unless explicitly approved. (See Azure OpenAI privacy + architecture best practices.) 
  - Lock down networking: use VNets/private endpoints, RBAC, and least-privilege access; prefer “on your data” with per-index ACLs. 
  - Keep Codex up to date and track its changelog for behavior/security tweaks that affect workflows, pull this from the innerSource repo.
  - Check out good practices online. 
  - Ask codex what it can do, when you open it in a repo!

- **Dont's**
  - Don’t run Codex in Full-Auto with network on sensitive repos by default; don’t let it write outside the workspace without explicit approval.
  - Don’t grant sudo/admin or let Codex modify OS/global config; keep it sandboxed to the project.
  - Don’t let Codex commit straight to main or publish artifacts; require PRs, reviewers, and CI security gates.
  - Don’t enable open internet tooling (package upgrades, curl, wget) without pinning versions/lockfiles and reviewing diffs.
  - Don’t bypass the company proxy or talk directly to public OpenAI endpoints from dev laptops. Use the sanctioned enterprise/Azure route.
  - Don’t paste secrets/PII/regulatory data (customers, medical, export-controlled, etc.) into prompts or chat—Codex doesn’t need your prod tokens to write a unit test.


Use Codex approval modes wisely: keep it in Read-only/Chat (IDE) or non-Auto when you’re in sensitive repos; only grant network or out-of-workspace access when necessary and explicit.

## Approval Modes

Choose the approval mode based on your comfort level. Start with lower approval trust and adjust as you gain confidence.

- **Suggest (default):**
  - May do without asking: Read any file in your repo.
  - Needs approval for: All file writes/patches & any shell commands.
  - When to use: You’re feeling cautious or working in uncharted code territory.

- **Auto-Edit:**
  - May do without asking: Read and apply-patch writes to files.
  - Needs approval for: All shell/Bash commands.
  - When to use: You trust CODEX to rewrite code but don’t want it running random commands.

- **Full-Auto:**
  - May do without asking: Read/write files and execute shell commands.
  - Sandbox guards:
    - Network disabled (no surprise curl downloads).
    - Confined to your current working directory (and temp/cache dirs).
  - When to use: You’re in a safe, version-controlled sandbox and want zero friction.

## Additional Resources

- For writing a product specification, use this assistant tool: [OpenGPT Assistant](https://www.opengpt-assistants.zeiss.com/assistant/bbc4afb2-9f94-435a-9ac5-9fb18815f0ed)

## Admin Information

Navigate to the `llmlite/` directory and log in to Azure:
```bash
az login
az acr login --name zdpgenaidevcontainer
```

Build and push the Docker image:
```bash
docker buildx build --platform linux/amd64 -t zdpgenaidevcontainer.azurecr.io/litellm-proxy:v4 -f Dockerfile . --push
```
