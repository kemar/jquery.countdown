QUnit.test("parseDuration()", function (assert) {

    var c, duration, expected;

    c = $('<div>00:00:01</div>').countDown();

    // Now + 3 days + 2 hours + 45 min + 20s + 544ms
    duration = c.countDown('parseDuration', 'P3DT2H45M20.544S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 3) +
        c.countDown('hToMs', 2) +
        c.countDown('mToMs', 45) +
        c.countDown('sToMs', 20) +
        544
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 2 days
    duration = c.countDown('parseDuration', 'P2D');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 2)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 10s
    duration = c.countDown('parseDuration', 'PT00M10S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('sToMs', 10)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 1 hour + 1 min + 15s
    duration = c.countDown('parseDuration', 'PT01H01M15S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 1) +
        c.countDown('mToMs', 1) +
        c.countDown('sToMs', 15)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 2 days + 20 hours + 10s
    duration = c.countDown('parseDuration', 'P2DT20H00M10S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 2) +
        c.countDown('hToMs', 20) +
        c.countDown('sToMs', 10)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 2 days + 20 hours + 10s + 55ms
    duration = c.countDown('parseDuration', 'P2DT20H00M10.55S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 2) +
        c.countDown('hToMs', 20) +
        c.countDown('sToMs', 10) +
        55
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 10s
    duration = c.countDown('parseDuration', 'PT10S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('sToMs', 10)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // Now + 10s + 325ms
    duration = c.countDown('parseDuration', 'PT10.325S');
    expected = new Date(
        new Date().getTime() +
        c.countDown('sToMs', 10) +
        325
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

});
