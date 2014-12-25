QUnit.test("parseDateTime()", function (assert) {

    var c, duration, expected;

    c = $('#countdown').countDown();
    expected = new Date(2014, 12 - 1, 25, 22, 30, 39);  // Assuming CET - Central European Time.

    // 2014-12-25 21:30:39Z - UTC
    duration = c.countDown('parseDateTime', '2014-12-25 21:30:39Z');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-25T21:30:39+0000 - UTC
    duration = c.countDown('parseDateTime', '2014-12-25T21:30:39+0000');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-26T06:30:39+0900 - Tokyo UTC+9
    duration = c.countDown('parseDateTime', '2014-12-26T06:30:39+0900');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-26T03:00:39+0530 - Mumbai UTC+5.5
    duration = c.countDown('parseDateTime', '2014-12-26T03:00:39+0530');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-25T22:30:39+0100 - Paris UTC+1
    duration = c.countDown('parseDateTime', '2014-12-25T22:30:39+0100');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-25T19:30:39-0200 - Rio de Janeiro UTC-2
    duration = c.countDown('parseDateTime', '2014-12-25T19:30:39-0200');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // 2014-12-25T13:30:39-0800 - San Francisco UTC-8
    duration = c.countDown('parseDateTime', '2014-12-25T13:30:39-0800');
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

});
