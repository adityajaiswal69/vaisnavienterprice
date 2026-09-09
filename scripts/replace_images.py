"""Replace the four slots whose auto-picked images were off-topic."""
import json
import os
import sys
import urllib.request

DEST = sys.argv[1]
IMG_DIR = os.path.join(DEST, "public", "images")
HDR = {"User-Agent": "VaishnaviEnterprisesSite/1.0 (vaishnavienterprise1611@gmail.com)"}
PARAMS = "?auto=format&fit=crop&w=1800&q=78"

REPLACE = {
    "lab-testing": ("photo-1669707040737-a6237bc0ae50", "Technician in a lab coat at a testing bench"),
    "sustainability": ("photo-1561503412-852800622772", "Crushed aluminium beverage cans collected for recycling"),
    "prod-adc12": ("photo-1723632670536-e3104577a19c", "Machined metal components on a workbench"),
    "steel-plant": ("photo-1761414500570-0b835cdcf3c8", "Industrial complex illuminated at night"),
}

DROP = ["ingot-stack"]

path = os.path.join(DEST, "src", "data", "image-credits.json")
credits = json.load(open(path, encoding="utf-8"))

for slot, (pid, desc) in REPLACE.items():
    url = "https://images.unsplash.com/" + pid + PARAMS
    blob = urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=120).read()
    open(os.path.join(IMG_DIR, slot + ".jpg"), "wb").write(blob)
    credits[slot] = {
        "file": "/images/%s.jpg" % slot,
        "title": desc,
        "author": "Unsplash contributor",
        "license": "Unsplash License",
        "source": "https://unsplash.com/photos/" + pid.replace("photo-", ""),
        "query": "unsplash",
    }
    print("replaced %-18s %d KB" % (slot, len(blob) // 1024))

for slot in DROP:
    credits.pop(slot, None)
    f = os.path.join(IMG_DIR, slot + ".jpg")
    if os.path.exists(f):
        os.remove(f)
        print("dropped  %s" % slot)

json.dump(credits, open(path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print("slots:", len(credits))
