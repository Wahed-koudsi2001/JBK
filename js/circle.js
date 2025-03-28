/* jquery-circle-progress - jQuery Plugin to draw animated circular progress bars - URL: http://kottenator.github.io/jquery-circle-progress/ - Author: Rostyslav Bryzgunov - License: MIT */
!function (t) { "use strict"; function i(t) { this.init(t) } i.prototype = { value: 0, size: 100, startAngle: -Math.PI, thickness: "2", fill: { gradient: ["#3aeabb", "#fdd250"] }, emptyFill: "rgba(150, 150, 150, .5)", animation: { duration: 1200, easing: "circleProgressEasing" }, animationStartValue: 0, reverse: !1, lineCap: "butt", constructor: i, el: null, canvas: null, ctx: null, radius: 0, arcFill: null, lastFrameValue: 0, init: function (i) { t.extend(this, i), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw() }, initWidget: function () { var i = this.canvas = this.canvas || t("<canvas>").prependTo(this.el)[0]; i.width = this.size, i.height = this.size, this.ctx = i.getContext("2d") }, initFill: function () { function i() { var i = t("<canvas>")[0]; i.width = e.size, i.height = e.size, i.getContext("2d").drawImage(f, 0, 0, n, n), e.arcFill = e.ctx.createPattern(i, "no-repeat"), e.drawFrame(e.lastFrameValue) } var e = this, a = this.fill, r = this.ctx, n = this.size; if (!a) throw Error("The fill is not specified!"); if (a.color && (this.arcFill = a.color), a.gradient) { var s = a.gradient; if (1 == s.length) this.arcFill = s[0]; else if (s.length > 1) { for (var o = a.gradientAngle || 0, l = a.gradientDirection || [n / 2 * (1 - Math.cos(o)), n / 2 * (1 + Math.sin(o)), n / 2 * (1 + Math.cos(o)), n / 2 * (1 - Math.sin(o))], c = r.createLinearGradient.apply(r, l), h = 0; h < s.length; h++) { var u = s[h], d = h / (s.length - 1); t.isArray(u) && (d = u[1], u = u[0]), c.addColorStop(d, u) } this.arcFill = c } } if (a.image) { var f; a.image instanceof Image ? f = a.image : (f = new Image, f.src = a.image), f.complete ? i() : f.onload = i } }, draw: function () { this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value) }, drawFrame: function (t) { this.lastFrameValue = t, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(t), this.drawArc(t) }, drawArc: function (t) { var i = this.ctx, e = this.radius, a = this.getThickness(), r = this.startAngle; i.save(), i.beginPath(), this.reverse ? i.arc(e, e, e - a / 2, r - 2 * Math.PI * t, r) : i.arc(e, e, e - a / 2, r, r + 2 * Math.PI * t), i.lineWidth = a, i.lineCap = this.lineCap, i.strokeStyle = this.arcFill, i.stroke(), i.restore() }, drawEmptyArc: function (t) { var i = this.ctx, e = this.radius, a = this.getThickness(), r = this.startAngle; 1 > t && (i.save(), i.beginPath(), 0 >= t ? i.arc(e, e, e - a / 2, 0, 2 * Math.PI) : this.reverse ? i.arc(e, e, e - a / 2, r, r - 2 * Math.PI * t) : i.arc(e, e, e - a / 2, r + 2 * Math.PI * t, r), i.lineWidth = a, i.strokeStyle = this.emptyFill, i.stroke(), i.restore()) }, drawAnimated: function (i) { var e = this, a = this.el, r = t(this.canvas); r.stop(!0, !1), a.trigger("circle-animation-start"), r.css({ animationProgress: 0 }).animate({ animationProgress: 1 }, t.extend({}, this.animation, { step: function (t) { var r = e.animationStartValue * (1 - t) + i * t; e.drawFrame(r), a.trigger("circle-animation-progress", [t, r]) } })).promise().always(function () { a.trigger("circle-animation-end") }) }, getThickness: function () { return t.isNumeric(this.thickness) ? this.thickness : this.size / 14 }, getValue: function () { return this.value }, setValue: function (t) { this.animation && (this.animationStartValue = this.lastFrameValue), this.value = t, this.draw() } }, t.circleProgress = { defaults: i.prototype }, t.easing.circleProgressEasing = function (t, i, e, a, r) { return (i /= r / 2) < 1 ? a / 2 * i * i * i + e : a / 2 * ((i -= 2) * i * i + 2) + e }, t.fn.circleProgress = function (e, a) { var r = "circle-progress", n = this.data(r); if ("widget" == e) { if (!n) throw Error('Calling "widget" method on not initialized instance is forbidden'); return n.canvas } if ("value" == e) { if (!n) throw Error('Calling "value" method on not initialized instance is forbidden'); if ("undefined" == typeof a) return n.getValue(); var s = arguments[1]; return this.each(function () { t(this).data(r).setValue(s) }) } return this.each(function () { var a = t(this), n = a.data(r), s = t.isPlainObject(e) ? e : {}; if (n) n.init(s); else { var o = t.extend({}, a.data()); "string" == typeof o.fill && (o.fill = JSON.parse(o.fill)), "string" == typeof o.animation && (o.animation = JSON.parse(o.animation)), s = t.extend(o, s), s.el = a, n = new i(s), a.data(r, n) } }) } }(jQuery), function (t) { function i(i) { return t(i).filter(function () { return t(this).is(":appeared") }) } function e() { s = !1; for (var t = 0, e = r.length; e > t; t++) { var a = i(r[t]); if (a.trigger("appear", [a]), c[t]) { var n = c[t].not(a); n.trigger("disappear", [n]) } c[t] = a } } function a(t) { r.push(t), c.push() } var r = [], n = !1, s = !1, o = { interval: 250, force_process: !1 }, l = t(window), c = []; t.expr[":"].appeared = function (i) { var e = t(i); if (!e.is(":visible")) return !1; var a = l.scrollLeft(), r = l.scrollTop(), n = e.offset(), s = n.left, o = n.top; return o + e.height() >= r && o - (e.data("appear-top-offset") || 0) <= r + l.height() && s + e.width() >= a && s - (e.data("appear-left-offset") || 0) <= a + l.width() ? !0 : !1 }, t.fn.extend({ appear: function (i) { var r = t.extend({}, o, i || {}), l = this.selector || this; if (!n) { var c = function () { s || (s = !0, setTimeout(e, r.interval)) }; t(window).scroll(c).resize(c), n = !0 } return r.force_process && setTimeout(e, r.interval), a(l), t(l) } }), t.extend({ force_appear: function () { return n ? (e(), !0) : !1 } }) }(function () { return "undefined" != typeof module ? require("jquery") : jQuery }());



/*==========  CIRCLE CHART  ==========*/
var el = $('.circle'),
    inited = false;
el.appear({ force_process: true });
el.on('appear', function () {
    if (!inited) {
        el.circleProgress();
        inited = true;
    }
});

if ($('.circle').length > 0) {
    $('.circle').circleProgress({
        size: 105,
        fill: { color: "#58c4c2" },
        emptyFill: '#555',
        startAngle: 300,
        lineCap: 'round',
        animation: { duration: 1800 }
    })
        .on('circle-animation-progress', function (event, progress, stepValue) {
            $(this).find('span').text((stepValue * 100).toFixed(1));
        });
}

// presets 2
if ($('.circle-red').length > 0) {
    $('.circle-red').circleProgress({
        fill: { color: "#58c4c2" },
    });
}