///// create elements to animate /////
// create rows
for (let i = 0; i < 15; i++) {
    let createRow = document.createElement('div');
    $(createRow).addClass('row');
    $('.container').append(createRow);
} // end create rows
// create boxes
for (let i = 0; i < 34; i++) {
    let createBox = document.createElement('div');
    $(createBox).addClass('box');
    $('.row').append(createBox);
} // end create boxes
// update animation progress bar
var controlsProgressEl = document.querySelector('.progress');
var seekProgressEl = document.querySelector('.progress');
seekProgressEl.oninput = function () {
    waveMachine.seek(waveMachine.duration * (seekProgressEl.value / 100));
};
controlsProgressEl.addEventListener('input', function () {
    waveMachine.seek(waveMachine.duration * (controlsProgressEl.value / 100));
}); // end update progress bar
///// animation sequence /////
let waveMachine =
    anime.timeline({
        targets: '.box',
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuart',
        update: function (anim) {
            controlsProgressEl.value = waveMachine.progress;
        },
        begin: function (anim) {
            $('.loading').removeClass('active');
        }
    }).add({
        filter: 'hue-rotate(120deg)',
        delay: anime.stagger(250, { grid: [34, 15], from: 'center' }),
        rotateX: -45,
        rotateY: anime.stagger(-55, { grid: [34, 15], from: 'center' }),
        scaleY: anime.stagger(.2, { grid: [34, 15], from: 'center' }),
        easing: 'easeInOutQuart'
    }, '+=1000').add({
        duration: 2000,
        rotateY: 180,
        scaleY: 1,
        rotateX: 45,
        filter: 'hue-rotate(280deg)',
        delay: anime.stagger(100, { grid: [34, 15], from: 'center' }),
        easing: 'easeInOutQuart'
    }, '-=100').add({
        targets: '.row',
        duration: 1000,
        translateY: anime.stagger(-25, { grid: [34, 15], from: 'first' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'first' }),
        easing: 'easeInOutQuart'
    }, '-=400').add({
        targets: '.box',
        translateY: anime.stagger(22, { grid: [34, 15], from: 'last' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'last' }),
        rotateZ: anime.stagger(8, { grid: [34, 15], from: 'first' }),
        filter: 'hue-rotate(20deg)',
        easing: 'easeInOutQuart'
    }, '-=400').add({
        borderWidth: '2px',
        translateY: anime.stagger(22, { grid: [34, 15], from: 'first' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'first' }),
        easing: 'easeOutBounce'
    }).add({
        rotateY: anime.stagger(-10, { grid: [34, 15], from: 'first' }),
        translateZ: anime.stagger(11, { grid: [34, 15], from: 'last' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'last' }),
        filter: 'hue-rotate(260deg)'
    }, '-=100').add({
        targets: '.box',
        translateZ: anime.stagger(15, { grid: [34, 15], from: 'first' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'first' }),
        rotateZ: 5,
        filter: 'hue-rotate(90deg)'
    }, '-=100').add({
        translateY: anime.stagger(10, { grid: [34, 15], from: 'last' }),
        translateX: anime.stagger(5, { grid: [34, 15], from: 'first' }),
        translateZ: anime.stagger(-10, { grid: [34, 15], from: 'first' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'last' }),
        filter: 'hue-rotate(530deg)',
    }).add({
        skewX: 60,
        rotate: 35,
        filter: 'hue-rotate(30deg)',
        delay: anime.stagger(150, { grid: [34, 15], from: 'center' }),
        easing: 'easeInOutBounce'
    }).add({
        borderRadius: '50%',
        scale: [{ value: 3 }, { value: 2 }],
        rotate: 0,
        delay: anime.stagger(100, { grid: [34, 15], from: 'first' }),
        easing: 'easeOutBounce'
    }).add({
        borderWidth: '3px',
        rotateZ: 80,
        rotateX: 65,
        rotateY: 15,
        translateZ: 40,
        translateX: -45,
        translateY: 80,
        scale: anime.stagger([.5, 4, .5], { grid: [34, 15], from: 'center' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'first' }),
    }).add({
        translateY: anime.stagger(60, { grid: [34, 15], axis: 'y' }),
        translateX: 40,
        borderRadius: 0,
        borderWidth: '2px',
        filter: 'hue-rotate(190deg)',
        delay: anime.stagger(100, { grid: [34, 15], from: 'center' }),
        easing: 'spring(2, 800, 10, 0)'
    }).add({
        filter: 'hue-rotate(335deg)',
        scale: [{ value: 3 }, { value: 1 }],
        rotate: anime.stagger(360, { grid: [34, 15], from: 'center' }),
        delay: anime.stagger(100, { grid: [34, 15], from: 'center' })
    }); // end animation sequence
// animation playback controls
$('.play').click(function () {
    waveMachine.play();
});
$('.pause').click(function () {
    waveMachine.pause();
});
$('.restart').click(function () {
    waveMachine.restart();
})
// initialize window width warning modal
$('.modal').modal();
// if window is initially smaller than 992px, show modal and pause animation
if ($(window).width() < 1300) {
    $('.modals, .modal').addClass('visible active').removeClass('hidden');
    waveMachine.pause();
}
// if window is resized, hide/show modal if below/above 992px width
$(window).resize(function () {
    if ($(window).width() < 1300) {
        $('.modals, .modal').addClass('visible active').removeClass('hidden');
        waveMachine.pause();
    }
    if ($(window).width() >= 1301) {
        $('.modals, .modal').addClass('hidden').removeClass('visible active');
        waveMachine.play();
    }
}); // end resize window function
