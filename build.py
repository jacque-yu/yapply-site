import pathlib
s=pathlib.Path('src')
order=['companies.js','data.js','features.js','guides.js','glossary.js','legal.js','core.js','company-pages.js','pages-tools.js','pages-product.js','pages-jobs.js','pages-resources.js']
js='\n'.join((s/f).read_text() for f in order)
html=(s/'shell.html').read_text().replace('/*__CSS__*/',(s/'styles.css').read_text()).replace('/*__JS__*/',js)
pathlib.Path('index.html').write_text(html)
print(len(html))
