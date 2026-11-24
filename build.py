import pathlib
s=pathlib.Path('src')
js='\n'.join((s/f).read_text() for f in ['data.js','core.js','pages-tools.js','pages-product.js','pages-jobs.js','pages-resources.js'])
html=(s/'shell.html').read_text().replace('/*__CSS__*/',(s/'styles.css').read_text()).replace('/*__JS__*/',js)
pathlib.Path('index.html').write_text(html)
print(len(html))
