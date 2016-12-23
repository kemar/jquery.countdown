QUnit.test("parseDateTime()", function (assert) {

    var c, duration, expected;

    c = $('<div>00:00:01</div>').countDown();

    // 25-12-2017 22:30 - Paris UTC+1 (during Standard Time), assuming CET - Central European Time.
    expected = new Date(2017, 12 - 1, 25, 22, 30, 39);

    // 2017-12-25 21:30 - UTC
    duration = c.countDown('parseDateTime', '2017-12-25 21:30:39Z');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-25 21:30 - UTC
    duration = c.countDown('parseDateTime', '2017-12-25T21:30:39+0000');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-26 06:30 - Tokyo UTC+9
    duration = c.countDown('parseDateTime', '2017-12-26T06:30:39+0900');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-26 03:00 - Mumbai UTC+5.5
    duration = c.countDown('parseDateTime', '2017-12-26T03:00:39+0530');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-25 22:30 - Paris UTC+1
    duration = c.countDown('parseDateTime', '2017-12-25T22:30:39+0100');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-25 19:30 - Rio de Janeiro UTC-2
    duration = c.countDown('parseDateTime', '2017-12-25T19:30:39-0200');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2017-12-25 13:30 - San Francisco UTC-8
    duration = c.countDown('parseDateTime', '2017-12-25T13:30:39-0800');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

});

QUnit.test("parseDateTime() with a colon character in the time-zone offset string", function (assert) {

    var c, duration, expected;

    c = $('<div>00:00:01</div>').countDown();

    // 10-07-2017 10:18 - Paris UTC+2 (during Daylight Saving Time), assuming CEST - Central European Summer Time.
    expected = new Date(2017, 7 - 1, 10, 10, 18, 59);

    // 10-07-2017 08:18 - UTC
    duration = c.countDown('parseDateTime', '2017-07-10T08:18:59+00:00');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 10-07-2017 15:18 - Hanoï UTC+7
    duration = c.countDown('parseDateTime', '2017-07-10T15:18:59+07:00');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 10-07-2017 03:48 - Caracas UTC-4.5
    duration = c.countDown('parseDateTime', '2017-07-10T03:48:59-04:30');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 10-07-2017 04:18 - New York UTC-4
    duration = c.countDown('parseDateTime', '2017-07-10T04:18:59-04:00');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 10-07-2017 00:18 - Alaska UTC-8
    duration = c.countDown('parseDateTime', '2017-07-10T00:18:59-08:00');
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

});
