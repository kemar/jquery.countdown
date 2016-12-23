# [jQuery Countdown](https://github.com/kemar/jquery.countdown)

Unobtrusive and easily skinable countdown jQuery plugin generating a `<time>` tag.

[Live demo](https://kemar.github.io/jquery.countdown/).


## Supported browsers

To use the countdown jQuery plugin you need an [up-to-date web browser supporting the HTML5 time element](http://caniuse.com/#feat=html5semantic).


## Installation

Get the plugin [from `npm`](https://www.npmjs.com/package/jquery.countdown):

```sh
$ npm install jquery.countdown
```

Or include this script after jQuery.

```html
<script src="jquery.js"></script>
<script src="jquery.countdown.js"></script>
```


## Usage

Create a countdown from the **value** of the `datetime` **attribute** of a `<time>` tag (valid global date and time, time or duration).

```html
<time datetime="2013-12-13T17:43:00">Friday, December 13th, 2013 5:43pm</time>
<time datetime="02:30:30">Expires in 2 hours 30 minutes 30 seconds</time>
<time datetime="P61D">61 days</time>
```

Create a countdown from a [valid global date and time](https://html.spec.whatwg.org/multipage/infrastructure.html#valid-global-date-and-time-string) string (with time-zone offset).

```html
<div>2012-12-08T17:47:00+0100</div><!-- Paris (winter) -->
<div>2012-12-08T08:47:00-0800</div><!-- California -->
<div>2012-12-08T16:47:00+0000</div><!-- UTC -->
```

Create a countdown from a [valid time](https://html.spec.whatwg.org/multipage/infrastructure.html#valid-time-string) string.

```html
<div>12:30</div>
<div>12:30:39</div>
<div>12:30:39.929</div>
```

Create a countdown from a [valid duration](https://html.spec.whatwg.org/multipage/infrastructure.html#valid-duration-string) string.

```html
<div>P2D</div>
<div>PT01H01M15S</div>
<div>PT20M20S</div>
<div>PT10S</div>
```

Create a countdown from the **string representation** of a [Python `timedelta` object](https://docs.python.org/3/library/datetime.html#timedelta-objects).

```html
<div>600 days, 3:59:12</div>
<div>00:59:00</div>
<div>3:59:12</div>
```

Create a countdown from a human readable duration string.

```html
<h1>24h00m59s</h1>
<h1>2h 0m</h1>
<h1>4h 18m 3s</h1>
<h1>600 days, 3:59:12</h1>
<h1>600 jours, 3:59:12</h1>
<h1>00:01</h1>
<h1>240:00:59</h1>
```

Create a countdown from a string that can be interpreted by the [JavaScript `Date.parse()` function](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.4.2).

```html
<div><script>document.write(date.toDateString())</script></div>
<div><script>document.write(date.toGMTString())</script></div>
<div><script>document.write(date.toISOString())</script></div>
<div><script>document.write(date.toUTCString())</script></div>
```


## Rock'n'roll

```javascript
$('div, h1, time').countDown();
```


## Available options

- `css_class`: the css class of the generated `<time>` tag (default: `countdown`).
- `always_show_days`: always display days if true even if none remains (default: `false`).
- `with_labels`: display or hide labels (default: `true`).
- `with_seconds`: display or hide seconds (default: `true`).
- `with_separators`: display or hide separators between days, hours, minutes and seconds (default: `true`).
- `with_hh_leading_zero`: always display hours in 2 digit format with a leading zero when appropriate (default: `true`).
- `with_mm_leading_zero`: always display minutes in 2 digit format with a leading zero when appropriate (default: `true`).
- `with_ss_leading_zero`: always display seconds in 2 digit format with a leading zero when appropriate (default: `true`).
- `label_dd`: label's text for days (default: `days`).
- `label_hh`: label's text for hours (default: `hours`).
- `label_mm`: label's text for minutes (default: `minutes`).
- `label_ss`: label's text for seconds (default: `seconds`).
- `separator`: separator character between hours, minutes and seconds (default: `:`).
- `separator_days`: separator character between days and hours (default: `,`).


## Events

`time.elapsed`: this event fires immediately when the time is elapsed.

```javascript
$('#my-countdown').on('time.elapsed', function () {
    // do something...
});
```

`time.tick`: by default, this event fires every second(ish), the second passed parameter is the number of miliseconds left. Useful if you're doing something like a bar that fills up as time runs out.

```javascript
$('#my-countdown').on('time.tick', function (ev, ms) {
    // do something...
});
```


## Generated markup

A valid `<time>` tag representing a duration is generated.

```html
<time class="countdown" datetime="P12DT05H16M22S">
    <span class="item item-dd">
        <span class="dd"></span>
        <span class="label label-dd">days</span>
    </span>
    <span class="separator separator-dd">,</span>
    <span class="item item-hh">
        <span class="hh-1"></span>
        <span class="hh-2"></span>
        <span class="label label-hh">hours</span>
    </span>
    <span class="separator">:</span>
    <span class="item item-mm">
        <span class="mm-1"></span>
        <span class="mm-2"></span>
        <span class="label label-mm">minutes</span>
    </span>
    <span class="separator">:</span>
    <span class="item item-ss">
        <span class="ss-1"></span>
        <span class="ss-2"></span>
        <span class="label label-ss">seconds</span>
    </span>
</time>
```


## Acknowledgements

Released under the [MIT License](http://opensource.org/licenses/mit-license).

Issues should be opened through [GitHub Issues](https://github.com/kemar/jquery.countdown/issues/).

[jQuery Countdown](https://github.com/kemar/jquery.countdown) is authored and maintained by [Kemar](https://marcarea.com).
