class LazyLoad {
    constructor() {
        this.prepareElements();
    }

    init() {
        console.log('hello');
    }

    prepareElements() {
        const elems = document.querySelectorAll('.lazy-load');
        [].forEach.call(elems, function (item) {
            console.log(item)
        })
    }
}

new LazyLoad();
