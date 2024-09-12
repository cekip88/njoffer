import G_G from "./libs/G_G.js";
import { G_Bus } from "./libs/G_Control.js";

class Front extends G_G{
  constructor(){
    super();
    const _ = this;
    // G_Bus
  }
  define(){
    const _ = this;
    _.componentName = 'front';
    G_Bus.on(_,[
      'burgerClick','showNavSublist',
	    'showModal','closeModal',
	    'showVideo',
	    'accord',
	    'showMobileForm',
    ]);
		_.init();
  }

	initSubHeader(){
		const _ = this;
		let head = _.f('.head');
		let subHead = _.f('.head_sub');
		_.prevScroll = window.scrollY;
		window.addEventListener('scroll',(e)=>{
			if (window.scrollY > head.clientHeight) {
				if (window.scrollY > _.prevScroll) {
					subHead.classList.add('active');
				} else subHead.classList.remove('active')
			} else subHead.classList.remove('active')
			_.prevScroll = window.scrollY;
		})
	}

	burgerClick({item}) {
		const _ = this;
		let nav = item
			.closest('.head')
			.querySelector('.head-nav');

		item.classList.toggle('active');
		nav.classList.toggle('active');
	}
	showNavSublist({item}){
		const _ = this;
		let
			cont = item.closest('.head-nav_item'),
			list = cont.lastElementChild,
			height = list.clientHeight + 44;

		if (cont.classList.contains('active')) {
			cont.classList.remove('active');
			cont.removeAttribute('style');
		} else {
			cont.classList.add('active');
			cont.setAttribute('style',`height:${height}px`);
		}
	}

	showVideo({item}) {
		const _ = this;
		let
			selector = item.getAttribute('data-target'),
			iframe = _.f(`${selector} iframe`);
		iframe.setAttribute('src',item.getAttribute('data-src'));
		_.showModal({item})
	}
	showModal({item}) {
		const _ = this;
		let
			selector = item.getAttribute('data-target'),
			target = _.f(selector);
		target.closest('.popup').classList.add('active');
		target.style = "display:block";
		setTimeout(()=>{
			target.classList.add('active');
		})
	}
	closeModal({item}) {
		const _ = this;
		let
			popup = item.closest('.popup'),
			inner = popup.querySelector('.popup-inner.active'),
			iframe = inner.querySelector('iframe');
		popup.classList.remove('active');
		inner.classList.remove('active');
		setTimeout(()=>{
			inner.removeAttribute('style');
		},350)
		if (iframe) iframe.removeAttribute('src');
	}

	accord({item}) {
		const _ = this;
		let
			accord = item.closest('.accord-item'),
			head = item,
			body = accord.lastElementChild,
			cont = accord.parentElement;

		if (accord.classList.contains('active')) {
			accord.style = `height:${accord.clientHeight}px;`;
			setTimeout(()=>{
				accord.classList.remove('active');
				accord.removeAttribute('style')
			})
		} else {
			let activeItem = cont.querySelector('.accord-item.active');
			if (activeItem) {
				_.accord({item:activeItem.querySelector('.accord-item_head')})
			}
			accord.style = `height:${head.clientHeight + body.clientHeight}px;`;
			accord.classList.add('active');
			setTimeout(()=>{
				accord.removeAttribute('style');
			},500)
		}
	}

	showMobileForm({item}) {
		item.style = 'display:none;'
		item.nextElementSibling.classList.remove('mobile-form_label')
	}

	init(){
		const _ = this;
		_.initSubHeader();
	}
}

new Front();