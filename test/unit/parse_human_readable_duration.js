QUnit.test("parseHumanReadableDuration()", function (assert) {

    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-duration-string

    var c, duration, expected;

    c = $('<div>00:00:01</div>').countDown();

    // 600 days, 3:59:12
    duration = c.countDown('parseHumanReadableDuration', '600 days, 3:59:12');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 600) +
        c.countDown('hToMs', 3) +
        c.countDown('mToMs', 59) +
        c.countDown('sToMs', 12)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 600 jours, 3:59:12
    duration = c.countDown('parseHumanReadableDuration', '600 jours, 3:59:12');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 600) +
        c.countDown('hToMs', 3) +
        c.countDown('mToMs', 59) +
        c.countDown('sToMs', 12)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 3:59:12
    duration = c.countDown('parseHumanReadableDuration', '3:59:12');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 3) +
        c.countDown('mToMs', 59) +
        c.countDown('sToMs', 12)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 00:01
    duration = c.countDown('parseHumanReadableDuration', '00:01');
    expected = new Date(
        new Date().getTime() +
        c.countDown('mToMs', 1)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 00:00:59
    duration = c.countDown('parseHumanReadableDuration', '00:00:59');
    expected = new Date(
        new Date().getTime() +
        c.countDown('sToMs', 59)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 00:59:00
    duration = c.countDown('parseHumanReadableDuration', '00:59:00');
    expected = new Date(
        new Date().getTime() +
        c.countDown('mToMs', 59)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 4h 18m 3s
    duration = c.countDown('parseHumanReadableDuration', '4h 18m 3s');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 4) +
        c.countDown('mToMs', 18) +
        c.countDown('sToMs', 3)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 1d 0h 00m 59s
    duration = c.countDown('parseHumanReadableDuration', '1d 0h 00m 59s');
    expected = new Date(
        new Date().getTime() +
        c.countDown('dToMs', 1) +
        c.countDown('sToMs', 59)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 2h 0m
    duration = c.countDown('parseHumanReadableDuration', '2h 0m');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 2)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 240:00:59
    duration = c.countDown('parseHumanReadableDuration', '240:00:59');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 240) +
        c.countDown('sToMs', 59)
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

    // 12:30:39.929
    duration = c.countDown('parseHumanReadableDuration', '12:30:39.929');
    expected = new Date(
        new Date().getTime() +
        c.countDown('hToMs', 12) +
        c.countDown('mToMs', 30) +
        c.countDown('sToMs', 39) +
        929
    );
    assert.strictEqual(duration.toLocaleString(), expected.toLocaleString());

});
