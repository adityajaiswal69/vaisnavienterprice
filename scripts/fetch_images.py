"""Fetch free-license industrial imagery from Wikimedia Commons into public/images.

Usage:  python scripts/fetch_images.py <project-root>

Only CC0 / CC BY / CC BY-SA / Public Domain files are accepted. Attribution for
every downloaded file is written to src/data/image-credits.json and rendered on
the /credits page of the site.
"""
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request

DEST = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
IMG_DIR = os.path.join(DEST, "public", "images")
os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(os.path.join(DEST, "src", "data"), exist_ok=True)

HDR = {"User-Agent": "VaishnaviEnterprisesSite/1.0 (vaishnavienterprise1611@gmail.com)"}

# slot -> search queries, tried in order until a usable landscape image is found
SLOTS = {
    "hero-foundry": ["molten aluminium casting", "aluminium smelter casting", "molten metal pouring foundry"],
    "about-plant": ["aluminium recycling plant", "secondary aluminium smelter", "metal foundry interior"],
    "scrap-yard": ["aluminium scrap", "scrap metal recycling yard", "metal scrap heap"],
    "segregation": ["scrap sorting recycling", "metal sorting facility", "recycling sorting line"],
    "furnace": ["induction furnace metal", "aluminium melting furnace", "foundry furnace"],
    "lab-testing": ["spectrometer metal analysis", "metallurgical laboratory", "materials testing laboratory"],
    "logistics": ["truck loading factory", "industrial warehouse logistics", "lorry india road"],
    "sustainability": ["aluminium recycling", "circular economy recycling metal", "recycling metal cans"],
    "prod-adc12": ["aluminium die casting", "die cast aluminium parts", "die casting machine"],
    "prod-lm24": ["aluminium alloy ingot", "aluminium casting alloy", "aluminium alloy wheel casting"],
    "prod-ingots": ["aluminium ingots", "aluminium ingot stack", "aluminium ingots warehouse"],
    "prod-soft-aluminium": ["aluminium billets", "aluminium metal blocks", "pure aluminium metal"],
    "prod-shots": ["aluminium granules", "metal shot blasting media", "metal pellets"],
    "prod-cubes-bars": ["aluminium notch bar", "compressed metal bales", "baled scrap metal"],
    "steel-plant": ["steel plant india", "steel mill interior", "steelworks blast furnace"],
    "texture": ["brushed aluminium texture", "aluminium sheet metal texture", "metal surface texture"],
}

API = "https://commons.wikimedia.org/w/api.php"
ALLOWED = ("cc0", "cc by", "cc-by", "public domain", "pd-")


def api_search(query, limit=10):
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
        "gsrsearch": query,
        "prop": "imageinfo",
        "iiprop": "url|mime|size|extmetadata",
        "iiurlwidth": "1800",
    }
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers=HDR)
    data = json.load(urllib.request.urlopen(req, timeout=45))
    pages = data.get("query", {}).get("pages", {})
    return sorted(pages.values(), key=lambda p: p.get("index", 99))


def strip_html(s):
    if not s:
        return ""
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def usable(page):
    info = page.get("imageinfo") or [{}]
    ii = info[0]
    if ii.get("mime") not in ("image/jpeg", "image/png"):
        return False
    w, h = ii.get("width", 0), ii.get("height", 0)
    if w < 1200 or h < 700 or w / float(h or 1) < 1.15:
        return False
    lic = (ii.get("extmetadata", {}).get("LicenseShortName", {}).get("value") or "").lower()
    return any(a in lic for a in ALLOWED)


def main():
    credits, used = {}, set()

    for slot, queries in SLOTS.items():
        picked = None
        for q in queries:
            try:
                pages = api_search(q)
            except Exception as exc:
                print("  search failed: %s (%s)" % (q, exc))
                continue
            for p in pages:
                if p["title"] not in used and usable(p):
                    picked = (p, q)
                    break
            if picked:
                break

        if not picked:
            print("MISS %s" % slot)
            continue

        page, query = picked
        ii = page["imageinfo"][0]
        meta = ii.get("extmetadata", {})
        src = (ii.get("thumburl") or ii["url"]).split("?")[0]
        fname = slot + (".jpg" if ii["mime"] == "image/jpeg" else ".png")

        try:
            blob = urllib.request.urlopen(
                urllib.request.Request(src, headers=HDR), timeout=90
            ).read()
        except Exception as exc:
            print("DOWNLOAD FAILED %s (%s)" % (slot, exc))
            continue

        with open(os.path.join(IMG_DIR, fname), "wb") as fh:
            fh.write(blob)

        used.add(page["title"])
        credits[slot] = {
            "file": "/images/" + fname,
            "title": page["title"].replace("File:", "").rsplit(".", 1)[0],
            "author": strip_html(meta.get("Artist", {}).get("value")) or "Unknown",
            "license": strip_html(meta.get("LicenseShortName", {}).get("value")) or "See source",
            "source": "https://commons.wikimedia.org/wiki/"
            + urllib.parse.quote(page["title"].replace(" ", "_")),
            "query": query,
        }
        print("OK   %-22s %-34s %-14s %d KB" % (slot, query, credits[slot]["license"], len(blob) // 1024))

    out = os.path.join(DEST, "src", "data", "image-credits.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(credits, fh, indent=2, ensure_ascii=False)

    print("\nfetched %d/%d slots -> %s" % (len(credits), len(SLOTS), out))


if __name__ == "__main__":
    main()
