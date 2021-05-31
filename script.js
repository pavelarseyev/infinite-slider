class Slider {
    constructor(options) {
        this.direction = options.direction;
        this.slider = document.querySelector(options.el);
        this.track = this.slider.querySelector('.holder');
        this.width = this.slider.offsetWidth;
        this.trackWidth = this.track.offsetWidth;
        this.slides = this.slider.querySelectorAll('.slide');
        this.spacing = options.spaceBetween;
        this.clones = [];
        this.paused = false;
        this.speed = this.direction === 'ltr' ? options.speed * -1 : options.speed;
        this.offsetLeft = this.direction === 'ltr' ? 0 : (this.trackWidth * -1) + ((this.slides.length) * this.spacing) - this.slides[0].offsetWidth ;
        this.frame = null;

        this.setCss();
        this.resize();
        this.addListeners();
        this.createClones();
        setTimeout(() => {
            console.log(this)
            this.render(this);
        }, 100);
    }

    addListeners() {
        window.addEventListener('resize', this.resize.bind(this));
        this.slider.addEventListener('mouseenter', this.changePlayState.bind(this));
        this.slider.addEventListener('mouseleave', this.changePlayState.bind(this));
    }

    setCss() {
        this.track.style.willChange = 'transform';
        this.slides.forEach(slide => slide.style.marginRight = `${this.spacing}px`);
    }

    resize() {
        this.width = this.slider.offsetWidth;
        this.trackWidth = this.track.offsetWidth;
    }

    changePlayState(e) {
        this.paused = e.type === 'mouseenter';
    }

    createClones() {
        Array.from(this.slides).map(slide => {
            this.clones.push(slide.cloneNode(true));
        })

        if (this.direction === 'rtl') {
            this.clones = this.clones.reverse();
        }

        this.clones.forEach(clone => {
            clone.classList.add('cloned');
            
            if (this.direction === 'ltr') {
                this.track.appendChild(clone);
            } else {
                this.track.prepend(clone);
            }
        });
    }
    
    updatePosition() {
        if (!this.paused) {
            this.offsetLeft += this.speed;

            // console.log(this.trackWidth);

            this.offsetLeft = Math.abs(this.offsetLeft) > this.trackWidth ? 0 : this.offsetLeft;

            // console.log(this.offsetLeft);

            this.track.style.transform = `translate3d(${this.offsetLeft}px, 0, 0)`;
        } 
    }

    
    render() {
        if (this.trackWidth > this.width) {
            this.updatePosition();

            this.frame = window.requestAnimationFrame(this.render.bind(this));
        } else {
            window.cancelAnimationFrame(this.frame);
        }
    }
}

new Slider({
    el: '.js-slider',
    speed: 1,
    direction: 'rtl',
    spaceBetween: 30
});