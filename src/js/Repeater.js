import Util from '@foragefox/page-builder-util';

class Repeater {

	constructor(element, options) {
		this.element = $(element);
		this.options = $.extend(true, {}, Repeater.DEFAULTS, element.dataset, typeof options == 'object' && options);

		this.element.append(Util.supplant(this.options.templates.body, { 
			addLabel: this.options.addLabel 
		}));

		this.template = this.buildTemplate();
		this.items = this.element.find('.items');

		this.populate();
		this.bindEvents();
	}

	bindEvents() {
		this.element.on('click', '[data-repeater-remove]', (event) => this.removeItem(event));
		this.element.on('click', '[data-repeater-add]', () => this.addItem());
	}

	populate() {
		let data = this.element.data('value');
		if (data) {
			let count = Object.values(data)[0].length;
	
			for (let i = 0; i < count; i++) {
				let itemData = {};

				$.each(data, function (key, value) {
					itemData[this.options.name + '-' + key] = value[i];
				}.bind(this));

				this.addItem(itemData);
			}
		}
	}

	addItem(data) {
		let html = Util.supplant(this.options.templates.item, { 
			item: this.template.html()
		});

		let item = $(html).appendTo(this.items);

		if (data) {
			Util.formFromJSON(item, data);
		}
		
		this.options.onAdd(item);
	}

	removeItem(event) {
		let removeButton = event.currentTarget;
		let item = $(removeButton).parents('.item');
		
		item.remove();

		this.options.onRemove(item);
	}

	buildTemplate() {
		let template = this.element.find('[data-repeater-template]');
		
		template.find('input, select, textarea, [data-name]').each(function (i, item) {
			if (item.hasAttribute('name')) {
				item.setAttribute('name', this.options.name + '-' + item.getAttribute('name'));
			} else if ('name' in item.dataset) {
				item.dataset.name = this.options.name + '-' + item.dataset.name;
			}
		}.bind(this));

		let finalTemplate = template.clone();

		template.remove();
		return finalTemplate;
	}

}

Repeater.DEFAULTS = {
	addLabel: '+ Add',
	onAdd: function(item) {},
	onRemove: function(item) {},
	templates: {
		body: `
			<div class="items"></div>
			<div class="add-field">
				<button type="button" class="btn btn-sm btn-outline-secondary" data-repeater-add="">{{addLabel}}</button>	
			</div>
		`,
		item: `<div class='item'>{{item}}<div/>`
	}
}

export default Repeater;