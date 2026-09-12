"""Fetch the extra Unsplash photography used by the hero carousel and product galleries.

Usage:  python scripts/fetch_extra_images.py <project-root>

Photos are used under the Unsplash License (free for commercial use, attribution
not required). Existing entries in src/data/image-credits.json are preserved;
only these slots are added or replaced.
"""
import json
import os
import sys
import urllib.request

DEST = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
IMG_DIR = os.path.join(DEST, "public", "images")
os.makedirs(IMG_DIR, exist_ok=True)

HDR = {"User-Agent": "VaishnaviEnterprisesSite/1.0 (vaishnavienterprise1611@gmail.com)"}
PARAMS = "?auto=format&fit=crop&w=1600&q=78"

# slot -> (unsplash photo id, description)
UNSPLASH = {
    "gallery-bars": ("photo-1788931211447-6f9cfee42c17", "Cylindrical aluminium bars stacked in a circular pattern"),
    "gallery-bars-warehouse": ("photo-1763926062529-1edf8664c366", "Metal bars stacked neatly in a warehouse"),
    "gallery-scrap-pile": ("photo-1671362935207-d9abfc5b9509", "A pile of metal scrap beside a building"),
    "gallery-metal-parts": ("photo-1727372416961-131342689e1e", "A pile of metal parts collected for recycling"),
    "gallery-cubes": ("photo-1776235239513-1bf26921e458", "Metallic cubes arranged in a stepped pattern"),
    "gallery-sheets": ("photo-1739105329094-70e964758e05", "A stack of metal sheets"),
    "gallery-furnace-pour": ("photo-1697281679213-fcab27e10ad4", "Molten metal being poured on a casting machine"),
    "gallery-furnace-operator": ("photo-1723109453405-7adc98d376a7", "An operator standing in front of a metal furnace"),
    "gallery-shavings": ("photo-1763950866216-736f090bc9db", "Metal shavings piled on a workbench"),
}

credits_path = os.path.join(DEST, "src", "data", "image-credits.json")
credits = json.load(open(credits_path, encoding="utf-8")) if os.path.exists(credits_path) else {}

for slot, (pid, desc) in UNSPLASH.items():
    url = "https://images.unsplash.com/" + pid + PARAMS
    try:
        blob = urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=120).read()
    except Exception as exc:
        print("FAIL %-26s %s" % (slot, exc))
        continue
    with open(os.path.join(IMG_DIR, slot + ".jpg"), "wb") as fh:
        fh.write(blob)
    credits[slot] = {
        "file": "/images/%s.jpg" % slot,
        "title": desc,
        "author": "Unsplash contributor",
        "license": "Unsplash License",
        "source": "https://unsplash.com/photos/" + pid.replace("photo-", ""),
        "query": "unsplash",
    }
    print("OK   %-26s %d KB" % (slot, len(blob) // 1024))

with open(credits_path, "w", encoding="utf-8") as fh:
    json.dump(credits, fh, indent=2, ensure_ascii=False)
print("done")
