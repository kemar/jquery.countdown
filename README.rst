`jQuery Countdown <http://github.com/kemar/jquery.countdown>`_
==============================================================

Unobtrusive and easily skinable `countdown jQuery plugin <http://kemar.github.com/jquery.countdown/>`_ generating a <time> tag.


Installation
------------

Include this script after jQuery.

.. code-block::

    <script src='jquery.js'></script>
    <script src='jquery.countdown.js'></script>


Usage
-----

Create a countdown from a ``<time>`` tag ``datetime`` attribute (valid global date and time, time or duration).

.. code-block::

    <time datetime="2013-12-13T17:43:00">Friday, December 13th, 2013 5:43pm</time>
    <time datetime="02:30:30">Expires in 2 hours 30 minutes 30 seconds</time>
    <time datetime="P61D">61 days</time>


Create a countdown from a `valid global date and time <http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-global-date-and-time-string>`_ string (with time-zone offset).

.. code-block::

    <div>2012-12-08T17:47:00+0100</div><!-- Paris (winter) -->
    <div>2012-12-08T08:47:00-0800</div><!-- California -->
    <div>2012-12-08T16:47:00Z</div><!-- UTC -->


Create a countdown from a `valid time <http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-time-string>`_ string.

.. code-block::

    <div>12:30</div>
    <div>12:30:39</div>
    <div>12:30:39.929</div>


Create a countdown from a `valid duration <http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-duration-string>`_ string.

.. code-block::

   <div>P2D</div>
   <div>PT01H01M15S</div>
   <div>PT20M20S</div>
   <div>PT10S</div>


Create a countdown from a string representation of a Python timedelta object.

.. code-block::

    <div>600 days, 3:59:12</div>
    <div>00:59:00</div>
    <div>3:59:12</div>


Create a countdown from a JavaScript Date.parse() compliant string.

.. code-block::

    <div><script>document.write(date.toDateString())</script></div>
    <div><script>document.write(date.toGMTString())</script></div>
    <div><script>document.write(date.toISOString())</script></div>
    <div><script>document.write(date.toUTCString())</script></div>


Create a countdown from a human readable duration string.

.. code-block::

    <h1>24h00m59s</h1>
    <h1>2h 0m</h1>
    <h1>4h 18m 3s</h1>
    <h1>600 days, 3:59:12</h1>
    <h1>600 jours, 3:59:12</h1>
    <h1>00:01</h1>
    <h1>240:00:59</h1>


Rock'n'roll
-----------

.. code-block:: javascript

    $('div, h1, time').countDown();


Available options
-----------------

- ``css_class``: the css class of the generated ``<time>`` tag (default: ``countdown``).
- ``always_show_days``: always display days if true even if none remains (default: ``false``).
- ``with_labels``: display or hide labels (default: ``true``).
- ``with_seconds``: display or hide seconds, if false ``setTimeout()`` delay is in minutes (default: ``true``).
- ``with_separators``: display or hide separators between days, hours, minutes and seconds (default: ``true``).
- ``label_dd``: label's text for days (default: ``days``).
- ``label_hh``: label's text for hours (default: ``hours``).
- ``label_mm``: label's text for minutes (default: ``minutes``).
- ``label_ss``: label's text for seconds (default: ``seconds``).
- ``separator``: separator character between hours, minutes and seconds (default: ``:``).
- ``separator_days``: separator character between days and hours (default: ``,``).


Events
------

``time.elapsed``: this event fires immediately when the time is elapsed.

.. code-block:: javascript

    $('#my-countdown').on('time.elapsed', function () {
        // do something...
    });


Generated markup
----------------

A valid ``<time>`` tag representing a duration is generated.

.. code-block::

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


Acknowledgements
----------------

Released under the `MIT License <http://www.opensource.org/licenses/mit-license.php>`_.

Issues should be opened through `GitHub Issues <http://github.com/kemar/jquery.countdown/issues/>`_.

`jQuery Countdown <http://github.com/kemar/jquery.countdown>`_ is authored and maintained by `Kemar <http://marcarea.com>`_.
