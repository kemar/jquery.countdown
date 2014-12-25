QUnit.test("parseDuration()", function (assert) {

    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-duration-string

    var c, duration, expected;

    c = $('#countdown').countDown();

    // PT00M10S = now + 10s
    duration = c.countDown('parseDuration', 'PT00M10S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('sToMs', 10)
    );
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // PT01H01M15S = now + 1 hour + 1 min + 15s
    duration = c.countDown('parseDuration', 'PT01H01M15S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 1) +
        c.countDown('mToMs', 1) +
        c.countDown('sToMs', 15)
    );
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

    // P2DT20H00M10S = now + 2 days + 20 hours + 10s
    duration = c.countDown('parseDuration', 'P2DT20H00M10S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 2) +
        c.countDown('hToMs', 20) +
        c.countDown('sToMs', 10)
    );
    assert.equal(duration.toLocaleString(), expected.toLocaleString());

});
