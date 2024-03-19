[![bugsplat-github-banner-basic-outline](https://user-images.githubusercontent.com/20464226/149019306-3186103c-5315-4dad-a499-4fd1df408475.png)](https://bugsplat.com)
<br/>
# <div align="center">BugSplat</div> 
### **<div align="center">Crash and error reporting built for busy developers.</div>**
<div align="center">
    <a href="https://twitter.com/BugSplatCo">
        <img alt="Follow @bugsplatco on Twitter" src="https://img.shields.io/twitter/follow/bugsplatco?label=Follow%20BugSplat&style=social">
    </a>
    <a href="https://discord.gg/K4KjjRV5ve">
        <img alt="Join BugSplat on Discord" src="https://img.shields.io/discord/664965194799251487?label=Join%20Discord&logo=Discord&style=social">
    </a>
</div>

## 👋 Introduction

node-dump-syms is a thin wrapper around the Mozilla [dump_syms](https://crates.io/crates/dump_syms) crate that allows dump_syms to be added to your project via [npm](https://www.npmjs.com/). This package can be invoked via the `node-dump-syms` command-line command, or used as a library by importing `dumpSyms`.

## 🏗️ Installation

Install `node-dump-syms` as a package dependency.

```sh
npm i node-dump-syms
```

Or install `node-dump-syms` globally as a command-line tool.

```sh
npm i -g node-dump-syms
```

## 🧑‍💻 Command

If you installed `node-dump-syms` globally you can invoke it in via a terminal window.

```sh
node-dump-syms /path/to/file.so /output/file.so.sym
```

The first argument is the path to your binary file. The second argument is the path to write the output sym file.

## 📚 Library

Import or require `dumpSyms`.

```ts
import { dumpSyms } from 'node-dump-syms'
```

Call `dumpSyms`, providing it a path to your binary file, an output path for the `.sym` file.

```ts
dumpSyms('/path/to/file.so', '/output/file.so.sym');
```

## 🐛 About

[BugSplat](https://bugsplat.com) is a software crash and error reporting service with support for [Qt](https://docs.bugsplat.com/introduction/getting-started/integrations/cross-platform/qt), [Linux](https://docs.bugsplat.com/introduction/getting-started/integrations/desktop/linux), [Android](https://docs.bugsplat.com/introduction/getting-started/integrations/mobile/android) and [many more](https://docs.bugsplat.com/introduction/getting-started/integrations). BugSplat automatically captures critical diagnostic data such as stack traces, log files, and other runtime information. BugSplat also provides automated incident notifications, a convenient dashboard for monitoring trends and prioritizing engineering efforts, and integrations with popular development tools to maximize productivity and ship more profitable software.