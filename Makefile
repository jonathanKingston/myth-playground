install:
	npm install

test:
	./node_modules/.bin/mocha

build: components lib/main.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean


