/*
 * jQuery Countdown - v1.2.1
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
     *          <span class="item item-dd">
     *              <span class="dd"></span>
     *              <span class="label label-dd">days</span>
     *          </span>
     *          <span class="separator separator-dd">,</span>
     *          <span class="item item-hh">
     *              <span class="hh-1"></span>
     *              <span class="hh-2"></span>
     *              <span class="label label-hh">hours</span>
     *          </span>
     *          <span class="separator">:</span>
     *          <span class="item item-mm">
     *              <span class="mm-1"></span>
     *              <span class="mm-2"></span>
     *              <span class="label label-mm">minutes</span>
     *          </span>
     *          <span class="separator">:</span>
     *          <span class="item item-ss">
     *              <span class="ss-1"></span>
     *              <span class="ss-2"></span>
     *              <span class="label label-ss">seconds</span>
     *          </span>
     *      </time>
    */

    var pluginName = 'countDown';
    var defaults = {
          css_class:        'countdown'
        , always_show_days: false
        , with_labels:      true
        , with_seconds:     true
        , with_separators:  true
        , label_dd:         'days'
        , label_hh:         'hours'
        , label_mm:         'minutes'
        , label_ss:         'seconds'
        , separator:        ':'
        , separator_days:   ','
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
            this.markup();
            this.set_timeout_delay = this.sToMs(1);
            this.time_element.bind('time.elapsed', this.options.onTimeElapsed);
            this.doCountDown();
        }

        // Convert seconds to milliseconds.
        , sToMs: function (s) {
            return parseInt(s, 10) * 1000;
        }

        // Convert minutes to milliseconds.
        , mToMs: function (m) {
            return parseInt(m, 10) * 60 * 1000;
        }

        // Convert hours to milliseconds.
        , hToMs: function (h) {
            return parseInt(h, 10) * 60 * 60 * 1000;
        }

        // Convert days to milliseconds.
        , dToMs: function (d) {
            return parseInt(d, 10) * 24 * 60 * 60 * 1000;
        }

        // Returns the seconds (0-59) of the specified timedelta expressed in milliseconds.
        , msToS: function (ms) {
            return parseInt((ms / 1000) % 60, 10);
        }

        // Returns the minutes (0-59) of the specified timedelta expressed in milliseconds.
        , msToM: function (ms) {
            return parseInt((ms / 1000 / 60) % 60, 10);
        }

        // Returns the hours (0-23) of the specified timedelta expressed in milliseconds.
        , msToH: function (ms) {
            return parseInt((ms / 1000 / 60 / 60) % 24, 10);
        }

        // Returns the number of days of the specified timedelta expressed in milliseconds.
        , msToD: function (ms) {
            return parseInt((ms / 1000 / 60 / 60 / 24), 10);
        }

        , parseEndDate: function (str) {

            var d, dd, hh, mm, ss, time_array;

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
            //     => ["2012-12-08T13:30:39+0100", "2012", "12", "08", "13", "30", "39", undefined, "+0100"]
            // 2012-12-08T06:54-0800
            //     => ["2012-12-08T06:54-0800", "2012", "12", "08", "06", "54", undefined, undefined, "-0800"]
            // 2012-12-08 13:30Z
            //     => ["2012-12-08 13:30Z", "2012", "12", "08", "13", "30", undefined, undefined, "Z"]
            // 2013-12-08 06:54:39.929-10:30
            //     => ["2013-12-08 06:54:39.929-08:30", "2013", "12", "08", "06", "54", "39", "929", "-10:30"]
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
            //     (?:\:(\d{2}))?   => colon and (seconds) (optional)
            //     (?:\.(\d{1,3}))? => full stop character (.) and fractional part of second (milliseconds) (optional)
            //     ([Z\+\-\:\d]+)?  => time-zone (offset) string http://goo.gl/CJHLr (optional)
            // $
            time_array = str.match(
                /^(\d{4,})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?:\:(\d{2}))?(?:\.(\d{1,3}))?([Z\+\-\:\d]+)?$/);
            if (time_array) {
                // Convert UTC offset from string to milliseconds.
                // +0100 = ["+0100", "+", "01", "00"]
                // -08:00 = ["-08:00", "-", "08", "00"]
                // -10:30 = ["-10:30", "-", "10", "30"]
                var offset = time_array[8] ? time_array[8].match(/^([\+\-])?(\d{2}):?(\d{2})$/) : undefined;
                var ms_offset = 0;
                if (offset) {
                    ms_offset = this.hToMs(offset[2]) + this.mToMs(offset[3]);
                    ms_offset = (offset[1] === '+') ? -ms_offset : ms_offset;
                }

                // A Date object set to the current local date and time.
                var now = new Date();

                // Sets date and time according to universal time based on the values of time_array.
                now.setUTCHours(time_array[4] || 0);
                now.setUTCMinutes(time_array[5] || 0);
                now.setUTCSeconds(time_array[6] || 0);
                now.setUTCMilliseconds(time_array[7] || 0);
                now.setUTCDate(time_array[3]);
                now.setUTCMonth(time_array[2] - 1);
                now.setUTCFullYear(time_array[1]);

                // Add the UTC offset if any.
                now.setTime(now.getTime() + ms_offset);

                // Add the time-zone offset for the current locale if necessary.
                var local_offset = this.mToMs(new Date().getTimezoneOffset());
                if (local_offset !== ms_offset) {
                    now.setTime(now.getTime() + local_offset);
                }

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

            // Fallback solution: try to parse a date/time string.
            // new Date(d).toDateString() => Sat Dec 20 2014
            // new Date(d).toGMTString()  => Sat, 20 Dec 2014 09:24:00 GMT
            // new Date(d).toUTCString()  => Sat, 20 Dec 2014 09:24:00 GMT
            // new Date(d).toISOString()  => 2014-12-20T09:24:00.000Z       => IE >= 9 http://goo.gl/P4F9u
            d = Date.parse(str);
            if (!isNaN(d)) {
                return new Date(d);
            }

        }

        , markup: function () {
            // Prepare the HTML content of the <time> element.
            var html = [];
            html.push(
                '<span class="item item-dd">',
                    '<span class="dd"></span>',
                    '<span class="label label-dd">', this.options.label_dd, '</span>',
                '</span>',
                '<span class="separator separator-dd">', this.options.separator_days, '</span>',
                '<span class="item item-hh">',
                    '<span class="hh-1"></span>',
                    '<span class="hh-2"></span>',
                    '<span class="label label-hh">', this.options.label_hh, '</span>',
                '</span>',
                '<span class="separator">', this.options.separator, '</span>',
                '<span class="item item-mm">',
                    '<span class="mm-1"></span>',
                    '<span class="mm-2"></span>',
                    '<span class="label label-mm">', this.options.label_mm, '</span>',
                '</span>',
                '<span class="separator">', this.options.separator, '</span>',
                '<span class="item item-ss">',
                    '<span class="ss-1"></span>',
                    '<span class="ss-2"></span>',
                    '<span class="label label-ss">', this.options.label_ss, '</span>',
                '</span>'
            );
            this.time_element.html(html.join(''));
            // Customize HTML according to options.
            if (!this.options.with_labels) {
                this.time_element.find('.label').remove();
            }
            if (!this.options.with_separators) {
                this.time_element.find('.separator').remove();
            }
            if (!this.options.with_seconds) {
                this.time_element.find('.item-ss').remove();
                this.time_element.find('.separator').last().remove();
            }
            // Cache elements.
            this.item_dd       = this.time_element.find('.item-dd');
            this.separator_dd  = this.time_element.find('.separator-dd');
            this.remaining_dd  = this.time_element.find('.dd');
            this.remaining_hh1 = this.time_element.find('.hh-1');
            this.remaining_hh2 = this.time_element.find('.hh-2');
            this.remaining_mm1 = this.time_element.find('.mm-1');
            this.remaining_mm2 = this.time_element.find('.mm-2');
            this.remaining_ss1 = this.time_element.find('.ss-1');
            this.remaining_ss2 = this.time_element.find('.ss-2');
            // Set the css class of the <time> element.
            this.time_element.addClass(this.options.css_class);
        }

        , doCountDown: function () {
            // Calculate the difference between the two dates in milliseconds.
            // Note: in iOS JavaScript is paused during elastic scroll and not resumed until the scrolling stops.
            // Therefore we have to evaluate the remaining time with a new Date() object instead of assuming that
            // setTimeout() will always be executed after the specified `set_timeout_delay` which would have allowed us
            // to call the doCountDown() function with (ms - this.set_timeout_delay) as argument.
            var ms = this.end_date.getTime() - new Date().getTime();
            // Extract seconds, minutes, hours and days from the timedelta expressed in milliseconds.
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
            // If seconds are hidden, stop the counter as soon as there is no minute left.
            if (!this.options.with_seconds && dd === 0 && mm === 0 && hh === 0) {
                this.time_element.trigger('time.elapsed');
                return;
            }
            if (dd === 0 && mm === 0 && hh === 0 && ss === 0) {
                this.time_element.trigger('time.elapsed');
                return;
            }
            // Reload it.
            var self = this;
            setTimeout(function () { self.doCountDown() }, self.set_timeout_delay);
        }

        // @param remaining: an object literal containing a string representation of days, hours, minutes and
        // seconds remaining. e.g. { dd: "600", hh: "03", mm: "59", ss: "11" }
        , displayRemainingTime: function (remaining) {
            // Format the datetime attribute of the <time> element to an ISO 8601 duration.
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#datetime-value
            // i.e.: <time datetime="P2DT00H00M30S">2 00:00:00</time>
            var attr = [];
            attr.push('P');
            if (remaining.dd !== '0') {
                attr.push(remaining.dd, 'D');
            }
            attr.push('T', remaining.hh, 'H', remaining.mm, 'M');
            if (this.options.with_seconds) {
                attr.push(remaining.ss, 'S');
            }
            this.time_element.attr('datetime', attr.join(''));
            // Hide days if necessary.
            if (!this.options.always_show_days && remaining.dd === '0') {
                this.item_dd.hide();
                this.separator_dd.hide();
            }
            // Update countdown values.
            this.remaining_dd.text(remaining.dd);
            this.remaining_hh1.text(remaining.hh[0]);
            this.remaining_hh2.text(remaining.hh[1]);
            this.remaining_mm1.text(remaining.mm[0]);
            this.remaining_mm2.text(remaining.mm[1]);
            this.remaining_ss1.text(remaining.ss[0]);
            this.remaining_ss2.text(remaining.ss[1]);
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
