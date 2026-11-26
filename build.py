import pathlib, base64, io
from PIL import Image
s=pathlib.Path('src')
order=['companies.js','data.js','synonyms.js','features.js','guides.js','glossary.js','legal.js','core.js','call.js','company-pages.js','pages-tools.js','pages-product.js','feature-pages.js','pages-jobs.js','pages-resources.js']
def enc(p):
    im=Image.open(p).convert('RGB'); im.thumbnail((880,1100)); buf=io.BytesIO(); im.save(buf,'JPEG',quality=80,optimize=True,progressive=True)
    return 'data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
imgs={k:enc(next((s/'img').glob(k+'.*'))) for k in 'abcd'}
img_js='const IMG = '+__import__('json').dumps(imgs)+';'
js='\n'.join((s/f).read_text() for f in order)
html=(s/'shell.html').read_text().replace('/*__CSS__*/',(s/'styles.css').read_text()).replace('/*__IMG__*/',img_js).replace('/*__JS__*/',js)
pathlib.Path('index.html').write_text(html)
print(len(html))
