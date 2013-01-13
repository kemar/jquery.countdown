/*
 * jQuery Countdown - v1.1
 * http://github.com/kemar/jquery.countdown
 * Licensed MIT
 */

(function ($, window, document, undefined) {

    "use strict";

    /*
     * .countDown()
     *
     * Description:
     *      Unobtrusive and easily skinable countdown jQuery plugin.
     *
     * Usage:
     *      $(element).countDown()
     *
     *      $(element) is a valid <time> or any other HTML tag containing a text representation of a date/time
     *      or duration remaining before a deadline expires.
     *      If $(element) is a <time> tag, the datetime attribute is checked first.
     *          <time datetime="2013-12-13T17:43:00">Friday, December 13th, 2013 5:43pm</time>
     *          <time>2012-12-08T14:30:00+0100</time>
     *          <time>PT01H01M15S</time>
     *          <h1>600 days, 3:59:12</h1>
     *
     *      The text representation of a date/time or duration can be:
     *      - a valid global date and time string with its timezone offset:
     *          2012-12-08T14:30:00.432+0100
     *          2012-12-08T05:30:00-0800
     *          2012-12-08T13:30Z
     *      - a valid time string:
     *          12:30
     *          12:30:39
     *          12:30:39.929
     *      - a valid duration string:
     *          PT00M10S
     *          PT01H01M15S
     *          P2DT20H00M10S
     *          PT00M10S
     *      - the output of a JavaScript Date.parse() parsable string:
     *          Date.toDateString() => Sat Dec 20 2014
     *          Date.toGMTString()  => Sat, 20 Dec 2014 09:24:00 GMT
     *          Date.toISOString()  => 2014-12-20T09:24:00.000Z
     *          Date.toUTCString()  => Sat, 20 Dec 2014 09:24:00 GMT
     *      - a human readable duration string:
     *          600 days, 3:59:12
     *          00:59:00
     *          3:59:12
     *          24h00m59s
     *          2h 0m
     *          4h 18m 3s
     *          600 jours, 3:59:12
     *          00:01
     *          240:00:59
     *
     *      If $(element) is not a <time> tag, a new one is created and appended to $(element).
     *
     * Literature, resources and inspiration:
     *      JavaScript Date reference:
     *          https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date
     *      About the <time> element:
     *          http://www.w3.org/TR/html5/the-time-element.html#the-time-element (Working Draft)
     *          http://wiki.whatwg.org/wiki/Time_element
     *          http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-time-element
     *      <time> history:
     *          http://www.brucelawson.co.uk/2012/best-of-time/
     *          http://www.webmonkey.com/2011/11/w3c-adds-time-element-back-to-html5/
     *      Formats:
     *          http://en.wikipedia.org/wiki/ISO_8601
     *      jQuery plugin syntax:
     *          https://github.com/zenorocha/jquery-plugin-patterns
     *
     * Example of generated HTML markup:
     *      <time class="countdown" datetime="P12DT05H16M22S">
     *          <span class="countdown-item countdown-item-dd">
     *              <span class="countdown-dd">12</span>
     *              <span class="countdown-label">days</span>
     *          </span>
     *          <span class="countdown-separator">:</span>
     *          <span class="countdown-item countdown-item-hh">
     *              <span class="countdown-hh">0</span>
     *              <span class="countdown-hh">5</span>
     *              <span class="countdown-label">hours</span>
     *          </span>
     *          <span class="countdown-separator">:</span>
     *          <span class="countdown-item countdown-item-mm">
     *              <span class="countdown-mm">1</span>
     *              <span class="countdown-mm">6</span>
     *              <span class="countdown-label">minutes</span>
     *          </span>
     *          <span class="countdown-separator">:</span>
     *          <span class="countdown-item countdown-item-ss">
     *              <span class="countdown-ss">2</span>
     *              <span class="countdown-ss">2</span>
     *              <span class="countdown-label">seconds</span>
     *          </span>
     *      </time>
    */

    var pluginName = 'countDown';
    var defaults = {
          css_class:        'countdown'
        , with_empty_day:   false
        , with_labels:      true
        , with_seconds:     true
        , with_separators:  true
        , fast_forward:     false  // "Kill my CPU".
        , label_dd:         'days'
        , label_hh:         'hours'
        , label_mm:         'minutes'
        , label_ss:         'seconds'
        , separator:        ':'
        , separator_days:   ','
        , onTimeElapsed:    function () {}
    };

    function CountDown(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    CountDown.prototype = {

        init: function () {
            if (this.element.children().length) {
                return;
            }
            if (this.element.attr('datetime')) {  // Try to parse the datetime attribute first.
                this.end_date = this.parseEndDate(this.element.attr('datetime'));
            }
            if (this.end_date === undefined) {  // Fallback on the text content.
                this.end_date = this.parseEndDate(this.element.text());
            }
            if (this.end_date === undefined) {  // Unable to parse a date.
                return;
            }
            if (this.element.is('time')) {
                this.time_element = this.element;
            } else {
                this.time_element = $('<time></time>');
                this.element.html(this.time_element);
            }
            this.delay = this.options.with_seconds ? this.sToMs(1) : this.mToMs(1);
            this.set_timeout_delay = this.options.fast_forward ? 10 : this.delay;
            this.time_element.addClass(this.options.css_class);
            this.time_element.bind('time.elapsed', this.options.onTimeElapsed);
            this.doCountDown(this.end_date.getTime() - new Date().getTime());
        }

        , sToMs: function (s) {
            // Convert seconds to milliseconds.
            return parseInt(s, 10) * 1000;
        }

        , mToMs: function (m) {
            // Convert minutes to milliseconds.
            return parseInt(m, 10) * 60 * 1000;
        }

        , hToMs: function (h) {
            // Convert hours to milliseconds.
            return parseInt(h, 10) * 60 * 60 * 1000;
        }

        , dToMs: function (d) {
            // Convert days to milliseconds.
            return parseInt(d, 10) * 24 * 60 * 60 * 1000;
        }

        , msToS: function (ms) {
            // Convert milliseconds to seconds.
            return parseInt((ms / 1000) % 60, 10);
        }

        , msToM: function (ms) {
            // Convert milliseconds to minutes.
            return parseInt((ms / 1000 / 60) % 60, 10);
        }

        , msToH: function (ms) {
            // Convert milliseconds to hours.
            return parseInt((ms / 1000 / 60 / 60) % 24, 10);
        }

        , msToD: function (ms) {
            // Convert milliseconds to days.
            return parseInt((ms / 1000 / 60 / 60 / 24), 10);
        }

        , parseEndDate: function (str) {

            var d, dd, hh, mm, ss, time_array;

            // Try to parse a date/time string.
            // new Date(d).toDateString() => Sat Dec 20 2014
            // new Date(d).toGMTString()  => Sat, 20 Dec 2014 09:24:00 GMT
            // new Date(d).toUTCString()  => Sat, 20 Dec 2014 09:24:00 GMT
            // new Date(d).toISOString()  => 2014-12-20T09:24:00.000Z       => IE >= 9 http://goo.gl/P4F9u
            d = Date.parse(str);
            if (!isNaN(d)) {
                return new Date(d);
            }

            // Try to parse a valid duration string representing a duration.
            // Limited to days, hours, minutes and seconds.
            //
            // http://goo.gl/42f8a
            // http://en.wikipedia.org/wiki/ISO_8601#Durations
            // i.e.: P2DT20H00M10S, PT01H01M15S, PT00M10S, P2D
            //
            // RegExp:
            // /^
            //     P            => duration designator (historically called "period")
            //     (?:(\d+)D)?  => (days) followed by the letter "D" (optional)
            //     T?           => the letter "T" that precedes the time components of the representation (optional)
            //     (?:(\d+)H)?  => (hours) followed by the letter "H" (optional)
            //     (?:(\d+)M)?  => (minutes) followed by the letter "M" (optional)
            //     (?:(\d+)S)?  => (seconds) followed by the letter "S" (optional)
            // $/
            time_array = str.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
            if (time_array) {
                 d = new Date();
                dd = time_array[1] ? this.dToMs(time_array[1]) : 0;
                hh = time_array[2] ? this.hToMs(time_array[2]) : 0;
                mm = time_array[3] ? this.mToMs(time_array[3]) : 0;
                ss = time_array[4] ? this.sToMs(time_array[4]) : 0;
                d.setTime(d.getTime() + dd + hh + mm + ss);
                return d;
            }

            // Try to parse a valid global date and time string representing a date, time, and a time-zone offset.
            // http://goo.gl/bwpxr
            //
            // 2012-12-08T13:30:39+0100
            //     => ["2012-12-08T13:30:39+0100", "2012", "12", "08", "13", "30", "39", "+0100"]
            // 2012-12-08T06:54-0800
            //     => ["2012-12-08T06:54-0800", "2012", "12", "08", "06", "54", undefined, "-0800"]
            // 2012-12-08 13:30Z
            //     => ["2012-12-08 13:30Z", "2012", "12", "08", "13", "30", undefined, "Z"]
            // 2013-12-08 06:54:39.929-10:30
            //     => ["2013-12-08 06:54:39.929-08:30", "2013", "12", "08", "06", "54", "39", "-10:30"]
            //
            // RegExp:
            // ^
            //     (\d{4,})         => (year) (four or more ASCII digits)
            //     -                => hyphen-minus
            //     (\d{2})          => (month)
            //     -                => hyphen-minus
            //     (\d{2})          => (day)
            //     [T\s]            => T or space
            //     (\d{2})          => (hours)
            //     :                => colon
            //     (\d{2})          => (minutes)
            //     (?::(\d{2}))?    => colon and seconds (optional)
            //     (?:\.\d{1,3})?   => full stop character (.) and fractional part of second (optional)
            //     ([Z\+\-\:\d]+)?  => (time-zone) offset string http://goo.gl/CJHLr
            // $
            time_array = str.match(
                /^(\d{4,})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d{1,3})?([Z\+\-\:\d]+)?$/);
            if (time_array) {
                // Convert UTC offset from string to milliseconds.
                // +0100 = ["+0100", "+", "01", "00"]
                // -08:00 = ["-08:00", "-", "08", "00"]
                // -10:30 = ["-10:30", "-", "10", "30"]
                var offset = time_array[7].match(/^([\+\-])?(\d{2}):?(\d{2})$/);
                var ms_offset = 0;
                if (offset) {
                    ms_offset = this.hToMs(offset[2]) + this.mToMs(offset[3]);
                    ms_offset = (offset[1] === '+') ? -ms_offset : ms_offset;
                }
                var now = new Date();
                hh = time_array[4] ? this.hToMs(time_array[4]) : 0;
                mm = time_array[5] ? this.mToMs(time_array[5]) : 0;
                ss = time_array[6] ? this.sToMs(time_array[6]) : 0;
                now.setTime(hh + mm + ss);
                now.setDate(time_array[3]);
                now.setMonth(time_array[2] - 1);
                now.setFullYear(time_array[1]);
                now.setTime(now.getTime() + ms_offset);  // Set timezone offset.
                return now;
            }

            // Try to parse a string representing a human readable duration.
            // Limited to days, hours, minutes and seconds.
            //
            // 600 days, 3:59:12 => ["600 days, 3:59:12", "600", "3", "59", "12"]
            //           3:59:12 => ["3:59:12", undefined, "3", "59", "12"]
            //             00:01 => ["00:01", undefined, "00", "01", undefined]
            //          00:00:59 => ["00:00:59", undefined, "00", "00", "59"]
            //         240:00:59 => ["240:00:59", undefined, "240", "00", "59"]
            //         4h 18m 3s => ["4h 18m 3s", undefined, "4", "18", "3"]
            //     1d 0h 00m 59s => ["1d 0h 00m 59s", "1", "0", "00", "59"]
            //             2h 0m => ["2h 0m", undefined, "2", "0", undefined]
            //         24h00m59s => ["24h00m59s", undefined, "24", "00", "59"]
            //      12:30:39.929 => ["12:30:39.929", undefined, "12", "30", "39"]
            //
            // RegExp:
            // /^
            //     (?:(\d+).+\s)?   => (days) followed by any character 0 or more times and a space (optional)
            //     (\d+)[h:]\s?     => (hours) followed by "h" or ":" and an optional space
            //     (\d+)[m:]?\s?    => (minutes) followed by "m" or ":" and an optional space
            //     (\d+)?[s]?       => (seconds) followed by an optional space (optional)
            //     (?:\.\d{1,3})?   => full stop character (.) and fractional part of second (optional)
            // $/
            time_array = str.match(/^(?:(\d+).+\s)?(\d+)[h:]\s?(\d+)[m:]?\s?(\d+)?[s]?(?:\.\d{1,3})?$/);
            if (time_array) {
                d = new Date();
                dd = time_array[1] ? this.dToMs(time_array[1]) : 0;
                hh = time_array[2] ? this.hToMs(time_array[2]) : 0;
                mm = time_array[3] ? this.mToMs(time_array[3]) : 0;
                ss = time_array[4] ? this.sToMs(time_array[4]) : 0;
                d.setTime(d.getTime() + dd + hh + mm + ss);
                return d;
            }

        }

        , doCountDown: function (ms) {
            var ss = this.msToS(ms);
            var mm = this.msToM(ms);
            var hh = this.msToH(ms);
            var dd = this.msToD(ms);
            // Prevent display of negative values.
            if (ms <= 0) {
                ss = mm = hh = dd = 0;
            }
            // Update display.
            this.displayRemainingTime({
                  'ss': ss < 10 ? '0' + ss.toString() : ss.toString()
                , 'mm': mm < 10 ? '0' + mm.toString() : mm.toString()
                , 'hh': hh < 10 ? '0' + hh.toString() : hh.toString()
                , 'dd': dd.toString()
            });
            // Reload it.
            if (ms > 0) {
                var self = this;
                setTimeout(function () {
                    self.doCountDown(ms - self.delay)
                }, self.set_timeout_delay);
            } else {
                this.time_element.trigger('time.elapsed');
            }
        }

        , displayRemainingTime: function (remaining) {

            // Format the datetime attribute of the <time> element to an ISO 8601 duration.
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#datetime-value
            // i.e.: <time datetime="P2DT00H00M30S">2 00:00:00</time>
            var attr = [];
            attr.push('P');
            if (remaining.dd !== '0') {
                attr.push(remaining.dd, 'D');
            }
            attr.push('T');
            attr.push(remaining.hh, 'H');
            attr.push(remaining.mm, 'M');
            if (this.options.with_seconds) {
                attr.push(remaining.ss, 'S');
            }

            // Prepare the HTML content of the <time> element.
            var html           = [];
            var label_dd       = '';
            var label_hh       = '';
            var label_mm       = '';
            var label_ss       = '';
            var separator      = '';
            var separator_days = '';
            // Separators.
            if (this.options.with_separators) {
                separator_days = [
                    '<span class="', this.options.css_class, '-separator-dd">',
                        this.options.separator_days,
                    '</span>'
                ].join('');
                separator = [
                    '<span class="', this.options.css_class, '-separator-dd">',
                        this.options.separator,
                    '</span>'
                ].join('');
            }
            // Labels.
            if (this.options.with_labels) {
                label_dd = '<span class="' + this.options.css_class + '-label">' + this.options.label_dd + '</span>';
                label_hh = '<span class="' + this.options.css_class + '-label">' + this.options.label_hh + '</span>';
                label_mm = '<span class="' + this.options.css_class + '-label">' + this.options.label_mm + '</span>';
                label_ss = '<span class="' + this.options.css_class + '-label">' + this.options.label_ss + '</span>';
            }
            // Days.
            if (remaining.dd !== '0' || this.options.with_empty_day) {
                html.push(
                    '<span class="', this.options.css_class, '-item ', this.options.css_class, '-item-dd">',
                        '<span class="', this.options.css_class, '-dd">', remaining.dd, '</span>',
                        label_dd,
                    '</span>',
                    separator_days
                );
            }
            html.push(
                // Hours.
                '<span class="', this.options.css_class, '-item ', this.options.css_class, '-item-hh">',
                    '<span class="', this.options.css_class, '-hh">', remaining.hh[0], '</span>',
                    '<span class="', this.options.css_class, '-hh">', remaining.hh[1], '</span>',
                    label_hh,
                '</span>',
                // Minutes.
                separator,
                '<span class="', this.options.css_class, '-item ', this.options.css_class, '-item-mm">',
                    '<span class="', this.options.css_class, '-mm">', remaining.mm[0], '</span>',
                    '<span class="', this.options.css_class, '-mm">', remaining.mm[1], '</span>',
                    label_mm,
                '</span>'
            );
            // Seconds.
            if (this.options.with_seconds) {
                html.push(
                    separator,
                    '<span class="', this.options.css_class, '-item ', this.options.css_class, '-item-ss">',
                        '<span class="', this.options.css_class, '-ss">', remaining.ss[0], '</span>',
                        '<span class="', this.options.css_class, '-ss">', remaining.ss[1], '</span>',
                        label_ss,
                    '</span>'
                );
            }

            this.time_element.attr('datetime', attr.join(''));
            this.time_element.html(html.join(''));

        }

    };

    $.fn[pluginName] = function (options) {
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new CountDown(this, options));
                }
            });
        }
    };

})(window.jQuery, window, document);
