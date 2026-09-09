"""Download the curated Unsplash + Commons picks into public/images.

Unsplash photos are used under the Unsplash License (free for commercial use,
attribution not required). Commons files carry their own CC licence, recorded in
src/data/image-credits.json and shown on the site's /credits page.
"""
import json
import os
import sys
import urllib.request

DEST = sys.argv[1]
IMG_DIR = os.path.join(DEST, "public", "images")
os.makedirs(IMG_DIR, exist_ok=True)

HDR = {"User-Agent": "VaishnaviEnterprisesSite/1.0 (vaishnavienterprise1611@gmail.com)"}
UNSPLASH_PARAMS = "?auto=format&fit=crop&w=1800&q=78"

# slot -> (unsplash photo id, human description)
UNSPLASH = {
    "hero-foundry": ("photo-1613970351372-9804e380bd09", "Molten metal pouring from a furnace into an industrial ladle"),
    "about-plant": ("photo-1727504172725-14acb4f32655", "Factory floor filled with production machinery"),
    "scrap-yard": ("photo-1722695694560-f452b0919d3a", "Excavator working a pile of scrap metal"),
    "segregation": ("photo-1606337321936-02d1b1a4d5ef", "Assorted metal components collected for recycling"),
    "logistics": ("photo-1779517225996-d5b751f80f48", "Forklift loading pallets of goods into a truck"),
    "team-floor": ("photo-1684259499227-e9844ab79747", "Two workers handling metal on a factory floor"),
    "worker": ("photo-1735494032948-14ef288fc9d3", "Worker in a hard hat inside a factory"),
    "pouring": ("photo-1697281679321-a9ce55ce0a8f", "Molten metal being poured on the plant floor"),
    "steel-making": ("photo-1697281679290-ad7be1b10682", "Steel being produced inside a mill"),
    "prod-lm24": ("photo-1697281435920-96ae28dbee14", "Operator working molten metal in a foundry"),
    "prod-soft-aluminium": ("photo-1681108212545-04cabe9cf771", "Three cylindrical aluminium billets side by side"),
    "prod-ingots": ("photo-1680391793434-12b2dd86d625", "Metal blocks stacked on top of each other"),
    "prod-cubes-bars": ("photo-1731317734787-17bcb34f1078", "Two solid metal cubes on a plain surface"),
    "texture": ("photo-1667892702884-faa077e80d7b", "Brushed metal surface with fine vertical lines"),
    "foil-texture": ("photo-1594255897691-9d1edad1ecfc", "Close-up of crumpled aluminium foil"),
}

# slot -> Commons file title (kept from the earlier CC-licensed pull, or re-picked)
COMMONS = {
    "ingot-stack": "File:Aluminium ingots St-Saphorin 180310.jpg",
}

COMMONS_API = (
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=%s"
    "&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1800"
)


def save(url, fname):
    blob = urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=120).read()
    with open(os.path.join(IMG_DIR, fname), "wb") as fh:
        fh.write(blob)
    return len(blob)


credits_path = os.path.join(DEST, "src", "data", "image-credits.json")
credits = {}
if os.path.exists(credits_path):
    credits = json.load(open(credits_path, encoding="utf-8"))

for slot, (pid, desc) in UNSPLASH.items():
    url = "https://images.unsplash.com/" + pid + UNSPLASH_PARAMS
    try:
        n = save(url, slot + ".jpg")
    except Exception as exc:
        print("FAIL %-22s %s" % (slot, exc))
        continue
    credits[slot] = {
        "file": "/images/%s.jpg" % slot,
        "title": desc,
        "author": "Unsplash contributor",
        "license": "Unsplash License",
        "source": "https://unsplash.com/photos/" + pid.replace("photo-", ""),
        "query": "unsplash",
    }
    print("OK   %-22s unsplash  %d KB" % (slot, n // 1024))

import urllib.parse

for slot, title in COMMONS.items():
    try:
        api = COMMONS_API % urllib.parse.quote(title)
        data = json.load(urllib.request.urlopen(urllib.request.Request(api, headers=HDR), timeout=60))
        page = list(data["query"]["pages"].values())[0]
        ii = page["imageinfo"][0]
        meta = ii.get("extmetadata", {})
        n = save((ii.get("thumburl") or ii["url"]).split("?")[0], slot + ".jpg")
    except Exception as exc:
        print("FAIL %-22s %s" % (slot, exc))
        continue
    import re, html as _html

    def strip(s):
        return _html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()

    credits[slot] = {
        "file": "/images/%s.jpg" % slot,
        "title": title.replace("File:", "").rsplit(".", 1)[0],
        "author": strip(meta.get("Artist", {}).get("value")) or "Unknown",
        "license": strip(meta.get("LicenseShortName", {}).get("value")) or "See source",
        "source": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_")),
        "query": "commons",
    }
    print("OK   %-22s commons   %d KB  (%s)" % (slot, n // 1024, credits[slot]["license"]))

json.dump(credits, open(credits_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print("\ntotal slots credited:", len(credits))
