#!/usr/bin/env python3
"""Genera public/og-image.png (1200x630) — imagen Open Graph profesional.

Uso: python3 scripts/generate-og.py
Dependencias: Pillow (pip install pillow). Fuentes: DejaVu (Termux).
"""

import math
import pathlib

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"

W, H = 1200, 630
BG = (10, 10, 15)
TEAL = (0, 245, 212)
SILVER = (200, 200, 212)
MUTED = (122, 122, 150)
WHITE = (232, 232, 240)

FONT_DIR = pathlib.Path("/data/data/com.termux/files/usr/share/fonts/TTF")


def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)


F_SERIF = font("DejaVuSerif-Bold.ttf", 56)
F_SANS_B = font("DejaVuSans-Bold.ttf", 30)
F_SANS = font("DejaVuSans.ttf", 24)
F_SANS_S = font("DejaVuSans.ttf", 20)
F_MONO = font("DejaVuSansMono.ttf", 20)
F_MONO_S = font("DejaVuSansMono.ttf", 16)


def fit(text, fnt, max_w):
    while fnt.getbbox(text)[2] - fnt.getbbox(text)[0] > max_w:
        fnt = ImageFont.truetype(str(FONT_DIR / fnt.path.name.split("/")[-1]), fnt.size - 1)
    return fnt


def rounded_rect(draw, xy, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


img = Image.new("RGB", (W, H), BG)
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(overlay)

# Glows radiales
for cx, cy, rad, col in [
    (120, 80, 620, (0, 245, 212)),
    (1120, 560, 560, (0, 245, 212)),
]:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    steps = 60
    for i in range(steps, 0, -1):
        r = rad * i / steps
        alpha = int(16 * (1 - i / steps))
        ld.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(col[0], col[1], col[2], alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(60))
    overlay.alpha_composite(layer)

# Rejilla sutil
grid_col = (0, 245, 212, 14)
for x in range(60, W, 120):
    d.line([(x, 0), (x, H)], fill=grid_col, width=1)
for y in range(60, H, 120):
    d.line([(0, y), (W, y)], fill=grid_col, width=1)

# Motivo decorativo: anillo y símbolos matemáticos tenues
ring_col = (0, 245, 212, 40)
d.arc([W - 320, 40, W - 120, 240], start=-40, end=230, fill=ring_col, width=2)
d.arc([W - 300, 60, W - 140, 220], start=140, end=380, fill=ring_col, width=1)
for sym, x, y, size in [("∑", 60, 150, 90), ("∫", 1060, 380, 110), ("φ", 80, 430, 80)]:
    fnt = ImageFont.truetype(str(FONT_DIR / "DejaVuSerif-Bold.ttf"), size)
    d.text((x, y), sym, font=fnt, fill=(0, 245, 212, 26))

# ── Cabecera ──
d.rounded_rectangle([60, 56, 106, 102], radius=12, fill=(0, 245, 212, 40), outline=(0, 245, 212, 200), width=2)
d.text((83, 66), "SL", font=F_SANS_B, fill=TEAL)
d.text((120, 66), "Sebastián Laguna", font=F_SANS_B, fill=WHITE)
d.text((120, 104), "Tecnólogo · Desarrollador Full-Stack · Ciberseguridad", font=F_MONO_S, fill=MUTED)

# Chips de áreas (esquina superior derecha)
chips = ["Software", "Ciberseguridad", "IA", "Industria", "Electrónica", "Solar"]
x = W - 60
y = 60
row = []
for c in chips:
    w = F_MONO_S.getbbox(c)[2] - F_MONO_S.getbbox(c)[0] + 26
    if x - w < 200:
        x = W - 60
        y += 34
    if y > 130:
        break
    rounded_rect(d, [x - w, y, x, y + 26], r=13, fill=(0, 245, 212, 26), outline=(0, 245, 212, 90), width=1)
    d.text((x - w + 13, y + 4), c, font=F_MONO_S, fill=SILVER)
    x -= w + 10

# ── Centro: nombre grande ──
name = "Juan Sebastián Laguna Beleño"
nf = fit(name, F_SERIF, W - 160)
nw = nf.getbbox(name)[2] - nf.getbbox(name)[0]
d.text(((W - nw) / 2, 210), name, font=nf, fill=WHITE)

# Divider acento
d.rounded_rectangle([(W - 220) / 2, 322, (W + 220) / 2, 326], radius=2, fill=(0, 245, 212, 200))

sub = "Tecnólogo en Procesos de la Industria Química"
sub2 = "Desarrollador Full-Stack · IA local · Energía Solar"
sw = F_SANS.getbbox(sub)[2] - F_SANS.getbbox(sub)[0]
d.text(((W - sw) / 2, 352), sub, font=F_SANS, fill=SILVER)
sw2 = F_SANS_S.getbbox(sub2)[2] - F_SANS_S.getbbox(sub2)[0]
d.text(((W - sw2) / 2, 392), sub2, font=F_SANS_S, fill=MUTED)

# ── Pie ──
d.line([(60, 490), (W - 60, 490)], fill=(0, 245, 212, 60), width=1)

tech = "React · TypeScript · Python · Flutter · Termux"
d.text((60, 512), tech, font=F_MONO, fill=TEAL)

url = "sebastianl1.github.io/Portafolio"
uw = F_MONO.getbbox(url)[2] - F_MONO.getbbox(url)[0]
d.text((W - 60 - uw, 512), url, font=F_MONO, fill=TEAL)

contacts = "GitHub · LinkedIn · WhatsApp · Telegram"
d.text((60, 552), contacts, font=F_MONO_S, fill=MUTED)

img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
img.save(OUT, "PNG")
print(f"og-image generada: {OUT} ({W}x{H})")
