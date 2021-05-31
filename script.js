class Slider {
    constructor(options) {
        this.direction = options.direction;
        this.slider = document.querySelector(options.el);
        this.track = this.slider.querySelector('.holder');
        this.width = this.slider.offsetWidth;
        this.trackWidth = this.track.offsetWidth;
        this.slides = this.slider.querySelectorAll('.slide');
        this.clones = [];
        this.paused = false;
        this.speed = this.direction === 'ltr' ? options.speed * -1 : options.speed;
        this.offsetLeft = 0;
        this.frame = null;

        this.track.style.willChange = 'transform';
        this.resize();
        this.addListeners();
        this.createClones();
        this.render();
    }

    addListeners() {
        window.addEventListener('resize', this.resize.bind(this));
        this.slider.addEventListener('mouseenter', this.changePlayState.bind(this));
        this.slider.addEventListener('mouseleave', this.changePlayState.bind(this));
    }

    resize() {
        this.width = this.slider.offsetWidth;
        this.trackWidth = this.track.offsetWidth;
    }

    changePlayState(e) {
        this.paused = e.type === 'mouseenter';
    }

    createClones() {
        [...this.slides].map(slide => {
            this.clones.push(slide);
        })

        this.clones.forEach(clone => {
            clone.classList.add('cloned');
            this.track.appendChild(clone);
        });

        console.log(this.clones);
    }
    
    updatePosition() {
        if (!this.paused) {
            this.offsetLeft += this.speed;

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
    direction: 'ltr'
});