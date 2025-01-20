<p align="center">
  <a href="https://tailwindcss.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg">
      <img alt="Tailwind CSS" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="350" height="70" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
  A Tailwind CSS distribution bundled with DaisyUI, optimized for fastHTML and standalone use.
</p>

<p align="center">
  <em>Based on <a href="https://github.com/tailwindlabs/tailwindcss">Tailwind CSS</a> and includes <a href="https://daisyui.com/">DaisyUI</a></em>
</p>

---

## About This Fork

This is a specialized distribution of Tailwind CSS that:
- Includes DaisyUI plugin out of the box
- Provides standalone executables for easy integration
- Is optimized for use with python-fasthtml
- Can be used in any project requiring Tailwind CSS + DaisyUI

## Usage

### With FastHTML

1. **Download the appropriate binary**

### For macOS ARM64 (M1/M2)
```bash
curl -sLO https://github.com/banditburai/fastwindcss/releases/latest/download/tailwindcss-macos-arm64
```

### For macOS x64 (Intel)
```bash
curl -sLO https://github.com/banditburai/fastwindcss/releases/latest/download/tailwindcss-macos-x64
```

### For Linux x64
```bash
curl -sLO https://github.com/banditburai/fastwindcss/releases/latest/download/tailwindcss-linux-x64
```

### For Linux ARM64
```bash
curl -sLO https://github.com/banditburai/fastwindcss/releases/latest/download/tailwindcss-linux-arm64
```

### For Windows x64
```bash
curl -sLO https://github.com/banditburai/fastwindcss/releases/latest/download/tailwindcss-windows-x64.exe
```

2. **Rename and make executable**

On Unix-like systems (macOS/Linux):
```bash
mv tailwindcss-* tailwindcss
chmod +x tailwindcss
```

On Windows:
```bash
mv tailwindcss-windows-x64.exe tailwindcss.exe
```

3. **Create your input CSS with DaisyUI plugin**

Create a `styles` directory with an `input.css` file:
```bash
mkdir -p styles
echo '@import "tailwindcss";
@plugin "daisyui";' > styles/input.css
```

4. **Usage Options**

Build CSS once:
```bash
./tailwindcss -i styles/input.css -o styles/output.css
```

Development mode with watch (automatically rebuilds when files change):
```bash
./tailwindcss -i styles/input.css -o styles/output.css --watch
```

## Documentation

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [DaisyUI Documentation](https://daisyui.com/docs)

## Original Project

This is a fork of [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss). For the original project:
- [Tailwind CSS GitHub Repository](https://github.com/tailwindlabs/tailwindcss)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## License

This project is licensed under the same terms as Tailwind CSS. See the [LICENSE](LICENSE) file for details.

<p align="center">
    <a href="https://github.com/tailwindlabs/tailwindcss/actions"><img src="https://img.shields.io/github/actions/workflow/status/tailwindlabs/tailwindcss/ci.yml?branch=next" alt="Build Status"></a>
    <a href="https://www.npmjs.com/package/tailwindcss"><img src="https://img.shields.io/npm/dt/tailwindcss.svg" alt="Total Downloads"></a>
    <a href="https://github.com/tailwindcss/tailwindcss/releases"><img src="https://img.shields.io/npm/v/tailwindcss.svg" alt="Latest Release"></a>
    <a href="https://github.com/tailwindcss/tailwindcss/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tailwindcss.svg" alt="License"></a>
</p>