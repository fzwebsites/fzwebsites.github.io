/*Codice per rendere la classe IntersectionObserver compatibile con tutti i browser*/
class IntersectionObserver {
    constructor(callback, options) {
        if (typeof window.IntersectionObserver !== "function") {
            // Create a shim for IntersectionObserver
            window.IntersectionObserver = function (callback, options) {
                this.entries = [];
                this.callback = callback;
                this.options = options;
            };

            window.IntersectionObserver.prototype.observe = function (el) {
                this.entries.push({
                    target: el,
                    intersectionRatio: 1,
                    isIntersecting: true
                });
                this.callback(this.entries);
            };

            window.IntersectionObserver.prototype.disconnect = function () {
                // Nothing to do
            };
        }

        this.observer = new window.IntersectionObserver(callback, options);
    }

    observe(el) {
        this.observer.observe(el);
    }

    disconnect() {
        this.observer.disconnect();
    }
}


var elements_to_watch = document.querySelectorAll('.watch');
var callback = function (items) {
    items.forEach((item) => {
        if (item.isIntersecting) {
            item.target.classList.add("in-page");
        } else {
            item.target.classList.remove("in-page");
        }
    });
}


var observer = new IntersectionObserver(callback, { threshold: 0.6 });
elements_to_watch.forEach((element) => {
    observer.observe(element);
})

let item = document.querySelector('.icon-hamburger');
item.addEventListener("click", function () {
    document.body.classList.toggle('menu--open');
});
item.addEventListener("click", function () {
    if(document.body.classList.contains("menu--open") && window.innerWidth < 768){
        document.body.style.overflowY = "hidden";
    }else{
        document.body.style.overflowY = "auto";
    }
});

var lastScroll = 0;
document.addEventListener("scroll", () => {
    if (lastScroll < window.scrollY) {
        $(".header")[0].style = "top: -160px; " + (window.scrollY > 0 ? "background-color: #00000080" : "")
    } else {
        $(".header")[0].style = "top: 0px;" + (window.scrollY > 0 ? "background-color: #00000080" : "")
    }
    lastScroll = window.scrollY
})