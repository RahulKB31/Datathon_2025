<h1 align="center">OpenAI Codex CLI</h1>
<p align="center">Lightweight coding agent that runs in your terminal</p>

<p align="center"><code>npm i -g @openai/codex</code></p>

> [!IMPORTANT]
> This is the documentation for the _legacy_ TypeScript implementation of the Codex CLI. It has been superseded by the _Rust_ implementation. See the [README in the root of the Codex repository](https://github.com/openai/codex/blob/main/README.md) for details.

![Codex demo GIF using: codex "explain this codebase to me"](../.github/demo.gif)

---

<details>
<summary><strong>Table of contents</strong></summary>

<!-- Begin ToC -->

- [Experimental technology disclaimer](#experimental-technology-disclaimer)
- [Quickstart](#quickstart)
- [Why Codex?](#why-codex)
- [Security model & permissions](#security-model--permissions)
  - [Platform sandboxing details](#platform-sandboxing-details)
- [System requirements](#system-requirements)
- [CLI reference](#cli-reference)
- [Memory & project docs](#memory--project-docs)
- [Non-interactive / CI mode](#non-interactive--ci-mode)
- [Tracing / verbose logging](#tracing--verbose-logging)
- [Recipes](#recipes)
- [Installation](#installation)
- [Configuration guide](#configuration-guide)
  - [Basic configuration parameters](#basic-configuration-parameters)
  - [Custom AI provider configuration](#custom-ai-provider-configuration)
  - [History configuration](#history-configuration)
  - [Configuration examples](#configuration-examples)
  - [Full configuration example](#full-configuration-example)
  - [Custom instructions](#custom-instructions)
  - [Environment variables setup](#environment-variables-setup)
- [FAQ](#faq)
- [Zero data retention (ZDR) usage](#zero-data-retention-zdr-usage)
- [Codex open source fund](#codex-open-source-fund)
- [Contributing](#contributing)
  - [Development workflow](#development-workflow)
  - [Git hooks with Husky](#git-hooks-with-husky)
  - [Debugging](#debugging)
  - [Writing high-impact code changes](#writing-high-impact-code-changes)
  - [Opening a pull request](#opening-a-pull-request)
  - [Review process](#review-process)
  - [Community values](#community-values)
  - [Getting help](#getting-help)
  - [Contributor license agreement (CLA)](#contributor-license-agreement-cla)
    - [Quick fixes](#quick-fixes)
  - [Releasing `codex`](#releasing-codex)
  - [Alternative build options](#alternative-build-options)
    - [Nix flake development](#nix-flake-development)
- [Security & responsible AI](#security--responsible-ai)
- [License](#license)

<!-- End ToC -->

</details>

---

## Experimental technology disclaimer

Codex CLI is an experimental project under active development. It is not yet stable, may contain bugs, incomplete features, or undergo breaking changes. We're building it in the open with the community and welcome:

- Bug reports
- Feature requests
- Pull requests
- Good vibes

Help us improve by filing issues or submitting PRs (see the section below for how to contribute)!

## Quickstart

Installing on a MAC 


cd codex/codex-cli

# Enable corepack
corepack enable

# Install dependencies and build
pnpm install
pnpm build


```

</details>

---

## Configuration guide

Codex configuration files can be placed in the `~/.codex/` directory, supporting both YAML and JSON formats.

### Basic configuration parameters

| Parameter           | Type    | Default    | Description                      | Available Options                                                                              |
| ------------------- | ------- | ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `model`             | string  | `o4-mini`  | AI model to use                  | Any model name supporting OpenAI API                                                           |
| `approvalMode`      | string  | `suggest`  | AI assistant's permission mode   | `suggest` (suggestions only)<br>`auto-edit` (automatic edits)<br>`full-auto` (fully automatic) |
| `fullAutoErrorMode` | string  | `ask-user` | Error handling in full-auto mode | `ask-user` (prompt for user input)<br>`ignore-and-continue` (ignore and proceed)               |
| `notify`            | boolean | `true`     | Enable desktop notifications     | `true`/`false`                                                                                 |

### Custom AI provider configuration

In the `providers` object, you can configure multiple AI service providers. Each provider requires the following parameters:

| Parameter | Type   | Description                             | Example                       |
| --------- | ------ | --------------------------------------- | ----------------------------- |
| `name`    | string | Display name of the provider            | `"OpenAI"`                    |
| `baseURL` | string | API service URL                         | `"https://api.openai.com/v1"` |
| `envKey`  | string | Environment variable name (for API key) | `"OPENAI_API_KEY"`            |

### History configuration

In the `history` object, you can configure conversation history settings:

| Parameter           | Type    | Description                                            | Example Value |
| ------------------- | ------- | ------------------------------------------------------ | ------------- |
| `maxSize`           | number  | Maximum number of history entries to save              | `1000`        |
| `saveHistory`       | boolean | Whether to save history                                | `true`        |
| `sensitivePatterns` | array   | Patterns of sensitive information to filter in history | `[]`          |

### Configuration examples

1. YAML format (save as `~/.codex/config.yaml`):

```yaml
model: o4-mini
approvalMode: suggest
fullAutoErrorMode: ask-user
notify: true
```

2. JSON format (save as `~/.codex/config.json`):

```json
{
  "model": "o4-mini",
  "approvalMode": "suggest",
  "fullAutoErrorMode": "ask-user",
  "notify": true
}
```

### Full configuration example

Below is a comprehensive example of `config.json` with multiple custom providers:

```json
{
  "model": "o4-mini",
  "provider": "openai",
  "providers": {
    "openai": {
      "name": "OpenAI",
      "baseURL": "https://api.openai.com/v1",
      "envKey": "OPENAI_API_KEY"
    },
    "azure": {
      "name": "AzureOpenAI",
      "baseURL": "https://YOUR_PROJECT_NAME.openai.azure.com/openai",
      "envKey": "AZURE_OPENAI_API_KEY"
    },

  },
  "history": {
    "maxSize": 1000,
    "saveHistory": true,
    "sensitivePatterns": []
  }
}
```

### Custom instructions

You can create a `~/.codex/AGENTS.md` file to define custom guidance for the agent:

```markdown
- Always respond with emojis
- Only use git commands when explicitly requested
```

### Environment variables setup

For each AI provider, you need to set the corresponding API key in your environment variables. For example:

```bash
# OpenAI
export OPENAI_API_KEY="your-api-key-here"

# Azure OpenAI
export AZURE_OPENAI_API_KEY="your-azure-api-key-here"
export AZURE_OPENAI_API_VERSION="2025-04-01-preview" (Optional)

# OpenRouter
export OPENROUTER_API_KEY="your-openrouter-key-here"

# Similarly for other providers
```

---

## FAQ

<details>
<summary>OpenAI released a model called Codex in 2021 - is this related?</summary>

In 2021, OpenAI released Codex, an AI system designed to generate code from natural language prompts. That original Codex model was deprecated as of March 2023 and is separate from the CLI tool.

</details>

<details>
<summary>Which models are supported?</summary>

Any model available with [Responses API](https://platform.openai.com/docs/api-reference/responses). The default is `o4-mini`, but pass `--model gpt-4.1` or set `model: gpt-4.1` in your config file to override.

</details>
<details>
<summary>Why does <code>o3</code> or <code>o4-mini</code> not work for me?</summary>

It's possible that your [API account needs to be verified](https://help.openai.com/en/articles/10910291-api-organization-verification) in order to start streaming responses and seeing chain of thought summaries from the API. If you're still running into issues, please let us know!

</details>

<details>
<summary>How do I stop Codex from editing my files?</summary>

Codex runs model-generated commands in a sandbox. If a proposed command or file change doesn't look right, you can simply type **n** to deny the command or give the model feedback.

</details>
<details>
<summary>Does it work on Windows?</summary>

Not directly. It requires [Windows Subsystem for Linux (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/install) - Codex has been tested on macOS and Linux with Node 22.

</details>

---

## Zero data retention (ZDR) usage

Codex CLI **does** support OpenAI organizations with [Zero Data Retention (ZDR)](https://platform.openai.com/docs/guides/your-data#zero-data-retention) enabled. If your OpenAI organization has Zero Data Retention enabled and you still encounter errors such as:

```
OpenAI rejected the request. Error details: Status: 400, Code: unsupported_parameter, Type: invalid_request_error, Message: 400 Previous response cannot be used for this organization due to Zero Data Retention.
```

You may need to upgrade to a more recent version with: `npm i -g @openai/codex@latest`

---

## Codex open source fund

We're excited to launch a **$1 million initiative** supporting open source projects that use Codex CLI and other OpenAI models.

- Grants are awarded up to **$25,000** API credits.
- Applications are reviewed **on a rolling basis**.

**Interested? [Apply here](https://openai.com/form/codex-open-source-fund/).**

---

## Contributing

This project is under active development and the code will likely change pretty significantly. We'll update this message once that's complete!

More broadly we welcome contributions - whether you are opening your very first pull request or you're a seasoned maintainer. At the same time we care about reliability and long-term maintainability, so the bar for merging code is intentionally **high**. The guidelines below spell out what "high-quality" means in practice and should make the whole process transparent and friendly.

### Development workflow

- Create a _topic branch_ from `main` - e.g. `feat/interactive-prompt`.
- Keep your changes focused. Multiple unrelated fixes should be opened as separate PRs.
- Use `pnpm test:watch` during development for super-fast feedback.
- We use **Vitest** for unit tests, **ESLint** + **Prettier** for style, and **TypeScript** for type-checking.
- Before pushing, run the full test/type/lint suite:

### Git hooks with Husky

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality checks:

- **Pre-commit hook**: Automatically runs lint-staged to format and lint files before committing
- **Pre-push hook**: Runs tests and type checking before pushing to the remote

These hooks help maintain code quality and prevent pushing code with failing tests. For more details, see [HUSKY.md](./HUSKY.md).

```bash
pnpm test && pnpm run lint && pnpm run typecheck
```

- If you have **not** yet signed the Contributor License Agreement (CLA), add a PR comment containing the exact text

  ```text
  I have read the CLA Document and I hereby sign the CLA
  ```

  The CLA-Assistant bot will turn the PR status green once all authors have signed.

```bash
# Watch mode (tests rerun on change)
pnpm test:watch

# Type-check without emitting files
pnpm typecheck

# Automatically fix lint + prettier issues
pnpm lint:fix
pnpm format:fix
```

### Debugging

To debug the CLI with a visual debugger, do the following in the `codex-cli` folder:

- Run `pnpm run build` to build the CLI, which will generate `cli.js.map` alongside `cli.js` in the `dist` folder.
- Run the CLI with `node --inspect-brk ./dist/cli.js` The program then waits until a debugger is attached before proceeding. Options:
  - In VS Code, choose **Debug: Attach to Node Process** from the command palette and choose the option in the dropdown with debug port `9229` (likely the first option)
  - Go to <chrome://inspect> in Chrome and find **localhost:9229** and click **trace**

### Writing high-impact code changes

1. **Start with an issue.** Open a new one or comment on an existing discussion so we can agree on the solution before code is written.
2. **Add or update tests.** Every new feature or bug-fix should come with test coverage that fails before your change and passes afterwards. 100% coverage is not required, but aim for meaningful assertions.
3. **Document behaviour.** If your change affects user-facing behaviour, update the README, inline help (`codex --help`), or relevant example projects.
4. **Keep commits atomic.** Each commit should compile and the tests should pass. This makes reviews and potential rollbacks easier.

### Opening a pull request

- Fill in the PR template (or include similar information) - **What? Why? How?**
- Run **all** checks locally (`npm test && npm run lint && npm run typecheck`). CI failures that could have been caught locally slow down the process.
- Make sure your branch is up-to-date with `main` and that you have resolved merge conflicts.
- Mark the PR as **Ready for review** only when you believe it is in a merge-able state.

### Review process

1. One maintainer will be assigned as a primary reviewer.
2. We may ask for changes - please do not take this personally. We value the work, we just also value consistency and long-term maintainability.
3. When there is consensus that the PR meets the bar, a maintainer will squash-and-merge.

### Community values

- **Be kind and inclusive.** Treat others with respect; we follow the [Contributor Covenant](https://www.contributor-covenant.org/).
- **Assume good intent.** Written communication is hard - err on the side of generosity.
- **Teach & learn.** If you spot something confusing, open an issue or PR with improvements.

### Getting help

If you run into problems setting up the project, would like feedback on an idea, or just want to say _hi_ - please open a Discussion or jump into the relevant issue. We are happy to help.

Together we can make Codex CLI an incredible tool. **Happy hacking!** :rocket:

### Contributor license agreement (CLA)

All contributors **must** accept the CLA. The process is lightweight:

1. Open your pull request.
2. Paste the following comment (or reply `recheck` if you've signed before):

   ```text
   I have read the CLA Document and I hereby sign the CLA
   ```

3. The CLA-Assistant bot records your signature in the repo and marks the status check as passed.

No special Git commands, email attachments, or commit footers required.

#### Quick fixes

| Scenario          | Command                                          |
| ----------------- | ------------------------------------------------ |
| Amend last commit | `git commit --amend -s --no-edit && git push -f` |

The **DCO check** blocks merges until every commit in the PR carries the footer (with squash this is just the one).

### Releasing `codex`

To publish a new version of the CLI you first need to stage the npm package. A
helper script in `codex-cli/scripts/` does all the heavy lifting. Inside the
`codex-cli` folder run:

```bash
# Classic, JS implementation that includes small, native binaries for Linux sandboxing.
pnpm stage-release

# Optionally specify the temp directory to reuse between runs.
RELEASE_DIR=$(mktemp -d)
pnpm stage-release --tmp "$RELEASE_DIR"

# "Fat" package that additionally bundles the native Rust CLI binaries for
# Linux. End-users can then opt-in at runtime by setting CODEX_RUST=1.
pnpm stage-release --native
```

Go to the folder where the release is staged and verify that it works as intended. If so, run the following from the temp folder:

```
cd "$RELEASE_DIR"
npm publish
```

### Alternative build options

#### Nix flake development

Prerequisite: Nix >= 2.4 with flakes enabled (`experimental-features = nix-command flakes` in `~/.config/nix/nix.conf`).

Enter a Nix development shell:

```bash
# Use either one of the commands according to which implementation you want to work with
nix develop .#codex-cli # For entering codex-cli specific shell
nix develop .#codex-rs # For entering codex-rs specific shell
```

This shell includes Node.js, installs dependencies, builds the CLI, and provides a `codex` command alias.

Build and run the CLI directly:

```bash
# Use either one of the commands according to which implementation you want to work with
nix build .#codex-cli # For building codex-cli
nix build .#codex-rs # For building codex-rs
./result/bin/codex --help
```

Run the CLI via the flake app:

```bash
# Use either one of the commands according to which implementation you want to work with
nix run .#codex-cli # For running codex-cli
nix run .#codex-rs # For running codex-rs
```

Use direnv with flakes

If you have direnv installed, you can use the following `.envrc` to automatically enter the Nix shell when you `cd` into the project directory:

```bash
cd codex-rs
echo "use flake ../flake.nix#codex-cli" >> .envrc && direnv allow
cd codex-cli
echo "use flake ../flake.nix#codex-rs" >> .envrc && direnv allow
```

---

## Security & responsible AI

Have you discovered a vulnerability or have concerns about model output? Please e-mail **security@openai.com** and we will respond promptly.

---

## License

This repository is licensed under the [Apache-2.0 License](LICENSE).
