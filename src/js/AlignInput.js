import { extend, supplant } from '@foragefox/doubledash';

class AlignInput {

	constructor(element, options) {
		this.element = element;
		this.options = extend(true, AlignInput.DEFAULTS, this.element.dataset, typeof options == 'object' && options);

		this.element.innerHTML = supplant(this.options.templates.body, {
			name: this.options.name,
			value: this.options.value,
			values: this.options.values
		});

	}
}

AlignInput.DEFAULTS = {
	name: '',
	value: '',
	values: {
		'top-left': 'top left',
		'top-center': 'top center',
		'top-right': 'top right',
		'center-left': 'center left',
		'center-center': 'center center',
		'center-right': 'center right',
		'bottom-left': 'bottom left',
		'bottom-center': 'bottom center',
		'bottom-right': 'bottom right'
	},
	templates: {
		body: `
  			<div class="align-input">
  				<div class="align-input-hline top-left"></div>
				<div class="align-input-hline top-right"></div>
				<div class="align-input-hline bottom-left"></div>
				<div class="align-input-hline bottom-right"></div>
				<div class="align-input-vline top-left"></div>
				<div class="align-input-vline top-right"></div>
				<div class="align-input-vline bottom-left"></div>
				<div class="align-input-vline bottom-right"></div>
				{{for (var key in values)}}
					<label class="align-input-control {{key}}">
						<input name="{{name}}" value="{{values[key]}}" type="radio" {{if (values[key] == value)}}checked{{endif}}/>
						<span class="a-indicator"></span>
					</label>
				{{endfor}}
			</div>`
	}
}

export default AlignInput;