/* eslint-disable max-lines */

const Markdown = require('naturalcrit/markdown.js');

describe('Dictionary Terms', ()=>{
	test('Single Definition', function() {
		const source = 'My term :: My First Definition\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>My term</dt><dd>My First Definition</dd></dl>');
	});

	test('Two Definitions', function() {
		const source = 'My term :: My First Definition :: My Second Definition\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>My term</dt><dd>My First Definition</dd><dd>My Second Definition</dd></dl>');
	});

	test('Three Definitions', function() {
		const source = 'My term :: My First Definition :: My Second Definition :: My Third Definition\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>My term</dt><dd>My First Definition</dd><dd>My Second Definition</dd><dd>My Third Definition</dd></dl>');
	});

	test('Multiline Definitions', function() {
		const source = '**Example** :: V3 uses HTML *definition lists* to create "lists" with hanging indents.\n::Two\n::Three\n::Four\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt><strong>Example</strong></dt>\n<dd>V3 uses HTML <em>definition lists</em> to create “lists” with hanging indents.</dd>\n<dd>Two</dd>\n<dd>Three</dd>\n<dd>Four</dd></dl>');
	});

	test('Multiple Definition Terms, single line, single definition', function() {
		const source = 'Term 1::Definition of Term 1\nTerm 2::Definition of Term 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt><dd>Definition of Term 1</dd>\n<dt>Term 2</dt><dd>Definition of Term 2</dd></dl>');
	});

	test('Multiple Definition Terms, single line, multiple definitions', function() {
		const source = 'Term 1::Definition 1 of Term 1::Definition 2 of Term 1\nTerm 2::Definition 1 of Term 2::Definition 2 of Term 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt><dd>Definition 1 of Term 1</dd><dd>Definition 2 of Term 1</dd>\n<dt>Term 2</dt><dd>Definition 1 of Term 2</dd><dd>Definition 2 of Term 2</dd></dl>');
	});

	test('Multiple Definition Terms, single definitions, multiple lines', function() {
		const source = 'Term 1::Definition 1 of Term 1\n::Definition 2 of Term 1\nTerm 2::Definition of Term 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt>\n<dd>Definition 1 of Term 1</dd>\n<dd>Definition 2 of Term 1</dd>\n<dt>Term 2</dt><dd>Definition of Term 2</dd></dl>');
	});

	test('Multiple Definition Terms, multiple mixed-line definitions', function() {
		const source = 'Term 1::Definition 1 of Term 1\n::Definition 2 of Term 1::Definition 3 of Term 1\nTerm 2::Definition of Term 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt>\n<dd>Definition 1 of Term 1</dd>\n<dd>Definition 2 of Term 1</dd><dd>Definition 3 of Term 1</dd>\n<dt>Term 2</dt><dd>Definition of Term 2</dd></dl>');
	});

	test('PANdoc style list - Single Term, Single Definition', function() {
		const source = 'Term 1\n::Definition 1\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt><dd>Definition 1</dd></dl>');
	});

	test('PANdoc style list - Single Term, Plural Definitions', function() {
		const source = 'Term 1\n::Definition 1\n::Definition 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt>\n<dd>Definition 1</dd>\n<dd>Definition 2</dd></dl>');
	});

	test('PANdoc style list - Multiple Term, Single Definitions', function() {
		const source = 'Term 1\n::Definition 1\nTerm 2\n::Definition 1\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt><dd>Definition 1</dd>\n<dt>Term 2</dt><dd>Definition 1</dd></dl>');
	});

	test('PANdoc style list - Multiple Term, Plural Definitions', function() {
		const source = 'Term 1\n::Definition 1\n::Definition 2\nTerm 2\n::Definition 1\n::Definition 2\n\n';
		const rendered = Markdown.render(source);
		expect(rendered, `Input:\n${source}`, { showPrefix: false }).toBe('<dl><dt>Term 1</dt>\n<dd>Definition 1</dd>\n<dd>Definition 2</dd>\n<dt>Term 2</dt>\n<dd>Definition 1</dd>\n<dd>Definition 2</dd></dl>');
	});


});
