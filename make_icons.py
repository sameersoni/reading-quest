from PIL import Image, ImageDraw
import math

# Palette
LEAF = (79, 154, 107)       # #4F9A6B
LEAF_DARK = (58, 120, 82)
CREAM = (251, 243, 231)     # #FBF3E7
CORAL = (242, 121, 91)      # #F2795B
GOLD = (244, 183, 64)       # #F4B740
INK = (59, 42, 58)          # #3B2A3A

def rounded_square(size, radius_ratio=0.22):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(size * radius_ratio)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=LEAF)
    # soft inner glow band
    d.rounded_rectangle([int(size*0.045), int(size*0.045), size-1-int(size*0.045), size-1-int(size*0.045)],
                         radius=int(r*0.85), outline=LEAF_DARK, width=max(1, int(size*0.012)))
    return img, d

def draw_book(d, size):
    cx, cy = size * 0.5, size * 0.565
    w, h = size * 0.50, size * 0.30
    # book base (cream)
    left = [(cx - w/2, cy - h*0.15), (cx, cy + h*0.30), (cx, cy - h*0.62), (cx - w/2, cy - h*0.62 - h*0.06)]
    right = [(cx + w/2, cy - h*0.15), (cx, cy + h*0.30), (cx, cy - h*0.62), (cx + w/2, cy - h*0.62 - h*0.06)]
    d.polygon(left, fill=CREAM)
    d.polygon(right, fill=(255, 250, 242))
    # spine shadow
    d.line([(cx, cy - h*0.62), (cx, cy + h*0.30)], fill=(210, 195, 170), width=max(1, int(size*0.01)))
    # page lines
    for i in range(3):
        yoff = cy - h*0.30 + i * h*0.20
        d.line([(cx - w*0.36, yoff), (cx - w*0.08, yoff + h*0.02)], fill=(200, 182, 150), width=max(1, int(size*0.012)))
        d.line([(cx + w*0.08, yoff + h*0.02), (cx + w*0.36, yoff)], fill=(200, 182, 150), width=max(1, int(size*0.012)))

def draw_star(d, size, cx, cy, r, fill):
    pts = []
    for i in range(10):
        ang = -math.pi/2 + i * math.pi/5
        rad = r if i % 2 == 0 else r * 0.42
        pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
    d.polygon(pts, fill=fill)

def make(size, maskable=False):
    pad_ratio = 0.16 if maskable else 0.0
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner_size = int(size * (1 - pad_ratio))
    badge, d = rounded_square(inner_size, radius_ratio=0.24 if not maskable else 0.0)
    draw_book(d, inner_size)
    draw_star(d, inner_size, inner_size*0.775, inner_size*0.30, inner_size*0.13, GOLD)
    draw_star(d, inner_size, inner_size*0.22, inner_size*0.78, inner_size*0.075, CORAL)
    offset = (size - inner_size) // 2
    canvas.paste(badge, (offset, offset), badge)
    if maskable:
        # fill background full-bleed for maskable safe zone
        bg = Image.new("RGBA", (size, size), LEAF)
        bg.paste(badge, (offset, offset), badge)
        return bg
    return canvas

sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512]
for s in sizes:
    make(s).save(f"icons/icon-{s}.png")

make(192, maskable=True).save("icons/icon-maskable-192.png")
make(512, maskable=True).save("icons/icon-maskable-512.png")

# apple touch icon (no transparency, opaque background, 180x180)
apple = Image.new("RGB", (180, 180), LEAF)
badge = make(180)
apple.paste(badge, (0, 0), badge)
apple.save("icons/apple-touch-icon.png")

print("icons done")
